/**
 * Applies the client's feedback of 30 October 2026 (instructions/FEEDBACK.docx) to an existing
 * database without reseeding: only the changed fields of the changed sections are written, so
 * everything else the owner has edited (and every other image) stays as it is.
 *
 *   npm run feedback:apply
 *
 * English comes from data/pages.ts, Albanian from data/sq.json. Client photos are uploaded
 * from media/client. The Home photo has no confirmed licence yet, so Home is saved as a draft
 * for the owner to publish once the licence is confirmed in Media.
 * Safe to run again.
 */
import 'dotenv/config'

import path from 'path'
import { getPayload, type Payload } from 'payload'
import { fileURLToPath } from 'url'

import config from '../payload.config'
import { pages } from './data/pages'
import sq from './data/sq.json'

const dirname = path.dirname(fileURLToPath(import.meta.url))
const ctx = { disableRevalidate: true }
const CLIENT = 'Supplied by PEREGRINE with the feedback of 30 October 2026'

type Photo = { file: string; alt: string; altSq: string; confirmed: boolean }

const photos = {
  graduates: {
    file: 'home-graduates.jpg',
    alt: 'Graduates in caps and gowns holding their diplomas',
    altSq: 'Të diplomuar me kapele dhe toga, me diplomat në duar',
    // Looks like a stock photo: the owner confirms the licence before Home is published.
    confirmed: false,
  },
  courtyard: {
    file: 'universities-courtyard.jpg',
    alt: 'Arcaded courtyard of a historic university building in the sun',
    altSq: 'Oborr me harqe i një ndërtese historike universitare në diell',
    confirmed: true,
  },
  documents: {
    file: 'about-documents.jpg',
    alt: 'A consultant handing documents across a desk',
    altSq: 'Një këshilltare dorëzon dokumente mbi tavolinë',
    confirmed: true,
  },
  consultation: {
    file: 'about-consultation.jpg',
    alt: 'A consultant talking with a student and his mother at a table',
    altSq: 'Një këshilltare bisedon me një student dhe nënën e tij në tavolinë',
    confirmed: true,
  },
  founder: {
    file: 'founder-elisabeta-rada.png',
    alt: 'Elisabeta Rada, founder of PEREGRINE, at her desk',
    altSq: 'Elisabeta Rada, themeluese e PEREGRINE, në tavolinën e punës',
    confirmed: true,
  },
} satisfies Record<string, Photo>

/** Which fields of which section change. `nth` counts sections of that type on the page. */
type Change = { blockType: string; nth?: number; fields?: string[]; image?: keyof typeof photos }
const changes: Record<string, { draft?: boolean; sections: Change[] }> = {
  home: { draft: true, sections: [{ blockType: 'splitContent', image: 'graduates' }] },
  'universities-and-pathways': {
    sections: [
      { blockType: 'hero', image: 'courtyard' },
      { blockType: 'faq', fields: ['eyebrow', 'intro'] },
    ],
  },
  'boarding-schools': {
    sections: [
      { blockType: 'featureGroups', fields: ['eyebrow', 'heading', 'headingAccent', 'subheading', 'intro', 'groups'] },
      { blockType: 'cardGrid', fields: ['items'] },
      { blockType: 'faq', fields: ['eyebrow', 'intro'] },
    ],
  },
  'seasonal-camps': { sections: [{ blockType: 'faq', fields: ['eyebrow', 'intro'] }] },
  'tourist-visas': { sections: [{ blockType: 'faq', fields: ['eyebrow', 'intro'] }] },
  'about-us': {
    sections: [
      { blockType: 'hero', image: 'documents' },
      { blockType: 'founder', fields: ['eyebrow', 'role', 'body', 'quoteLabel', 'quote', 'signature'], image: 'founder' },
      { blockType: 'cta', image: 'consultation' },
    ],
  },
}

type Block = Record<string, unknown> & { blockType: string; id?: string }

const nthOf = (layout: Block[], blockType: string, nth = 0) => {
  const found = layout.filter((b) => b.blockType === blockType)[nth]
  if (!found) throw new Error(`No ${blockType} #${nth} on the page`)
  return found
}

// Fields that hold structure or settings rather than copy, and are the same in both languages.
const notCopy = new Set(['id', 'icon', 'image', 'flag', 'blockType', 'blockName'])

