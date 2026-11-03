import * as Flags from 'country-flag-icons/react/1x1'

/** A country's flag in a white-ringed circle. Decorative: the card title names the country. */
export function FlagBadge({ code, className }: { code?: string | null; className?: string }) {
  const Svg = code ? Flags[code as keyof typeof Flags] : null
  if (!Svg) return null
  return (
    <span className={['flag-badge', className].filter(Boolean).join(' ')} aria-hidden="true">
      <Svg />
    </span>
  )
}
