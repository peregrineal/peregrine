import { PartnerForm } from '@/components/forms/PartnerForm'
import { siteDefaults } from '@/components/siteDefaults'
import { Paragraphs, PendingTag, Section } from '@/components/ui'
import { pathForSlug, PRIVACY_SLUG } from '@/lib/constants'
import { getSiteSettings } from '@/lib/data'
import { getDictionary } from '@/lib/dictionary'
import { getRequestLocale } from '@/lib/locale'

import type { BlockProps } from '../types'

export async function PartnerFormSection({ block, index }: BlockProps<'partnerForm'>) {
  const id = `partner-${index}`
  const locale = getRequestLocale()
  const fallbackHeading = getDictionary(locale).forms.partner.heading
  const settings = await getSiteSettings(locale)
  return (
    <Section settings={block.settings} labelledBy={id}>
      <div className="wrap grid items-start gap-[clamp(40px,6vw,80px)] [grid-template-columns:repeat(auto-fit,minmax(min(380px,100%),1fr))]">
        <div className="flex flex-col gap-5 lg:sticky lg:top-28">
          {block.eyebrow && <p className="eyebrow rule self-start">{block.eyebrow}</p>}
          <h2 id={id} className="h2">
            {block.heading}
            {block.headingAccent && (
              <>
                {' '}
                <span className="accent">{block.headingAccent}</span>
              </>
            )}
          </h2>
          <Paragraphs text={block.intro} className="max-w-[520px]" pClassName="muted lead" />
          <PendingTag settings={block.settings} />
        </div>
        <section aria-labelledby="partner-form-t" className="rounded-[10px] border border-navy/10 bg-white p-[clamp(22px,4vw,44px)] shadow-[0_20px_50px_rgba(6,16,34,.06)]">
          <h3 id="partner-form-t" className="serif mb-2 text-[clamp(24px,2.63vw,32px)] leading-[1.15]">
            {block.formHeading || fallbackHeading}
          </h3>
          <span aria-hidden="true" className="card-rule mb-6 block" />
          <PartnerForm
            formHeading={block.formHeading || fallbackHeading}
            locale={locale}
            organisationTypes={(block.organisationTypes ?? []).map((t) => t.label)}
            consentText={block.consentText}
            successMessage={block.successMessage}
            email={settings?.email ?? siteDefaults.email}
            privacyHref={pathForSlug(PRIVACY_SLUG, locale)}
          />
        </section>
      </div>
    </Section>
  )
}
