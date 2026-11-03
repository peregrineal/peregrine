import { z } from 'zod'

import {
  asksAge,
  choicesFor,
  genderChoices,
  OTHER,
  questionsFor,
  ROLE_PARENT,
  roleChoices,
  serviceForms,
  type Choice,
  type CountrySource,
} from './consultationForm'
import { getDictionary } from './dictionary'
import { DEFAULT_LOCALE, LOCALES, type Locale } from './i18n'

// Shared by the browser (instant feedback) and the API routes (authoritative check).
// English messages are the approved wording from the prototype; see lib/dictionary.ts.

export type Answer = string | string[]

export type ConsultationInput = {
  firstName: string
  lastName: string
  gender: string
  genderOther: string
  email: string
  phone: string
  role: string
  roleOther: string
  service: string
  /** Only when a parent or guardian fills in the form: the student or participant. */
  participantName: string
  participantAge: string
  /** Answers to the questions of the chosen service, by question id. */
  answers: Record<string, Answer>
  /** The text typed next to an "Other" answer, by question id. */
  others: Record<string, string>
  message: string
  privacy: boolean
  website: string // honeypot
}

export type FieldErrors<T> = Partial<Record<keyof T, string>>
/** Consultation errors use field names plus `q.<id>` and `other.<id>` for the service questions. */
export type ConsultationErrors = Record<string, string>

export const answerKey = (id: string) => `q.${id}`
export const otherKey = (id: string) => `other.${id}`

export type FormContext = {
  serviceKeys?: string[]
  /** Destination names per programme. Without a list, any destination is accepted. */
  countries?: Partial<Record<CountrySource, string[]>>
}

const STEP_1 = ['firstName', 'lastName', 'gender', 'genderOther', 'email', 'phone', 'role', 'roleOther', 'service']

/** Which step of the form an error key belongs to. */
export const stepOf = (key: string): 1 | 2 | 3 => (STEP_1.includes(key) ? 1 : key === 'message' || key === 'privacy' ? 3 : 2)

export const isParent = (f: Pick<ConsultationInput, 'role'>) => f.role === ROLE_PARENT

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/
const PHONE_RE = /^[+0-9\s().-]+$/
const AGE_RE = /^\d{1,2}$/

const has = (choices: Choice[], value: string) => choices.some((c) => c.value === value)
const picked = (v: Answer | undefined) => (Array.isArray(v) ? v : v ? [v] : [])

export function validateConsultation(
  f: ConsultationInput,
  ctx: FormContext = {},
  locale: Locale = DEFAULT_LOCALE,
): ConsultationErrors {
  const m = getDictionary(locale).forms.errors
  const e: ConsultationErrors = {}
  if (!f.firstName.trim()) e.firstName = m.firstName
  if (!f.lastName.trim()) e.lastName = m.lastName
  if (!has(genderChoices, f.gender)) e.gender = m.gender
  const email = f.email.trim()
  if (!email) e.email = m.email
  else if (!EMAIL_RE.test(email)) e.email = m.emailInvalid
  const phone = f.phone.trim()
  if (!phone) e.phone = m.phone
  else if (!PHONE_RE.test(phone) || phone.replace(/\D/g, '').length < 8) e.phone = m.phoneInvalid
  if (!has(roleChoices, f.role)) e.role = m.role
  else if (f.role === OTHER && !f.roleOther.trim()) e.roleOther = m.specify

  const known = ctx.serviceKeys ? ctx.serviceKeys.includes(f.service) : f.service in serviceForms
  if (!f.service || !known) e.service = m.service
  else {
    if (isParent(f)) {
      if (!f.participantName.trim()) e.participantName = m.participantName
      if (!asksAge(f.service) && !AGE_RE.test(f.participantAge.trim())) e.participantAge = m.age
    }
    for (const q of questionsFor(f.service)) {
      const key = answerKey(q.id)
      const v = f.answers[q.id]
      if (q.type === 'text' || q.type === 'textarea' || q.type === 'number') {
        const s = typeof v === 'string' ? v.trim() : ''
        if (!s) {
          if (q.required) e[key] = m.answer
        } else if (q.type === 'number' && !AGE_RE.test(s)) e[key] = m.age
        continue
      }
      const choices = choicesFor(q, ctx.countries)
      // Destination lists come from the library; without them only the shape is checked.
      const checkable = !q.countries || Boolean(ctx.countries?.[q.countries])
      const values = picked(v)
      if (!values.length) {
        if (q.required) e[key] = m.choose
      } else if ((q.type !== 'checkboxes' && Array.isArray(v)) || (checkable && values.some((x) => !has(choices, x)))) {
        e[key] = m.choose
      } else if (q.required && values.includes(OTHER) && !f.others[q.id]?.trim()) {
        e[otherKey(q.id)] = m.specify
      }
    }
  }
  if (!f.privacy) e.privacy = m.privacy
  return e
}

/**
 * Keeps only what belongs to the chosen service: answers left over from a service the visitor
 * switched away from, and "Other" text for answers that are no longer "Other", are dropped.
 */
