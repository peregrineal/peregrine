/**
 * Copies selected fields of selected sections from the seed (data/pages.ts, Albanian from
 * data/sq.json) into the database, leaving everything else as the owner left it. Edit `changes`
 * for each round of client edits, then:
 *
 *   npx payload run src/seed/apply-sections.ts
 *
 * Pages keep their current status (draft or published). Safe to run again.
 */
import 'dotenv/config'

import { getPayload } from 'payload'

import config from '../payload.config'
import { pages } from './data/pages'
import sq from './data/sq.json'

const ctx = { disableRevalidate: true }
const dict = sq as Record<string, string>

/**
 * Which fields of which section change. `nth` counts sections of that type on the page.
 *
 * Add only the current round of edits and empty this list again once it has run: every run
 * rewrites the listed fields from the seed. List rows keep whatever the seed does not set
 * (photos, flags and anything else added in the admin), but text in the listed fields is
 * replaced. (Earlier rounds of 2 November 2026 are already in the database.)
 */
type Change = { blockType: string; nth?: number; fields: string[] }
const changes: Record<string, Change[]> = {}

type Block = Record<string, unknown> & { blockType: string }

/** A field the seed leaves out is cleared: lists become empty, other values null. */
const empty = (current: unknown) => (Array.isArray(current) ? [] : null)

const nthOf = (layout: Block[], type: string, nth = 0) => {
  const b = layout.filter((x) => x.blockType === type)[nth]
  if (!b) throw new Error(`No ${type} #${nth}`)
  return b
}

/** Albanian for a seed value: strings through sq.json, arrays row by row; ids are not copied. */
function toSq(v: unknown): unknown {
  if (typeof v === 'string') {
    const t = dict[v]
    if (t === undefined && /[a-z]/i.test(v) && !/^[a-z0-9-]+$/.test(v)) throw new Error(`No Albanian for: ${v}`)
    return t ?? v
  }
  if (Array.isArray(v)) return v.map(toSq)
  if (v && typeof v === 'object') return Object.fromEntries(Object.entries(v).map(([k, x]) => [k, toSq(x)]))
  return v
}

const isRow = (v: unknown): v is Record<string, unknown> => Boolean(v) && typeof v === 'object' && !Array.isArray(v)

/**
 * Seed rows laid over the rows already in the database, row by row: the seed sets its own keys,
 * everything else on the existing row (photos, flags, ids, anything added in the admin) stays.
 */
function keepAdminFields(seedValue: unknown, current: unknown): unknown {
  if (!Array.isArray(seedValue) || !Array.isArray(current)) return seedValue
  return seedValue.map((row, i) => {
    const cur = current[i]
    if (!isRow(row) || !isRow(cur)) return row
    const out: Record<string, unknown> = { ...cur, ...row }
    for (const k of Object.keys(row)) out[k] = keepAdminFields(row[k], cur[k])
    return out
  })
}

/**
 * Give Albanian array rows the ids the English save created, so both locales share the rows,
 * and keep the fields the seed does not set (photos and other non-translated values).
 */
function withIds(sqValue: unknown, saved: unknown): unknown {
  if (Array.isArray(sqValue) && Array.isArray(saved)) {
    return sqValue.map((row, i) => {
      const s = saved[i] as Record<string, unknown> | undefined
      if (!row || typeof row !== 'object' || !s) return row
      const out: Record<string, unknown> = { ...s, ...(row as Record<string, unknown>), id: s.id }
      for (const k of Object.keys(out)) if (k !== 'id') out[k] = withIds(out[k], s[k])
      return out
    })
  }
  return sqValue
}

async function apply() {
  const payload = await getPayload({ config })
  for (const [slug, sections] of Object.entries(changes)) {
    const seed = pages.find((p) => p.slug === slug)
    if (!seed) throw new Error(`No seed page ${slug}`)
    const { docs } = await payload.find({ collection: 'pages', where: { slug: { equals: slug } }, limit: 1, depth: 0, draft: true, overrideAccess: true, locale: 'en' })
    const page = docs[0]
    if (!page) throw new Error(`No page ${slug} in the database`)
    const draft = page._status === 'draft'
    const status = draft ? 'draft' : 'published'

    const layout = structuredClone(page.layout ?? []) as Block[]
    for (const c of sections) {
      const block = nthOf(layout, c.blockType, c.nth)
      const from = nthOf(seed.layout as Block[], c.blockType, c.nth)
      for (const f of c.fields) block[f] = from[f] == null ? empty(block[f]) : keepAdminFields(from[f], block[f])
    }
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

    const sqPage = await payload.findByID({ collection: 'pages', id: page.id, depth: 0, draft: true, overrideAccess: true, locale: 'sq', fallbackLocale: 'none' })
    const sqLayout = structuredClone(sqPage.layout ?? []) as Block[]
    for (const c of sections) {
      const block = nthOf(sqLayout, c.blockType, c.nth)
      const from = nthOf(seed.layout as Block[], c.blockType, c.nth)
      const savedBlock = nthOf((saved.layout ?? []) as Block[], c.blockType, c.nth)
      for (const f of c.fields) block[f] = from[f] == null ? empty(block[f]) : withIds(toSq(from[f]), savedBlock[f])
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
    payload.logger.info(`${slug}: ${sections.length} section(s) updated${draft ? ' (draft)' : ''}`)
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
