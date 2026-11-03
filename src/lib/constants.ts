import { DEFAULT_LOCALE, localizePath, type Locale } from './i18n'

export const SITE_URL = (process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000').replace(/\/$/, '')

/** The public domain search engines see (canonicals, sitemap, robots, structured data), whatever server this runs on. */
export const CANONICAL_URL = 'https://peregrine.al'

/** The core pages: they cannot be deleted and their slugs are locked so links never break. */
export const CORE_PAGES = [
  { slug: 'home', title: 'Home' },
  { slug: 'universities-and-pathways', title: 'Universities & Pathways' },
  { slug: 'boarding-schools', title: 'Boarding Schools' },
  { slug: 'seasonal-camps', title: 'Seasonal Camps' },
  { slug: 'tourist-visas', title: 'Tourist & Visitor Visas' },
  { slug: 'about-us', title: 'About Us' },
  { slug: 'partner-with-us', title: 'Partner With Us' },
  { slug: 'book-a-consultation', title: 'Book a Consultation' },
  { slug: 'privacy-policy', title: 'Privacy Policy' },
] as const

/** Linked from the footer and from every consent checkbox, so its slug is locked with the core pages. */
export const PRIVACY_SLUG = 'privacy-policy'

export const CORE_SLUGS: readonly string[] = CORE_PAGES.map((p) => p.slug)

export const isCoreSlug = (slug?: string | null) => Boolean(slug && CORE_SLUGS.includes(slug))

/** Service keys used by the booking form and by CTA buttons (?service=...). */
export const SERVICE_KEYS = [
  'higher-education',
  'language-courses',
  'boarding',
  'camps',
  'student-visa',
  'tourist-visa',
  'general',
] as const

export type ServiceKey = (typeof SERVICE_KEYS)[number]

export const serviceOptions: { label: string; value: ServiceKey }[] = [
  { label: 'Universities & Pathways', value: 'higher-education' },
  { label: 'Language Courses', value: 'language-courses' },
  { label: 'Boarding Schools', value: 'boarding' },
  { label: 'Seasonal Camps', value: 'camps' },
  { label: 'Student Visa', value: 'student-visa' },
  { label: 'Tourist & Visitor Visa', value: 'tourist-visa' },
  { label: 'General Enquiry', value: 'general' },
]

export const pathForSlug = (slug?: string | null, locale: Locale = DEFAULT_LOCALE) =>
  localizePath(!slug || slug === 'home' ? '/' : `/${slug}`, locale)
