import Link from 'next/link'

import { getDictionary } from '@/lib/dictionary'
import { localizePath } from '@/lib/i18n'
import { getRequestLocale } from '@/lib/locale'

// Not-found pages receive no params; the [lang] layout has already set the language.
export default function NotFound() {
  const locale = getRequestLocale()
  const t = getDictionary(locale).notFound
  return (
    <section className="section bg-mist">
      <div className="wrap flex flex-col items-start gap-6">
        <p className="eyebrow rule">{t.eyebrow}</p>
        <h1 className="serif" style={{ fontSize: 'clamp(38px, 4.7vw, 60px)', lineHeight: 1.05 }}>
          {t.heading}
        </h1>
        <p className="muted lead max-w-[560px]">{t.body}</p>
        <div className="flex flex-wrap gap-3.5">
          <Link href={localizePath('/', locale)} className="btn btn-navy">
            {t.home}
          </Link>
          <Link href={localizePath('/book-a-consultation', locale)} className="btn btn-outline">
            {t.book}
          </Link>
        </div>
      </div>
    </section>
  )
}
