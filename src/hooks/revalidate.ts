import type { CollectionAfterChangeHook, CollectionAfterDeleteHook, GlobalAfterChangeHook } from 'payload'

import { pathForSlug } from '@/lib/constants'
import { DEFAULT_LOCALE, LOCALES } from '@/lib/i18n'

// revalidatePath only exists inside a running Next.js server. The seed script and
// other CLI runs set context.disableRevalidate and are skipped.
async function revalidate(path: string, type?: 'layout' | 'page') {
  try {
    const { revalidatePath } = await import('next/cache')
    revalidatePath(path, type)
  } catch {
    // Not running inside Next.js (CLI, tests): nothing to revalidate.
  }
}

/** Every language version of a page, by its visible address and its internal /en route. */
async function revalidateSlug(slug?: string | null) {
  for (const locale of LOCALES) await revalidate(pathForSlug(slug, locale))
  const base = pathForSlug(slug)
  await revalidate(`/${DEFAULT_LOCALE}${base === '/' ? '' : base}`)
}

export const revalidatePage: CollectionAfterChangeHook = async ({ doc, previousDoc, req }) => {
  if (req.context?.disableRevalidate) return doc
  if (doc._status === 'published') await revalidateSlug(doc.slug)
  if (previousDoc?._status === 'published' && previousDoc.slug !== doc.slug) {
    await revalidateSlug(previousDoc.slug)
  }
  await revalidate('/sitemap.xml')
  return doc
}

export const revalidatePageDelete: CollectionAfterDeleteHook = async ({ doc, req }) => {
  if (!req.context?.disableRevalidate) await revalidateSlug(doc?.slug)
  return doc
}

/** Libraries and globals appear on many pages: refresh the whole site. */
export const revalidateSite: CollectionAfterChangeHook = async ({ doc, req }) => {
  if (!req.context?.disableRevalidate) await revalidate('/', 'layout')
  return doc
}

export const revalidateSiteDelete: CollectionAfterDeleteHook = async ({ doc, req }) => {
  if (!req.context?.disableRevalidate) await revalidate('/', 'layout')
  return doc
}

export const revalidateGlobal: GlobalAfterChangeHook = async ({ doc, req }) => {
  if (!req.context?.disableRevalidate) await revalidate('/', 'layout')
  return doc
}
