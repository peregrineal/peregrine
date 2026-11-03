import { postgresAdapter } from '@payloadcms/db-postgres'
import { resendAdapter } from '@payloadcms/email-resend'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { s3Storage } from '@payloadcms/storage-s3'
import path from 'path'
import { buildConfig } from 'payload'
import sharp from 'sharp'
import { fileURLToPath } from 'url'

import { Enquiries, PartnerEnquiries } from './collections/enquiries'
import { Destinations, Faqs, FieldsOfStudy, Services } from './collections/libraries'
import { Media } from './collections/Media'
import { Pages } from './collections/Pages'
import { Users } from './collections/Users'
import { Footer, Header, SiteSettings } from './globals'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

const email = process.env.RESEND_API_KEY
  ? resendAdapter({
      apiKey: process.env.RESEND_API_KEY,
      defaultFromAddress: process.env.EMAIL_FROM || 'website@peregrine.al',
      defaultFromName: 'PEREGRINE website',
    })
  : undefined

// Media goes to Cloudflare R2 once the R2_* variables are set; without them uploads stay on local disk (/media).
// Files are still served through /api/media/file/..., so access control and next/image localPatterns keep working.
const r2 = process.env.R2_BUCKET
  ? s3Storage({
      collections: { media: true },
      bucket: process.env.R2_BUCKET,
      config: {
        endpoint: `https://${process.env.R2_ACCOUNT_ID}.r2.cloudflarestorage.com`,
        region: 'auto',
        credentials: {
          accessKeyId: process.env.R2_ACCESS_KEY_ID || '',
          secretAccessKey: process.env.R2_SECRET_ACCESS_KEY || '',
        },
      },
    })
  : undefined

export default buildConfig({
  serverURL: process.env.NEXT_PUBLIC_SERVER_URL || '',
  admin: {
    user: Users.slug,
    importMap: { baseDir: path.resolve(dirname) },
    meta: {
      titleSuffix: ' | PEREGRINE admin',
      robots: 'noindex, nofollow',
      icons: [{ rel: 'icon', type: 'image/png', url: '/brand/favicon-32.png' }],
    },
    components: {
      graphics: {
        Logo: '/components/admin/Brand#Logo',
        Icon: '/components/admin/Brand#Icon',
      },
      beforeDashboard: ['/components/admin/Dashboard#Dashboard'],
    },
    livePreview: {
      breakpoints: [
        { label: 'Desktop', name: 'desktop', width: 1440, height: 900 },
        { label: 'Tablet', name: 'tablet', width: 834, height: 1112 },
        { label: 'Mobile', name: 'mobile', width: 390, height: 844 },
      ],
    },
  },
  collections: [Pages, Destinations, FieldsOfStudy, Faqs, Services, Media, Enquiries, PartnerEnquiries, Users],
  globals: [SiteSettings, Header, Footer],
  localization: {
    // English at /, Albanian at /sq (see src/proxy.ts). Empty Albanian fields fall back to English.
    locales: [
      { label: 'English', code: 'en' },
      { label: 'Shqip', code: 'sq' },
    ],
    defaultLocale: 'en',
    fallback: true,
  },
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: { outputFile: path.resolve(dirname, 'payload-types.ts') },
  db: postgresAdapter({
    pool: { connectionString: process.env.DATABASE_URL || '' },
    migrationDir: path.resolve(dirname, 'migrations'),
    push: false,
  }),
  email,
  plugins: [r2].filter((plugin) => plugin !== undefined),
  sharp,
  cors: [process.env.NEXT_PUBLIC_SERVER_URL || ''].filter(Boolean),
  csrf: [process.env.NEXT_PUBLIC_SERVER_URL || ''].filter(Boolean),
})
