import Image from 'next/image'
import Link from 'next/link'

import { getDictionary } from '@/lib/dictionary'
import { localizePath, type Locale } from '@/lib/i18n'
import { resolveHref, type LinkData } from '@/lib/links'
import type { Header as HeaderData } from '@/payload-types'

import { HeaderNav, type NavItem } from './HeaderNav'

function fallbackNav(locale: Locale): NavItem[] {
  const t = getDictionary(locale).nav
  const to = (label: string, path: string) => ({ label, href: localizePath(path, locale) })
  return [
    to(t.home, '/'),
    {
      label: t.studyAbroad,
      href: '',
      children: [
        to(t.universities, '/universities-and-pathways'),
        to(t.boarding, '/boarding-schools'),
        to(t.camps, '/seasonal-camps'),
      ],
    },
    to(t.visas, '/tourist-visas'),
    to(t.about, '/about-us'),
    to(t.contact, '/book-a-consultation#contact'),
  ]
}

export function Header({ data, locale }: { data: HeaderData | null; locale: Locale }) {
  const t = getDictionary(locale).header
  const toItem = (n: LinkData) => ({ label: n.label ?? '', href: resolveHref(n, locale) ?? '' })
  const items: NavItem[] =
    data?.navItems
      ?.map((n) => ({
        ...toItem(n as LinkData),
        children: n.children?.map((c) => toItem(c as LinkData)).filter((c) => c.label && c.href),
      }))
      .filter((n) => n.label && (n.href || n.children?.length)) ?? []
  const nav = items.length ? items : fallbackNav(locale)
  const ctaHref = resolveHref(data?.cta as LinkData, locale) ?? localizePath('/book-a-consultation', locale)
  const ctaLabel = data?.cta?.label || t.cta

  return (
    <header className="sticky top-0 z-30 border-b border-navy/10 bg-white">
      <a href="#content" className="btn btn-navy skip">
        {t.skip}
      </a>
      <div className="wrap flex min-h-20 items-center justify-between gap-6 !max-w-[1360px]">
        <Link href={localizePath('/', locale)} aria-label={t.home} className="flex min-h-11 flex-none items-center gap-3">
          <Image src="/brand/logo-horizontal-navy.png" alt="" width={1011} height={93} className="h-5 w-auto sm:h-6 lg:h-5 min-[1180px]:h-6" priority />
        </Link>
        <HeaderNav nav={nav} cta={{ label: ctaLabel, href: ctaHref }} locale={locale} />
      </div>
    </header>
  )
}
