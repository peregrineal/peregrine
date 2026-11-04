'use client'

import { useEffect } from 'react'

/** Smallest scale a section may be shrunk to before it gets extra stops instead (15px text stays at 12px). */
const MIN_ZOOM = 0.8
const DURATION = 720
const easeOut = (t: number) => 1 - Math.pow(1 - t, 3)
/** The mobile menu is always in the page; it only counts while it is open. */
const menuOpen = () => Boolean(document.querySelector('#menu-mob[data-open]'))

/**
 * Section-by-section scrolling, as on oxaliseducation.com (client request, 31 October 2026).
 * Each section fills at least one screen under the header, its content centred. One notch of the
 * mouse wheel, one swipe, an arrow key, Page Up/Down or the space bar moves to the next or
 * previous section. A section taller than the screen gets in-between stops, so nothing is skipped.
 * On desktop a slightly too tall section is scaled down to fit, but only when that is enough
 * (no further than MIN_ZOOM); otherwise it keeps its size and uses the extra stops.
 * With reduced motion the page jumps instead of gliding. Below 1024px it is off: the page
 * scrolls natively and sections keep their natural height.
 */
export function SectionScroll() {
  useEffect(() => {
    const root = document.documentElement
    const main = document.getElementById('content')
    if (!main) return
    const desktop = window.matchMedia('(min-width: 1024px)')
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)')
    const sections = () => Array.from(main.querySelectorAll<HTMLElement>(':scope > section'))
    const headerHeight = () => document.querySelector<HTMLElement>('body > header, header.sticky')?.offsetHeight ?? 80

    let active = false
    let animating = false
    let target: number | null = null
    let frame = 0
    let run = 0

    // Fit every section to the screen: scale it down if it is too tall, centre it if it is short.
    const fit = () => {
      const avail = window.innerHeight - headerHeight()
      for (const s of sections()) {
        if (!active) {
          s.style.removeProperty('zoom')
          s.style.removeProperty('--fit')
          s.style.removeProperty('min-height')
          s.classList.remove('fit')
          continue
        }
        // The largest scale at which the section fits. Scaling keeps the content column at its
        // full on-screen width (--fit in globals.css), so lines get longer and fewer as it shrinks.
        const fitsAt = (zoom: number) => {
          if (zoom < 1) {
            s.style.zoom = String(zoom)
            s.style.setProperty('--fit', String(zoom))
          } else {
            s.style.removeProperty('zoom')
            s.style.removeProperty('--fit')
          }
          return s.getBoundingClientRect().height <= avail + 1
        }
        s.style.removeProperty('min-height')
        let zoom = 1
        // Scale only on desktop, and only when that makes the whole section fit.
        if (!fitsAt(1) && desktop.matches) {
          if (!fitsAt(MIN_ZOOM)) zoom = 1
          else {
            let lo = MIN_ZOOM
            let hi = 1
            for (let i = 0; i < 6; i++) {
              const mid = (lo + hi) / 2
              if (fitsAt(mid)) lo = mid
              else hi = mid
            }
            zoom = Math.floor(lo * 1000) / 1000
          }
          fitsAt(zoom)
        }
        s.style.minHeight = `${Math.ceil(avail / zoom)}px`
        s.classList.add('fit')
      }
    }

    // Where the page can rest: the top of every section, plus in-between stops in sections
    // that are still taller than the screen, plus the very bottom (the footer).
    const stops = () => {
      const header = headerHeight()
      const avail = window.innerHeight - header
      const max = root.scrollHeight - window.innerHeight
      const points: number[] = []
      for (const s of sections()) {
        const rect = s.getBoundingClientRect()
        const top = rect.top + window.scrollY - header
        const extra = rect.height - avail
        points.push(top)
        if (extra > avail * 0.1) {
          for (let e = avail * 0.8; e < extra; e += avail * 0.8) points.push(top + e)
          points.push(top + extra)
        }
      }
      points.push(max)
      const sorted = points.map((p) => Math.round(Math.min(Math.max(p, 0), max))).sort((a, b) => a - b)
      return sorted.filter((p, i) => i === 0 || p - sorted[i - 1] > 8)
    }

    const scrollToStop = (list: number[], index: number) => {
      const to = list[index]
      if (to === undefined) return
      target = index
      animating = true
      const from = window.scrollY
      const start = performance.now()
      const duration = reduced.matches ? 0 : DURATION
      const id = ++run
      cancelAnimationFrame(frame)
      const tick = (now: number) => {
        if (id !== run) return
        const t = duration ? Math.min(1, (now - start) / duration) : 1
        window.scrollTo({ top: from + (to - from) * easeOut(t), behavior: 'instant' })
        if (t < 1) frame = requestAnimationFrame(tick)
        else {
          animating = false
          target = null
        }
      }
      frame = requestAnimationFrame(tick)
    }

    const step = (dir: 1 | -1) => {
      const list = stops()
      let index: number
      if (animating && target !== null) index = target + dir
      else {
        const y = window.scrollY
        index = dir > 0 ? list.findIndex((p) => p > y + 8) : list.length - 1 - [...list].reverse().findIndex((p) => p < y - 8)
        if (dir < 0 && index === list.length) index = -1
      }
      if (index >= 0 && index < list.length) scrollToStop(list, index)
    }

    // Wheel: one gesture moves one stop. A trackpad or free-spinning wheel sends a stream of
    // events; the stream counts once, unless a fresh, stronger swipe starts during it.
    let last = 0
    let lastDir = 0
    let peak = 0
    let prev = 0
    let lastStepAt = 0
    const onWheel = (e: WheelEvent) => {
      if (!active || e.ctrlKey || menuOpen()) return
      e.preventDefault()
      const dy = e.deltaY
      if (Math.abs(dy) < 4 || Math.abs(dy) <= Math.abs(e.deltaX)) return
      const dir = dy > 0 ? 1 : -1
      const size = Math.abs(dy)
      const now = performance.now()
      const newGesture = now - last > 100
      const turned = lastDir !== 0 && dir !== lastDir
      const freshSwipe = !newGesture && !turned && now - lastStepAt > 180 && prev < peak * 0.4 && size > Math.max(12, prev * 1.8)
      last = now
      if (!newGesture && !turned && !freshSwipe) {
        peak = Math.max(peak, size)
        prev = size
        return
      }
      lastDir = dir
      peak = size
      prev = size
      lastStepAt = now
      step(dir)
    }

    const onKey = (e: KeyboardEvent) => {
      if (!active || e.defaultPrevented || e.altKey || e.ctrlKey || e.metaKey || menuOpen()) return
      const el = e.target as HTMLElement | null
      if (el?.closest('input, textarea, select, [contenteditable="true"]')) return
      if (e.key === ' ' && el?.closest('button, a, summary')) return
      let dir: 1 | -1 | null = null
      if (e.key === 'ArrowDown' || e.key === 'PageDown' || (e.key === ' ' && !e.shiftKey)) dir = 1
      else if (e.key === 'ArrowUp' || e.key === 'PageUp' || (e.key === ' ' && e.shiftKey)) dir = -1
      else if (e.key === 'Home' || e.key === 'End') {
        e.preventDefault()
        const list = stops()
        scrollToStop(list, e.key === 'Home' ? 0 : list.length - 1)
        return
      }
      if (dir === null) return
      e.preventDefault()
      step(dir)
    }

    // Touch: one swipe moves one stop. Sideways swipes (the destinations carousel) stay native.
    let touchX = 0
    let touchY = 0
    let lastY = 0
    let axis: 'x' | 'y' | null = null
    let skipTouch = false
    const onTouchStart = (e: TouchEvent) => {
      const t = e.touches[0]
      skipTouch = !active || e.touches.length > 1 || menuOpen() || !!(e.target as HTMLElement | null)?.closest('input, textarea, select')
      if (!t || skipTouch) return
      touchX = t.clientX
      touchY = lastY = t.clientY
      axis = null
    }
    const onTouchMove = (e: TouchEvent) => {
      const t = e.touches[0]
      if (!t || skipTouch) return
      if (!axis) {
        const dx = Math.abs(t.clientX - touchX)
        const dy = Math.abs(t.clientY - touchY)
        if (dx < 6 && dy < 6) return
        axis = dx > dy ? 'x' : 'y'
      }
      if (axis === 'y') {
        lastY = t.clientY
        e.preventDefault()
      }
    }
    const onTouchEnd = () => {
      if (skipTouch || axis !== 'y') return
      const moved = touchY - lastY
      if (Math.abs(moved) >= 44) step(moved > 0 ? 1 : -1)
    }

    const update = () => {
      // Phones and tablets scroll freely (client request, 4 November 2026); only desktop snaps.
      active = desktop.matches
      root.toggleAttribute('data-section-scroll', active)
      // Anchor links land exactly where a section starts, under the header; side photos are
      // capped to the screen height (globals.css).
      root.style.setProperty('--header-h', `${headerHeight()}px`)
      if (active) root.style.scrollPaddingTop = `${headerHeight()}px`
      else root.style.removeProperty('scroll-padding-top')
      fit()
    }

    let timer = 0
    let size = { w: window.innerWidth, h: window.innerHeight }
    const later = () => {
      // A phone's address bar sliding in and out changes the height a little: not a real resize.
      const barOnly = window.matchMedia('(pointer: coarse)').matches && Math.abs(window.innerHeight - size.h) < 150
      if (window.innerWidth === size.w && (barOnly || window.innerHeight === size.h)) return
      size = { w: window.innerWidth, h: window.innerHeight }
      window.clearTimeout(timer)
      timer = window.setTimeout(update, 120)
    }
    // Sections are fitted on load and on resize only. Opening a FAQ answer or a Blueprint stage
    // just lets the section grow (the wheel then gets an extra stop); re-fitting while the visitor
    // reads would rescale the section under them and make the page jump.

    update()
    document.fonts?.ready.then(update)
    window.addEventListener('load', update)
    window.addEventListener('resize', later)
    desktop.addEventListener('change', update)
    document.addEventListener('wheel', onWheel, { capture: true, passive: false })
    document.addEventListener('keydown', onKey)
    document.addEventListener('touchstart', onTouchStart, { capture: true, passive: true })
    document.addEventListener('touchmove', onTouchMove, { capture: true, passive: false })
    document.addEventListener('touchend', onTouchEnd, { capture: true })
    return () => {
      cancelAnimationFrame(frame)
      window.clearTimeout(timer)
      window.removeEventListener('load', update)
      window.removeEventListener('resize', later)
      desktop.removeEventListener('change', update)
      document.removeEventListener('wheel', onWheel, { capture: true })
      document.removeEventListener('keydown', onKey)
      document.removeEventListener('touchstart', onTouchStart, { capture: true })
      document.removeEventListener('touchmove', onTouchMove, { capture: true })
      document.removeEventListener('touchend', onTouchEnd, { capture: true })
      active = false
      fit()
      root.removeAttribute('data-section-scroll')
      root.style.removeProperty('scroll-padding-top')
      root.style.removeProperty('--header-h')
    }
  }, [])

  return null
}
