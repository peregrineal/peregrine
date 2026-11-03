import { NextResponse, type NextRequest } from 'next/server'

import { getPayloadClient } from '@/lib/data'
import { getDictionary } from '@/lib/dictionary'
import { partnerSchema, rateLimited, validatePartner } from '@/lib/forms'
import { isLocale } from '@/lib/i18n'
import { sendEnquiry } from '@/lib/notify'

const clientKey = (req: NextRequest) => req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || req.headers.get('x-real-ip') || 'unknown'

export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => null)
  const lang = (body as { locale?: unknown } | null)?.locale
  const t = getDictionary(isLocale(lang) ? lang : 'en').forms.server

  if (rateLimited(`partner:${clientKey(req)}`, 3)) {
    return NextResponse.json({ error: t.tooMany }, { status: 429 })
  }

  const parsed = partnerSchema.safeParse(body)
  if (!parsed.success) return NextResponse.json({ error: t.unreadable }, { status: 400 })
  const data = parsed.data

  if (data.company) return NextResponse.json({ ok: true })

  const errors = validatePartner(data, data.locale)
  if (Object.keys(errors).length) {
    return NextResponse.json({ error: t.checkFields, errors }, { status: 422 })
  }

  try {
    const payload = await getPayloadClient()
    await payload.create({
      collection: 'partner-enquiries',
      overrideAccess: true,
      data: {
        organisation: data.organisation.trim(),
        organisationType: data.organisationType.trim(),
        country: data.country.trim(),
        contact: data.contact.trim(),
        email: data.email.trim(),
        website: data.website.trim(),
        proposal: data.proposal.trim(),
        consent: data.privacy,
        language: data.locale,
      },
    })
    try {
      await sendEnquiry(payload, `New partnership enquiry: ${data.organisation}`, [
        ['Organisation', data.organisation],
        ['Type', data.organisationType],
        ['Country', data.country],
        ['Contact', data.contact],
        ['Email', data.email],
        ['Website', data.website || '(not given)'],
        ['Proposal', data.proposal],
        ['Language', data.locale === 'sq' ? 'Shqip' : 'English'],
      ])
    } catch (err) {
      payload.logger.error({ err }, '[partner-enquiry] notification email failed')
    }
    return NextResponse.json({ ok: true })
  } catch (err) {
    console.error('[partner-enquiry] could not save enquiry', err)
    return NextResponse.json({ error: t.failed }, { status: 500 })
  }
}
