'use client'

import { ArrowUp } from 'lucide-react'
import { useEffect, useState } from 'react'

/** Floating "back to top" button, shown once the visitor has scrolled past most of the first screen. */
export function ScrollTopButton({ label }: { label: string }) {
  const [show, setShow] = useState(false)

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > window.innerHeight * 0.8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const toTop = () => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    window.scrollTo({ top: 0, behavior: reduce ? 'auto' : 'smooth' })
    // The button hides at the top, so keyboard focus moves to the start of the page content.
    document.getElementById('content')?.focus({ preventScroll: true })
  }

  return (
    <button type="button" className="totop" data-show={show || undefined} aria-label={label} title={label} onClick={toTop}>
      <ArrowUp size={20} aria-hidden="true" />
    </button>
  )
}
