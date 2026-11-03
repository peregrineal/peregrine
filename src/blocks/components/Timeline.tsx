import { ButtonRow, Paragraphs, Section, SectionHeader } from '@/components/ui'
import { getDictionary } from '@/lib/dictionary'
import { toParagraphs } from '@/lib/guardrails'
import { getRequestLocale } from '@/lib/locale'

import type { BlockProps } from '../types'
import { TimelineSteps } from './TimelineSteps'

export function Timeline({ block, index }: BlockProps<'timeline'>) {
  const id = `timeline-${index}`
  const stages = block.stages ?? []
  // Both layouts show the six stages side by side; stages with full text open it below the row.
  const cards = block.layout === 'row'
  const expandable = !cards && stages.some((s) => s.body)
  const t = getDictionary(getRequestLocale()).sections

  return (
    <Section settings={block.settings} labelledBy={id}>
      <div className="wrap flex flex-col gap-8">
        <SectionHeader {...block} intro={null} id={id} settings={block.settings}>
          {block.subheading && <p className="serif text-[clamp(17px,1.6vw,20px)] leading-snug font-medium">{block.subheading}</p>}
          <Paragraphs text={block.intro} className="max-w-[960px] items-center" pClassName="muted lead" />
        </SectionHeader>

        <TimelineSteps
          id={id}
          variant={cards ? 'cards' : 'list'}
          stages={stages.map((s) => ({
            key: String(s.id ?? s.kicker ?? s.title),
            icon: s.icon,
            kicker: s.kicker,
            title: s.title ?? '',
            // Without a summary, the stage's first paragraph stands in for it.
            summary: s.summary || toParagraphs(s.body)[0] || null,
            body: expandable ? toParagraphs(s.body) : [],
          }))}
          labels={{ read: t.readStage, close: t.close, stage: t.stage, step: t.step }}
        />

        {Boolean(block.closingHeading || block.closingText || block.buttons?.length || block.footnote) && (
          <div className="flex flex-col items-center gap-3 text-center">
            {block.closingHeading && <p className="serif text-[clamp(21px,2.2vw,28px)] leading-tight">{block.closingHeading}</p>}
            <Paragraphs text={block.closingText} className="max-w-[960px]" pClassName="muted" />
            <ButtonRow buttons={block.buttons} className="justify-center pt-1" />
            {block.footnote && <p className="muted max-w-[960px] pt-1 text-[12.5px]">{block.footnote}</p>}
          </div>
        )}
      </div>
    </Section>
  )
}
