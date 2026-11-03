import { FlagBadge } from '@/components/Flag'
import { Icon } from '@/components/Icon'
import { Media } from '@/components/Media'
import { ButtonRow, Paragraphs, Section, SectionHeader } from '@/components/ui'
import { getDictionary } from '@/lib/dictionary'
import { getRequestLocale } from '@/lib/locale'
import type { Media as MediaDoc } from '@/payload-types'

import type { BlockOf, BlockProps } from '../types'

type Item = NonNullable<BlockOf<'cardGrid'>['items']>[number]

function ItemBody({ item, n, dark }: { item: Item; n?: string; dark: boolean }) {
  return (
    <>
      {item.kicker && <p className="eyebrow !text-[11px]">{item.kicker}</p>}
      {item.title && (
        <h3 className="serif text-[20px] leading-tight">
          {n && <span className="mr-2 font-serif text-sky-deep">{n}</span>}
          {item.title}
        </h3>
      )}
      {item.subtitle && (
        <p
          className={`text-[14px] font-semibold ${dark ? 'text-sky-light' : 'text-sky-deep'}`}
        >
          {item.subtitle}
        </p>
      )}
      <Paragraphs text={item.text} pClassName={dark ? 'text-white/82 text-[14px]' : 'muted text-[14px]'} />
      {(item.metaLabel || item.metaValue) && (
        <div className={`mt-auto border-t pt-4 ${dark ? 'border-white/20' : 'border-navy/12'}`}>
          {item.metaLabel && (
            <p className="text-[11px] font-semibold tracking-[0.18em] uppercase muted">
              {item.metaLabel}
            </p>
          )}
          {item.metaValue && <p className="serif mt-1 text-[18px]">{item.metaValue}</p>}
        </div>
      )}
      {item.tagline && (
        <p className="serif text-[16px] font-medium italic text-sky-deep">{item.tagline}</p>
      )}
    </>
  )
}

/** Photo on top with the title over it, details below. Used for destination-style cards. */
function PhotoCard({ item, photoLabel }: { item: Item; photoLabel: string }) {
  const licence =
    item.image && typeof item.image === 'object' ? (item.image as MediaDoc).licence : null
  return (
    <li className="pcard">
      <div className="pcard-media">
        <div className="pcard-photo">
          <Media
            media={item.image}
            sizes="(max-width: 820px) 100vw, 33vw"
            size="card"
            tone="#1B3558"
            hideBrief
          />
          <div className="pcard-shade" aria-hidden="true" />
          {licence?.credit && (
            <a
              className="dest-credit"
              href={licence.source || undefined}
              target="_blank"
              rel="noopener"
            >
              {photoLabel}: {licence.credit}
            </a>
          )}
          <div className="pcard-head">
            {item.kicker && <p className="pcard-kicker">{item.kicker}</p>}
            <h3 className="serif text-[clamp(24px,2.26vw,30px)] leading-[1.1] font-bold text-white">
              {item.title}
            </h3>
            <span aria-hidden="true" className="w-10 border-t border-sky" />
          </div>
        </div>
        <FlagBadge code={item.flag} className="pcard-flag" />
      </div>
      <div className={`pcard-body ${item.flag ? 'pcard-body-flag' : ''}`}>
        {item.subtitle && (
          <p className="text-[14px] font-semibold text-sky-deep">{item.subtitle}</p>
        )}
        <Paragraphs text={item.text} pClassName="muted text-[14px]" />
        {(item.metaLabel || item.metaValue) && (
          <div className="pcard-meta">
            {item.metaLabel && (
              <p className="text-[11px] font-semibold tracking-[0.18em] uppercase muted">
                {item.metaLabel}
              </p>
            )}
            {item.metaValue && (
              <p className="serif mt-1 text-[clamp(15px,1.15vw,17px)] leading-snug">
                {item.metaValue}
              </p>
            )}
          </div>
        )}
        {item.tagline && (
          <p className="serif text-[16px] font-medium italic text-sky-deep">{item.tagline}</p>
        )}
      </div>
    </li>
  )
}

/** "Cards with icon" with a photo: photo on top, the icon in a navy circle on its lower edge. */
function ImageCard({ item, n, photoLabel }: { item: Item; n?: string; photoLabel: string }) {
  const licence = item.image && typeof item.image === 'object' ? (item.image as MediaDoc).licence : null
  return (
    <li className="card icard">
      <div className="icard-media">
        <div className="icard-photo">
          <Media media={item.image} sizes="(max-width: 820px) 100vw, 33vw" size="card" tone="#1B3558" hideBrief />
          {licence?.credit && (
            <a className="dest-credit" href={licence.source || undefined} target="_blank" rel="noopener">
              {photoLabel}: {licence.credit}
            </a>
          )}
        </div>
        {item.icon && (
          <span className="icard-ico">
            <Icon name={item.icon} size={24} />
          </span>
        )}
      </div>
      <div className="icard-body">
        <ItemBody item={item} n={n} dark={false} />
      </div>
    </li>
  )
}

