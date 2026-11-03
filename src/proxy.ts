import { NextResponse, type NextRequest } from 'next/server'

import { DEFAULT_LOCALE, LOCALES } from '@/lib/i18n'

// English is served without a prefix: /about-us is rendered by /en/about-us behind the
// scenes, and a typed /en/... address redirects to the clean one. Other languages
// (/sq/...) pass straight through to the [lang] route.
const SKIP = /^\/(admin|api|next|_next)(\/|$)/

export function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl
  if (SKIP.test(pathname)) return NextResponse.next()

  const first = pathname.split('/')[1]
  if (first === DEFAULT_LOCALE) {
    const url = req.nextUrl.clone()
    url.pathname = pathname.slice(DEFAULT_LOCALE.length + 1) || '/'
    return NextResponse.redirect(url, 308)
  }
  if ((LOCALES as readonly string[]).includes(first)) return NextResponse.next()

  const url = req.nextUrl.clone()
  url.pathname = `/${DEFAULT_LOCALE}${pathname === '/' ? '' : pathname}`
  return NextResponse.rewrite(url)
}

export const config = {
  // Everything except Next.js internals and files with an extension (public assets, sitemap.xml).
  matcher: ['/((?!_next|.*\\..*).*)'],
}
