import { Icon } from '@/components/Icon'
import { CMSLink, Section, SectionHeader } from '@/components/ui'

import type { BlockProps } from '../types'

// All cards in one row on desktop (up to five), so the whole section fits on one screen.
const lgCols: Record<number, string> = { 1: 'lg:grid-cols-1', 2: 'lg:grid-cols-2', 3: 'lg:grid-cols-3', 4: 'lg:grid-cols-4', 5: 'lg:grid-cols-5' }

export function ServiceCards({ block, index }: BlockProps<'serviceCards'>) {
  const id = `services-${index}`
  const cards = block.cards ?? []
  return (
    <Section settings={block.settings} labelledBy={id}>
      <div className="wrap flex flex-col gap-9">
        <SectionHeader {...block} id={id} settings={block.settings} align="left" />
        <ul className={`grid gap-4 sm:grid-cols-2 md:grid-cols-3 ${lgCols[Math.min(cards.length, 5)] ?? 'lg:grid-cols-5'}`}>
          {cards.map((c, i) => (
            <li key={c.id ?? i} className="card !items-start !gap-3 !px-4 !py-6 text-left transition-shadow hover:shadow-[0_14px_40px_rgba(6,16,34,.08)]">
              <span className="steps-ico">
                <Icon name={c.icon} size={26} />
              </span>
              <h3 className="serif text-[19px] leading-tight">{c.title}</h3>
              {c.text && <p className="muted text-[12.5px] leading-normal">{c.text}</p>}
              {c.link && (
                <div className="mt-auto">
                  <CMSLink link={c.link} variant="text" className="!min-h-9 !gap-1.5 !text-[12.5px] whitespace-nowrap">
                    {c.link.label}
                    {/* Every card says "Learn more": screen readers also hear which service. */}
                    <span className="sr-only">: {c.title}</span>
                  </CMSLink>
                </div>
              )}
            </li>
          ))}
        </ul>
      </div>
    </Section>
  )
}
