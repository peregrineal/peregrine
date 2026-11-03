import { Suspense } from 'react'

import { ContactDetails } from '@/components/ContactDetails'
import { BookingForm } from '@/components/forms/BookingForm'
import { siteDefaults } from '@/components/siteDefaults'
import { Paragraphs, PendingTag } from '@/components/ui'
import { pathForSlug, PRIVACY_SLUG } from '@/lib/constants'
import { getDestinations, getServices, getSiteSettings } from '@/lib/data'
import { getDictionary } from '@/lib/dictionary'
import { getRequestLocale } from '@/lib/locale'

import type { BlockProps } from '../types'

export async function Booking({ block, isFirst }: BlockProps<'booking'>) {
  const locale = getRequestLocale()
  const t = getDictionary(locale).forms
  const [services, university, boarding, camps, settings] = await Promise.all([
    getServices(locale),
    getDestinations(locale, 'university'),
    getDestinations(locale, 'boarding'),
    getDestinations(locale, 'camps'),
    getSiteSettings(locale),
  ])
  const Heading = isFirst ? 'h1' : 'h2'
  const names = (list: { name: string }[]) => list.map((d) => d.name)

  const bg = block.settings?.background === 'white' ? 'bg-white' : block.settings?.background === 'ivory' ? 'bg-mist' : 'bg-tint'

  return (
    <div id={block.settings?.anchorId || undefined} className={`${bg} pt-[clamp(48px,7vw,96px)] pb-[clamp(72px,9vw,120px)]`}>
      <div className="wrap grid items-start gap-[clamp(40px,6vw,80px)] [grid-template-columns:repeat(auto-fit,minmax(min(380px,100%),1fr))]">
        <div className="flex flex-col gap-10">
          <div className="flex flex-col gap-5">
            {block.eyebrow && <p className="eyebrow rule rise self-start">{block.eyebrow}</p>}
            <Heading className="serif rise d1" style={{ fontSize: 'clamp(39px, 5.08vw, 68px)', lineHeight: 1.04, fontWeight: 700 }}>
              {block.heading}
              {block.headingAccent && (
                <>
                  {' '}
                  <span className="accent">{block.headingAccent}</span>
                </>
              )}
            </Heading>
            <Paragraphs text={block.intro} className="rise d2 max-w-[480px]" pClassName="muted text-[17px]" />
            {block.note && <p className="rise d2 text-[14px] font-semibold">{block.note}</p>}
            <PendingTag settings={block.settings} />
          </div>
          <div className="rise d3">
            <ContactDetails settings={settings} heading={block.contactHeading} />
          </div>
        </div>

        <section id="booking" aria-labelledby="form-t" className="rounded-[10px] border border-navy/10 bg-white p-[clamp(22px,4vw,44px)] shadow-[0_20px_50px_rgba(6,16,34,.06)]">
          <h2 id="form-t" className="serif mb-2 text-[clamp(26px,2.82vw,36px)] leading-[1.15]">
            {block.formHeading || t.booking.heading}
          </h2>
          <span aria-hidden="true" className="card-rule mb-6 block" />
          <Suspense fallback={<p className="muted">{t.loading}</p>}>
            <BookingForm
              services={services.map((s) => ({ key: s.key, name: s.name }))}
              countries={{ university: names(university), boarding: names(boarding), camps: names(camps) }}
              locale={locale}
              formNote={block.formNote}
              consentText={block.consentText}
              successMessage={block.successMessage}
              privacyHref={pathForSlug(PRIVACY_SLUG, locale)}
              phone={settings?.phone ?? siteDefaults.phone}
            />
          </Suspense>
        </section>
      </div>
    </div>
  )
}
