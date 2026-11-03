import { CircleCheck } from 'lucide-react'

import { Icon } from '@/components/Icon'
import { Paragraphs, Section, SectionHeader } from '@/components/ui'

import type { BlockProps } from '../types'

// The groups sit side by side, up to four in a row, each as a box with a checklist.
const lgCols: Record<number, string> = { 1: 'lg:grid-cols-1', 2: 'lg:grid-cols-2', 3: 'lg:grid-cols-3', 4: 'lg:grid-cols-4' }

export function FeatureGroups({ block, index }: BlockProps<'featureGroups'>) {
  const id = `groups-${index}`
  const groups = block.groups ?? []
  return (
    <Section settings={block.settings} labelledBy={id}>
      <div className="wrap flex flex-col gap-8">
        <SectionHeader {...block} intro={null} id={id} settings={block.settings}>
          {block.subheading && <p className="serif text-[clamp(17px,1.6vw,20px)] leading-snug font-medium">{block.subheading}</p>}
          <Paragraphs text={block.intro} className="max-w-[1000px] items-center" pClassName="muted" />
        </SectionHeader>
        <div className={`grid gap-4 md:grid-cols-2 ${lgCols[Math.min(groups.length, 4)] ?? 'lg:grid-cols-4'}`}>
          {groups.map((g, gi) => (
            <article key={g.id ?? gi} className="card !gap-3.5 !p-6">
              <header className="flex flex-col gap-3">
                <div className="flex items-center gap-3 text-sky-deep">
                  {block.numbered !== false && <span className="text-[13px] font-semibold tabular-nums">{String(gi + 1).padStart(2, '0')}</span>}
                  {block.numbered !== false && g.icon && <span aria-hidden="true" className="h-5 border-l border-sky" />}
                  {g.icon && <Icon name={g.icon} size={24} />}
                </div>
                <h3 className="serif text-[19px] leading-snug">{g.title}</h3>
              </header>
              {g.intro && <p className="muted text-[13.5px]">{g.intro}</p>}
              {!!g.items?.length && (
                <ul className="flex flex-col gap-2.5">
                  {g.items.map((item, ii) => (
                    <li key={item.id ?? ii} className="flex gap-2.5 text-[13.5px] leading-snug">
                      <CircleCheck size={17} aria-hidden="true" className="mt-px flex-none text-sky-deep" />
                      <span className="flex flex-col gap-1">
                        <span className={item.text ? 'font-semibold' : ''}>{item.title}</span>
                        <Paragraphs text={item.text} className="!gap-1.5" pClassName="muted text-[13px]" />
                      </span>
                    </li>
                  ))}
                </ul>
              )}
            </article>
          ))}
        </div>
        {(block.closingHeading || block.closingText) && (
          <div className="mx-auto flex max-w-[920px] flex-col items-center gap-3 text-center">
            {block.closingHeading && <p className="serif text-[clamp(21px,2.2vw,28px)] leading-tight">{block.closingHeading}</p>}
            <Paragraphs text={block.closingText} pClassName="muted" />
          </div>
        )}
        {block.footnote && <p className="muted mx-auto max-w-[920px] text-center text-[12.5px]">{block.footnote}</p>}
      </div>
    </Section>
  )
}
