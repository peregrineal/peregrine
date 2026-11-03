import Image from 'next/image'

/** "Developed by DuaDev" in the footer's bottom row. The label comes from the dictionary. */
export function AgencyCredit({ label }: { label: string }) {
  return (
    <a
      href="https://duadev.al"
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`${label} DuaDev`}
      className="group inline-flex min-h-11 items-center gap-2 text-[12px] lg:min-h-[34px]"
    >
      <span className="leading-none text-white/50 transition-colors group-hover:text-white/80">{label}</span>
      <Image
        src="/brand/duadev-logo.png"
        alt=""
        width={299}
        height={60}
        className="h-3 w-auto opacity-80 transition-opacity group-hover:opacity-100"
      />
    </a>
  )
}
