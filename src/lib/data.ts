import 'server-only'

import config from '@payload-config'
import { getPayload, type Where } from 'payload'
import { cache } from 'react'

import type { Locale } from '@/lib/i18n'
import type { Destination, Faq, FieldsOfStudy, Footer, Header, Page, Service, SiteSetting } from '@/payload-types'

export const getPayloadClient = cache(() => getPayload({ config }))

export const getPageBySlug = cache(async (slug: string, locale: Locale, draft = false): Promise<Page | null> => {
  const payload = await getPayloadClient()
  const { docs } = await payload.find({
    collection: 'pages',
    where: { slug: { equals: slug } },
    limit: 1,
    depth: 2,
    draft,
    overrideAccess: draft,
    locale,
  })
  return docs[0] ?? null
})

export const getPublishedSlugs = async (): Promise<string[]> => {
  const payload = await getPayloadClient()
  const { docs } = await payload.find({
    collection: 'pages',
    where: { _status: { equals: 'published' } },
    limit: 200,
    depth: 0,
    select: { slug: true },
  })
  return docs.map((d) => d.slug)
}

// The layout must render even when the database is unreachable (build without DATABASE_URL,
// a Neon cold start that times out). Globals therefore fall back to null and the
// header/footer render their built-in defaults.
async function safe<T>(fn: () => Promise<T>, label: string): Promise<T | null> {
  try {
    return await fn()
  } catch (err) {
    console.error(`[peregrine] could not load ${label}:`, err instanceof Error ? err.message : err)
    return null
  }
}

export const getSiteSettings = cache((locale: Locale) =>
  safe(async () => (await getPayloadClient()).findGlobal({ slug: 'site-settings', depth: 1, locale }) as Promise<SiteSetting>, 'site settings'),
)

export const getHeader = cache((locale: Locale) =>
  safe(async () => (await getPayloadClient()).findGlobal({ slug: 'header', depth: 1, locale }) as Promise<Header>, 'header'),
)

export const getFooter = cache((locale: Locale) =>
  safe(async () => (await getPayloadClient()).findGlobal({ slug: 'footer', depth: 1, locale }) as Promise<Footer>, 'footer'),
)

export const getDestinations = cache(async (locale: Locale, programme?: string | null): Promise<Destination[]> => {
  const payload = await getPayloadClient()
  const where: Where = { visible: { equals: true } }
  if (programme) where.programmes = { contains: programme }
  const { docs } = await payload.find({
    collection: 'destinations',
    where,
    sort: '_order',
    limit: 100,
    depth: 1,
    locale,
  })
  return docs
})

export const getFieldsOfStudy = cache(async (locale: Locale): Promise<FieldsOfStudy[]> => {
  const payload = await getPayloadClient()
  const { docs } = await payload.find({ collection: 'fields-of-study', sort: '_order', limit: 100, depth: 0, locale })
  return docs
})

export const getFaqs = cache(async (locale: Locale, category: string): Promise<Faq[]> => {
  const payload = await getPayloadClient()
  const { docs } = await payload.find({
    collection: 'faqs',
    where: { category: { equals: category } },
    sort: '_order',
    limit: 50,
    depth: 0,
    locale,
  })
  return docs
})

export const getServices = cache(async (locale: Locale): Promise<Service[]> => {
  const payload = await getPayloadClient()
  const { docs } = await payload.find({ collection: 'services', sort: '_order', limit: 20, depth: 0, locale })
  return docs
})