/** The Albanian version of a seed value: every copy string is looked up in sq.json. */
function toSq(value: unknown, key = ''): unknown {
  if (typeof value === 'string') {
    if (notCopy.has(key)) return value
    const t = (sq as Record<string, string>)[value]
    if (!t) throw new Error(`Missing Albanian in sq.json for: ${value}`)
    return t
  }
  if (Array.isArray(value)) return value.map((v) => toSq(v))
  if (value && typeof value === 'object') {
    return Object.fromEntries(Object.entries(value).map(([k, v]) => [k, toSq(v, k)]))
  }
  return value
}

/** Copies the ids of the saved English rows onto the Albanian rows, so both languages fill the same rows. */
function withIds(sqValue: unknown, saved: unknown): unknown {
  if (Array.isArray(sqValue) && Array.isArray(saved)) return sqValue.map((v, i) => withIds(v, saved[i]))
  if (sqValue && typeof sqValue === 'object' && saved && typeof saved === 'object') {
    const s = saved as Record<string, unknown>
    return {
      ...Object.fromEntries(Object.entries(sqValue).map(([k, v]) => [k, withIds(v, s[k])])),
      ...(s.id ? { id: s.id } : {}),
    }
  }
  return sqValue
}

async function upload(payload: Payload, p: Photo) {
  const { docs } = await payload.find({ collection: 'media', where: { filename: { equals: p.file } }, limit: 1, depth: 0, overrideAccess: true })
  const media =
    docs[0] ??
    (await payload.create({
      collection: 'media',
      locale: 'en',
      overrideAccess: true,
      context: ctx,
      filePath: path.resolve(dirname, 'media', 'client', p.file),
      data: { alt: p.alt, licence: { source: CLIENT, licenceConfirmed: p.confirmed } },
    }))
  await payload.update({ collection: 'media', id: media.id, locale: 'sq', data: { alt: p.altSq }, overrideAccess: true, context: ctx })
  return media.id
}

async function apply() {
  const payload = await getPayload({ config })
  const ids = Object.fromEntries(
    await Promise.all(Object.entries(photos).map(async ([k, p]) => [k, await upload(payload, p)] as const)),
  ) as Record<keyof typeof photos, number | string>

  for (const [slug, { draft, sections }] of Object.entries(changes)) {
    const seed = pages.find((p) => p.slug === slug)
    if (!seed) throw new Error(`No seed page ${slug}`)
    const { docs } = await payload.find({ collection: 'pages', where: { slug: { equals: slug } }, limit: 1, depth: 0, draft: true, overrideAccess: true, locale: 'en' })
    const page = docs[0]
    if (!page) throw new Error(`No page ${slug} in the database`)

    // English: copy the changed fields from the seed and set the new photos.
    const layout = structuredClone(page.layout ?? []) as Block[]
    for (const c of sections) {
      const block = nthOf(layout, c.blockType, c.nth)
      const from = nthOf(seed.layout as Block[], c.blockType, c.nth)
      for (const f of c.fields ?? []) block[f] = from[f] ?? null
      if (c.image) block.image = ids[c.image]
    }
    const status = draft ? 'draft' : 'published'
    const saved = await payload.update({
      collection: 'pages',
      id: page.id,
      locale: 'en',
      draft,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      data: { layout: layout as any, _status: status },
      overrideAccess: true,
      context: ctx,
    })

    // Albanian: the same fields from sq.json, on the rows the English save created.
    if (sections.some((c) => c.fields?.length)) {
      const sqPage = await payload.findByID({ collection: 'pages', id: page.id, depth: 0, draft: true, overrideAccess: true, locale: 'sq', fallbackLocale: 'none' })
      const sqLayout = structuredClone(sqPage.layout ?? []) as Block[]
      for (const c of sections) {
        const block = nthOf(sqLayout, c.blockType, c.nth)
        const from = nthOf(seed.layout as Block[], c.blockType, c.nth)
        const savedBlock = nthOf((saved.layout ?? []) as Block[], c.blockType, c.nth)
        for (const f of c.fields ?? []) block[f] = from[f] == null ? null : withIds(toSq(from[f], f), savedBlock[f])
      }
      await payload.update({
        collection: 'pages',
        id: page.id,
        locale: 'sq',
        draft,
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        data: { layout: sqLayout as any, _status: status },
        overrideAccess: true,
        context: ctx,
      })
    }
    payload.logger.info(`${slug}: ${sections.length} section(s) updated${draft ? ' (saved as draft)' : ''}`)
  }
}

// `payload run` exits as soon as this module finishes loading, so await at the top level.
try {
  await apply()
  process.exit(0)
} catch (err) {
  console.error(err)
  process.exit(1)
}
