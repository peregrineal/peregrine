import Link from 'next/link'
import type { ReactNode } from 'react'

import { toParagraphs } from '@/lib/guardrails'
import { getDictionary } from '@/lib/dictionary'
import { isExternalHref, resolveHref, type LinkData } from '@/lib/links'
import { getRequestLocale } from '@/lib/locale'

const variantClass: Record<string, string> = {
  navy: 'btn btn-navy',
  champagne: 'btn btn-sky',
  outline: 'btn btn-outline',
  'outline-light': 'btn btn-outline-light',
  white: 'btn btn-white',
  text: 'textlink',
}

type CMSLinkProps = {
  link?: LinkData | null
  /** Override the stored variant, e.g. to swap navy for white on dark sections. */
  variant?: string
  className?: string
  children?: ReactNode
  arrow?: boolean
}

export function CMSLink({ link, variant, className, children, arrow = true }: CMSLinkProps) {
  const href = resolveHref(link, getRequestLocale())
  if (!href || !(children || link?.label)) return null
  const v = variant ?? link?.variant ?? 'navy'
  const cls = [variantClass[v] ?? variantClass.navy, className].filter(Boolean).join(' ')
  const isDown = href.startsWith('#')
  const content = (
    <>
      {children ?? link?.label}
      {arrow && !link?.hideArrow && (
        <span className="arr" aria-hidden="true">
          {isDown ? '↓' : '→'}
        </span>
      )}
    </>
  )
  if (isExternalHref(href)) {
    return (
      <a href={href} className={cls} target="_blank" rel="noopener">
        {content}
      </a>
    )
  }
  return (
    <Link href={href} className={cls}>
      {content}
    </Link>
  )
}

type ButtonRowProps = {
  buttons?: (LinkData & { id?: string | null })[] | null
  dark?: boolean
  className?: string
}

/** Up to two buttons. On dark sections navy buttons turn white (the stored "champagne" variant) and outlines go light. */
export function ButtonRow({ buttons, dark, className }: ButtonRowProps) {
  if (!buttons?.length) return null
  return (
    <div className={['flex flex-wrap gap-3.5', className].filter(Boolean).join(' ')}>
      {buttons.map((b, i) => {
        let variant = b.variant ?? 'navy'
        if (dark && variant === 'navy') variant = 'champagne'
        if (dark && variant === 'outline') variant = 'outline-light'
        return <CMSLink key={b.id ?? i} link={b} variant={variant} />
      })}
    </div>
  )
}

export function Paragraphs({ text, className, pClassName }: { text?: string | null; className?: string; pClassName?: string }) {
  const paras = toParagraphs(text)
  if (!paras.length) return null
  return (
    <div className={['flex flex-col gap-3.5', className].filter(Boolean).join(' ')}>
      {paras.map((p, i) => (
        <p key={i} className={pClassName}>
          {p}
        </p>
      ))}
    </div>
  )
}

export function PendingTag({ settings, className }: { settings?: SectionSettings | null; className?: string }) {
  if (!settings?.pendingApproval) return null
  const t = getDictionary(getRequestLocale()).sections
  // The tag text is not translated in the admin: the stock wording follows the page language.
  const label = !settings.pendingLabel || settings.pendingLabel === getDictionary('en').sections.pending ? t.pending : settings.pendingLabel
  return <span className={['tag self-start', className].filter(Boolean).join(' ')}>{label}</span>
}

export type SectionSettings = {
  anchorId?: string | null
  background?: string | null
  hidden?: boolean | null
  pendingApproval?: boolean | null
  pendingLabel?: string | null
}

const bgClass: Record<string, string> = {
  white: 'bg-white',
  ivory: 'bg-mist',
  tint: 'bg-tint',
  navy: 'bg-navy text-white on-dark',
}

type SectionProps = {
  settings?: SectionSettings | null
  labelledBy?: string
  className?: string
  children: ReactNode
  /** Skip the default vertical padding (for heroes and full-bleed bands). */
  bare?: boolean
}

export function Section({ settings, labelledBy, className, children, bare }: SectionProps) {
  const bg = bgClass[settings?.background ?? 'white'] ?? bgClass.white
  return (
    <section
      id={settings?.anchorId || undefined}
      aria-labelledby={labelledBy}
      className={[bg, bare ? '' : 'section', className].filter(Boolean).join(' ')}
    >
      {children}
    </section>
  )
}

type HeaderProps = {
  id: string
  eyebrow?: string | null
  heading?: string | null
  headingAccent?: string | null
  intro?: string | null
  align?: 'center' | 'left'
  as?: 'h1' | 'h2'
  size?: string
  children?: ReactNode
  settings?: SectionSettings | null
}

/** Eyebrow, heading with optional light blue accent, intro paragraphs. */
export function SectionHeader({ id, eyebrow, heading, headingAccent, intro, align = 'center', as = 'h2', size, children, settings }: HeaderProps) {
  const H = as
  const center = align === 'center'
  if (!eyebrow && !heading && !intro) return null
  return (
    <div className={['flex flex-col gap-3', center ? 'items-center text-center' : 'items-start'].join(' ')}>
      {eyebrow && <p className={`eyebrow ${center ? 'rule-both' : 'rule'}`}>{eyebrow}</p>}
      {heading && (
        <H id={id} className="h2" style={size ? { fontSize: size } : undefined}>
          {heading}
          {headingAccent && (
            <>
              {' '}
              <span className="accent">{headingAccent}</span>
            </>
          )}
        </H>
      )}
      {intro && <Paragraphs text={intro} className={center ? 'max-w-[900px] items-center' : 'max-w-[760px]'} pClassName="muted lead" />}
      <PendingTag settings={settings} />
      {children}
    </div>
  )
}
