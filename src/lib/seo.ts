import type { Metadata } from 'next'

import type { Media, SiteSetting } from '@/payload-types'

import { CANONICAL_URL, SITE_URL } from './constants'
import { ogLocale, type Locale } from './i18n'
import { mapsHref } from './links'

export const DEFAULT_OG_IMAGE = '/og-default.png'

export const siteNameFrom = (settings?: SiteSetting | null) => settings?.seoDefaults?.siteName || 'PEREGRINE'

/**
 * The share image URL for an upload, preferring its 1200x630 crop. Our own uploads become
 * relative paths so metadataBase points them at the public domain, not the server they ran on.
 */
export function shareImageUrl(img?: Media | number | null) {
  const url = img && typeof img === 'object' ? img.sizes?.og?.url || img.url : null
  if (!url) return DEFAULT_OG_IMAGE
  return url.startsWith(SITE_URL) ? url.slice(SITE_URL.length) || DEFAULT_OG_IMAGE : url
}

type Share = { siteName: string; locale: Locale; title?: string; description?: string; url?: string; image?: string }

/**
 * Open Graph and Twitter tags together. Next.js replaces a layout's openGraph object with the
 * page's rather than merging them, so every level sends the full set.
 */
export function shareMetadata({ siteName, locale, title, description, url, image = DEFAULT_OG_IMAGE }: Share): Pick<Metadata, 'openGraph' | 'twitter'> {
  return {
    openGraph: { siteName, type: 'website', locale: ogLocale[locale], title, description, url, images: [image] },
    twitter: { card: 'summary_large_image', title, description, images: [image] },
  }
}

/** schema.org data for the business, built from Site Settings. Never includes ratings or reviews. */
export function organizationJsonLd(settings: SiteSetting | null | undefined, fallback: Partial<SiteSetting>, description: string) {
  const s = { ...fallback, ...settings }
  const sameAs = (s.socialLinks ?? []).map((l) => l.url).filter(Boolean)
  return {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    '@id': `${CANONICAL_URL}/#organization`,
    name: siteNameFrom(settings),
    url: CANONICAL_URL,
    logo: `${CANONICAL_URL}/brand/icon-512.png`,
    image: `${CANONICAL_URL}${DEFAULT_OG_IMAGE}`,
    description,
    // Empty values are left as undefined so JSON.stringify drops them.
    email: s.email || undefined,
    telephone: s.phone || undefined,
    // Only a confirmed address goes to search engines.
    address:
      s.addressConfirmed && s.address
        ? { '@type': 'PostalAddress', streetAddress: s.address, addressLocality: 'Tirana', postalCode: s.address.match(/\b\d{4}\b/)?.[0], addressCountry: 'AL' }
        : undefined,
    hasMap: s.addressConfirmed && s.address ? mapsHref(s.address) : undefined,
    sameAs: sameAs.length ? sameAs : undefined,
  }
}

/** Serialise JSON-LD for a <script> tag without letting content close the tag early. */
export const jsonLdString = (data: object) => JSON.stringify(data).replace(/</g, '\\u003c')
