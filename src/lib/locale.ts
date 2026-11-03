import 'server-only'

import { cache } from 'react'

import { DEFAULT_LOCALE, isLocale, type Locale } from './i18n'

// The language of the page being rendered, shared by every server component in the
// request. Each layout, page and generateMetadata sets it from its [lang] param before
// rendering, because Next.js may render them independently.
const store = cache(() => ({ locale: DEFAULT_LOCALE as Locale }))

export function setRequestLocale(lang: string): Locale {
  const locale = isLocale(lang) ? lang : DEFAULT_LOCALE
  store().locale = locale
  return locale
}

export const getRequestLocale = (): Locale => store().locale
