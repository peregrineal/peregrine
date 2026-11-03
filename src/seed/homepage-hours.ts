/**
 * Client request of 2 November 2026, applied to an existing database without reseeding:
 *  - Home, "Study destinations": drop the second intro paragraph ("Each destination offers...")
 *    and the "Images show illustrative architecture only..." footnote.
 *  - Site settings: opening hours start at 9:00 instead of 10:00, and no "Support by appointment" note.
 *
 *   npm run payload run src/seed/homepage-hours.ts
 *
 * Only those fields change; other edits made in the admin stay. Home keeps its current
 * status (draft or published). Safe to run again.
 */
import 'dotenv/config'

import { getPayload } from 'payload'

import config from '../payload.config'

const ctx = { disableRevalidate: true }
const locales = ['en', 'sq'] as const
const REMOVED = [/^Each destination offers different educational systems/, /^Çdo destinacion ka sistem arsimor/]
const FOOTNOTE = [/^Images show illustrative architecture only/, /^Fotot tregojnë vetëm arkitekturë ilustruese/]

type Block = Record<string, unknown> & { blockType: string }

async function apply() {
  const payload = await getPayload({ config })

  const { docs } = await payload.find({ collection: 'pages', where: { slug: { equals: 'home' } }, limit: 1, depth: 0, draft: true, overrideAccess: true, locale: 'en' })
  const home = docs[0]
  if (!home) throw new Error('No home page in the database')
  const draft = home._status === 'draft'

  for (const locale of locales) {
    const page = await payload.findByID({ collection: 'pages', id: home.id, depth: 0, draft: true, overrideAccess: true, locale, fallbackLocale: 'none' })
    const layout = structuredClone(page.layout ?? []) as Block[]
    const block = layout.find((b) => b.blockType === 'destinations')
    if (!block) throw new Error('No destinations section on Home')
    if (typeof block.intro === 'string') {
      block.intro = block.intro
        .split(/\n\s*\n/)
        .filter((p) => !REMOVED.some((r) => r.test(p.trim())))
        .join('\n\n')
    }
    if (typeof block.footnote === 'string' && FOOTNOTE.some((r) => r.test(block.footnote as string))) block.footnote = ''
    await payload.update({
      collection: 'pages',
      id: home.id,
      locale,
      draft,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      data: { layout: layout as any, _status: draft ? 'draft' : 'published' },
      overrideAccess: true,
      context: ctx,
    })
  }
  payload.logger.info(`home: destinations intro and footnote updated${draft ? ' (draft)' : ''}`)

  for (const locale of locales) {
    const s = await payload.findGlobal({ slug: 'site-settings', depth: 0, overrideAccess: true, locale, fallbackLocale: 'none' })
    const hours = (s as { openingHours?: string | null }).openingHours
    const note = (s as { hoursNote?: string | null }).hoursNote
    if (note) {
      await payload.updateGlobal({ slug: 'site-settings', locale, data: { hoursNote: '' }, overrideAccess: true, context: ctx })
      payload.logger.info(`site-settings (${locale}): removed "${note}"`)
    }
    if (hours && hours.includes('10:00')) {
      await payload.updateGlobal({ slug: 'site-settings', locale, data: { openingHours: hours.replace('10:00', '9:00') }, overrideAccess: true, context: ctx })
      payload.logger.info(`site-settings (${locale}): ${hours.replace('10:00', '9:00')}`)
    }
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
