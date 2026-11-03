import { Media } from '@/components/Media'
import { ButtonRow, Paragraphs, PendingTag } from '@/components/ui'

import type { BlockProps } from '../types'

// Navy behind the text (solid for the first quarter), then a long eased fade with no visible
// edge, over a light navy veil on the whole photo so bright skies never wash the text out.
const fade = (a: number) =>
  `linear-gradient(90deg, ${[
    [1, 0], [1, 25], [0.92, 33], [0.8, 41], [0.64, 49], [0.47, 57], [0.32, 65], [0.2, 73], [0.12, 82], [0.08, 100],
  ]
    .map(([o, at]) => `rgba(10,34,64,${(o * a).toFixed(3)}) ${at}%`)
    .join(', ')})`
const gradients = { light: fade(0.85), medium: fade(0.95), strong: fade(1) }

// Every hero fills the first screen under the sticky header (min-h-20 in Header.tsx).
const fillScreen = 'min-h-[calc(100svh-80px)]'

export function Hero({ block, index, isFirst }: BlockProps<'hero'>) {
  const id = `hero-${index}`
  const Heading = isFirst ? 'h1' : 'h2'
  const variant = block.variant ?? 'photo'
  // A sentence used as the heading (e.g. About Us) gets a smaller size than a short title.
  const long = `${block.heading ?? ''} ${block.headingAccent ?? ''}`.trim().length > 80

  const text = (dark: boolean) => (
    <>
      {block.eyebrow && <p className="eyebrow rule rise">{block.eyebrow}</p>}
      <Heading
        id={id}
        className={`serif rise d1 ${long ? 'max-w-[640px]' : 'max-w-[900px]'}`}
        // Scales with the viewport height too, so long headings still fit on short laptop screens.
        style={{ fontSize: long ? 'clamp(28px, min(3.3vw, 5.6vh), 48px)' : 'clamp(36px, min(4.89vw, 7.71vh), 70px)', lineHeight: long ? 1.12 : 1.05, fontWeight: 700, textWrap: 'balance' }}
      >
        {block.heading}
        {block.headingAccent && (
          <>
            <br />
            <span className="accent">{block.headingAccent}</span>
          </>
        )}
      </Heading>
      <Paragraphs
        text={block.intro}
        // Narrow enough to stay over the darker part of the photo
        className="rise d2 max-w-[540px]"
        pClassName={dark ? 'text-[16px] leading-relaxed text-white/88' : 'muted text-[16px] leading-relaxed'}
      />
      <ButtonRow buttons={block.buttons} dark={dark} className="rise d3" />
      {block.note && <p className={`rise d3 text-[13px] ${dark ? 'text-white/75' : 'muted'}`}>{block.note}</p>}
      <PendingTag settings={block.settings} />
    </>
  )

  if (variant === 'split') {
    return (
      <section aria-labelledby={id} id={block.settings?.anchorId || undefined} className={`flex items-center ${fillScreen} ${block.settings?.background === 'ivory' ? 'bg-mist' : 'bg-white'}`}>
        <div className="wrap grid items-center gap-[clamp(40px,6vw,80px)] py-[clamp(48px,7vh,96px)] [grid-template-columns:repeat(auto-fit,minmax(min(460px,100%),1fr))]">
          <div className="flex flex-col items-start gap-5">{text(false)}</div>
          <div className="reveal relative h-[clamp(340px,62vh,640px)] overflow-hidden rounded-[10px]">
            <Media media={block.image} brief={block.imageBrief} priority={isFirst} sizes="(max-width: 900px) 100vw, 50vw" size="hero" tone="#2C4A70" />
          </div>
        </div>
      </section>
    )
  }

  if (variant === 'navy') {
    return (
      <section aria-labelledby={id} id={block.settings?.anchorId || undefined} className="on-dark relative overflow-hidden bg-navy text-white">
        <div className="reveal absolute inset-y-0 right-0 hidden w-[58%] md:block">
          <Media media={block.image} brief={block.imageBrief} priority={isFirst} sizes="60vw" size="hero" tone="#163050" />
          {/* A short fade from the navy into the photo. Starts 4px left of the photo so the
              anti-aliased photo edge never shows as a light seam. */}
          <div aria-hidden="true" className="absolute inset-y-0 -left-1 right-0" style={{ background: 'linear-gradient(90deg, #0A2240 0%, #0A2240 4px, rgba(10,34,64,.55) 14%, rgba(10,34,64,.12) 34%, rgba(10,34,64,0) 55%)' }} />
        </div>
        <div className={`wrap relative flex ${fillScreen} flex-col justify-center py-[clamp(48px,7vh,96px)]`}>
          <div className="flex max-w-[560px] flex-col items-start gap-5">{text(true)}</div>
        </div>
      </section>
    )
  }

  return (
    <section aria-labelledby={id} id={block.settings?.anchorId || undefined} className="on-dark relative overflow-hidden bg-navy text-white">
      <div className="reveal absolute inset-0">
        <Media media={block.image} brief={block.imageBrief} priority={isFirst} sizes="100vw" size="hero" tone="#2C4A70" className="[&_.ph-chip]:!top-auto [&_.ph-chip]:!left-auto [&_.ph-chip]:right-4 [&_.ph-chip]:bottom-4 max-md:[&_.ph-chip]:hidden" />
      </div>
      <div aria-hidden="true" className="hero-shade absolute inset-0" style={{ ['--hero-shade' as string]: gradients[block.gradient ?? 'medium'] }} />
      <div className={`wrap relative flex ${fillScreen} flex-col justify-center py-[clamp(48px,7vh,96px)]`}>
        <div className="hero-text-shadow flex max-w-[760px] flex-col items-start gap-5">{text(true)}</div>
      </div>
    </section>
  )
}