export function cleanConsultation<T extends ConsultationInput>(f: T): T {
  const answers: Record<string, Answer> = {}
  const others: Record<string, string> = {}
  for (const q of questionsFor(f.service)) {
    const v = f.answers[q.id]
    if (Array.isArray(v) ? v.length : typeof v === 'string' && v.trim()) answers[q.id] = Array.isArray(v) ? v : v.trim()
    if (picked(v).includes(OTHER) && f.others[q.id]?.trim()) others[q.id] = f.others[q.id].trim()
  }
  const parent = isParent(f)
  return {
    ...f,
    firstName: f.firstName.trim(),
    lastName: f.lastName.trim(),
    email: f.email.trim(),
    phone: f.phone.trim(),
    genderOther: f.gender === OTHER ? f.genderOther.trim() : '',
    roleOther: f.role === OTHER ? f.roleOther.trim() : '',
    participantName: parent ? f.participantName.trim() : '',
    participantAge: parent && !asksAge(f.service) ? f.participantAge.trim() : '',
    answers,
    others,
    message: f.message.trim(),
  }
}

/** The label of a chosen value, with the "Other" text appended. */
export function choiceLabel(choices: Choice[], value: string, otherText?: string, locale: Locale = DEFAULT_LOCALE) {
  const c = choices.find((x) => x.value === value)
  const text = c ? c.label[locale] : value
  return c?.other && otherText ? `${text}: ${otherText}` : text
}

/** The service answers as readable question and answer pairs (English by default, for the team). */
export function describeAnswers(f: ConsultationInput, ctx: FormContext = {}, locale: Locale = DEFAULT_LOCALE) {
  const rows: { question: string; answer: string }[] = []
  for (const q of questionsFor(f.service)) {
    const values = picked(f.answers[q.id])
    if (!values.length) continue
    const choices = choicesFor(q, ctx.countries)
    const answer = q.choices || q.countries ? values.map((x) => choiceLabel(choices, x, f.others[q.id], locale)).join('; ') : values.join('')
    rows.push({ question: q.label[locale], answer })
  }
  return rows
}

export type PartnerInput = {
  organisation: string
  organisationType: string
  country: string
  contact: string
  email: string
  website: string
  proposal: string
  privacy: boolean
  company: string // honeypot
}

export function validatePartner(f: PartnerInput, locale: Locale = DEFAULT_LOCALE): FieldErrors<PartnerInput> {
  const m = getDictionary(locale).forms.errors
  const e: FieldErrors<PartnerInput> = {}
  if (!f.organisation.trim()) e.organisation = m.organisation
  if (!f.organisationType.trim()) e.organisationType = m.organisationType
  if (!f.country.trim()) e.country = m.country
  if (!f.contact.trim()) e.contact = m.contact
  const email = f.email.trim()
  if (!email) e.email = m.professionalEmail
  else if (!EMAIL_RE.test(email)) e.email = m.emailInvalid
  if (f.website.trim() && !/^(https?:\/\/)?[^\s.]+\.[^\s]{2,}$/i.test(f.website.trim())) e.website = m.website
  if (!f.proposal.trim()) e.proposal = m.proposal
  if (!f.privacy) e.privacy = m.privacy
  return e
}

/** Server-side shape check: types and length limits, before the shared validator runs. */
export const consultationSchema = z.object({
  firstName: z.string().max(80),
  lastName: z.string().max(80),
  gender: z.string().max(40),
  genderOther: z.string().max(80).default(''),
  email: z.string().max(160),
  phone: z.string().max(40),
  role: z.string().max(40),
  roleOther: z.string().max(120).default(''),
  service: z.string().max(40),
  participantName: z.string().max(160).default(''),
  participantAge: z.string().max(4).default(''),
  answers: z
    .record(z.string().max(40), z.union([z.string().max(2000), z.array(z.string().max(120)).max(30)]))
    .refine((a) => Object.keys(a).length <= 30)
    .default({}),
  others: z
    .record(z.string().max(40), z.string().max(200))
    .refine((a) => Object.keys(a).length <= 30)
    .default({}),
  message: z.string().max(4000).default(''),
  privacy: z.boolean(),
  website: z.string().max(200).default(''),
  locale: z.enum(LOCALES).default(DEFAULT_LOCALE),
})

export const partnerSchema = z.object({
  organisation: z.string().max(160),
  organisationType: z.string().max(120),
  country: z.string().max(80),
  contact: z.string().max(160),
  email: z.string().max(160),
  website: z.string().max(200).default(''),
  proposal: z.string().max(5000),
  privacy: z.boolean(),
  company: z.string().max(200).default(''),
  locale: z.enum(LOCALES).default(DEFAULT_LOCALE),
})

/** Basic in-memory rate limit per client (per server instance). */
const hits = new Map<string, number[]>()
export function rateLimited(key: string, limit = 5, windowMs = 10 * 60 * 1000, now = Date.now()) {
  const recent = (hits.get(key) ?? []).filter((t) => now - t < windowMs)
  recent.push(now)
  hits.set(key, recent)
  if (hits.size > 5000) {
    for (const [k, v] of hits) if (!v.some((t) => now - t < windowMs)) hits.delete(k)
  }
  return recent.length > limit
}
