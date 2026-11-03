import { FlagBadge } from '@/components/Flag'
import { Media } from '@/components/Media'
import { ButtonRow, Section, SectionHeader } from '@/components/ui'
import { getDestinations } from '@/lib/data'
import { getDictionary } from '@/lib/dictionary'
import { flagOptions } from '@/lib/flags'
import { getRequestLocale } from '@/lib/locale'

import type { BlockProps } from '../types'
import { Carousel } from './Carousel'

const tones = ['#1B3558', '#24476F', '#163050', '#2C5179']

// Destinations are matched to their flag by their English name.
const flagFor = (name?: string | null) => flagOptions.find((f) => f.label === name)?.value

export async function Destinations({ block, index }: BlockProps<'destinations'>) {
  const id = `dest-${index}`
  const locale = getRequestLocale()
  const t = getDictionary(locale).sections
  const destinations = await getDestinations(locale, block.programme)
  // The English names give the flags; the page shows the names in its own language.
  const english = locale === 'en' ? destinations : await getDestinations('en', block.programme)
  return (
    <Section settings={block.settings} labelledBy={id}>
      <div className="wrap flex flex-col gap-9">
        <SectionHeader {...block} id={id} settings={block.settings} />
        {destinations.length > 0 && (
          <Carousel
            id={`${id}-track`}
            label={`${block.heading ?? t.destinations}: ${t.scrollHint}`}
            previousLabel={t.previous}
            nextLabel={t.next}
          >
            {destinations.map((d, i) => (
              <li key={d.id} className="dest">
                <div className="dest-photo">
                  <div className="dest-img">
                    <Media media={d.image} brief={d.photoBrief} tone={tones[i % tones.length]} sizes="130px" size="card" hideBrief />
                  </div>
                  <FlagBadge code={flagFor(english.find((e) => e.id === d.id)?.name)} className="dest-flag" />
                </div>
                <h3 className="serif text-[15px] leading-tight">{d.name}</h3>
              </li>
            ))}
          </Carousel>
        )}
        {block.footnote && <p className="muted text-center text-[12.5px]">{block.footnote}</p>}
        <ButtonRow buttons={block.buttons} className="justify-center" />
      </div>
    </Section>
  )
}
