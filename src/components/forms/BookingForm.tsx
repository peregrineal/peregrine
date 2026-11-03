'use client'

import { Check, ChevronDown } from 'lucide-react'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { useRef, useState, type FormEvent } from 'react'

import { asksAge, choicesFor, genderChoices, roleChoices, serviceForms, type CountrySource } from '@/lib/consultationForm'
import type { ServiceKey } from '@/lib/constants'
import { getDictionary } from '@/lib/dictionary'
import {
  answerKey,
  cleanConsultation,
  isParent,
  otherKey,
  stepOf,
  validateConsultation,
  type Answer,
  type ConsultationErrors,
  type ConsultationInput,
} from '@/lib/forms'
import { localizePath, type Locale } from '@/lib/i18n'

import { ConsentText } from './ConsentText'
import { QuestionField } from './QuestionField'

export type ServiceOption = { key: string; name: string }

type Props = {
  services: ServiceOption[]
  countries: Partial<Record<CountrySource, string[]>>
  formNote?: string | null
  consentText?: string | null
  successMessage?: string | null
  privacyHref: string
  phone: string
  locale: Locale
}

type Status = 'idle' | 'loading' | 'success' | 'error'
type Step = 1 | 2 | 3

const STEPS: Step[] = [1, 2, 3]

/** The element an error key points at, so the error summary can move focus to it. */
const domId = (key: string) =>
  key.startsWith('q.') ? `q-${key.slice(2)}` : key.startsWith('other.') ? `q-${key.slice(6)}-other` : `f-${key}`

const firstOf = (errors: ConsultationErrors) => Object.keys(errors).sort((a, b) => stepOf(a) - stepOf(b))[0]

