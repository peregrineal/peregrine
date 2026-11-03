import { Icon } from '@/components/Icon'
import { frameRatio, Media } from '@/components/Media'
import { ButtonRow, Paragraphs, PendingTag, Section } from '@/components/ui'

import type { BlockProps } from '../types'

export function SplitContent({ block, index }: BlockProps<'splitContent'>) {
  const id = `split-${index}`
  const imageLeft = block.imageSide === 'left'
  // "No image": one wide text column (e.g. Our Story on About Us).
  const textOnly = block.imageSide === 'none'
  // Real photos keep (close to) their own shape; the placeholder keeps the fixed height.
  const ratio = frameRatio(block.image)
  return (
    <Section settings={block.settings} labelledBy={id}>
      <div className={`wrap grid items-center gap-[clamp(40px,6vw,80px)] ${textOnly ? '' : '[grid-template-columns:repeat(auto-fit,minmax(min(440px,100%),1fr))]'}`}>
        <div className={`flex flex-col gap-4 ${textOnly ? 'max-w-[1000px]' : 'max-w-[600px]'} ${imageLeft ? 'lg:order-2' : ''}`}>
          {block.eyebrow && <p className="eyebrow rule self-start">{block.eyebrow}</p>}
          <h2 id={id} className="serif" style={{ fontSize: 'clamp(28px, 3vw, 42px)', lineHeight: 1.08, textWrap: 'balance' }}>
            {block.heading}
            {block.headingAccent && (
              <>
                <br />
                <span className="accent">{block.headingAccent}</span>
              </>
            )}
          </h2>
          {block.lead && (
            <p className="serif text-[19px] leading-snug font-medium text-focus">{block.lead}</p>
          )}
          <Paragraphs text={block.intro} pClassName="muted lead" />
          <Paragraphs text={block.body} pClassName="muted" />
          {block.aside && (
            <p className="serif border-l-2 border-sky pl-5 text-[17px] leading-normal font-medium italic">{block.aside}</p>
          )}
          {!!block.highlights?.length && (
            <ul className="flex flex-wrap gap-x-7 gap-y-5 border-t border-navy/15 pt-[22px]">
              {block.highlights.map((h) => (
                <li key={h.id} className="flex items-center gap-3 text-[14px] font-semibold">
                  <span className="text-sky-deep">
                    <Icon name={h.icon} size={26} />
                  </span>
                  {h.label}
                </li>
              ))}
            </ul>
          )}
          <PendingTag settings={block.settings} />
          <ButtonRow buttons={block.buttons} className="pt-1.5" />
        </div>
        {!textOnly && (
        <div
          className={`fit-media relative mx-auto w-full overflow-hidden rounded-[10px] ${ratio ? 'max-w-[520px]' : 'h-[clamp(320px,36vw,480px)]'} ${imageLeft ? 'lg:order-1' : ''}`}
          style={ratio ? { aspectRatio: ratio } : undefined}
        >
          <Media media={block.image} brief={block.imageBrief} sizes="(max-width: 900px) 100vw, 560px" tone="#1B3558" cropBottom />
        </div>
        )}
      </div>
    </Section>
  )
}
