import type { Metadata, Viewport } from 'next'
import { Montserrat } from 'next/font/google'
import localFont from 'next/font/local'
import type { ReactNode } from 'react'

import { Footer } from '@/components/Footer'
import { Header } from '@/components/Header'
import { ScrollTopButton } from '@/components/ScrollTopButton'
import { WarmImages } from '@/components/WarmImages'
import { WhatsAppButton } from '@/components/WhatsAppButton'
import { siteDefaults } from '@/components/siteDefaults'
import { CANONICAL_URL } from '@/lib/constants'
import { getFooter, getHeader, getSiteSettings } from '@/lib/data'
import { getDictionary } from '@/lib/dictionary'
import { htmlLang, LOCALES } from '@/lib/i18n'
import { setRequestLocale } from '@/lib/locale'
import { jsonLdString, organizationJsonLd, shareImageUrl, shareMetadata, siteNameFrom } from '@/lib/seo'

import '../globals.css'

// Adobe Garamond Pro, supplied by the client (src/fonts). Only Regular and Bold exist, so
// headings set at 500 use Regular and those at 600 use Bold.
const garamond = localFont({
  src: [
    { path: '../../../fonts/AGaramondPro-Regular.otf', weight: '400', style: 'normal' },
    { path: '../../../fonts/AGaramondPro-Italic.otf', weight: '400', style: 'italic' },
    { path: '../../../fonts/AGaramondPro-Bold.otf', weight: '700', style: 'normal' },
    { path: '../../../fonts/AGaramondPro-BoldItalic.otf', weight: '700', style: 'italic' },
  ],
  variable: '--font-garamond',
  display: 'swap',
  fallback: ['Garamond', 'Georgia', 'Times New Roman', 'serif'],
})

const montserrat = Montserrat({
  subsets: ['latin', 'latin-ext'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-montserrat',
  display: 'swap',
})

type Props = { children: ReactNode; params: Promise<{ lang: string }> }

export const generateStaticParams = () => LOCALES.map((lang) => ({ lang }))

export async function generateMetadata({ params }: Omit<Props, 'children'>): Promise<Metadata> {
  const locale = setRequestLocale((await params).lang)
  const t = getDictionary(locale)
  const settings = await getSiteSettings(locale)
  return {
    metadataBase: new URL(CANONICAL_URL),
    title: { default: t.meta.title, template: '%s' },
    description: t.meta.description,
    icons: {
      icon: [
        { url: '/favicon.ico', sizes: 'any' },
        { url: '/brand/favicon-32.png', sizes: '32x32', type: 'image/png' },
        { url: '/brand/icon-192.png', sizes: '192x192', type: 'image/png' },
      ],
      apple: '/brand/apple-icon.png',
    },
    ...shareMetadata({
      siteName: siteNameFrom(settings),
      locale,
      image: shareImageUrl(settings?.seoDefaults?.image),
    }),
  }
}

export const viewport: Viewport = { themeColor: '#0A2240' }

export default async function FrontendLayout({ children, params }: Props) {
  const locale = setRequestLocale((await params).lang)
  const [header, footer, settings] = await Promise.all([getHeader(locale), getFooter(locale), getSiteSettings(locale)])
  const t = getDictionary(locale)
  return (
    // data-scroll-behavior lets Next.js switch off the smooth scrolling from globals.css while it
    // scrolls a new page to the top, so a page change never lands partway down the new page.
    <html lang={htmlLang[locale]} className={`${garamond.variable} ${montserrat.variable}`} data-scroll-behavior="smooth">
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: jsonLdString(organizationJsonLd(settings, siteDefaults, t.meta.description)) }}
        />
        <Header data={header} locale={locale} />
        <main id="content" tabIndex={-1} className="outline-none">
          {children}
        </main>
        <Footer data={footer} settings={settings} locale={locale} />
        <WarmImages />
        {/* Floating actions, bottom right: back to top stacks above WhatsApp. */}
        <div className="wa">
          <ScrollTopButton label={t.header.backToTop} />
          <WhatsAppButton number={settings?.whatsappNumber ?? '355694242373'} label={t.contact.whatsappAria} />
        </div>
      </body>
    </html>
  )
}
