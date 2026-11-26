import type { Metadata } from 'next'
import { draftMode } from 'next/headers'
import { notFound } from 'next/navigation'

import { RenderBlocks } from '@/blocks/RenderBlocks'
import { LivePreviewListener } from '@/components/LivePreviewListener'
import { SectionScroll } from '@/components/SectionScroll'
import { pathForSlug } from '@/lib/constants'
import { getPageBySlug, getPublishedSlugs, getSiteSettings } from '@/lib/data'
import { DEFAULT_LOCALE, isLocale, LOCALES } from '@/lib/i18n'
import { setRequestLocale } from '@/lib/locale'
import { shareImageUrl, shareMetadata, siteNameFrom } from '@/lib/seo'
import type { Media } from '@/payload-types'

type Args = { params: Promise<{ lang: string; slug?: string[] }> }

export const revalidate = 3600

export async function generateStaticParams() {
  try {
    const slugs = await getPublishedSlugs()
    return LOCALES.flatMap((lang) => slugs.map((s) => ({ lang, slug: s === 'home' ? [] : [s] })))
  } catch {
    // No database during this build: pages are rendered on first request instead.
    return []
  }
}

const slugFrom = (segments?: string[]) => (segments?.length ? segments.join('/') : 'home')

/**
 * Page slugs are one segment of lowercase letters, numbers and dashes (the slug field enforces it).
 * Anything else (bot probes such as /wp-login or /xmlrpc/x) is a 404 before the database is asked,
 * so scanners cannot make every made-up address cost a page render and two queries.
 */
const SLUG = /^[a-z0-9-]+$/
const isSlugPath = (segments?: string[]) => !segments?.length || (segments.length === 1 && SLUG.test(segments[0]))

export default async function Page({ params }: Args) {
  const { lang, slug } = await params
  // Unknown first segments (a missing /file.png) land here too.
  if (!isLocale(lang) || !isSlugPath(slug)) notFound()
  const locale = setRequestLocale(lang)
  const { isEnabled: draft } = await draftMode()
  const page = await getPageBySlug(slugFrom(slug), locale, draft)
  if (!page) notFound()

  return (
    <>
      {draft && <LivePreviewListener />}
      <RenderBlocks blocks={page.layout} />
      {/* One section per screen; not on the booking form or long legal text, which read better freely. */}
      {!page.layout?.some((b) => b.blockType === 'booking' || b.blockType === 'richText') && <SectionScroll />}
    </>
  )
}

export async function generateMetadata({ params }: Args): Promise<Metadata> {
  const { lang, slug } = await params
  if (!isLocale(lang) || !isSlugPath(slug)) return {}
  const locale = setRequestLocale(lang)
  const s = slugFrom(slug)
  const [page, settings] = await Promise.all([getPageBySlug(s, locale).catch(() => null), getSiteSettings(locale)])
  if (!page) return {}
  const siteName = siteNameFrom(settings)
  const title = page.seo?.title || `${page.title} | ${siteName}`
  const description = page.seo?.description || settings?.seoDefaults?.description || undefined
  const image = shareImageUrl((page.seo?.image || settings?.seoDefaults?.image) as Media | number | null | undefined)
  const url = pathForSlug(s, locale)
  return {
    title,
    description,
    alternates: {
      canonical: url,
      languages: { ...Object.fromEntries(LOCALES.map((l) => [l, pathForSlug(s, l)])), 'x-default': pathForSlug(s, DEFAULT_LOCALE) },
    },
    ...shareMetadata({ siteName, locale, title, description, url, image }),
  }
}
