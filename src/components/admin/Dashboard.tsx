import type { Payload, TypedUser } from 'payload'

import { pathForSlug } from '@/lib/constants'

type Props = { payload: Payload; user?: TypedUser | null }

type Block = { blockType: string; blockName?: string | null; settings?: { pendingApproval?: boolean | null; pendingLabel?: string | null } }

const card: React.CSSProperties = {
  border: '1px solid var(--theme-elevation-150)',
  borderRadius: 10,
  padding: '20px 22px',
  background: 'var(--theme-elevation-0)',
}
const h: React.CSSProperties = { margin: '0 0 12px', fontSize: 18 }
const list: React.CSSProperties = { margin: 0, paddingLeft: 18, display: 'grid', gap: 6, fontSize: 15 }

export async function Dashboard({ payload, user }: Props) {
  if (!user) return null

  const [pages, media] = await Promise.all([
    payload.find({ collection: 'pages', limit: 50, depth: 0, sort: '-updatedAt', draft: true, overrideAccess: true }),
    payload.find({ collection: 'media', limit: 500, depth: 0, overrideAccess: true }),
  ])

  const pending = pages.docs.flatMap((p) =>
    ((p.layout ?? []) as Block[])
      .filter((b) => b.settings?.pendingApproval)
      .map((b, i) => ({ id: `${p.id}-${i}`, pageId: p.id, page: p.title, label: b.settings?.pendingLabel || b.blockType })),
  )
  const imageIssues = media.docs.filter((m) => !m.alt?.trim() || !m.licence?.licenceConfirmed)

  return (
    <div style={{ display: 'grid', gap: 20, marginBottom: 32 }}>
      <div>
        <h2 style={{ margin: '0 0 6px', fontSize: 26 }}>Welcome{user && 'name' in user && user.name ? `, ${user.name}` : ''}</h2>
        <p style={{ margin: 0, fontSize: 16, color: 'var(--theme-elevation-600)' }}>
          Open a page to edit its sections. Changes are saved as drafts until you press Publish.
        </p>
      </div>
      <div style={{ display: 'grid', gap: 20, gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))' }}>
        <section style={card}>
          <h3 style={h}>Pages</h3>
          <ul style={list}>
            {pages.docs.map((p) => (
              <li key={p.id}>
                <a href={`/admin/collections/pages/${p.id}`}>{p.title}</a>{' '}
                <a href={pathForSlug(p.slug)} target="_blank" rel="noopener" style={{ fontSize: 13 }}>
                  view
                </a>
              </li>
            ))}
          </ul>
        </section>
        <section style={card}>
          <h3 style={h}>Recently edited</h3>
          <ul style={list}>
            {pages.docs.slice(0, 6).map((p) => (
              <li key={p.id}>
                <a href={`/admin/collections/pages/${p.id}`}>{p.title}</a>{' '}
                <span style={{ fontSize: 13, color: 'var(--theme-elevation-600)' }}>
                  {new Date(p.updatedAt).toLocaleString('en-GB', { dateStyle: 'medium', timeStyle: 'short' })}
                </span>
              </li>
            ))}
          </ul>
        </section>
        <section style={card}>
          <h3 style={h}>Pending approval ({pending.length})</h3>
          {pending.length ? (
            <ul style={list}>
              {pending.map((item) => (
                <li key={item.id}>
                  <a href={`/admin/collections/pages/${item.pageId}`}>{item.page}</a>: {item.label}
                </li>
              ))}
            </ul>
          ) : (
            <p style={{ margin: 0 }}>Nothing is waiting for approval.</p>
          )}
        </section>
        <section style={card}>
          <h3 style={h}>Images needing attention ({imageIssues.length})</h3>
          {imageIssues.length ? (
            <ul style={list}>
              {imageIssues.slice(0, 12).map((m) => (
                <li key={m.id}>
                  <a href={`/admin/collections/media/${m.id}`}>{m.filename}</a>:{' '}
                  {!m.alt?.trim() ? 'missing alt text' : 'licence not confirmed'}
                </li>
              ))}
            </ul>
          ) : (
            <p style={{ margin: 0 }}>All images have alt text and a confirmed licence.</p>
          )}
        </section>
      </div>
    </div>
  )
}
