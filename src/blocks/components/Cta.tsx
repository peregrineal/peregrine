import { Icon } from '@/components/Icon'
import { Media } from '@/components/Media'
import { ButtonRow, Paragraphs, PendingTag } from '@/components/ui'

import type { BlockProps } from '../types'

export function Cta({ block, index }: BlockProps<'cta'>) {
  const id = `cta-${index}`
  const style = block.style ?? 'navy'
  const outerBg = block.settings?.background === 'ivory' ? 'bg-mist' : 'bg-white'

  const heading = (
    <h2 id={id} className="serif" style={{ fontSize: 'clamp(26px, 3vw, 40px)', lineHeight: 1.1, textWrap: 'balance' }}>
      {block.heading}
      {block.headingAccent && (
        <>
          {' '}
          <span className="accent">{block.headingAccent}</span>
        </>
      )}
    </h2>
  )

  if (style === 'soft') {
    return (
      <section aria-labelledby={id} id={block.settings?.anchorId || undefined} className={`${outerBg} pb-[clamp(44px,5vw,72px)] pt-[clamp(16px,2vw,24px)]`}>
        <div className="wrap">
          <div className="flex flex-col items-center gap-5 rounded-[10px] bg-sky-pale/70 px-[clamp(24px,5vw,64px)] py-[clamp(32px,4vw,52px)] text-center">
            {block.eyebrow && <p className="eyebrow rule-both">{block.eyebrow}</p>}
            <div className="max-w-[760px]">{heading}</div>
            <Paragraphs text={block.intro} className="max-w-[620px]" pClassName="muted lead" />
            <ButtonRow buttons={block.buttons} className="justify-center" />
            {block.footnote && <p className="muted text-[13px]">{block.footnote}</p>}
            <PendingTag settings={block.settings} />
          </div>
        </div>
      </section>
    )
  }

  if (style === 'light') {
    // A very light band: text on the left, the highlights as small white cards floating on the right.
    return (
      <section aria-labelledby={id} id={block.settings?.anchorId || undefined} className="section bg-tint">
        <div className="wrap grid items-center gap-10 [grid-template-columns:repeat(auto-fit,minmax(min(420px,100%),1fr))]">
          <div className="flex flex-col items-start gap-5">
            {block.eyebrow && <p className="eyebrow rule">{block.eyebrow}</p>}
            {heading}
            <Paragraphs text={block.intro} className="max-w-[620px]" pClassName="muted lead" />
            <ButtonRow buttons={block.buttons} />
            {block.footnote && <p className="muted text-[13px]">{block.footnote}</p>}
            <PendingTag settings={block.settings} />
          </div>
          {!!block.highlights?.length && (
            <ul className="float-cards">
              {block.highlights.map((h, i) => (
                <li key={h.id ?? i} className="float-card">
                  <span className="float-card-ico" aria-hidden="true">
                    <Icon name={h.icon} size={22} />
                  </span>
                  <span className="text-[14px] leading-snug font-semibold">{h.label}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </section>
    )
  }

  const withPhoto = style === 'navy-photo'
  return (
    <section aria-labelledby={id} id={block.settings?.anchorId || undefined} className="on-dark relative overflow-hidden bg-navy text-white">
      {withPhoto && (
        <div className="absolute inset-y-0 right-0 hidden w-[44%] lg:block">
          <Media media={block.image} brief={block.imageBrief} sizes="44vw" tone="#163050" />
          <div aria-hidden="true" className="absolute inset-0" style={{ background: 'linear-gradient(90deg, #0A2240 0%, rgba(10,34,64,.35) 45%, rgba(10,34,64,0) 100%)' }} />
        </div>
      )}
      <div className={`wrap relative grid items-center gap-10 py-[clamp(48px,5.5vw,76px)] ${withPhoto ? '' : '[grid-template-columns:repeat(auto-fit,minmax(min(420px,100%),1fr))]'}`}>
        <div className={`flex flex-col items-start gap-5 ${withPhoto ? 'max-w-[620px]' : ''}`}>
          {block.eyebrow && <p className="eyebrow rule">{block.eyebrow}</p>}
          {heading}
          <Paragraphs text={block.intro} className="max-w-[620px]" pClassName="text-white/85 lead" />
          <ButtonRow buttons={block.buttons} dark />
          {block.footnote && <p className="text-[13px] text-white/75">{block.footnote}</p>}
          <PendingTag settings={block.settings} />
        </div>
        {!withPhoto && !!block.highlights?.length && (
          // Equal columns on small screens so all highlights stay on one line; fixed width on desktop.
          <ul className="grid auto-cols-fr grid-flow-col lg:flex lg:justify-end">
            {block.highlights.map((h, i) => (
              <li key={h.id ?? i} className={`flex flex-col items-center gap-3 px-2 py-2 text-center text-[13px] font-medium sm:text-[14px] lg:w-[140px] lg:px-3 ${i > 0 ? 'border-l border-white/20' : ''}`}>
                <span className="text-sky-light">
                  <Icon name={h.icon} size={30} className="sm:size-[34px]" />
                </span>
                {h.label}
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  )
}
