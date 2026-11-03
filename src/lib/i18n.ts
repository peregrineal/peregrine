// Site languages. English lives at the root (/about-us); every other language gets a
// prefix (/sq/about-us). Page slugs are shared between languages.

export const LOCALES = ['en', 'sq'] as const
export type Locale = (typeof LOCALES)[number]
export const DEFAULT_LOCALE: Locale = 'en'

export const isLocale = (value: unknown): value is Locale => LOCALES.includes(value as Locale)

export const localeLabels: Record<Locale, string> = { en: 'English', sq: 'Shqip' }

/** html lang and Open Graph locale for each language. */
export const htmlLang: Record<Locale, string> = { en: 'en', sq: 'sq' }
export const ogLocale: Record<Locale, string> = { en: 'en_GB', sq: 'sq_AL' }

/** Prefix an internal path with the language, e.g. ('/about-us', 'sq') -> '/sq/about-us'. */
export function localizePath(path: string, locale: Locale = DEFAULT_LOCALE): string {
  if (locale === DEFAULT_LOCALE || !path.startsWith('/')) return path
  if (path === '/') return `/${locale}`
  if (/^\/[?#]/.test(path)) return `/${locale}${path.slice(1)}`
  return `/${locale}${path}`
}

/** Split a visible path into its language and the path without the prefix. */
export function splitLocale(pathname: string): { locale: Locale; path: string } {
  const first = pathname.split('/')[1]
  if (isLocale(first) && first !== DEFAULT_LOCALE) {
    return { locale: first, path: pathname.slice(first.length + 1) || '/' }
  }
  return { locale: DEFAULT_LOCALE, path: pathname || '/' }
}
