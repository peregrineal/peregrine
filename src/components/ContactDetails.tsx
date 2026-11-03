import type { SiteSetting } from '@/payload-types'
import { getDictionary } from '@/lib/dictionary'
import { mapsHref, telHref, whatsappHref } from '@/lib/links'
import { getRequestLocale } from '@/lib/locale'

import { siteDefaults } from './siteDefaults'

export function ContactDetails({ settings, heading }: { settings: SiteSetting | null; heading?: string | null }) {
  const t = getDictionary(getRequestLocale()).contact
  const s = { ...siteDefaults, openingHours: t.openingHours, hoursNote: t.hoursNote, ...(settings ?? {}) }
  const wa = whatsappHref(s.whatsappNumber)
  return (
    <section id="contact" aria-labelledby="contact-t" className="flex flex-col">
      <h2 id="contact-t" className="border-b border-navy/14 pb-3 text-[13px] font-semibold tracking-[0.16em] uppercase text-sky-deep">
        {heading || t.heading}
      </h2>
      <div className="crow">
        <p className="font-semibold">{t.phone}</p>
        <div className="flex flex-col gap-1">
          <a href={telHref(s.phone)}>{s.phone}</a>
          {wa && (
            <a href={wa} target="_blank" rel="noopener" className="font-semibold text-sky-deep">
              {t.whatsapp}
            </a>
          )}
        </div>
      </div>
      <div className="crow">
        <p className="font-semibold">{t.email}</p>
        <a href={`mailto:${s.email}`}>{s.email}</a>
      </div>
      {s.address && (
        <div className="crow">
          <p className="font-semibold">{t.office}</p>
          <div className="flex flex-col gap-2">
            {s.addressConfirmed ? (
              <a className="whitespace-pre-line" href={mapsHref(s.address)} target="_blank" rel="noopener">
                {s.address}
              </a>
            ) : (
              <p className="whitespace-pre-line">{s.address}</p>
            )}
            {!s.addressConfirmed && <span className="tag self-start">{t.addressTbc}</span>}
          </div>
        </div>
      )}
      {(s.openingHours || s.hoursNote) && (
        <div className="crow">
          <p className="font-semibold">{t.hours}</p>
          <p>
            {s.openingHours}
            {s.hoursNote && (
              <>
                <br />
                {s.hoursNote}
              </>
            )}
          </p>
        </div>
      )}
    </section>
  )
}
