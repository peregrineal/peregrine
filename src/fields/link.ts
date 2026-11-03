import type { ArrayField, Field, GroupField } from 'payload'

import { serviceOptions } from '@/lib/constants'

type LinkOptions = {
  name?: string
  label?: string
  /** Show a style choice (button variants). Off for plain text links in menus. */
  withVariant?: boolean
  required?: boolean
}

export const buttonVariants = [
  { label: 'Navy (primary)', value: 'navy' },
  { label: 'White (for navy sections)', value: 'champagne' },
  { label: 'Outline', value: 'outline' },
  { label: 'Outline on dark', value: 'outline-light' },
  { label: 'White', value: 'white' },
  { label: 'Text link with arrow', value: 'text' },
] as const

const linkFields = ({ withVariant = true, required = false }: LinkOptions): Field[] => [
  {
    type: 'row',
    fields: [
      {
        name: 'type',
        type: 'radio',
        defaultValue: 'internal',
        options: [
          { label: 'Page on this site', value: 'internal' },
          { label: 'External URL', value: 'external' },
        ],
        admin: { layout: 'horizontal', width: '50%' },
      },
      {
        name: 'label',
        type: 'text',
        localized: true,
        required,
        maxLength: 60,
        admin: { width: '50%', description: 'The text people see on the button or link.' },
      },
    ],
  },
  {
    type: 'row',
    fields: [
      {
        name: 'page',
        type: 'relationship',
        relationTo: 'pages',
        admin: { width: '50%', condition: (_, sib) => sib?.type !== 'external' },
      },
      {
        name: 'anchor',
        type: 'text',
        admin: {
          width: '50%',
          condition: (_, sib) => sib?.type !== 'external',
          description: 'Optional section on that page, for example "faq" (without #).',
        },
      },
      {
        name: 'url',
        type: 'text',
        admin: {
          width: '50%',
          condition: (_, sib) => sib?.type === 'external',
          description: 'Full address, for example https://wa.me/355694242373',
        },
      },
    ],
  },
  {
    type: 'row',
    fields: [
      ...(withVariant
        ? [
            {
              name: 'variant',
              type: 'select',
              defaultValue: 'navy',
              options: [...buttonVariants],
              admin: { width: '50%' },
            } satisfies Field,
            {
              name: 'hideArrow',
              type: 'checkbox',
              label: 'No arrow on this button',
              admin: { width: '50%' },
            } satisfies Field,
          ]
        : []),
      {
        name: 'presetService',
        type: 'select',
        options: serviceOptions,
        admin: {
          width: '50%',
          condition: (_, sib) => sib?.type !== 'external',
          description: 'When this opens the booking form, preselect this service.',
        },
      },
    ],
  },
]

export const link = (opts: LinkOptions = {}): GroupField => ({
  name: opts.name ?? 'link',
  label: opts.label ?? 'Link',
  type: 'group',
  fields: linkFields(opts),
})

export const linkArray = (opts: LinkOptions & { maxRows?: number } = {}): ArrayField => ({
  name: opts.name ?? 'buttons',
  label: opts.label ?? 'Buttons',
  type: 'array',
  maxRows: opts.maxRows ?? 2,
  labels: { singular: 'Button', plural: 'Buttons' },
  admin: { initCollapsed: true },
  fields: linkFields(opts),
})
