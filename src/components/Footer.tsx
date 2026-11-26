import Image from 'next/image'
import Link from 'next/link'

import { pathForSlug, PRIVACY_SLUG } from '@/lib/constants'
import { getDictionary } from '@/lib/dictionary'
import { localizePath, type Locale } from '@/lib/i18n'
import { mapsHref, resolveHref, telHref, type LinkData } from '@/lib/links'
import type { Footer as FooterData, SiteSetting } from '@/payload-types'

import { AgencyCredit } from './AgencyCredit'
import { siteDefaults } from './siteDefaults'

type Col = { title: string; links: { label: string; href: string }[] }

function fallbackColumns(locale: Locale): Col[] {
  const { nav, footer } = getDictionary(locale)
  const to = (label: string, path: string) => ({ label, href: localizePath(path, locale) })
  return [
    {
      title: footer.services,
      links: [
        to(nav.universities, '/universities-and-pathways'),
        to(nav.boarding, '/boarding-schools'),
        to(nav.camps, '/seasonal-camps'),
        to(nav.touristVisas, '/tourist-visas'),
      ],
    },
    {
      title: footer.company,
      links: [
        to(nav.about, '/about-us'),
        to(nav.partner, '/partner-with-us'),
        to(nav.book, '/book-a-consultation'),
        to(nav.contact, '/book-a-consultation#contact'),
      ],
    },
  ]
}

const socialLabel: Record<string, string> = {
  instagram: 'Instagram',
  facebook: 'Facebook',
  linkedin: 'LinkedIn',
  youtube: 'YouTube',
  tiktok: 'TikTok',
}

export function Footer({ data, settings, locale }: { data: FooterData | null; settings: SiteSetting | null; locale: Locale }) {
  const t = getDictionary(locale)
  const s = { ...siteDefaults, openingHours: t.contact.openingHours, hoursNote: t.contact.hoursNote, ...(settings ?? {}) }
  const cols: Col[] =
    data?.columns?.map((c) => ({
      title: c.title,
      links: (c.links ?? []).map((l) => ({ label: l.label ?? '', href: resolveHref(l as LinkData, locale) ?? '' })).filter((l) => l.label && l.href),
    })) ?? fallbackColumns(locale)
  const socials = (settings?.socialLinks ?? []).filter((l) => l.url)
  const year = new Date().getFullYear()

  // Footer links do not prefetch: section scrolling brings the footer into view on every page, which
  // fetched every linked page in the background on each visit. The header links still prefetch.
  return (
    <footer className="on-dark bg-navy text-white">
      <div className="wrap grid gap-10 pt-[72px] pb-12 [grid-template-columns:repeat(auto-fit,minmax(min(200px,100%),1fr))]">
        <div className="flex flex-col gap-4">
          <Link href={localizePath('/', locale)} prefetch={false} aria-label={t.header.home} className="flink inline-flex min-h-11">
            <Image src="/brand/logo-stacked-white.png" alt="" width={940} height={433} className="h-auto w-[190px]" />
          </Link>
          <p className="text-[13px] text-white/78">{data?.tagline || t.footer.tagline}</p>
        </div>
        {cols.map((c) => (
          <nav key={c.title} aria-label={c.title} className="flex flex-col items-start text-[14px]">
            <p className="eyebrow mb-1.5">{c.title}</p>
            {c.links.map((l) => (
              <Link key={l.href + l.label} className="flink flink-tap" href={l.href} prefetch={false}>
                {l.label}
              </Link>
            ))}
          </nav>
        ))}
        <div className="flex flex-col items-start text-[14px]">
          <p className="eyebrow mb-1.5">{data?.contactTitle || t.footer.contact}</p>
          <a className="flink flink-tap" href={telHref(s.phone)}>
            {s.phone}
          </a>
          <a className="flink flink-tap" href={`mailto:${s.email}`}>
            {s.email}
          </a>
          {s.website && (
            <a className="flink flink-tap" href={`https://${String(s.website).replace(/^https?:\/\//, '')}`}>
              {s.website}
            </a>
          )}
          {s.address &&
            (s.addressConfirmed ? (
              <a className="flink flink-tap whitespace-pre-line text-white/85" href={mapsHref(s.address)} target="_blank" rel="noopener">
                {s.address}
              </a>
            ) : (
              <p className="whitespace-pre-line py-2.5 text-white/85">{s.address}</p>
            ))}
          {!s.addressConfirmed && <span className="tag tag-dark self-start">{t.footer.addressTbc}</span>}
          {s.openingHours && (
            <p className="py-2.5 text-white/85">
              {s.openingHours}
              {s.hoursNote ? ` (${String(s.hoursNote).toLowerCase()})` : ''}
            </p>
          )}
        </div>
      </div>
      <div className="wrap foot-bottom flex flex-wrap items-center justify-between gap-x-6 gap-y-1 border-t border-white/16 pt-6 text-[13px] text-white/75">
        <p className="flex flex-wrap items-center gap-x-5">
          <span>© {year} PEREGRINE</span>
          {/* Fixed here rather than in the editable columns: the consent wording links to it. */}
          <Link className="flink flink-tap" href={pathForSlug(PRIVACY_SLUG, locale)} prefetch={false}>
            {t.footer.privacy}
          </Link>
        </p>
        {socials.length ? (
          <ul className="flex flex-wrap gap-x-6">
            {socials.map((l) => (
              <li key={l.id ?? l.platform}>
                <a className="flink flink-tap" href={l.url} target="_blank" rel="noopener">
                  {socialLabel[l.platform] ?? l.platform}
                </a>
              </li>
            ))}
          </ul>
        ) : (
          data?.bottomNote && <p>{data.bottomNote}</p>
        )}
        <AgencyCredit label={t.footer.developedBy} />
      </div>
    </footer>
  )
}
