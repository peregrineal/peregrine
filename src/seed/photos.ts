/**
 * Uploads the openly licensed photos in src/seed/media to Media and attaches them:
 *   - destinations/  to each Destination (records in data/destination-photos.json)
 *   - visas/         to the "Explore your destinations" cards on Tourist & Visitor Visas,
 *                    together with each card's country flag
 *                    (records in data/visa-photos.json)
 *   - seasons/       to the "Explore by season" cards on Seasonal Camps, cropped from the
 *                    client's Seasonal Camps document (records in data/season-photos.json)
 * Credits and licences are stored on each Media item and shown on the cards.
 *
 *   npm run seed:photos
 *
 * Safe to run again: existing uploads are reused, and anything that already has a photo
 * (for example one the owner chose) is left alone.
 */
import 'dotenv/config'

import path from 'path'
import { getPayload, type Payload } from 'payload'
import { fileURLToPath } from 'url'

import config from '../payload.config'
import destinationPhotos from './data/destination-photos.json'
import seasonPhotos from './data/season-photos.json'
import visaPhotos from './data/visa-photos.json'

const dirname = path.dirname(fileURLToPath(import.meta.url))
const ctx = { disableRevalidate: true }

// Client-supplied photos have no author or licence to credit, so their cards show no credit line.
type Photo = { file: string; alt: string; altSq: string; source: string; author?: string; licence?: string }

/** The Media item for a photo, uploading it the first time. */
async function upload(payload: Payload, folder: string, p: Photo) {
  const { docs } = await payload.find({
    collection: 'media',
    where: { filename: { equals: p.file } },
    limit: 1,
    depth: 0,
    overrideAccess: true,
  })
  const media =
    docs[0] ??
    (await payload.create({
      collection: 'media',
      locale: 'en',
      overrideAccess: true,
      context: ctx,
      filePath: path.resolve(dirname, 'media', folder, p.file),
      data: {
        alt: p.alt,
        licence: { source: p.source, credit: p.author ? `${p.author}, ${p.licence}` : undefined, licenceConfirmed: true },
      },
    }))
  await payload.update({ collection: 'media', id: media.id, locale: 'sq', data: { alt: p.altSq }, overrideAccess: true, context: ctx })
  return media
}

async function destinations(payload: Payload) {
  let attached = 0
  for (const p of destinationPhotos) {
    const media = await upload(payload, 'destinations', p)
    const { docs } = await payload.find({
      collection: 'destinations',
      where: { name: { equals: p.destination } },
      locale: 'en',
      limit: 1,
      depth: 0,
      overrideAccess: true,
    })
    const dest = docs[0]
    if (!dest) {
      payload.logger.warn(`${p.destination}: no destination with this name`)
      continue
    }
    if (dest.image) continue
    await payload.update({ collection: 'destinations', id: dest.id, data: { image: media.id }, overrideAccess: true, context: ctx })
    attached++
  }
  payload.logger.info(`Destination photos: ${attached} attached.`)
}

async function visaCards(payload: Payload) {
  const { docs } = await payload.find({
    collection: 'pages',
    where: { slug: { equals: 'tourist-visas' } },
    locale: 'en',
    limit: 1,
    depth: 0,
    overrideAccess: true,
  })
  const page = docs[0]
  if (!page) return payload.logger.warn('Tourist & Visitor Visas page not found')
  const block = page.layout?.find((b) => b.blockType === 'cardGrid' && b.settings?.anchorId === 'destinations')
  if (!block || block.blockType !== 'cardGrid') return payload.logger.warn('Visa destination cards not found')

  type Flag = NonNullable<typeof block.items>[number]['flag']
  let attached = 0
  for (const p of visaPhotos) {
    const item = block.items?.find((i) => i.title === p.card)
    if (!item) continue
    if (!item.image) {
      item.image = (await upload(payload, 'visas', p)).id
      attached++
    }
    if (!item.flag) {
      item.flag = p.flag as Flag
      attached++
    }
  }
  if (!attached) return payload.logger.info('Visa card photos and flags: nothing to attach.')
  block.style = 'photo'
  // Arrays and blocks are shared between languages; updating in English keeps the Albanian text.
  await payload.update({
    collection: 'pages',
    id: page.id,
    locale: 'en',
    data: { layout: page.layout, _status: 'published' },
    overrideAccess: true,
    context: ctx,
  })
  payload.logger.info(`Visa card photos and flags: ${attached} set.`)
}

async function seasonCards(payload: Payload) {
  const { docs } = await payload.find({
    collection: 'pages',
    where: { slug: { equals: 'seasonal-camps' } },
    locale: 'en',
    limit: 1,
    depth: 0,
    overrideAccess: true,
  })
  const page = docs[0]
  if (!page) return payload.logger.warn('Seasonal Camps page not found')
  const block = page.layout?.find((b) => b.blockType === 'cardGrid' && b.settings?.anchorId === 'seasons')
  if (!block || block.blockType !== 'cardGrid') return payload.logger.warn('Season cards not found')

  let attached = 0
  for (const p of seasonPhotos) {
    const item = block.items?.find((i) => i.title === p.card)
    if (!item || item.image) continue
    item.image = (await upload(payload, 'seasons', p)).id
    attached++
  }
  if (!attached) return payload.logger.info('Season card photos: nothing to attach.')
  block.style = 'photo'
  await payload.update({
    collection: 'pages',
    id: page.id,
    locale: 'en',
    data: { layout: page.layout, _status: 'published' },
    overrideAccess: true,
    context: ctx,
  })
  payload.logger.info(`Season card photos: ${attached} attached.`)
}

async function run() {
  const payload = await getPayload({ config })
  await destinations(payload)
  await visaCards(payload)
  await seasonCards(payload)
}

try {
  await run()
  process.exit(0)
} catch (err) {
  console.error(err)
  process.exit(1)
}