export function BookingForm(props: Props) {
  const params = useSearchParams()
  const { locale } = props
  const t = getDictionary(locale).forms
  const b = t.booking
  const keys = props.services.map((s) => s.key)
  const preset = params.get('service') ?? ''
  const ctx = { serviceKeys: keys, countries: props.countries }
  const fieldText = { optional: t.optional, selectOption: t.selectOption, specify: t.specify }

  const empty = (): ConsultationInput => ({
    firstName: '',
    lastName: '',
    gender: '',
    genderOther: '',
    email: '',
    phone: '',
    role: '',
    roleOther: '',
    service: keys.includes(preset) ? preset : '',
    participantName: '',
    participantAge: '',
    answers: {},
    others: {},
    message: '',
    privacy: false,
    website: '',
  })

  const [form, setForm] = useState<ConsultationInput>(empty)
  const [step, setStep] = useState<Step>(1)
  const [errors, setErrors] = useState<ConsultationErrors>({})
  const [tried, setTried] = useState(false)
  const [status, setStatus] = useState<Status>('idle')
  const [serverError, setServerError] = useState('')
  const topRef = useRef<HTMLDivElement>(null)
  const stepRef = useRef<HTMLHeadingElement>(null)
  const doneRef = useRef<HTMLHeadingElement>(null)

  const service = props.services.find((s) => s.key === form.service)
  const sections = serviceForms[form.service as ServiceKey]?.sections ?? []
  const parent = isParent(form)

  const stepErrors = (f: ConsultationInput, s: Step) =>
    Object.fromEntries(Object.entries(validateConsultation(f, ctx, locale)).filter(([k]) => stepOf(k) === s))

  function update(next: ConsultationInput) {
    setForm(next)
    if (tried) setErrors(stepErrors(next, step))
    if (status === 'error') setStatus('idle')
  }

  const set = <K extends keyof ConsultationInput>(key: K, value: ConsultationInput[K]) => update({ ...form, [key]: value })
  const setAnswer = (id: string, value: Answer) => update({ ...form, answers: { ...form.answers, [id]: value } })
  const setOther = (id: string, value: string) => update({ ...form, others: { ...form.others, [id]: value } })

  function focusError(errs: ConsultationErrors) {
    const key = firstOf(errs)
    if (key) requestAnimationFrame(() => document.getElementById(domId(key))?.focus())
  }

  function goTo(next: Step) {
    setStep(next)
    setErrors({})
    setTried(false)
    requestAnimationFrame(() => {
      topRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
      stepRef.current?.focus({ preventScroll: true })
    })
  }

  function onContinue() {
    const errs = stepErrors(form, step)
    setTried(true)
    setErrors(errs)
    if (Object.keys(errs).length) return focusError(errs)
    goTo((step + 1) as Step)
  }

  async function onSubmit(ev: FormEvent) {
    ev.preventDefault()
    if (step < 3) return onContinue()
    if (status === 'loading') return
    const all = validateConsultation(form, ctx, locale)
    const first = firstOf(all)
    if (first) {
      const s = stepOf(first)
      setStep(s)
      setTried(true)
      setErrors(Object.fromEntries(Object.entries(all).filter(([k]) => stepOf(k) === s)))
      return focusError(all)
    }
    setStatus('loading')
    setServerError('')
    try {
      const res = await fetch('/api/enquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...cleanConsultation(form), locale }),
      })
      const data = (await res.json().catch(() => ({}))) as { error?: string; errors?: ConsultationErrors }
      if (!res.ok) {
        const key = data.errors ? firstOf(data.errors) : undefined
        if (data.errors && key) {
          const s = stepOf(key)
          setStep(s)
          setTried(true)
          setErrors(Object.fromEntries(Object.entries(data.errors).filter(([k]) => stepOf(k) === s)))
        }
        setServerError(data.error ?? '')
        setStatus('error')
        return
      }
      setStatus('success')
      requestAnimationFrame(() => {
        topRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
        doneRef.current?.focus({ preventScroll: true })
      })
    } catch {
      setStatus('error')
    }
  }

  const n = Object.keys(errors).length
  const inv = (k: string) => (errors[k] ? true : undefined)
  const desc = (k: string, extra?: string) => [extra, errors[k] ? `${domId(k)}-err` : undefined].filter(Boolean).join(' ') || undefined
  const err = (k: string) =>
    errors[k] ? (
      <p id={`${domId(k)}-err`} className="err">
        {errors[k]}
      </p>
    ) : null
  const live = status === 'loading' ? t.liveSending : status === 'success' ? t.liveReceived : status === 'error' ? t.liveFailed : ''

  if (status === 'success') {
    return (
      <div ref={topRef} className="flex scroll-mt-28 flex-col items-start gap-[18px] py-3">
        <p className="sr-only" aria-live="polite">
          {live}
        </p>
        <span className="ico">
          <Check size={26} strokeWidth={2} aria-hidden="true" />
        </span>
        <h3 ref={doneRef} tabIndex={-1} className="serif text-[32px] leading-[1.15] outline-none">
          {b.thanks}
        </h3>
        <p className="muted">
          {b.sent} {props.successMessage}
        </p>
        <Link href={localizePath('/', locale)} className="btn btn-outline">
          {b.backHome}
        </Link>
      </div>
    )
  }

  return (
    <form noValidate onSubmit={onSubmit} aria-labelledby="form-t" className="flex flex-col gap-[22px]">
      <p className="sr-only" aria-live="polite">
        {live}
      </p>

      <div ref={topRef} className="scroll-mt-28">
        <ol className="grid grid-cols-3 gap-2" aria-label={b.heading}>
          {STEPS.map((s) => (
            <li key={s} aria-current={s === step ? 'step' : undefined} className="flex flex-col gap-2">
              <span aria-hidden="true" className={`h-1 rounded-full ${s <= step ? 'bg-navy' : 'bg-navy/12'}`} />
              <span className={`text-[13px] leading-snug font-semibold ${s === step ? 'text-navy' : 'text-muted'}`}>
                <span className="sr-only">{b.stepCount(s, STEPS.length)}: </span>
                {b.steps[s - 1]}
              </span>
            </li>
          ))}
        </ol>
      </div>

      <div className="flex flex-col gap-1">
        <p className="eyebrow">{b.stepCount(step, STEPS.length)}</p>
        <h3 ref={stepRef} tabIndex={-1} className="serif text-[23px] leading-[1.2] outline-none">
          {step === 2 && service ? service.name : b.stepHeadings[step - 1]}
        </h3>
      </div>

      {step === 1 && props.formNote && <p className="muted -mt-2 text-[13px]">{props.formNote}</p>}
      {n > 0 && (
        <p role="alert" className="rounded-[6px] bg-error-bg px-4 py-3.5 text-[14px] font-semibold text-error-text">
          {n === 1 ? t.checkOne : t.checkMany(n)}
        </p>
      )}

      {step === 1 && (
        <>
          <div className="grid gap-[22px] [grid-template-columns:repeat(auto-fit,minmax(min(220px,100%),1fr))]">
            <div>
              <label className="lbl" htmlFor="f-firstName">
                {b.firstName} *
              </label>
              <input id="f-firstName" className="inp" type="text" autoComplete="given-name" maxLength={80} value={form.firstName} onChange={(e) => set('firstName', e.target.value)} aria-invalid={inv('firstName')} aria-describedby={desc('firstName')} />
              {err('firstName')}
            </div>
            <div>
              <label className="lbl" htmlFor="f-lastName">
                {b.lastName} *
              </label>
              <input id="f-lastName" className="inp" type="text" autoComplete="family-name" maxLength={80} value={form.lastName} onChange={(e) => set('lastName', e.target.value)} aria-invalid={inv('lastName')} aria-describedby={desc('lastName')} />
              {err('lastName')}
            </div>
          </div>

          <QuestionField
            id="f-gender"
            type="radio"
            required
            label={b.gender}
            hint={b.genderHint}
            choices={genderChoices}
            value={form.gender}
            otherText={form.genderOther}
            otherId="f-genderOther"
            error={errors.gender}
            locale={locale}
            text={fieldText}
            onChange={(v) => set('gender', String(v))}
            onOther={(v) => set('genderOther', v)}
          />

          <div className="grid gap-[22px] [grid-template-columns:repeat(auto-fit,minmax(min(220px,100%),1fr))]">
            <div>
              <label className="lbl" htmlFor="f-email">
                {b.email} *
              </label>
              <input id="f-email" className="inp" type="email" autoComplete="email" inputMode="email" maxLength={160} value={form.email} onChange={(e) => set('email', e.target.value)} aria-invalid={inv('email')} aria-describedby={desc('email')} />
              {err('email')}
            </div>
            <div>
              <label className="lbl" htmlFor="f-phone">
                {b.phone} *
              </label>
              <input id="f-phone" className="inp" type="tel" autoComplete="tel" inputMode="tel" maxLength={40} placeholder="+355 6X XXX XXXX" value={form.phone} onChange={(e) => set('phone', e.target.value)} aria-invalid={inv('phone')} aria-describedby={desc('phone', 'f-phone-hint')} />
              <p id="f-phone-hint" className="muted mt-1.5 text-[13px]">
                {b.phoneHint}
              </p>
              {err('phone')}
            </div>
          </div>

          <QuestionField
            id="f-role"
            type="radio"
            required
            label={b.role}
            choices={roleChoices}
            value={form.role}
            otherText={form.roleOther}
            otherId="f-roleOther"
            otherRequired
            error={errors.role}
            otherError={errors.roleOther}
            locale={locale}
            text={fieldText}
            onChange={(v) => set('role', String(v))}
            onOther={(v) => set('roleOther', v)}
          />
          {parent && <p className="-mt-2 rounded-[6px] bg-tint px-4 py-3 text-[13px]">{b.parentNote}</p>}

          <div>
            <label className="lbl" htmlFor="f-service">
              {b.service} *
            </label>
            <div className="relative">
              {/* Changing the service starts its questions afresh; earlier answers are not sent. */}
              <select id="f-service" className="inp" value={form.service} onChange={(e) => update({ ...form, service: e.target.value, answers: {}, others: {} })} aria-invalid={inv('service')} aria-describedby={desc('service')}>
                <option value="">{b.selectService}</option>
                {props.services.map((s) => (
                  <option key={s.key} value={s.key}>
                    {s.name}
                  </option>
                ))}
              </select>
              <ChevronDown size={16} aria-hidden="true" className="pointer-events-none absolute top-1/2 right-4 -translate-y-1/2" />
            </div>
            {err('service')}
          </div>
        </>
      )}

      {step === 2 && (
        <>
          {parent && (
            <fieldset className="m-0 flex min-w-0 flex-col gap-[22px] border-0 p-0">
              <legend className="mb-4 text-[14px] font-semibold tracking-[.02em] text-sky-deep uppercase">{b.participantHeading}</legend>
              <div>
                <label className="lbl" htmlFor="f-participantName">
                  {b.participantName} *
                </label>
                <input id="f-participantName" className="inp" type="text" maxLength={160} value={form.participantName} onChange={(e) => set('participantName', e.target.value)} aria-invalid={inv('participantName')} aria-describedby={desc('participantName')} />
                {err('participantName')}
              </div>
              {!asksAge(form.service) && (
                <div>
                  <label className="lbl" htmlFor="f-participantAge">
                    {b.participantAge} *
                  </label>
                  <input id="f-participantAge" className="inp max-w-[140px]" type="text" inputMode="numeric" maxLength={2} value={form.participantAge} onChange={(e) => set('participantAge', e.target.value)} aria-invalid={inv('participantAge')} aria-describedby={desc('participantAge')} />
                  {err('participantAge')}
                </div>
              )}
            </fieldset>
          )}
          {sections.map((section, i) => (
            <fieldset key={i} className="m-0 flex min-w-0 flex-col gap-[22px] border-0 p-0">
              {section.heading && (
                <legend className="mb-4 text-[14px] font-semibold tracking-[.02em] text-sky-deep uppercase">{section.heading[locale]}</legend>
              )}
              {section.questions.map((q) => (
                <QuestionField
                  key={q.id}
                  id={`q-${q.id}`}
                  type={q.type}
                  required={q.required}
                  label={q.label[locale]}
                  hint={q.hint?.[locale]}
                  placeholder={q.placeholder?.[locale]}
                  note={q.note?.[locale]}
                  choices={choicesFor(q, props.countries)}
                  value={form.answers[q.id]}
                  otherText={form.others[q.id]}
                  otherRequired={q.required}
                  error={errors[answerKey(q.id)]}
                  otherError={errors[otherKey(q.id)]}
                  locale={locale}
                  text={fieldText}
                  onChange={(v) => setAnswer(q.id, v)}
                  onOther={(v) => setOther(q.id, v)}
                />
              ))}
            </fieldset>
          ))}
        </>
      )}

      {step === 3 && (
        <>
          <div>
            <label className="lbl" htmlFor="f-message">
              {b.message} <span className="opt">({t.optional})</span>
            </label>
            <p id="f-message-hint" className="muted -mt-1 mb-2.5 text-[13px]">
              {b.messageHint}
            </p>
            <textarea id="f-message" className="inp" maxLength={4000} value={form.message} onChange={(e) => set('message', e.target.value)} aria-describedby="f-message-hint" />
          </div>

          <div>
            <div className="flex items-start gap-3">
              <input id="f-privacy" className="chk" type="checkbox" checked={form.privacy} onChange={(e) => set('privacy', e.target.checked)} aria-invalid={inv('privacy')} aria-describedby={desc('privacy')} />
              <label htmlFor="f-privacy" className="muted text-[14px] leading-normal">
                <ConsentText text={props.consentText ?? ''} phrase={t.privacyPhrase} linkLabel={getDictionary(locale).footer.privacy} href={props.privacyHref} /> *
              </label>
            </div>
            {err('privacy')}
          </div>
        </>
      )}

      <div className="hp" aria-hidden="true">
        <label htmlFor="f-website">Website</label>
        <input id="f-website" type="text" tabIndex={-1} autoComplete="off" value={form.website} onChange={(e) => set('website', e.target.value)} />
      </div>

      {status === 'error' && (
        <p role="alert" className="rounded-[6px] bg-error-bg px-4 py-3.5 text-[14px] text-error-text">
          {serverError || t.failed} {b.retry(props.phone)}
        </p>
      )}

      <div className="flex flex-wrap items-center gap-3">
        {step > 1 && (
          <button type="button" className="btn btn-outline" onClick={() => goTo((step - 1) as Step)}>
            {b.back}
          </button>
        )}
        {step < 3 ? (
          <button type="submit" className="btn btn-navy min-w-[200px]">
            {b.next}
          </button>
        ) : (
          <button type="submit" className="btn btn-navy min-w-[240px]" disabled={status === 'loading'} aria-busy={status === 'loading'}>
            {status === 'loading' && <span className="spin" aria-hidden="true" />}
            {status === 'loading' ? t.sending : b.submit}
          </button>
        )}
      </div>
    </form>
  )
}
