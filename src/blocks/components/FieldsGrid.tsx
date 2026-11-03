import { Icon } from '@/components/Icon'
import { Section, SectionHeader } from '@/components/ui'
import { getFieldsOfStudy } from '@/lib/data'
import { getRequestLocale } from '@/lib/locale'
import type { FieldsOfStudy } from '@/payload-types'

import type { BlockProps } from '../types'

export async function FieldsGrid({ block, index }: BlockProps<'fieldsGrid'>) {
  const id = `fields-${index}`
  const picked = (block.fields ?? []).filter((f): f is FieldsOfStudy => typeof f === 'object')
  const fields = picked.length ? picked : await getFieldsOfStudy(getRequestLocale())
  return (
    <Section settings={block.settings} labelledBy={id}>
      <div className="wrap flex flex-col gap-9">
        <SectionHeader {...block} id={id} settings={block.settings} />
        {/* Five across, three across on tablets: the 15 fields fill every row evenly. */}
        <ul className="grid grid-cols-1 gap-3 min-[480px]:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
          {fields.map((f) => (
            <li key={f.id} className="field">
              <span className="ico">
                <Icon name={f.icon} size={20} />
              </span>
              <span className="field-rule" aria-hidden="true" />
              <span className="serif text-[15px] leading-snug font-medium">{f.label}</span>
            </li>
          ))}
        </ul>
      </div>
    </Section>
  )
}
