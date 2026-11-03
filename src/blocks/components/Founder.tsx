import { frameRatio, Media } from '@/components/Media'
import { Paragraphs, PendingTag, Section } from '@/components/ui'

import type { BlockProps } from '../types'

export function Founder({ block, index }: BlockProps<'founder'>) {
  const id = `founder-${index}`
  const ratio = frameRatio(block.image)
  return (
    <Section settings={block.settings} labelledBy={id}>
      <div className="wrap grid items-center gap-[clamp(36px,5vw,72px)] lg:grid-cols-[minmax(0,1.35fr)_minmax(0,1fr)]">
        <div className="flex flex-col gap-4">
          {block.eyebrow && <p className="eyebrow rule self-start">{block.eyebrow}</p>}
          <h2 id={id} className="h2">
            {block.name}
          </h2>
          {block.role && <p className="text-[12px] font-semibold tracking-[0.16em] uppercase text-sky-deep">{block.role}</p>}
          <Paragraphs text={block.body} className="pt-1" pClassName="muted" />
          {block.quote && (
            <figure className="mt-2 flex flex-col gap-3 border-l-2 border-sky pl-5">
              {block.quoteLabel && <p className="eyebrow">{block.quoteLabel}</p>}
              <blockquote className="flex gap-3">
                <span aria-hidden="true" className="font-serif text-[48px] leading-[0.8] text-sky-deep">
                  &ldquo;
                </span>
                <p className="serif text-[clamp(17px,1.5vw,19px)] leading-normal font-medium italic">{block.quote}</p>
              </blockquote>
              {block.signature && (
                <figcaption className="flex items-center gap-3 text-[12px] font-semibold tracking-[0.16em] uppercase text-sky-deep">
                  <span aria-hidden="true" className="w-8 border-t border-sky" />
                  {block.signature}
                </figcaption>
              )}
            </figure>
          )}
          <PendingTag settings={block.settings} />
        </div>
        {/* A smaller portrait, set on a navy panel that steps out behind it */}
        <div className="relative mx-auto w-full max-w-[400px] pr-4 pb-4">
          <div aria-hidden="true" className="absolute top-6 right-0 bottom-0 left-6 rounded-[10px] bg-navy" />
          <div
            className={`fit-media relative w-full overflow-hidden rounded-[10px] ${ratio ? '' : 'h-[clamp(360px,36vw,480px)]'}`}
            style={ratio ? { aspectRatio: ratio } : undefined}
          >
            <Media media={block.image} brief={block.imageBrief} sizes="(max-width: 1024px) 100vw, 400px" tone="#24476F" cropBottom />
          </div>
        </div>
      </div>
    </Section>
  )
}
