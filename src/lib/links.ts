import { pathForSlug } from './constants'
import { DEFAULT_LOCALE, type Locale } from './i18n'

export type LinkData = {
  type?: 'internal' | 'external' | null
  label?: string | null
  page?: number | { slug?: string | null } | null
  anchor?: string | null
  url?: string | null
  variant?: string | null
  hideArrow?: boolean | null
  presetService?: string | null
}

/** The address a CMS link points to, in the given language. Same-page anchors stay bare. */
export function resolveHref(link?: LinkData | null, locale: Locale = DEFAULT_LOCALE): string | null {
  if (!link) return null
  if (link.type === 'external') return link.url || null
  const slug = link.page && typeof link.page === 'object' ? link.page.slug : null
  if (!slug && !link.anchor) return null
  const base = slug ? pathForSlug(slug, locale) : ''
  const query = link.presetService ? `?service=${encodeURIComponent(link.presetService)}` : ''
  const hash = link.anchor ? `#${link.anchor.replace(/^#/, '')}` : ''
  return `${base}${query}${hash}` || null
}

export const isExternalHref = (href: string) => /^https?:\/\//.test(href)

/** WhatsApp deep link from a digits-only number. */
export const whatsappHref = (digits?: string | null) => {
  const n = String(digits ?? '').replace(/\D/g, '')
  return n.length >= 8 ? `https://wa.me/${n}` : null
}

export const telHref = (phone?: string | null) => `tel:${String(phone ?? '').replace(/[^+\d]/g, '')}`

/** A Google Maps search for an address; line breaks become commas. */
export const mapsHref = (address: string) =>
  `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address.replace(/\s*\n\s*/g, ', ').trim())}`
