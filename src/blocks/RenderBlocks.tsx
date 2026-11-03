import type { ComponentType } from 'react'

import { Booking } from './components/Booking'
import { CardGrid } from './components/CardGrid'
import { Cta } from './components/Cta'
import { Destinations } from './components/Destinations'
import { Faq } from './components/Faq'
import { FeatureGroups } from './components/FeatureGroups'
import { FieldsGrid } from './components/FieldsGrid'
import { Founder } from './components/Founder'
import { Hero } from './components/Hero'
import { Notice } from './components/Notice'
import { PartnerFormSection } from './components/PartnerFormSection'
import { RichTextSection } from './components/RichTextSection'
import { ServiceCards } from './components/ServiceCards'
import { SplitContent } from './components/SplitContent'
import { Timeline } from './components/Timeline'
import type { LayoutBlock } from './types'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const components: Record<LayoutBlock['blockType'], ComponentType<any>> = {
  hero: Hero,
  splitContent: SplitContent,
  serviceCards: ServiceCards,
  cardGrid: CardGrid,
  destinations: Destinations,
  fieldsGrid: FieldsGrid,
  timeline: Timeline,
  faq: Faq,
  cta: Cta,
  founder: Founder,
  featureGroups: FeatureGroups,
  notice: Notice,
  richText: RichTextSection,
  booking: Booking,
  partnerForm: PartnerFormSection,
}

// Sections that can carry a neighbouring notice instead of it taking a screen of its own.
const holdsNotice = new Set<LayoutBlock['blockType']>(['faq'])

/** Index of the section a notice folds into: the next one if it can hold it, else the previous one. */
const hostOf = (blocks: LayoutBlock[], i: number) =>
  [i + 1, i - 1].find((j) => blocks[j] && holdsNotice.has(blocks[j].blockType))

export function RenderBlocks({ blocks }: { blocks?: LayoutBlock[] | null }) {
  const visible = (blocks ?? []).filter((b) => !(b as { settings?: { hidden?: boolean | null } }).settings?.hidden)
  const notices = new Map<number, LayoutBlock>()
  visible.forEach((b, i) => {
    if (b.blockType !== 'notice') return
    const host = hostOf(visible, i)
    if (host !== undefined && !notices.has(host)) notices.set(host, b)
  })
  const folded = new Set(notices.values())
  return (
    <>
      {visible.map((block, index) => {
        if (folded.has(block)) return null
        const Cmp = components[block.blockType]
        if (!Cmp) return null
        return <Cmp key={block.id ?? index} block={block} index={index} isFirst={index === 0} notice={notices.get(index)} />
      })}
    </>
  )
}
