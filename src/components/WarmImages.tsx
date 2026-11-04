'use client'

import { usePathname } from 'next/navigation'
import { useEffect } from 'react'

/**
 * Photos below the first screen load lazily, so the first screen gets the bandwidth. But
 * section scrolling jumps a whole screen at a time, and a lazy photo then only starts loading
 * once its section is already in view. Once the page has loaded and the browser is idle,
 * this fetches the remaining photos in the background so they are ready when the visitor
 * gets there. Runs again after each client-side navigation.
 */
export function WarmImages() {
  const pathname = usePathname()

  useEffect(() => {
    let idle = 0
    let timer = 0
    const warm = () => {
      document.querySelectorAll<HTMLImageElement>('#content img[loading="lazy"]').forEach((img) => {
        img.loading = 'eager'
      })
    }
    const schedule = () => {
      // Safari has no requestIdleCallback.
      if (typeof window.requestIdleCallback === 'function') idle = window.requestIdleCallback(warm, { timeout: 2000 })
      else timer = window.setTimeout(warm, 300)
    }
    if (document.readyState === 'complete') schedule()
    else window.addEventListener('load', schedule, { once: true })
    return () => {
      window.removeEventListener('load', schedule)
      if (idle) window.cancelIdleCallback(idle)
      window.clearTimeout(timer)
    }
  }, [pathname])

  return null
}
