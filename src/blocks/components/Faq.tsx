import { RichText } from '@payloadcms/richtext-lexical/react'
import Link from 'next/link'

import { Paragraphs, PendingTag, Section } from '@/components/ui'
import { getFaqs } from '@/lib/data'
import { getDictionary } from '@/lib/dictionary'
import { localizePath } from '@/lib/i18n'
import { getRequestLocale } from '@/lib/locale'

import type { BlockOf, BlockProps } from '../types'
import { Accordion } from './Accordion'
import { Notice, NoticeBox } from './Notice'

// The booking form opens on the service the questions are about.
const serviceFor: Record<string, string> = {
  universities: 'higher-education',
  boarding: 'boarding',
  camps: 'camps',
  visas: 'tourist-visa',
  general: 'general',
}

export async function Faq({ block, index, notice }: BlockProps<'faq'> & { notice?: BlockOf<'notice'> }) {
  const id = `faq-${index}`
  const locale = getRequestLocale()
  const t = getDictionary(locale).sections
  const faqs = await getFaqs(locale, block.category)
  if (!faqs.length) return notice ? <Notice block={notice} index={index} isFirst={false} /> : null
  const service = serviceFor[block.category ?? ''] ?? 'general'
  return (
    <Section settings={block.settings} labelledBy={id}>
      <div className="wrap">
        <div className="faq-box">
          <div className="flex flex-col items-start gap-4 lg:sticky lg:top-28">
            {block.eyebrow && <p className="eyebrow rule-before">{block.eyebrow}</p>}
            {block.heading && (
              <h2 id={id} className="h2">
                {block.heading}
                {block.headingAccent && (
                  <>
                    {' '}
                    <span className="accent">{block.headingAccent}</span>
                  </>
                )}
              </h2>
            )}
            <Paragraphs text={block.intro} pClassName="muted" />
            {notice && <NoticeBox block={notice} />}
            <PendingTag settings={block.settings} />
            <p className="pt-2 text-[14px] font-semibold">{t.moreQuestions}</p>
            <Link href={localizePath(`/book-a-consultation?service=${service}`, locale)} className="btn btn-navy !rounded-full">
              {t.bookConsultation}
              <span className="arr" aria-hidden="true">
                ↗
              </span>
            </Link>
          </div>
          <Accordion
            id={id}
            items={faqs.map((f) => ({
              id: String(f.id),
              question: f.question,
              answer: <RichText data={f.answer} className="prose-p" />,
            }))}
          />
        </div>
      </div>
    </Section>
  )
}
