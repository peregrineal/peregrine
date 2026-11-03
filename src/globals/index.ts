import type { GlobalConfig } from 'payload'

import { anyone, loggedIn, ownerOnly } from '@/access'
import { link } from '@/fields/link'
import { revalidateGlobal } from '@/hooks/revalidate'

export const SiteSettings: GlobalConfig = {
  slug: 'site-settings',
  label: 'Site Settings',
  admin: { group: 'Settings', description: 'Contact details, social links and SEO defaults used across the site.' },
  access: { read: anyone, update: ownerOnly },
  fields: [
    {
      type: 'row',
      fields: [
        { name: 'phone', type: 'text', required: true, admin: { width: '50%' } },
        {
          name: 'whatsappNumber',
          type: 'text',
          required: true,
          admin: { width: '50%', description: 'Digits only, with country code, e.g. 355694242373.' },
          validate: (v: unknown) => (/^\d{8,15}$/.test(String(v ?? '')) ? true : 'Digits only, 8 to 15 of them, with country code.'),
        },
      ],
    },
    {
      type: 'row',
      fields: [
        { name: 'email', type: 'email', required: true, admin: { width: '50%' } },
        { name: 'website', type: 'text', admin: { width: '50%' } },
      ],
    },
    { name: 'address', type: 'textarea', localized: true },
    {
      name: 'addressConfirmed',
      type: 'checkbox',
      admin: { description: 'While unchecked, the site shows an "Address to be confirmed" tag next to the address.' },
    },
    {
      type: 'row',
      fields: [
        { name: 'openingHours', type: 'text', localized: true, admin: { width: '50%' } },
        { name: 'hoursNote', type: 'text', localized: true, admin: { width: '50%' } },
      ],
    },
    {
      name: 'socialLinks',
      type: 'array',
      admin: { description: 'Only filled-in links are shown on the site.' },
      fields: [
        {
          type: 'row',
          fields: [
            {
              name: 'platform',
              type: 'select',
              required: true,
              options: ['Instagram', 'Facebook', 'LinkedIn', 'YouTube', 'TikTok'].map((p) => ({ label: p, value: p.toLowerCase() })),
              admin: { width: '33%' },
            },
            { name: 'url', type: 'text', required: true, admin: { width: '66%' } },
          ],
        },
      ],
    },
    {
      name: 'seoDefaults',
      type: 'group',
      label: 'SEO defaults',
      fields: [
        { name: 'siteName', type: 'text', defaultValue: 'PEREGRINE' },
        { name: 'description', type: 'textarea', localized: true },
        { name: 'image', label: 'Default share image', type: 'upload', relationTo: 'media' },
      ],
    },
  ],
  hooks: { afterChange: [revalidateGlobal] },
}

export const Header: GlobalConfig = {
  slug: 'header',
  admin: { group: 'Settings' },
  access: { read: anyone, update: loggedIn },
  fields: [
    {
      name: 'navItems',
      type: 'array',
      maxRows: 9,
      admin: { initCollapsed: true },
      fields: [
        ...link({ name: 'link', withVariant: false }).fields,
        {
          name: 'children',
          label: 'Dropdown links',
          type: 'array',
          maxRows: 6,
          labels: { singular: 'Dropdown link', plural: 'Dropdown links' },
          admin: {
            initCollapsed: true,
            description: 'Optional. When filled, this item opens a dropdown with these links and needs no page of its own.',
          },
          fields: link({ name: 'link', withVariant: false }).fields,
        },
      ],
    },
    link({ name: 'cta', label: 'Header button', withVariant: false }),
  ],
  hooks: { afterChange: [revalidateGlobal] },
}

export const Footer: GlobalConfig = {
  slug: 'footer',
  admin: { group: 'Settings' },
  access: { read: anyone, update: loggedIn },
  fields: [
    { name: 'tagline', type: 'text', localized: true, defaultValue: 'Study Abroad · Visa Consultancy' },
    {
      name: 'columns',
      type: 'array',
      maxRows: 3,
      fields: [
        { name: 'title', type: 'text', localized: true, required: true },
        {
          name: 'links',
          type: 'array',
          fields: link({ name: 'link', withVariant: false }).fields,
        },
      ],
    },
    { name: 'contactTitle', type: 'text', localized: true, defaultValue: 'Contact us' },
    { name: 'bottomNote', type: 'text', localized: true },
  ],
  hooks: { afterChange: [revalidateGlobal] },
}
