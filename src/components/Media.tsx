import Image from 'next/image'

import { SITE_URL } from '@/lib/constants'
import { getDictionary } from '@/lib/dictionary'
import { getRequestLocale } from '@/lib/locale'
import type { Media as MediaDoc } from '@/payload-types'

type Props = {
  media?: number | MediaDoc | null
  brief?: string | null
  /** Sizes attribute for responsive loading. */
  sizes?: string
  priority?: boolean
  className?: string
  /** Placeholder background tone. */
  tone?: string
  size?: 'card' | 'hero' | 'thumbnail'
  /** Hide the photo-brief chip (e.g. on small cards). */
  hideBrief?: boolean
  /** Keep the top of the photo when its frame is cut shorter (side photos capped to the screen). */
  cropBottom?: boolean
}

/**
 * Aspect ratio for a frame that follows the photo's own shape, kept between 3:4 and 4:3
 * so portrait and landscape photos both fit the layout with little cropping.
 */
export function frameRatio(media?: number | MediaDoc | null): number | undefined {
  const doc = media && typeof media === 'object' ? media : null
  if (!doc?.width || !doc?.height) return undefined
  return Math.min(Math.max(doc.width / doc.height, 3 / 4), 4 / 3)
}

/**
 * Payload returns absolute upload URLs when serverURL is set. Our own files are served
 * as relative paths so next/image treats them as local (images.localPatterns).
 */
function localUrl(url?: string | null) {
  if (!url) return url
  return url.startsWith(SITE_URL) ? url.slice(SITE_URL.length) || '/' : url
}

/**
 * A licensed photo from the media library, or a navy placeholder with the photo brief
 * until one is supplied. Always fills its (positioned) parent.
 */
export function Media({ media, brief, sizes = '100vw', priority, className, tone, size, hideBrief, cropBottom }: Props) {
  const doc = media && typeof media === 'object' ? media : null
  const variant = size && doc?.sizes?.[size]?.url ? doc.sizes[size] : null
  const url = localUrl(variant?.url ?? doc?.url)

  if (doc && url) {
    const fx = doc.focalX ?? 50
    const fy = doc.focalY ?? 50
    return (
      <Image
        src={url}
        alt={doc.alt ?? ''}
        fill
        sizes={sizes}
        priority={priority}
        className={['object-cover', className].filter(Boolean).join(' ')}
        style={{ objectPosition: `${fx}% ${cropBottom ? 0 : fy}%` }}
      />
    )
  }

  return (
    <div className={['ph absolute inset-0', className].filter(Boolean).join(' ')} style={tone ? { backgroundColor: tone } : undefined} aria-hidden="true">
      <svg viewBox="0 0 600 400" preserveAspectRatio="xMidYMax meet" className="absolute inset-x-0 bottom-0 mx-auto h-[70%] w-auto opacity-[0.16]">
        <g fill="none" stroke="#E0C99B" strokeWidth="1.2">
          <path d="M180 400V250h240v150" />
          <path d="M200 250c0-70 45-110 100-110s100 40 100 110" />
          <path d="M300 140V105M290 105h20M300 105V80" />
          <path d="M170 250h260M190 300h220M210 250v150M250 250v150M350 250v150M390 250v150" />
          <path d="M240 210c10-30 30-50 60-50s50 20 60 50" />
        </g>
      </svg>
      {brief && !hideBrief && <span className="ph-chip">
          {getDictionary(getRequestLocale()).sections.licensedPhoto}: {brief}
        </span>}
    </div>
  )
}
