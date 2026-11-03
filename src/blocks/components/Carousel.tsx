'use client'

import { ChevronLeft, ChevronRight } from 'lucide-react'
import { useCallback, useEffect, useRef, useState, type ReactNode } from 'react'

type Props = { id: string; label: string; previousLabel: string; nextLabel: string; children: ReactNode }

/** Horizontal snap track of destinations, centred when they all fit, with previous/next buttons beside it when they do not. Swipe and keyboard scrolling are native. */
export function Carousel({ id, label, previousLabel, nextLabel, children }: Props) {
  const track = useRef<HTMLUListElement>(null)
  const [edges, setEdges] = useState({ start: true, end: false })

  const update = useCallback(() => {
    const t = track.current
    if (!t) return
    setEdges({ start: t.scrollLeft <= 4, end: t.scrollLeft + t.clientWidth >= t.scrollWidth - 4 })
  }, [])

  useEffect(() => {
    update()
    const t = track.current
    if (!t) return
    t.addEventListener('scroll', update, { passive: true })
    window.addEventListener('resize', update)
    return () => {
      t.removeEventListener('scroll', update)
      window.removeEventListener('resize', update)
    }
  }, [update])

  const scroll = (dir: number) => {
    const t = track.current
    if (t) t.scrollBy({ left: dir * t.clientWidth * 0.9 })
  }

  // Arrows only when there is more to scroll to; phones swipe instead.
  const arrows = !(edges.start && edges.end)
  return (
    <div className="relative md:px-14">
      <button
        type="button"
        className={`arrow dest-arrow left-0 ${arrows ? '' : 'hidden'}`}
        aria-label={previousLabel}
        aria-controls={id}
        onClick={() => scroll(-1)}
        disabled={edges.start}
      >
        <ChevronLeft size={20} aria-hidden="true" />
      </button>
      <ul id={id} ref={track} className="track" tabIndex={0} aria-label={label}>
        {children}
      </ul>
      <button
        type="button"
        className={`arrow dest-arrow right-0 ${arrows ? '' : 'hidden'}`}
        aria-label={nextLabel}
        aria-controls={id}
        onClick={() => scroll(1)}
        disabled={edges.end}
      >
        <ChevronRight size={20} aria-hidden="true" />
      </button>
    </div>
  )
}
