/**
 * Client request of 2 November 2026: Home, Blueprint Method as six plain stage cards with the
 * client's short copy (no intro paragraph, no stage titles). Writes only that section's
 * subheading, intro and stages; English from data/pages.ts, Albanian from data/sq.json.
 *
 *   npx payload run src/seed/home-blueprint.ts
 *
 * Home keeps its current status (draft or published). Safe to run again.
 */
import 'dotenv/config'

import { getPayload } from 'payload'

import config from '../payload.config'
import { pages } from './data/pages'
import sq from './data/sq.json'

const ctx = { disableRevalidate: true }
const dict = sq as Record<string, string>

type Stage = { id?: string; icon?: string; kicker?: string | null; title?: string | null; summary?: string | null; body?: string | null }
type Block = Record<string, unknown> & { blockType: string; stages?: Stage[] }

const tr = (s: string | null | undefined) => {
  if (!s) return s ?? null
  const v = dict[s]
  if (!v) throw new Error(`No Albanian for: ${s}`)
  return v
}

async function apply() {
  const payload = await getPayload({ config })
  const seed = pages.find((p) => p.slug === 'home')?.layout.find((b) => b.blockType === 'timeline') as Block | undefined
  if (!seed?.stages) throw new Error('No timeline in the Home seed')

  const { docs } = await payload.find({ collection: 'pages', where: { slug: { equals: 'home' } }, limit: 1, depth: 0, draft: true, overrideAccess: true, locale: 'en' })
  const home = docs[0]
  if (!home) throw new Error('No home page in the database')
  const draft = home._status === 'draft'
  const status = draft ? 'draft' : 'published'

  // English
  const layout = structuredClone(home.layout ?? []) as Block[]
  const en = layout.find((b) => b.blockType === 'timeline')
  if (!en) throw new Error('No timeline section on Home')
  en.layout = 'row'
  en.subheading = seed.subheading
  en.intro = null
  en.stages = seed.stages.map((s) => ({ icon: s.icon, kicker: s.kicker, title: null, summary: s.summary, body: null }))
  const saved = await payload.update({
    collection: 'pages',
    id: home.id,
    locale: 'en',
    draft,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    data: { layout: layout as any, _status: status },
    overrideAccess: true,
    context: ctx,
  })
  const savedStages = ((saved.layout ?? []) as Block[]).find((b) => b.blockType === 'timeline')?.stages ?? []

  // Albanian, on the stage rows the English save created
  const sqPage = await payload.findByID({ collection: 'pages', id: home.id, depth: 0, draft: true, overrideAccess: true, locale: 'sq', fallbackLocale: 'none' })
  const sqLayout = structuredClone(sqPage.layout ?? []) as Block[]
  const al = sqLayout.find((b) => b.blockType === 'timeline')!
  al.subheading = tr(seed.subheading as string)
  al.intro = null
  al.stages = seed.stages.map((s, i) => ({ id: savedStages[i]?.id, icon: s.icon, kicker: tr(s.kicker), title: null, summary: tr(s.summary), body: null }))
  await payload.update({
    collection: 'pages',
    id: home.id,
    locale: 'sq',
    draft,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    data: { layout: sqLayout as any, _status: status },
    overrideAccess: true,
    context: ctx,
  })
  payload.logger.info(`home: Blueprint stages updated${draft ? ' (draft)' : ''}`)
}

// `payload run` exits as soon as this module finishes loading, so await at the top level.
try {
  await apply()
  process.exit(0)
} catch (err) {
  console.error(err)
  process.exit(1)
}
