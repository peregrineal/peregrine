import type { Block } from 'payload'

import { ownerOnlyField } from '@/access'
import {
  eyebrow,
  iconField,
  imageField,
  paragraphs,
  sectionHeader,
  sectionSettings,
} from '@/fields/common'
import { link, linkArray } from '@/fields/link'
import { flagOptions } from '@/lib/flags'

const thumb = (slug: string) => `/admin-thumbnails/${slug}.png`

export const HeroBlock: Block = {
  slug: 'hero',
  labels: { singular: 'Hero', plural: 'Heroes' },
  imageURL: thumb('hero'),
  admin: { group: 'Page top' },
  fields: [
    {
      name: 'variant',
      type: 'select',
      defaultValue: 'photo',
      options: [
        { label: 'Full photo with navy gradient', value: 'photo' },
        { label: 'Navy with photo on the right', value: 'navy' },
        { label: 'Light, text and photo side by side', value: 'split' },
      ],
    },
    ...sectionHeader({ headingRequired: true, introLength: 900 }),
    linkArray({ maxRows: 2 }),
    {
      name: 'note',
      type: 'text',
      localized: true,
      maxLength: 120,
      admin: { description: 'Small line under the buttons, e.g. "Complimentary initial consultation for all services."' },
    },
    ...imageField('image', 'Background image'),
    {
      name: 'gradient',
      type: 'select',
      defaultValue: 'medium',
      options: [
        { label: 'Light', value: 'light' },
        { label: 'Medium', value: 'medium' },
        { label: 'Strong', value: 'strong' },
      ],
      admin: { condition: (_, sib) => sib?.variant === 'photo' },
    },
    sectionSettings({ backgrounds: ['white', 'ivory'] }),
  ],
}

export const SplitContentBlock: Block = {
  slug: 'splitContent',
  labels: { singular: 'Split: Text and Image', plural: 'Split: Text and Image' },
  imageURL: thumb('splitContent'),
  admin: { group: 'Content' },
  fields: [
    ...sectionHeader(),
    {
      name: 'lead',
      type: 'text',
      localized: true,
      maxLength: 160,
      admin: { description: 'Optional serif lead line under the heading.' },
    },
    paragraphs('body', 'Text', 2400),
    {
      name: 'highlights',
      type: 'array',
      maxRows: 3,
      admin: { initCollapsed: true },
      fields: [iconField(), { name: 'label', type: 'text', localized: true, required: true, maxLength: 40 }],
    },
    {
      name: 'aside',
      type: 'textarea',
      localized: true,
      maxLength: 400,
      admin: { description: 'Optional highlighted statement shown with a light blue rule.' },
    },
    linkArray({ maxRows: 2 }),
    ...imageField(),
    {
      name: 'imageSide',
      type: 'select',
      defaultValue: 'right',
      options: [
        { label: 'Image on the right', value: 'right' },
        { label: 'Image on the left', value: 'left' },
        { label: 'No image (text only, full width)', value: 'none' },
      ],
    },
    sectionSettings({ backgrounds: ['white', 'ivory', 'tint'] }),
  ],
}

export const ServiceCardsBlock: Block = {
  slug: 'serviceCards',
  labels: { singular: 'Service Cards', plural: 'Service Cards' },
  imageURL: thumb('serviceCards'),
  admin: { group: 'Content' },
  fields: [
    ...sectionHeader(),
    {
      name: 'cards',
      type: 'array',
      minRows: 1,
      maxRows: 6,
      admin: { initCollapsed: true },
      fields: [
        iconField(),
        { name: 'title', type: 'text', localized: true, required: true, maxLength: 50 },
        { name: 'text', type: 'textarea', localized: true, maxLength: 260 },
        {
          name: 'secondary',
          type: 'textarea',
          localized: true,
          maxLength: 220,
          admin: { description: 'Not shown at the moment: the cards sit five across and show the first text only.' },
        },
        link({ withVariant: false }),
      ],
    },
    sectionSettings({ backgrounds: ['white', 'ivory', 'tint'] }),
  ],
}

