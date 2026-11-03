import { NextResponse, type NextRequest } from 'next/server'

import { getPayloadClient } from '@/lib/data'
import { getDictionary } from '@/lib/dictionary'
import { genderChoices, roleChoices, type CountrySource } from '@/lib/consultationForm'
import { choiceLabel, cleanConsultation, consultationSchema, describeAnswers, rateLimited, validateConsultation } from '@/lib/forms'
import { isLocale } from '@/lib/i18n'
import { sendEnquiry } from '@/lib/notify'

const clientKey = (req: NextRequest) => req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || req.headers.get('x-real-ip') || 'unknown'

export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => null)
  const lang = (body as { locale?: unknown } | null)?.locale
  const t = getDictionary(isLocale(lang) ? lang : 'en').forms.server

  if (rateLimited(`enquiry:${clientKey(req)}`)) {
    return NextResponse.json({ error: t.tooMany }, { status: 429 })
  }

  const parsed = consultationSchema.safeParse(body)
  if (!parsed.success) {
    return NextResponse.json({ error: t.unreadable }, { status: 400 })
  }
  const data = parsed.data

  // Honeypot: real people never fill the hidden "website" field. Pretend success.
  if (data.website) return NextResponse.json({ ok: true })

  try {
    const payload = await getPayloadClient()
    const findDestinations = (programme: CountrySource) =>
      payload.find({
        collection: 'destinations',
        where: { visible: { equals: true }, programmes: { contains: programme } },
        limit: 100,
        depth: 0,
        locale: data.locale,
      })
    const [{ docs: services }, university, boarding, camps] = await Promise.all([
      payload.find({ collection: 'services', limit: 20, depth: 0 }),
      findDestinations('university'),
      findDestinations('boarding'),
      findDestinations('camps'),
    ])
    const names = (r: { docs: { name: string }[] }) => r.docs.map((d) => d.name)
    const ctx = { serviceKeys: services.map((s) => s.key), countries: { university: names(university), boarding: names(boarding), camps: names(camps) } }

    const errors = validateConsultation(data, ctx, data.locale)
    if (Object.keys(errors).length) {
      return NextResponse.json({ error: t.checkFields, errors }, { status: 422 })
    }
    const f = cleanConsultation(data)
    const service = services.find((s) => s.key === f.service)
    const serviceName = service?.name ?? f.service
    // Stored and emailed in English so the team reads every enquiry the same way;
    // destination names and free text stay as the visitor wrote them.
    const answers = describeAnswers(f, ctx)
    const gender = choiceLabel(genderChoices, f.gender, f.genderOther)
    const role = choiceLabel(roleChoices, f.role, f.roleOther)

    await payload.create({
      collection: 'enquiries',
      overrideAccess: true,
      data: {
        firstName: f.firstName,
        lastName: f.lastName,
        gender,
        email: f.email,
        phone: f.phone,
        role,
        service: serviceName,
        participantName: f.participantName,
        participantAge: f.participantAge,
        answers,
        message: f.message,
        consent: f.privacy,
        language: f.locale,
      },
    })

    try {
      await sendEnquiry(payload, `New consultation enquiry: ${serviceName}`, [
        ['Name', `${f.firstName} ${f.lastName}`],
        ['Gender', gender],
        ['Email', f.email],
        ['Phone / WhatsApp', f.phone],
        ['Filled in by', role],
        ...(f.participantName ? ([['Student / participant', [f.participantName, f.participantAge].filter(Boolean).join(', age ')]] as [string, string][]) : []),
        ['Service', serviceName],
        ...answers.map((a): [string, string] => [a.question, a.answer]),
        ['Additional information', f.message || '(none)'],
        ['Language', f.locale === 'sq' ? 'Shqip' : 'English'],
      ])
    } catch (err) {
      // Saved in the admin already; log the email failure but do not fail the visitor.
      payload.logger.error({ err }, '[enquiry] notification email failed')
    }

    return NextResponse.json({ ok: true })
  } catch (err) {
    console.error('[enquiry] could not save enquiry', err)
    return NextResponse.json({ error: t.failed }, { status: 500 })
  }
}
