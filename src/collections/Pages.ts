import { APIError, type CollectionConfig } from 'payload'

import { isOwnerUser, loggedIn, ownerOnly, publishedOrLoggedIn } from '@/access'
import { allBlocks } from '@/blocks/configs'
import { revalidatePage, revalidatePageDelete } from '@/hooks/revalidate'
import { isCoreSlug, SITE_URL } from '@/lib/constants'
import {
  collectMediaIds,
  findUnpublishableMedia,
  legalNoticesChanged,
  unpublishableMediaMessage,
} from '@/lib/guardrails'

export const previewPath = (slug?: string | null, locale?: string | null) =>
  `/next/preview?slug=${encodeURIComponent(slug || 'home')}&locale=${encodeURIComponent(locale || 'en')}&secret=${encodeURIComponent(process.env.PREVIEW_SECRET || '')}`

export const Pages: CollectionConfig = {
  slug: 'pages',
  labels: { singular: 'Page', plural: 'Pages' },
  // Buttons and menu items only need the linked page's address. Without this every link carried
  // the whole linked page (Home's page data was 150KB, the header 64KB, the footer 80KB).
  defaultPopulate: { slug: true },
  admin: {
    group: 'Pages',
    useAsTitle: 'title',
    defaultColumns: ['title', 'slug', '_status', 'updatedAt'],
    description: 'Each page is a stack of sections. Open a page, then add, move, hide or edit its sections.',
    livePreview: { url: ({ data, locale }) => `${SITE_URL}${previewPath(data?.slug, locale?.code)}` },
    preview: (data, { locale }) => `${SITE_URL}${previewPath(data?.slug as string, locale)}`,
  },
  access: {
    read: publishedOrLoggedIn,
    create: ownerOnly,
    update: loggedIn,
    delete: ownerOnly,
  },
  versions: {
    maxPerDoc: 25,
    drafts: { autosave: { interval: 2000 }, schedulePublish: true },
  },
  fields: [
    {
      type: 'row',
      fields: [
        { name: 'title', type: 'text', required: true, localized: true, admin: { width: '50%' } },
        {
          name: 'slug',
          type: 'text',
          required: true,
          unique: true,
          index: true,
          admin: {
            width: '50%',
            description: 'The address of the page, e.g. "about-us". The core pages are locked so links never break.',
          },
          access: { update: ({ doc }) => !isCoreSlug(doc?.slug) },
          validate: (value: unknown) =>
            /^[a-z0-9-]+$/.test(String(value ?? '')) ? true : 'Use lowercase letters, numbers and dashes only.',
        },
      ],
    },
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Sections',
          fields: [
            {
              name: 'layout',
              label: 'Sections',
              labels: { singular: 'Section', plural: 'Sections' },
              type: 'blocks',
              blocks: allBlocks,
              admin: { initCollapsed: true },
            },
          ],
        },
        {
          label: 'SEO',
          name: 'seo',
          fields: [
            {
              name: 'title',
              label: 'Meta title',
              type: 'text',
              localized: true,
              maxLength: 70,
              admin: { description: 'Shown in Google and the browser tab. About 60 characters.' },
            },
            {
              name: 'description',
              label: 'Meta description',
              type: 'textarea',
              localized: true,
              maxLength: 200,
              admin: { description: 'One or two sentences shown under the title in Google. About 155 characters.' },
            },
            { name: 'image', label: 'Share image', type: 'upload', relationTo: 'media' },
          ],
        },
      ],
    },
  ],
  hooks: {
    beforeChange: [
      async ({ data, originalDoc, req, operation }) => {
        // 8.1: legal wording can only be changed by the Owner.
        if (operation === 'update' && !isOwnerUser(req) && req.user) {
          if (legalNoticesChanged(originalDoc?.layout, data.layout)) {
            throw new APIError(
              'Legal notices (visa and admission disclaimers) can only be changed by the Owner. Your other changes were not saved; undo the change to the notice and try again.',
              403,
              undefined,
              true,
            )
          }
        }
        // 8.2: no unlicensed or alt-less images on a published page.
        if (data._status === 'published') {
          const ids = collectMediaIds([data.layout, data.seo])
          if (ids.length) {
            const { docs } = await req.payload.find({
              collection: 'media',
              where: { id: { in: ids } },
              limit: ids.length,
              depth: 0,
              req,
            })
            const bad = findUnpublishableMedia(docs)
            if (bad.length) throw new APIError(unpublishableMediaMessage(bad), 400, undefined, true)
          }
        }
        return data
      },
    ],
    beforeDelete: [
      async ({ id, req }) => {
        const doc = await req.payload.findByID({ collection: 'pages', id, depth: 0, req, draft: true })
        if (isCoreSlug(doc?.slug)) {
          throw new APIError('This is one of the core pages of the site and cannot be deleted.', 403, undefined, true)
        }
      },
    ],
    afterChange: [revalidatePage],
    afterDelete: [revalidatePageDelete],
  },
}