export const CardGridBlock: Block = {
  slug: 'cardGrid',
  labels: { singular: 'Card Grid', plural: 'Card Grids' },
  imageURL: thumb('cardGrid'),
  admin: { group: 'Content' },
  fields: [
    ...sectionHeader(),
    {
      type: 'row',
      fields: [
        {
          name: 'style',
          type: 'select',
          defaultValue: 'card',
          options: [
            { label: 'Cards with icon', value: 'card' },
            { label: 'Open list with top rule', value: 'line' },
            { label: 'Compact rows', value: 'compact' },
            { label: 'Photo cards', value: 'photo' },
          ],
          admin: { width: '50%' },
        },
        {
          name: 'columns',
          type: 'select',
          defaultValue: '3',
          options: ['2', '3', '4'].map((v) => ({ label: `${v} columns`, value: v })),
          admin: { width: '50%' },
        },
      ],
    },
    {
      name: 'numbered',
      type: 'checkbox',
      admin: { description: 'Show 01, 02, 03… on each card.' },
    },
    {
      name: 'withPhotos',
      type: 'checkbox',
      label: 'Show a photo on every card',
      admin: {
        condition: (data, sib) => (sib?.style ?? 'card') === 'card',
        description: 'Each card gets a photo space above its text, with the icon on its edge. Cards without a photo yet show a navy placeholder.',
      },
    },
    {
      name: 'items',
      type: 'array',
      minRows: 1,
      maxRows: 12,
      admin: { initCollapsed: true },
      fields: [
        iconField(),
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          admin: {
            condition: (data, sib, { blockData }) => ['photo', 'card'].includes((blockData as { style?: string } | undefined)?.style ?? 'card'),
            description:
              'Licensed photo. "Photo cards": the title sits on the photo. "Cards with icon": optional, shown above the text with the icon on its edge. Its credit from Media is shown on the card.',
          },
        },
        {
          name: 'flag',
          type: 'select',
          options: [...flagOptions],
          admin: {
            condition: (data, sib, { blockData }) => (blockData as { style?: string } | undefined)?.style === 'photo',
            description: 'Optional country flag, shown in a small circle between the photo and the text.',
          },
        },
        {
          type: 'row',
          fields: [
            { name: 'title', type: 'text', localized: true, required: true, maxLength: 80, admin: { width: '50%' } },
            {
              name: 'kicker',
              type: 'text',
              localized: true,
              maxLength: 60,
              admin: { width: '50%', description: 'Small uppercase line, e.g. "Standard Visitor Visa".' },
            },
          ],
        },
        {
          name: 'subtitle',
          type: 'text',
          localized: true,
          maxLength: 90,
          admin: { description: 'Optional line under the title, e.g. "March to April".' },
        },
        paragraphs('text', 'Text', 900),
        {
          type: 'row',
          fields: [
            { name: 'metaLabel', type: 'text', localized: true, maxLength: 40, admin: { width: '50%' } },
            { name: 'metaValue', type: 'text', localized: true, maxLength: 60, admin: { width: '50%' } },
          ],
        },
        {
          name: 'tagline',
          type: 'text',
          localized: true,
          maxLength: 140,
          admin: { description: 'Optional closing line in serif italics.' },
        },
      ],
    },
    {
      name: 'closingHeading',
      type: 'text',
      localized: true,
      maxLength: 90,
    },
    paragraphs('closingText', 'Closing text', 700),
    linkArray({ name: 'buttons', maxRows: 1 }),
    {
      name: 'footnote',
      type: 'textarea',
      localized: true,
      maxLength: 400,
    },
    {
      name: 'closingAbove',
      type: 'checkbox',
      label: 'Show the closing line and footnote above the cards',
      admin: { description: 'e.g. "Typical Duration: 1–4 Weeks" right under the intro. The button stays below the cards.' },
    },
    sectionSettings({ backgrounds: ['white', 'ivory', 'tint', 'navy'] }),
  ],
}

export const DestinationsBlock: Block = {
  slug: 'destinations',
  labels: { singular: 'Destinations Carousel', plural: 'Destinations Carousels' },
  imageURL: thumb('destinations'),
  admin: { group: 'Libraries' },
  fields: [
    ...sectionHeader(),
    {
      name: 'programme',
      type: 'select',
      defaultValue: 'university',
      options: [
        { label: 'Universities & pathways', value: 'university' },
        { label: 'Boarding schools', value: 'boarding' },
        { label: 'Seasonal camps', value: 'camps' },
      ],
      admin: { description: 'Shows every visible destination offered for this programme, in library order.' },
    },
    {
      name: 'footnote',
      type: 'text',
      localized: true,
      maxLength: 240,
      defaultValue: 'Images show illustrative architecture only and do not imply partnership with any institution.',
    },
    linkArray({ maxRows: 1 }),
    sectionSettings({ backgrounds: ['white', 'ivory', 'tint'] }),
  ],
}

