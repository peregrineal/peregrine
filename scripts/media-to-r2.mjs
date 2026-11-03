// Copies every file in /media to the R2 bucket under the same name (the key Payload's storage plugin uses).
// Safe to re-run: files already in the bucket with the same size are skipped.
// Usage: npm run media:to-r2
import 'dotenv/config'
import fs from 'node:fs'
import path from 'node:path'
import { S3Client, PutObjectCommand, ListObjectsV2Command } from '@aws-sdk/client-s3'

const { R2_ACCOUNT_ID, R2_BUCKET, R2_ACCESS_KEY_ID, R2_SECRET_ACCESS_KEY } = process.env
if (!R2_ACCOUNT_ID || !R2_BUCKET || !R2_ACCESS_KEY_ID || !R2_SECRET_ACCESS_KEY) {
  console.error('Set R2_ACCOUNT_ID, R2_BUCKET, R2_ACCESS_KEY_ID and R2_SECRET_ACCESS_KEY in .env first.')
  process.exit(1)
}

const s3 = new S3Client({
  region: 'auto',
  endpoint: `https://${R2_ACCOUNT_ID}.r2.cloudflarestorage.com`,
  credentials: { accessKeyId: R2_ACCESS_KEY_ID, secretAccessKey: R2_SECRET_ACCESS_KEY },
})

const TYPES = { '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg', '.png': 'image/png', '.webp': 'image/webp', '.avif': 'image/avif', '.svg': 'image/svg+xml' }
const dir = path.resolve('media')

const existing = new Map()
let token
do {
  const page = await s3.send(new ListObjectsV2Command({ Bucket: R2_BUCKET, ContinuationToken: token }))
  for (const o of page.Contents ?? []) existing.set(o.Key, o.Size)
  token = page.NextContinuationToken
} while (token)

const files = fs.readdirSync(dir).filter((f) => fs.statSync(path.join(dir, f)).isFile())
let uploaded = 0, skipped = 0, failed = 0
for (const name of files) {
  const full = path.join(dir, name)
  const size = fs.statSync(full).size
  if (existing.get(name) === size) { skipped++; continue }
  try {
    await s3.send(new PutObjectCommand({
      Bucket: R2_BUCKET,
      Key: name,
      Body: fs.readFileSync(full),
      ContentType: TYPES[path.extname(name).toLowerCase()] ?? 'application/octet-stream',
    }))
    uploaded++
  } catch (e) {
    failed++
    console.error(`Failed: ${name} (${e.message})`)
  }
}

let total = 0
token = undefined
do {
  const page = await s3.send(new ListObjectsV2Command({ Bucket: R2_BUCKET, ContinuationToken: token }))
  total += page.KeyCount ?? 0
  token = page.NextContinuationToken
} while (token)

console.log(`Local files: ${files.length}. Uploaded: ${uploaded}, already there: ${skipped}, failed: ${failed}. Objects in bucket now: ${total}.`)
if (failed) process.exit(1)
