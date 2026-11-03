// Pure helpers behind the admin guardrails (ADMIN.md section 8). Kept free of
// Payload imports so they can be unit tested.

type MediaLike = {
  id: number | string
  alt?: string | null
  filename?: string | null
  licence?: { licenceConfirmed?: boolean | null } | null
}

const IMAGE_KEYS = new Set(['image'])

/** Every media id referenced by an `image` field anywhere inside a page layout. */
export function collectMediaIds(value: unknown, found = new Set<number | string>()): (number | string)[] {
  if (Array.isArray(value)) {
    value.forEach((v) => collectMediaIds(v, found))
  } else if (value && typeof value === 'object') {
    for (const [key, v] of Object.entries(value as Record<string, unknown>)) {
      if (IMAGE_KEYS.has(key) && v != null) {
        if (typeof v === 'number' || typeof v === 'string') found.add(v)
        else if (typeof v === 'object' && 'id' in (v as object)) found.add((v as { id: number | string }).id)
      } else {
        collectMediaIds(v, found)
      }
    }
  }
  return [...found]
}

/** Images that may not appear on a published page: missing alt text or licence confirmation. */
export function findUnpublishableMedia(media: MediaLike[]) {
  return media.filter((m) => !m.alt?.trim() || !m.licence?.licenceConfirmed)
}

export function unpublishableMediaMessage(media: MediaLike[]) {
  const names = media.map((m) => m.filename || `#${m.id}`).join(', ')
  return (
    `This page cannot be published yet. These images need alt text and a confirmed licence first: ${names}. ` +
    'Open each image in Media, fill in the alt text and tick "Licence confirmed". PEREGRINE may only show licensed photos.'
  )
}

type BlockLike = { blockType?: string; legal?: boolean | null; text?: string | null; id?: string | null }

/** The legal notices on a page, as a comparable signature. */
export function legalNoticeSignature(layout: unknown): string[] {
  if (!Array.isArray(layout)) return []
  return (layout as BlockLike[])
    .filter((b) => b?.blockType === 'notice' && b.legal)
    .map((b) => (b.text ?? '').trim())
}

/** True when a save would add, remove or change legal wording. */
export function legalNoticesChanged(prevLayout: unknown, nextLayout: unknown) {
  const a = legalNoticeSignature(prevLayout)
  const b = legalNoticeSignature(nextLayout)
  return a.length !== b.length || a.some((text, i) => text !== b[i])
}

/** Split a textarea into paragraphs on blank lines. */
export function toParagraphs(text?: string | null): string[] {
  if (!text) return []
  return text
    .split(/\n\s*\n/)
    .map((p) => p.trim())
    .filter(Boolean)
}
