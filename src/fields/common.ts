import type { Field, TextFieldSingleValidation } from 'payload'

import { iconOptions } from '@/lib/iconNames'

const noEmDash: TextFieldSingleValidation = (value) =>
  typeof value === 'string' && value.includes('—')
    ? 'House style: please use a comma or colon instead of an em-dash (—).'
    : true

export const eyebrow = (): Field => ({
  name: 'eyebrow',
  type: 'text',
  localized: true,
  maxLength: 60,
  admin: { description: 'Small uppercase label above the heading.' },
})

/** Eyebrow, heading (with optional light blue accent line) and intro, shared by most sections. */
export const sectionHeader = (opts: { headingRequired?: boolean; introLength?: number } = {}): Field[] => [
  eyebrow(),
  {
    type: 'row',
    fields: [
      {
        name: 'heading',
        type: 'text',
        localized: true,
        required: opts.headingRequired ?? false,
        maxLength: 90,
        validate: noEmDash,
        admin: { width: '50%' },
      },
      {
        name: 'headingAccent',
        type: 'text',
        localized: true,
        maxLength: 60,
        admin: {
          width: '50%',
          description: 'Optional second part of the heading, shown in light blue.',
        },
      },
    ],
  },
  {
    name: 'intro',
    type: 'textarea',
    localized: true,
    maxLength: opts.introLength ?? 700,
    admin: { description: 'Leave a blank line between paragraphs.' },
  },
]

export const paragraphs = (name = 'body', label = 'Text', maxLength = 2000): Field => ({
  name,
  label,
  type: 'textarea',
  localized: true,
  maxLength,
  admin: { description: 'Leave a blank line between paragraphs.' },
})

export const iconField = (name = 'icon'): Field => ({
  name,
  type: 'select',
  options: [...iconOptions],
  admin: { description: 'Line icon from the PEREGRINE set.' },
})

export const imageField = (name = 'image', label = 'Image'): Field[] => [
  {
    name,
    label,
    type: 'upload',
    relationTo: 'media',
    admin: {
      description:
        'Licensed photos only. Until an image is chosen the site shows a navy placeholder with the photo brief below.',
    },
  },
  {
    name: `${name}Brief`,
    label: 'Photo brief (internal)',
    type: 'text',
    admin: {
      description: 'What the photo should show. Shown on the placeholder only, never next to a real photo.',
    },
  },
]

/** Settings every section block carries: anchor, background and the pending-approval tag. */
export const sectionSettings = (
  opts: { backgrounds?: ('white' | 'ivory' | 'tint' | 'navy')[]; defaultBackground?: string } = {},
): Field => {
  const backgrounds = opts.backgrounds ?? ['white', 'ivory', 'tint', 'navy']
  const labels = { white: 'White', ivory: 'Light blue', tint: 'Very light blue', navy: 'Navy' }
  return {
    name: 'settings',
    type: 'group',
    label: 'Section settings',
    admin: { hideGutter: true },
    fields: [
      {
        type: 'row',
        fields: [
          {
            name: 'anchorId',
            label: 'Anchor',
            type: 'text',
            admin: {
              width: '33%',
              description: 'Used in links like /page#anchor. Lowercase, no spaces.',
            },
            validate: (value: unknown) =>
              !value || /^[a-z0-9-]+$/.test(String(value)) ? true : 'Use lowercase letters, numbers and dashes only.',
          },
          {
            name: 'background',
            type: 'select',
            defaultValue: opts.defaultBackground ?? backgrounds[0],
            options: backgrounds.map((b) => ({ label: labels[b], value: b })),
            admin: { width: '33%' },
          },
          {
            name: 'hidden',
            label: 'Hide this section',
            type: 'checkbox',
            admin: { width: '33%', description: 'Keeps the content but does not show it on the site.' },
          },
        ],
      },
      {
        type: 'row',
        fields: [
          {
            name: 'pendingApproval',
            label: 'Pending approval',
            type: 'checkbox',
            admin: {
              width: '33%',
              description: 'Shows a dashed "pending approval" tag on the site until unchecked.',
            },
          },
          {
            name: 'pendingLabel',
            label: 'Tag text',
            type: 'text',
            defaultValue: 'Draft, pending approval',
            admin: { width: '66%', condition: (_, sib) => Boolean(sib?.pendingApproval) },
          },
        ],
      },
    ],
  }
}
