import type { CollectionConfig, Endpoint, Field } from 'payload'

import { ownerOnly } from '@/access'
import { buildWorkbook, exportFilename, exportWhere, type ExportSlug } from '@/lib/enquiryExport'

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

const description = 'Form submissions. Only the Owner can see these. Use the Download buttons to save them as an Excel file.'

const exportEndpoint = (slug: ExportSlug): Endpoint => ({
  path: '/export.xlsx',
  method: 'get',
  handler: async (req) => {
    if (!req.user || (req.user as { role?: string }).role !== 'owner') {
      return Response.json({ error: 'Only the Owner can download enquiries.' }, { status: 403 })
    }
    const query = (req.query ?? {}) as Record<string, unknown>
    const sort = typeof query.sort === 'string' && /^-?[A-Za-z_]+$/.test(query.sort) ? query.sort : '-createdAt'
    const { docs } = await req.payload.find({
      collection: slug,
      where: exportWhere(slug, query),
      sort,
      limit: 10000,
      depth: 0,
      pagination: false,
      overrideAccess: false,
      req,
    })
    const body = await buildWorkbook(slug, docs as unknown as Record<string, unknown>[])
    const ids = typeof query.ids === 'string' ? query.ids : undefined
    return new Response(new Uint8Array(body), {
      headers: {
        'Content-Type': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        'Content-Disposition': `attachment; filename="${exportFilename(slug, ids, docs.length)}"`,
        'Cache-Control': 'no-store',
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
    description,
    components: {
      beforeListTable: ['/components/admin/ExportEnquiries#ConsultationListExport'],
      edit: { beforeDocumentControls: ['/components/admin/ExportEnquiries#ConsultationDocumentExport'] },
    },
  },
  access: { read: ownerOnly, create: () => false, update: ownerOnly, delete: ownerOnly },
  endpoints: [exportEndpoint('enquiries')],
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
    description,
    components: {
      beforeListTable: ['/components/admin/ExportEnquiries#PartnerListExport'],
      edit: { beforeDocumentControls: ['/components/admin/ExportEnquiries#PartnerDocumentExport'] },
    },
  },
  access: { read: ownerOnly, create: () => false, update: ownerOnly, delete: ownerOnly },
  endpoints: [exportEndpoint('partner-enquiries')],
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
