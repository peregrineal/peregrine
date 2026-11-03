'use client'

import { ChevronDown, Menu, X } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useId, useRef, useState } from 'react'

import { getDictionary } from '@/lib/dictionary'
import { LOCALES, localizePath, splitLocale, type Locale } from '@/lib/i18n'

export type NavItem = { label: string; href: string; children?: { label: string; href: string }[] }

const isCurrentPath = (pathname: string, href: string) => {
  const path = href.split(/[?#]/)[0] || '/'
  return path === '/' ? pathname === '/' : pathname === path
}

function NavDropdown({ item, pathname }: { item: NavItem; pathname: string }) {
  const [open, setOpen] = useState(false)
  const panelId = useId()
  const children = item.children ?? []
  const active = children.some((c) => !c.href.includes('#') && isCurrentPath(pathname, c.href))

  return (
    <div
      className="relative"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
      onKeyDown={(e) => e.key === 'Escape' && setOpen(false)}
      onBlur={(e) => !e.currentTarget.contains(e.relatedTarget) && setOpen(false)}
    >
      <button
        type="button"
        className="navlink inline-flex cursor-pointer items-center gap-1"
        data-active={active || undefined}
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => setOpen((o) => !o)}
      >
        {item.label}
        <ChevronDown size={15} aria-hidden="true" className={`transition-transform ${open ? 'rotate-180' : ''}`} />
      </button>
      {/* pt-2 bridges the gap so the pointer can travel into the panel without closing it. */}
      <div id={panelId} hidden={!open} className="absolute top-full left-1/2 z-40 -translate-x-1/2 pt-2">
        <ul className="min-w-[250px] border border-navy/10 bg-white py-2 shadow-[0_20px_40px_rgba(6,16,34,.12)]">
          {children.map((c) => (
            <li key={c.href + c.label}>
              <Link
                href={c.href}
                className="navdrop"
                onClick={() => setOpen(false)}
                aria-current={isCurrentPath(pathname, c.href) && !c.href.includes('#') ? 'page' : undefined}
              >
                {c.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

/** A nav group in the mobile menu: open from the start so every option is visible, and it can be folded away. */
function MobileGroup({ item, isCurrent, onNavigate }: { item: NavItem; isCurrent: (href: string) => boolean; onNavigate: () => void }) {
  const [open, setOpen] = useState(true)
  const panelId = useId()
  const children = item.children ?? []
  const active = children.some((c) => !c.href.includes('#') && isCurrent(c.href))

  return (
    <div className="border-b border-navy/12">
      <button
        type="button"
        className="moblink w-full cursor-pointer justify-between !border-b-0 text-left"
        data-active={active || undefined}
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => setOpen((o) => !o)}
      >
        {item.label}
        <ChevronDown size={22} aria-hidden="true" className={`flex-none transition-transform ${open ? 'rotate-180' : ''}`} />
      </button>
      <div id={panelId} hidden={!open} className="pb-3">
        {children.map((c) => (
          <Link
            key={c.href + c.label}
            className="moblink !min-h-12 !border-b-0 pl-4 !text-[16px] !font-medium"
            href={c.href}
            onClick={onNavigate}
            aria-current={isCurrent(c.href) && !c.href.includes('#') ? 'page' : undefined}
          >
            {c.label}
          </Link>
        ))}
      </div>
    </div>
  )
}

/** Link to the same page in the other language. Slugs are shared, so only the prefix changes. */
function LanguageSwitch({ locale, pathname, className }: { locale: Locale; pathname: string; className?: string }) {
  const t = getDictionary(locale).header
  const other = LOCALES.find((l) => l !== locale) ?? locale
  const href = localizePath(splitLocale(pathname).path, other)
  return (
    <Link href={href} hrefLang={other} lang={other} aria-label={t.switchLabel} className={['langlink', className].filter(Boolean).join(' ')}>
      {t.switchTo}
    </Link>
  )
}

export function HeaderNav({ nav, cta, locale }: { nav: NavItem[]; cta: NavItem; locale: Locale }) {
  const t = getDictionary(locale).header
  const pathname = usePathname()
  // The menu belongs to the page it was opened on, so navigating closes it.
  const [openOn, setOpenOn] = useState<string | null>(null)
  const open = openOn === pathname
  const setOpen = (value: boolean | ((o: boolean) => boolean)) =>
    setOpenOn((typeof value === 'function' ? value(open) : value) ? pathname : null)

  const menuRef = useRef<HTMLElement>(null)
  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpenOn(null)
    // The menu covers the screen, so the page behind it should not scroll. Not with overflow:
    // hidden on the page: mobile browsers then let go of the sticky header, and a menu opened
    // further down the page ended up off screen. Instead, scrolling outside the menu is ignored.
    const outside = (e: Event) => {
      if (!menuRef.current?.contains(e.target as Node)) e.preventDefault()
    }
    window.addEventListener('keydown', onKey)
    document.addEventListener('wheel', outside, { passive: false })
    document.addEventListener('touchmove', outside, { passive: false })
    return () => {
      window.removeEventListener('keydown', onKey)
      document.removeEventListener('wheel', outside)
      document.removeEventListener('touchmove', outside)
    }
  }, [open])

  const isCurrent = (href: string) => isCurrentPath(pathname, href)

  return (
    <>
      <nav aria-label={t.mainNav} className="hidden items-center gap-3.5 lg:flex min-[1320px]:gap-5">
        {nav.map((n) =>
          n.children?.length ? (
            <NavDropdown key={n.label} item={n} pathname={pathname} />
          ) : (
            <Link key={n.href + n.label} className="navlink" href={n.href} aria-current={isCurrent(n.href) && !n.href.includes('#') ? 'page' : undefined}>
              {n.label}
            </Link>
          ),
        )}
      </nav>
      <div className="flex items-center gap-3">
        <LanguageSwitch locale={locale} pathname={pathname} />
        <Link href={cta.href} className="btn btn-navy hidden !min-h-[46px] !px-5 !text-[13px] whitespace-nowrap min-[1180px]:inline-flex">
          {cta.label}
        </Link>
        <button
          type="button"
          className="btn btn-outline !px-3.5 lg:hidden"
          aria-expanded={open}
          aria-controls="menu-mob"
          aria-label={open ? t.closeMenu : t.openMenu}
          onClick={() => setOpen((o) => !o)}
        >
          {open ? <X size={22} aria-hidden="true" /> : <Menu size={22} aria-hidden="true" />}
        </button>
      </div>
      {/* Always rendered so it can slide in and out; closed, it is hidden and inert. Fixed under the
          header (80px plus its 1px border), so the logo and close button stay visible wherever the page is. */}
      <nav
        ref={menuRef}
        id="menu-mob"
        aria-label={t.menu}
        data-open={open || undefined}
        inert={!open}
        className="mobmenu fixed inset-x-0 top-[81px] bottom-0 overflow-y-auto overscroll-contain bg-white lg:hidden"
      >
          <div className="wrap flex min-h-full flex-col pt-2 pb-8">
            {nav.map((n) =>
              n.children?.length ? (
                <MobileGroup key={n.label} item={n} isCurrent={isCurrent} onNavigate={() => setOpen(false)} />
              ) : (
                <Link key={n.href + n.label} className="moblink" href={n.href} onClick={() => setOpen(false)} aria-current={isCurrent(n.href) && !n.href.includes('#') ? 'page' : undefined}>
                  {n.label}
                </Link>
              ),
            )}
            <div className="mt-auto flex flex-col pt-8">
              <Link href={cta.href} className="btn btn-navy" onClick={() => setOpen(false)}>
                {cta.label}
              </Link>
            </div>
          </div>
      </nav>
    </>
  )
}
