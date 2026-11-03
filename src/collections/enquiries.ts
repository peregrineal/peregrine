import type { CollectionConfig, Endpoint, Field } from 'payload'

import { ownerOnly } from '@/access'

const readOnly = { readOnly: true }

const statusFields: Field[] = [
  {
    name: 'status',
    type: 'select',
    defaultValue: 'new',
    options: [
      { label: 'New', value: 'new' },
      { label: 'Contacted', value: 'contacted' },
      { label: 'Closed', value: 'closed' },
    ],
    admin: { position: 'sidebar' },
  },
  { name: 'internalNotes', type: 'textarea', admin: { position: 'sidebar' } },
  {
    name: 'language',
    type: 'select',
    defaultValue: 'en',
    options: [
      { label: 'English', value: 'en' },
      { label: 'Shqip', value: 'sq' },
    ],
    admin: { position: 'sidebar', readOnly: true, description: 'The language of the page the form was sent from.' },
  },
]

const exportDescription = (slug: string) =>
  `Form submissions. Only the Owner can see these. Download all as CSV: /api/${slug}/export.csv`

function toCsv(rows: Record<string, unknown>[], columns: string[]) {
  const item = (v: unknown) => {
    const row = v as { question?: string; answer?: string } | null
    return row && typeof row === 'object' && 'question' in row ? `${row.question}: ${row.answer}` : String(v)
  }
  const cell = (v: unknown) => {
    const s = Array.isArray(v) ? v.map(item).join('; ') : v == null ? '' : String(v)
    return /[",\n]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s
  }
  return [columns.join(','), ...rows.map((r) => columns.map((c) => cell(r[c])).join(','))].join('\n')
}

const csvEndpoint = (slug: 'enquiries' | 'partner-enquiries', columns: string[]): Endpoint => ({
  path: '/export.csv',
  method: 'get',
  handler: async (req) => {
    if (!req.user || (req.user as { role?: string }).role !== 'owner') {
      return Response.json({ error: 'Only the Owner can export enquiries.' }, { status: 403 })
    }
    const { docs } = await req.payload.find({ collection: slug, limit: 10000, depth: 0, sort: '-createdAt', req })
    const body = toCsv(docs as unknown as Record<string, unknown>[], columns)
    return new Response(body, {
      headers: {
        'Content-Type': 'text/csv; charset=utf-8',
        'Content-Disposition': `attachment; filename="${slug}-${new Date().toISOString().slice(0, 10)}.csv"`,
      },
    })
  },
})

export const Enquiries: CollectionConfig = {
  slug: 'enquiries',
  labels: { singular: 'Consultation Enquiry', plural: 'Consultation Enquiries' },
  admin: {
    group: 'Enquiries',
    useAsTitle: 'email',
    defaultColumns: ['firstName', 'lastName', 'service', 'status', 'createdAt'],
    description: exportDescription('enquiries'),
  },
  access: { read: ownerOnly, create: () => false, update: ownerOnly, delete: ownerOnly },
  endpoints: [
    csvEndpoint('enquiries', [
      'createdAt', 'status', 'language', 'firstName', 'lastName', 'gender', 'email', 'phone', 'role', 'service',
      'participantName', 'participantAge', 'answers', 'message',
    ]),
  ],
  fields: [
    {
      type: 'row',
      fields: [
        { name: 'firstName', type: 'text', required: true, admin: readOnly },
        { name: 'lastName', type: 'text', required: true, admin: readOnly },
      ],
    },
    {
      type: 'row',
      fields: [
        { name: 'email', type: 'email', required: true, admin: readOnly },
        { name: 'phone', type: 'text', required: true, admin: readOnly },
      ],
    },
    {
      type: 'row',
      fields: [
        { name: 'gender', type: 'text', admin: readOnly },
        { name: 'role', label: 'Filled in by', type: 'text', admin: readOnly },
      ],
    },
    { name: 'service', type: 'text', required: true, admin: readOnly },
    {
      type: 'row',
      admin: { condition: (data) => Boolean(data?.participantName) },
      fields: [
        { name: 'participantName', label: 'Student / participant', type: 'text', admin: readOnly },
        { name: 'participantAge', label: 'Age', type: 'text', admin: readOnly },
      ],
    },
    {
      name: 'answers',
      label: 'Answers about the service',
      type: 'array',
      admin: { readOnly: true, description: 'The questions for the chosen service, as the visitor answered them.' },
      fields: [
        { name: 'question', type: 'text', admin: readOnly },
        { name: 'answer', type: 'textarea', admin: readOnly },
      ],
    },
    { name: 'message', label: 'Additional information', type: 'textarea', admin: readOnly },
    // From the first version of the form; shown only on enquiries that have them.
    { name: 'detail', label: 'Follow-up answer', type: 'text', admin: { readOnly: true, condition: (data) => Boolean(data?.detail) } },
    { name: 'destinations', type: 'text', admin: { readOnly: true, condition: (data) => Boolean(data?.destinations) } },
    { name: 'consent', type: 'checkbox', admin: readOnly },
    ...statusFields,
  ],
}

export const PartnerEnquiries: CollectionConfig = {
  slug: 'partner-enquiries',
  labels: { singular: 'Partnership Enquiry', plural: 'Partnership Enquiries' },
  admin: {
    group: 'Enquiries',
    useAsTitle: 'organisation',
    defaultColumns: ['organisation', 'organisationType', 'country', 'status', 'createdAt'],
    description: exportDescription('partner-enquiries'),
  },
  access: { read: ownerOnly, create: () => false, update: ownerOnly, delete: ownerOnly },
  endpoints: [
    csvEndpoint('partner-enquiries', [
      'createdAt', 'status', 'language', 'organisation', 'organisationType', 'country', 'contact', 'email', 'website', 'proposal',
    ]),
  ],
  fields: [
    { name: 'organisation', type: 'text', required: true, admin: readOnly },
    {
      type: 'row',
      fields: [
        { name: 'organisationType', type: 'text', required: true, admin: readOnly },
        { name: 'country', type: 'text', required: true, admin: readOnly },
      ],
    },
    { name: 'contact', label: 'Contact person & position', type: 'text', required: true, admin: readOnly },
    {
      type: 'row',
      fields: [
        { name: 'email', type: 'email', required: true, admin: readOnly },
        { name: 'website', type: 'text', admin: readOnly },
      ],
    },
    { name: 'proposal', type: 'textarea', required: true, admin: readOnly },
    { name: 'consent', type: 'checkbox', admin: readOnly },
    ...statusFields,
  ],
}
