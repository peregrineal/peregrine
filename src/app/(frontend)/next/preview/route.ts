import { draftMode } from 'next/headers'
import { redirect } from 'next/navigation'
import type { NextRequest } from 'next/server'

import { pathForSlug } from '@/lib/constants'
import { getPayloadClient } from '@/lib/data'
import { DEFAULT_LOCALE, isLocale } from '@/lib/i18n'

/** Turns on Next.js Draft Mode for logged-in editors and opens the page. */
export async function GET(req: NextRequest) {
  const secret = req.nextUrl.searchParams.get('secret')
  const slug = req.nextUrl.searchParams.get('slug') || 'home'
  const lang = req.nextUrl.searchParams.get('locale')
  const locale = isLocale(lang) ? lang : DEFAULT_LOCALE

  if (!process.env.PREVIEW_SECRET || secret !== process.env.PREVIEW_SECRET) {
    return new Response('Invalid preview link.', { status: 403 })
  }

  const payload = await getPayloadClient()
  const { user } = await payload.auth({ headers: req.headers })
  if (!user) return new Response('Please log in to the admin to preview drafts.', { status: 403 })

  if (!/^[a-z0-9-]+$/.test(slug)) return new Response('Invalid page.', { status: 400 })

  const draft = await draftMode()
  draft.enable()
  redirect(pathForSlug(slug, locale))
}
