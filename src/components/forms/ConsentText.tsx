import Link from 'next/link'

/**
 * The consent wording with its mention of the Privacy Policy turned into a link (opened in a
 * new tab so a half-filled form is not lost). If the wording has no such mention, the link is added.
 */
export function ConsentText({ text, phrase, linkLabel, href }: { text: string; phrase: string; linkLabel: string; href: string }) {
  const link = (label: string) => (
    <Link href={href} prefetch={false} target="_blank" rel="noopener" className="font-semibold text-navy underline underline-offset-2">
      {label}
    </Link>
  )
  const at = text.toLowerCase().indexOf(phrase.toLowerCase())
  if (at === -1) {
    return (
      <>
        {text} ({link(linkLabel)})
      </>
    )
  }
  return (
    <>
      {text.slice(0, at)}
      {link(text.slice(at, at + phrase.length))}
      {text.slice(at + phrase.length)}
    </>
  )
}