export const FieldsGridBlock: Block = {
  slug: 'fieldsGrid',
  labels: { singular: 'Fields of Study Grid', plural: 'Fields of Study Grids' },
  imageURL: thumb('fieldsGrid'),
  admin: { group: 'Libraries' },
  fields: [
    ...sectionHeader(),
    {
      name: 'fields',
      type: 'relationship',
      relationTo: 'fields-of-study',
      hasMany: true,
      admin: { description: 'Leave empty to show every field of study in library order.' },
    },
    sectionSettings({ backgrounds: ['white', 'ivory', 'tint'] }),
  ],
}

export const TimelineBlock: Block = {
  slug: 'timeline',
  labels: { singular: 'Blueprint Timeline', plural: 'Blueprint Timelines' },
  imageURL: thumb('timeline'),
  admin: { group: 'Content' },
  fields: [
    ...sectionHeader({ introLength: 1200 }),
    {
      name: 'subheading',
      type: 'text',
      localized: true,
      maxLength: 120,
      admin: { description: 'Serif line under the heading, e.g. "From Your First Conversation to Your First Steps Abroad."' },
    },
    {
      name: 'layout',
      type: 'select',
      defaultValue: 'timeline',
      options: [
        { label: 'Stages in a row, each opens its full text', value: 'timeline' },
        { label: 'Stage cards in a row: number, icon, stage name and short text', value: 'row' },
      ],
    },
    {
      name: 'stages',
      type: 'array',
      minRows: 1,
      maxRows: 9,
      admin: { initCollapsed: true },
      fields: [
        {
          type: 'row',
          fields: [
            iconField(),
            {
              name: 'kicker',
              type: 'text',
              localized: true,
              maxLength: 30,
              admin: { description: 'e.g. DISCOVER' },
            },
          ],
        },
        {
          name: 'title',
          type: 'text',
          localized: true,
          maxLength: 80,
          admin: { description: 'Not shown on stage cards, which use the stage name.' },
        },
        {
          name: 'summary',
          type: 'textarea',
          localized: true,
          maxLength: 260,
          admin: { description: 'Short text shown before the stage is opened (about 200 characters).' },
        },
        paragraphs('body', 'Full text (shown when opened)', 2400),
      ],
    },
    { name: 'closingHeading', type: 'text', localized: true, maxLength: 90 },
    paragraphs('closingText', 'Closing text', 700),
    linkArray({ maxRows: 1 }),
    { name: 'footnote', type: 'textarea', localized: true, maxLength: 500 },
    sectionSettings({ backgrounds: ['white', 'ivory', 'tint'] }),
  ],
}

export const FaqBlock: Block = {
  slug: 'faq',
  labels: { singular: 'FAQ Accordion', plural: 'FAQ Accordions' },
  imageURL: thumb('faq'),
  admin: { group: 'Libraries' },
  fields: [
    ...sectionHeader(),
    {
      name: 'category',
      type: 'select',
      required: true,
      defaultValue: 'universities',
      options: [
        { label: 'Universities & Pathways', value: 'universities' },
        { label: 'Boarding Schools', value: 'boarding' },
        { label: 'Seasonal Camps', value: 'camps' },
        { label: 'Tourist & Visitor Visas', value: 'visas' },
        { label: 'General', value: 'general' },
      ],
      admin: { description: 'Shows the FAQs from the library in this category, in library order.' },
    },
    sectionSettings({ backgrounds: ['white', 'ivory', 'tint'] }),
  ],
}

