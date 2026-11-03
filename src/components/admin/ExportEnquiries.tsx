'use client'

import { useAuth, useDocumentInfo, useListQuery, useSelection } from '@payloadcms/ui'
import { Download } from 'lucide-react'

// Styles live in src/app/(payload)/custom.scss (.peregrine-export*). Admin text is kept at 16px for the Owner.
const primary = 'peregrine-export-btn peregrine-export-btn--primary'
const secondary = 'peregrine-export-btn'

type Slug = 'enquiries' | 'partner-enquiries'

const isOwner = (user: unknown) => (user as { role?: string } | null)?.role === 'owner'

function exportUrl(slug: Slug, params: Record<string, string>) {
  const query = new URLSearchParams(Object.entries(params).filter(([, v]) => v !== '')).toString()
  return `/api/${slug}/export.xlsx${query ? `?${query}` : ''}`
}

const plural = (n: number) => (n === 1 ? 'enquiry' : 'enquiries')

/** Above the enquiry list: download everything shown (respecting filters and search), or only the ticked rows. */
function ListExport({ slug }: { slug: Slug }) {
  const { user } = useAuth()
  const { query, data } = useListQuery()
  const { selectedIDs, selectAll, count } = useSelection()
  if (!isOwner(user)) return null

  const where = query?.where && Object.keys(query.where).length ? JSON.stringify(query.where) : ''
  const search = typeof query?.search === 'string' ? query.search : ''
  const sort = typeof query?.sort === 'string' ? query.sort : ''
  const filtered = Boolean(where || search)
  const total = data?.totalDocs ?? 0
  const pickedSome = count > 0 && selectAll !== 'allAvailable'

  return (
    <div className="peregrine-export">
      <a href={exportUrl(slug, { where, search, sort })} className={pickedSome ? secondary : primary}>
        <Download size={18} aria-hidden />
        {filtered ? `Download filtered (${total})` : `Download all (${total})`}
      </a>
      {pickedSome && (
        <a href={exportUrl(slug, { ids: selectedIDs.join(','), sort })} className={primary}>
          <Download size={18} aria-hidden />
          Download selected ({count})
        </a>
      )}
      <p className="peregrine-export__hint">
        {pickedSome
          ? `${count} ${plural(count)} ticked.`
          : 'Excel file. Tick rows to download only those, or filter the list (for example by date or status) first.'}
      </p>
    </div>
  )
}

/** Inside one enquiry: download just this one. */
function DocumentExport({ slug }: { slug: Slug }) {
  const { user } = useAuth()
  const { id } = useDocumentInfo()
  if (!isOwner(user) || !id) return null
  return (
    <a href={exportUrl(slug, { ids: String(id) })} className={`${secondary} peregrine-export-btn--small`}>
      <Download size={18} aria-hidden />
      Download Excel
    </a>
  )
}

export const ConsultationListExport = () => <ListExport slug="enquiries" />
export const PartnerListExport = () => <ListExport slug="partner-enquiries" />
export const ConsultationDocumentExport = () => <DocumentExport slug="enquiries" />
export const PartnerDocumentExport = () => <DocumentExport slug="partner-enquiries" />
