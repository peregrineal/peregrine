import { RichText } from '@payloadcms/richtext-lexical/react'

import { PendingTag, Section } from '@/components/ui'

import type { BlockProps } from '../types'

export function RichTextSection({ block, index, isFirst }: BlockProps<'richText'>) {
  const id = `text-${index}`
  const Heading = isFirst ? 'h1' : 'h2'
  return (
    <Section settings={block.settings} labelledBy={block.heading ? id : undefined}>
      <div className={`wrap flex flex-col gap-6 ${block.width === 'wide' ? '' : 'max-w-[820px]'}`}>
        {block.eyebrow && <p className="eyebrow rule self-start">{block.eyebrow}</p>}
        {block.heading && (
          <Heading id={id} className="h2">
            {block.heading}
          </Heading>
        )}
        <PendingTag settings={block.settings} />
        <RichText data={block.content} className="prose-p muted" />
      </div>
    </Section>
  )
}