export const CtaBlock: Block = {
  slug: 'cta',
  labels: { singular: 'CTA Panel', plural: 'CTA Panels' },
  imageURL: thumb('cta'),
  admin: { group: 'Content' },
  fields: [
    {
      name: 'style',
      type: 'select',
      defaultValue: 'navy',
      options: [
        { label: 'Navy band', value: 'navy' },
        { label: 'Navy band with photo', value: 'navy-photo' },
        { label: 'Soft panel', value: 'soft' },
        { label: 'Light band with floating highlight cards', value: 'light' },
      ],
    },
    ...sectionHeader(),
    linkArray({ maxRows: 2 }),
    { name: 'footnote', type: 'text', localized: true, maxLength: 140 },
    {
      name: 'highlights',
      type: 'array',
      maxRows: 3,
      admin: { initCollapsed: true },
      fields: [iconField(), { name: 'label', type: 'text', localized: true, required: true, maxLength: 40 }],
    },
    ...imageField(),
    sectionSettings({ backgrounds: ['white', 'ivory'] }),
  ],
}

export const FounderBlock: Block = {
  slug: 'founder',
  labels: { singular: 'Founder Profile', plural: 'Founder Profiles' },
  imageURL: thumb('founder'),
  admin: { group: 'Content' },
  fields: [
    eyebrow(),
    {
      type: 'row',
      fields: [
        { name: 'name', type: 'text', localized: true, required: true, maxLength: 60, admin: { width: '50%' } },
        { name: 'role', type: 'text', localized: true, maxLength: 80, admin: { width: '50%' } },
      ],
    },
    paragraphs('body', 'Biography', 2000),
    { name: 'quoteLabel', type: 'text', localized: true, maxLength: 60 },
    { name: 'quote', type: 'textarea', localized: true, maxLength: 500 },
    { name: 'signature', type: 'text', localized: true, maxLength: 60 },
    ...imageField('image', 'Portrait'),
    sectionSettings({ backgrounds: ['white', 'ivory'] }),
  ],
}

export const FeatureGroupsBlock: Block = {
  slug: 'featureGroups',
  labels: { singular: 'Feature Groups', plural: 'Feature Groups' },
  imageURL: thumb('featureGroups'),
  admin: { group: 'Content' },
  fields: [
    ...sectionHeader({ introLength: 1200 }),
    {
      name: 'subheading',
      type: 'text',
      localized: true,
      maxLength: 120,
      admin: { description: 'Serif line under the heading, e.g. "An Education That Goes Beyond the Classroom."' },
    },
    {
      name: 'numbered',
      type: 'checkbox',
      defaultValue: true,
      admin: { description: 'Show 01, 02, 03… on each group.' },
    },
    {
      name: 'groups',
      type: 'array',
      minRows: 1,
      maxRows: 6,
      admin: { initCollapsed: true },
      fields: [
        iconField(),
        { name: 'title', type: 'text', localized: true, required: true, maxLength: 90 },
        { name: 'intro', type: 'textarea', localized: true, maxLength: 400 },
        {
          name: 'items',
          type: 'array',
          maxRows: 6,
          admin: { initCollapsed: true },
          fields: [
            { name: 'title', type: 'text', localized: true, required: true, maxLength: 120 },
            paragraphs('text', 'Text', 900),
          ],
        },
      ],
    },
    { name: 'closingHeading', type: 'text', localized: true, maxLength: 90 },
    paragraphs('closingText', 'Closing text', 700),
    { name: 'footnote', type: 'textarea', localized: true, maxLength: 400 },
    sectionSettings({ backgrounds: ['white', 'ivory', 'tint'] }),
  ],
}

export const NoticeBlock: Block = {
  slug: 'notice',
  labels: { singular: 'Notice', plural: 'Notices' },
  imageURL: thumb('notice'),
  admin: { group: 'Content' },
  fields: [
    {
      name: 'text',
      type: 'textarea',
      localized: true,
      required: true,
      maxLength: 600,
      // Legal wording is guarded by the Pages beforeChange hook, which rejects the save
      // with an explanation instead of silently discarding the edit.
      admin: { description: 'If "Legal wording" is ticked, only the Owner can change this text.' },
    },
    {
      name: 'legal',
      label: 'Legal wording (Owner only)',
      type: 'checkbox',
      access: { update: ownerOnlyField },
      admin: {
        description:
          'Visa and admission disclaimers. Only the Owner can change or remove these. Decisions belong to the authorities and institutions.',
      },
    },
    sectionSettings({ backgrounds: ['white', 'ivory', 'tint'] }),
  ],
}

