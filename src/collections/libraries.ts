import type { CollectionConfig } from 'payload'

import { anyone, loggedIn, ownerOnly } from '@/access'
import { iconField } from '@/fields/common'
import { revalidateSite, revalidateSiteDelete } from '@/hooks/revalidate'
import { SERVICE_KEYS } from '@/lib/constants'

const libraryAccess = { read: anyone, create: loggedIn, update: loggedIn, delete: loggedIn }
const libraryHooks = { afterChange: [revalidateSite], afterDelete: [revalidateSiteDelete] }

export const Destinations: CollectionConfig = {
  slug: 'destinations',
  labels: { singular: 'Destination', plural: 'Destinations' },
  orderable: true,
  admin: {
    group: 'Content libraries',
    useAsTitle: 'name',
    defaultColumns: ['name', 'programmes', 'visible', 'image'],
    description:
      'Countries shown in the destination carousels and the booking form. Drag to reorder. Photos must be licensed and must NOT show university names, logos or flags; landmarks are illustrations, not partner institutions.',
  },
  access: libraryAccess,
  fields: [
    { name: 'name', type: 'text', required: true, localized: true },
    {
      name: 'programmes',
      type: 'select',
      hasMany: true,
      defaultValue: ['university'],
      options: [
        { label: 'Universities & pathways', value: 'university' },
        { label: 'Boarding schools', value: 'boarding' },
        { label: 'Seasonal camps', value: 'camps' },
      ],
      admin: { description: 'Which carousels this destination appears in.' },
    },
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      admin: { description: 'Licensed architectural photo. No university names, logos or flags on the card.' },
    },
    {
      name: 'photoBrief',
      label: 'Photo brief (internal)',
      type: 'text',
      admin: { description: 'Internal note for sourcing the photo. Never shown next to a real photo.' },
    },
    { name: 'visible', type: 'checkbox', defaultValue: true },
  ],
  hooks: libraryHooks,
}

export const FieldsOfStudy: CollectionConfig = {
  slug: 'fields-of-study',
  labels: { singular: 'Field of Study', plural: 'Fields of Study' },
  orderable: true,
  admin: { group: 'Content libraries', useAsTitle: 'label', defaultColumns: ['label', 'icon'] },
  access: libraryAccess,
  fields: [{ name: 'label', type: 'text', required: true, localized: true, maxLength: 60 }, iconField()],
  hooks: libraryHooks,
}

export const Faqs: CollectionConfig = {
  slug: 'faqs',
  labels: { singular: 'FAQ', plural: 'FAQs' },
  orderable: true,
  admin: {
    group: 'Content libraries',
    useAsTitle: 'question',
    defaultColumns: ['question', 'category'],
    description: 'Questions shown in the FAQ sections. Each FAQ section shows one category.',
  },
  access: libraryAccess,
  fields: [
    { name: 'question', type: 'text', required: true, localized: true, maxLength: 160 },
    { name: 'answer', type: 'richText', required: true, localized: true },
    {
      name: 'category',
      type: 'select',
      required: true,
      options: [
        { label: 'Universities & Pathways', value: 'universities' },
        { label: 'Boarding Schools', value: 'boarding' },
        { label: 'Seasonal Camps', value: 'camps' },
        { label: 'Tourist & Visitor Visas', value: 'visas' },
        { label: 'General', value: 'general' },
      ],
    },
  ],
  hooks: libraryHooks,
}

export const Services: CollectionConfig = {
  slug: 'services',
  labels: { singular: 'Service', plural: 'Services' },
  orderable: true,
  admin: {
    group: 'Content libraries',
    useAsTitle: 'name',
    defaultColumns: ['name', 'key'],
    description: 'The services offered in the booking form. The questions each service asks are fixed in the form itself.',
  },
  access: { ...libraryAccess, create: ownerOnly, delete: ownerOnly },
  fields: [
    {
      name: 'key',
      type: 'select',
      required: true,
      unique: true,
      options: SERVICE_KEYS.map((k) => ({ label: k, value: k })),
      access: { update: () => false },
      admin: { description: 'Locked: used in links such as /book-a-consultation?service=boarding.' },
    },
    { name: 'name', type: 'text', required: true, localized: true, maxLength: 60 },
    { name: 'shortDescription', type: 'textarea', localized: true, maxLength: 240 },
  ],
  hooks: libraryHooks,
}
