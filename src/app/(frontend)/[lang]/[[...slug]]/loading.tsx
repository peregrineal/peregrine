/**
 * Shown the moment a visitor clicks to another page, until that page is ready: a thin light blue
 * bar running under the header. Without it a slow page (Home is the heaviest) looked like the
 * click had done nothing.
 */
export default function Loading() {
  return (
    <div role="status" aria-live="polite" className="relative min-h-[calc(100svh-80px)] bg-white">
      <div className="page-loading" aria-hidden="true" />
      <span className="sr-only">Loading…</span>
    </div>
  )
}