export const RichTextBlock: Block = {
  slug: 'richText',
  labels: { singular: 'Rich Text', plural: 'Rich Text' },
  imageURL: thumb('richText'),
  admin: { group: 'Content' },
  fields: [
    eyebrow(),
    { name: 'heading', type: 'text', localized: true, maxLength: 90 },
    { name: 'content', type: 'richText', localized: true, required: true },
    {
      name: 'width',
      type: 'select',
      defaultValue: 'narrow',
      options: [
        { label: 'Narrow (reading width)', value: 'narrow' },
        { label: 'Wide', value: 'wide' },
      ],
    },
    sectionSettings({ backgrounds: ['white', 'ivory', 'tint'] }),
  ],
}

export const BookingBlock: Block = {
  slug: 'booking',
  labels: { singular: 'Booking Form', plural: 'Booking Forms' },
  imageURL: thumb('booking'),
  admin: { group: 'Forms' },
  fields: [
    ...sectionHeader({ headingRequired: true }),
    { name: 'note', type: 'text', localized: true, maxLength: 120 },
    { name: 'contactHeading', type: 'text', localized: true, defaultValue: 'Contact us', maxLength: 40 },
    { name: 'formHeading', type: 'text', localized: true, defaultValue: 'Your enquiry', maxLength: 60 },
    {
      name: 'formNote',
      type: 'textarea',
      localized: true,
      maxLength: 400,
      // Kept identical to the seed copy: the translate script treats a value equal to the English as untranslated.
      defaultValue:
        'The purpose of this form is to understand your requests, preferences and goals, so that we can offer you the most suitable, personalised consultation. Fields marked * are required. Please do not send passports or financial records at this stage.',
      admin: { description: 'Shown above the first step of the form.' },
    },
    {
      name: 'consentText',
      type: 'textarea',
      localized: true,
      maxLength: 400,
      defaultValue:
        'I accept the processing of my personal data for the purpose of reviewing and responding to my request, in accordance with the Privacy Policy of PEREGRINE Consultancy.',
      admin: { description: 'The words "Privacy Policy" (or "Politikën e Privatësisë") become a link to the Privacy Policy page.' },
    },
    {
      name: 'successMessage',
      type: 'textarea',
      localized: true,
      maxLength: 300,
      defaultValue: 'Our team will contact you as soon as possible to discuss your request and the next steps.',
      admin: { description: 'Shown after "Your request has been sent successfully."' },
    },
    sectionSettings({ backgrounds: ['tint', 'ivory', 'white'] }),
  ],
}

export const PartnerFormBlock: Block = {
  slug: 'partnerForm',
  labels: { singular: 'Partnership Form', plural: 'Partnership Forms' },
  imageURL: thumb('partnerForm'),
  admin: { group: 'Forms' },
  fields: [
    ...sectionHeader(),
    { name: 'formHeading', type: 'text', localized: true, defaultValue: 'Partnership enquiry form', maxLength: 60 },
    {
      name: 'organisationTypes',
      type: 'array',
      admin: { initCollapsed: true, description: 'Choices for "Organisation type".' },
      fields: [{ name: 'label', type: 'text', localized: true, required: true, maxLength: 80 }],
    },
    {
      name: 'consentText',
      type: 'textarea',
      localized: true,
      maxLength: 400,
      defaultValue:
        "I agree to the processing of my personal information for the purpose of responding to this enquiry, in accordance with PEREGRINE's Privacy Policy.",
      admin: { description: 'The words "Privacy Policy" (or "Politikën e Privatësisë") become a link to the Privacy Policy page.' },
    },
    {
      name: 'successMessage',
      type: 'textarea',
      localized: true,
      maxLength: 300,
      defaultValue: 'Thank you for your interest. We will review your proposal and reply by email.',
    },
    sectionSettings({ backgrounds: ['ivory', 'white', 'tint'] }),
  ],
}

export const allBlocks: Block[] = [
  HeroBlock,
  SplitContentBlock,
  ServiceCardsBlock,
  CardGridBlock,
  DestinationsBlock,
  FieldsGridBlock,
  TimelineBlock,
  FaqBlock,
  CtaBlock,
  FounderBlock,
  FeatureGroupsBlock,
  NoticeBlock,
  RichTextBlock,
  BookingBlock,
  PartnerFormBlock,
]
