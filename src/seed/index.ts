/**
 * Loads all site content into the database. Safe to run more than once: every
 * record is matched by its slug, name or key and updated instead of duplicated.
 *
 *   npm run seed
 *
 * SEED_ONLY=privacy-policy,services npm run seed loads only the named pages, libraries
 * (destinations, fields-of-study, faqs, services) or `globals`, leaving the rest untouched.
 */
import 'dotenv/config'

import { getPayload, type Payload } from 'payload'

import config from '../payload.config'
import { destinations, faqs, fieldsOfStudy, services } from './data/libraries'
import { footerSeed, headerSeed, pages, siteSettingsSeed } from './data/pages'

const ctx = { disableRevalidate: true }

const only = (process.env.SEED_ONLY ?? '')
  .split(',')
  .map((s) => s.trim())
  .filter(Boolean)
const wants = (name: string) => !only.length || only.includes(name)

async function upsert<T extends Record<string, unknown>>(
  payload: Payload,
  collection: 'destinations' | 'fields-of-study' | 'faqs' | 'services',
  field: string,
  data: T,
) {
  const { docs } = await payload.find({
    collection,
    where: { [field]: { equals: data[field] } },
    limit: 1,
    depth: 0,
    overrideAccess: true,
  })
  if (docs[0]) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return payload.update({ collection, id: docs[0].id, data: data as any, overrideAccess: true, context: ctx })
  }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return payload.create({ collection, data: data as any, overrideAccess: true, context: ctx })
}

/** Replace `page: 'ref:<slug>'` markers with real page ids, recursively. */
function resolveRefs(value: unknown, ids: Map<string, number | string>): unknown {
  if (Array.isArray(value)) return value.map((v) => resolveRefs(v, ids))
  if (value && typeof value === 'object') {
    return Object.fromEntries(
      Object.entries(value as Record<string, unknown>).map(([k, v]) => {
        if (k === 'page' && typeof v === 'string' && v.startsWith('ref:')) {
          const id = ids.get(v.slice(4))
          if (!id) throw new Error(`Seed: unknown page reference ${v}`)
          return [k, id]
        }
        return [k, resolveRefs(v, ids)]
      }),
    )
  }
  return value
}

async function seed() {
  const payload = await getPayload({ config })
  payload.logger.info('Seeding PEREGRINE content…')

  // Owner account (only when there are no users yet)
  const users = await payload.count({ collection: 'users', overrideAccess: true })
  if (users.totalDocs === 0) {
    const email = process.env.SEED_OWNER_EMAIL
    const password = process.env.SEED_OWNER_PASSWORD
    if (email && password) {
      await payload.create({
        collection: 'users',
        data: { email, password, name: 'PEREGRINE', role: 'owner' },
        overrideAccess: true,
      })
      payload.logger.info(`Created Owner account ${email}. Change the password after the first login.`)
    } else {
      payload.logger.warn('No users yet and SEED_OWNER_EMAIL / SEED_OWNER_PASSWORD are not set: create the first user at /admin.')
    }
  }

  // Libraries
  if (wants('destinations')) for (const d of destinations) await upsert(payload, 'destinations', 'name', { ...d, visible: true })
  if (wants('fields-of-study')) for (const f of fieldsOfStudy) await upsert(payload, 'fields-of-study', 'label', f)
  if (wants('faqs')) for (const f of faqs) await upsert(payload, 'faqs', 'question', f)
  if (wants('services')) for (const s of services) await upsert(payload, 'services', 'key', s)
  if (!only.length) {
    payload.logger.info(
      `Libraries: ${destinations.length} destinations, ${fieldsOfStudy.length} fields, ${faqs.length} FAQs, ${services.length} services.`,
    )
  }

  // Pages, pass 1: make sure every page exists so links can point at it
  const ids = new Map<string, number | string>()
  for (const p of pages) {
    const { docs } = await payload.find({
      collection: 'pages',
      where: { slug: { equals: p.slug } },
      limit: 1,
      depth: 0,
      draft: true,
      overrideAccess: true,
    })
    const doc =
      docs[0] ??
      (await payload.create({
        collection: 'pages',
        data: { title: p.title, slug: p.slug, _status: 'draft' },
        overrideAccess: true,
        context: ctx,
        draft: true,
      }))
    ids.set(p.slug, doc.id)
  }

  // Name each section after its heading so the admin list reads like the page
  const named = (layout: Record<string, unknown>[]) =>
    layout.map((b) => ({ blockName: String(b.heading ?? b.name ?? b.eyebrow ?? '').slice(0, 60) || undefined, ...b }))

  // Pass 2: write layouts and publish
  const chosen = pages.filter((p) => wants(p.slug))
  for (const p of chosen) {
    await payload.update({
      collection: 'pages',
      id: ids.get(p.slug)!,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      data: { title: p.title, seo: p.seo, layout: resolveRefs(named(p.layout), ids) as any, _status: 'published' },
      overrideAccess: true,
      context: ctx,
    })
  }
  payload.logger.info(`Pages: ${chosen.map((p) => p.slug).join(', ') || '(none)'}`)

  if (!wants('globals')) {
    payload.logger.info('Seed complete.')
    return
  }

  // Globals
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  await payload.updateGlobal({ slug: 'site-settings', data: siteSettingsSeed as any, overrideAccess: true, context: ctx })
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  await payload.updateGlobal({ slug: 'header', data: resolveRefs(headerSeed, ids) as any, overrideAccess: true, context: ctx })
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  await payload.updateGlobal({ slug: 'footer', data: resolveRefs(footerSeed, ids) as any, overrideAccess: true, context: ctx })

  payload.logger.info('Seed complete.')
}

// `payload run` exits as soon as this module finishes loading, so await at the top level.
try {
  await seed()
  process.exit(0)
} catch (err) {
  console.error(err)
  process.exit(1)
}
