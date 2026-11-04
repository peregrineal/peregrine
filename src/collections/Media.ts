import type { CollectionConfig } from 'payload'

import { anyone, loggedIn } from '@/access'
import { revalidateSite } from '@/hooks/revalidate'

export const Media: CollectionConfig = {
  slug: 'media',
  labels: { singular: 'Image', plural: 'Media' },
  admin: {
    group: 'Media',
    defaultColumns: ['filename', 'alt', 'licence.licenceConfirmed', 'updatedAt'],
    description:
      'All images. An image can only appear on a published page once it has alt text and its licence is confirmed.',
  },
  access: { read: anyone, create: loggedIn, update: loggedIn, delete: loggedIn },
  fields: [
    {
      name: 'alt',
      label: 'Alt text',
      type: 'text',
      localized: true,
      required: true,
      admin: {
        description:
          'Describe the image for people who cannot see it, e.g. "Students walking past a historic library". Required.',
      },
    },
    { name: 'caption', type: 'text', localized: true },
    {
      name: 'licence',
      type: 'group',
      admin: { description: 'PEREGRINE may only use photos it is licensed to use. No AI renders of real places.' },
      fields: [
        {
          type: 'row',
          fields: [
            { name: 'source', type: 'text', admin: { width: '50%', description: 'Where the photo comes from.' } },
            { name: 'credit', type: 'text', admin: { width: '50%', description: 'Photographer or agency.' } },
          ],
        },
        {
          name: 'licenceConfirmed',
          label: 'Licence confirmed',
          type: 'checkbox',
          admin: { description: 'Tick only when the licence allows use on the PEREGRINE website.' },
        },
      ],
    },
  ],
  upload: {
    staticDir: 'media',
    mimeTypes: ['image/jpeg', 'image/png', 'image/webp', 'image/avif', 'image/svg+xml'],
    focalPoint: true,
    imageSizes: [
      { name: 'thumbnail', width: 400, height: 300, position: 'centre' },
      { name: 'card', width: 900, height: 675, position: 'centre' },
      { name: 'hero', width: 2200, position: 'centre' },
      { name: 'og', width: 1200, height: 630, position: 'centre' },
    ],
    adminThumbnail: 'thumbnail',
    // Files were sent with max-age=0, so every request went through Payload, the database and
    // R2 (about 0.75 s) and the CDN never kept a copy. Let browsers and the CDN keep them for a
    // week; a new upload gets a new file name, so it shows at once.
    modifyResponseHeaders: ({ headers }) => {
      headers.set('Cache-Control', 'public, max-age=604800, s-maxage=604800, stale-while-revalidate=86400')
      return headers
    },
  },
  hooks: {
    beforeOperation: [
      ({ args, operation }) => {
        const file = args?.req?.file
        if ((operation === 'create' || operation === 'update') && file && file.size > 10 * 1024 * 1024) {
          throw new Error('This image is larger than 10 MB. Please export it smaller (about 2500 px wide) and upload again.')
        }
        if (file?.mimetype === 'image/svg+xml' && /<script|on\w+=/i.test(file.data?.toString('utf8') ?? '')) {
          throw new Error('This SVG contains scripts and cannot be uploaded. Use SVG only for clean logo files.')
        }
        return args
      },
    ],
    afterChange: [revalidateSite],
  },
}