export function CardGrid({ block, index }: BlockProps<'cardGrid'>) {
  const id = `grid-${index}`
  const dark = block.settings?.background === 'navy'
  const style = block.style ?? 'card'
  const cols = Number(block.columns ?? 3)
  const items = block.items ?? []
  const photoLabel = getDictionary(getRequestLocale()).sections.photo
  // Closing line and footnote under the intro instead of under the cards (e.g. a typical duration).
  const above = Boolean(block.closingAbove)
  const num = (i: number) => (block.numbered ? String(i + 1).padStart(2, '0') : undefined)

  return (
    <Section settings={block.settings} labelledBy={id}>
      <div className="wrap flex flex-col gap-6">
        <SectionHeader {...block} id={id} settings={block.settings} />
        {above && (block.closingHeading || block.footnote) && (
          <div className="-mt-2 flex flex-col items-center gap-1.5 text-center">
            {block.closingHeading && <p className="serif text-[clamp(19px,1.8vw,23px)] leading-tight">{block.closingHeading}</p>}
            {block.footnote && <p className={`max-w-[920px] text-[12.5px] italic ${dark ? 'text-white/70' : 'muted'}`}>{block.footnote}</p>}
          </div>
        )}
        <ul className="grid-cols-auto" style={{ ['--cols' as string]: cols }}>
          {items.map((item, i) =>
            style === 'photo' ? (
              <PhotoCard key={item.id ?? i} item={item} photoLabel={photoLabel} />
            ) : style === 'line' ? (
              <li
                key={item.id ?? i}
                className={`flex flex-col gap-3 border-t pt-[22px] ${dark ? 'border-sky/50' : 'border-sky'}`}
              >
                {item.icon && (
                  <span className={dark ? 'text-sky-light' : 'text-sky-deep'}>
                    <Icon name={item.icon} size={36} />
                  </span>
                )}
                <ItemBody item={item} n={num(i)} dark={dark} />
              </li>
            ) : style === 'compact' ? (
              <li key={item.id ?? i} className="field !items-start">
                {item.icon && (
                  <span className="ico">
                    <Icon name={item.icon} size={22} />
                  </span>
                )}
                <span className="field-rule" aria-hidden="true" />
                <div className="flex flex-col gap-1.5">
                  <h3 className="serif text-[18px] leading-snug">{item.title}</h3>
                  <Paragraphs text={item.text} pClassName="muted text-[14px]" />
                </div>
              </li>
            ) : (item.image || block.withPhotos) && !dark ? (
              <ImageCard key={item.id ?? i} item={item} n={num(i)} photoLabel={photoLabel} />
            ) : (
              <li
                key={item.id ?? i}
                className={`card ncard ${block.numbered ? '' : 'ncard-plain'} ${dark ? '!border-white/15 !bg-white/5' : ''}`}
              >
                {num(i) && (
                  <span className="ncard-n" aria-hidden="true">
                    {num(i)}
                  </span>
                )}
                {/* Room for the faint number only on numbered cards; it sits behind the title, so a little overlap is fine. */}
                <div className={`relative flex items-center gap-3 ${num(i) ? 'pr-12' : ''}`}>
                  {item.icon && (
                    <span className="ncard-ico">
                      <Icon name={item.icon} size={20} />
                    </span>
                  )}
                  <h3 className="serif text-[19px] leading-tight">
                    {num(i) && <span className="sr-only">{num(i)} </span>}
                    {item.title}
                  </h3>
                </div>
                <ItemBody item={{ ...item, title: '' }} dark={dark} />
              </li>
            ),
          )}
        </ul>
        {Boolean((!above && block.closingHeading) || block.closingText || block.buttons?.length) && (
          <div className="flex flex-col items-center gap-4 text-center">
            {!above && block.closingHeading && (
              <p className="serif text-[clamp(21px,2.2vw,28px)] leading-tight">
                {block.closingHeading}
              </p>
            )}
            <Paragraphs text={block.closingText} className="max-w-[920px]" pClassName="muted" />
            <ButtonRow buttons={block.buttons} dark={dark} className="justify-center" />
          </div>
        )}
        {!above && block.footnote && (
          <p
            className={`mx-auto max-w-[920px] text-center text-[12.5px] ${dark ? 'text-white/70' : 'muted'}`}
          >
            {block.footnote}
          </p>
        )}
      </div>
    </Section>
  )
}
