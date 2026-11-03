'use client'

import { Check, ChevronDown } from 'lucide-react'
import { useRef, useState, type FormEvent } from 'react'

import { getDictionary } from '@/lib/dictionary'
import { validatePartner, type FieldErrors, type PartnerInput } from '@/lib/forms'
import type { Locale } from '@/lib/i18n'

import { ConsentText } from './ConsentText'

type Props = {
  formHeading: string
  organisationTypes: string[]
  consentText?: string | null
  successMessage?: string | null
  email: string
  privacyHref: string
  locale: Locale
}

type Status = 'idle' | 'loading' | 'success' | 'error'

const empty: PartnerInput = {
  organisation: '',
  organisationType: '',
  country: '',
  contact: '',
  email: '',
  website: '',
  proposal: '',
  privacy: false,
  company: '',
}

const fieldId = (k: keyof PartnerInput) => `p-${k}`

export function PartnerForm(props: Props) {
  const { locale } = props
  const t = getDictionary(locale).forms
  const p = t.partner
  const [form, setForm] = useState<PartnerInput>(empty)
  const [errors, setErrors] = useState<FieldErrors<PartnerInput>>({})
  const [tried, setTried] = useState(false)
  const [status, setStatus] = useState<Status>('idle')
  const [serverError, setServerError] = useState('')
  const doneRef = useRef<HTMLHeadingElement>(null)

  function set<K extends keyof PartnerInput>(key: K, value: PartnerInput[K]) {
    const next = { ...form, [key]: value }
    setForm(next)
    if (tried) setErrors(validatePartner(next, locale))
    if (status === 'error') setStatus('idle')
  }

  async function onSubmit(ev: FormEvent) {
    ev.preventDefault()
    if (status === 'loading') return
    const errs = validatePartner(form, locale)
    setTried(true)
    setErrors(errs)
    const first = Object.keys(errs)[0] as keyof PartnerInput | undefined
    if (first) {
      document.getElementById(fieldId(first))?.focus()
      return
    }
    setStatus('loading')
    setServerError('')
    try {
      const res = await fetch('/api/partner-enquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, locale }),
      })
      const data = (await res.json().catch(() => ({}))) as { error?: string; errors?: FieldErrors<PartnerInput> }
      if (!res.ok) {
        if (data.errors) setErrors(data.errors)
        setServerError(data.error ?? '')
        setStatus('error')
        return
      }
      setStatus('success')
      requestAnimationFrame(() => doneRef.current?.focus())
    } catch {
      setStatus('error')
    }
  }

  const inv = (k: keyof PartnerInput) => (errors[k] ? true : undefined)
  const desc = (k: keyof PartnerInput) => (errors[k] ? `${fieldId(k)}-err` : undefined)
  const err = (k: keyof PartnerInput) =>
    errors[k] ? (
      <p id={`${fieldId(k)}-err`} className="err">
        {errors[k]}
      </p>
    ) : null
  const n = Object.keys(errors).length

  const text = (k: keyof PartnerInput, label: string, opts: { type?: string; auto?: string; required?: boolean } = {}) => (
    <div>
      <label className="lbl" htmlFor={fieldId(k)}>
        {label}
        {opts.required === false ? <span className="opt"> ({t.optional})</span> : ' *'}
      </label>
      <input
        id={fieldId(k)}
        className="inp"
        type={opts.type ?? 'text'}
        autoComplete={opts.auto}
        value={form[k] as string}
        onChange={(e) => set(k, e.target.value)}
        aria-invalid={inv(k)}
        aria-describedby={desc(k)}
      />
      {err(k)}
    </div>
  )

  if (status === 'success') {
    return (
      <div className="flex flex-col items-start gap-[18px] py-3">
        <p className="sr-only" aria-live="polite">
          {p.liveReceived}
        </p>
        <span className="ico">
          <Check size={26} strokeWidth={2} aria-hidden="true" />
        </span>
        <h3 ref={doneRef} tabIndex={-1} className="serif text-[32px] leading-[1.1]">
          {p.thanks}
        </h3>
        <p className="muted">{props.successMessage}</p>
      </div>
    )
  }

  return (
    <form noValidate onSubmit={onSubmit} aria-labelledby="partner-form-t" className="flex flex-col gap-[22px]">
      <p className="sr-only" aria-live="polite">
        {status === 'loading' ? t.liveSending : status === 'error' ? t.liveFailed : ''}
      </p>
      <p className="muted text-[13px]">{t.required}</p>
      {n > 0 && (
        <p role="alert" className="rounded-[6px] bg-error-bg px-4 py-3.5 text-[14px] font-semibold text-error-text">
          {n === 1 ? t.checkOne : t.checkMany(n)}
        </p>
      )}
      {text('organisation', p.organisation, { auto: 'organization' })}
      <div className="grid gap-[22px] [grid-template-columns:repeat(auto-fit,minmax(min(220px,100%),1fr))]">
        <div>
          <label className="lbl" htmlFor={fieldId('organisationType')}>
            {p.organisationType} *
          </label>
          <div className="relative">
            <select
              id={fieldId('organisationType')}
              className="inp"
              value={form.organisationType}
              onChange={(e) => set('organisationType', e.target.value)}
              aria-invalid={inv('organisationType')}
              aria-describedby={desc('organisationType')}
            >
              <option value="">{p.selectType}</option>
              {props.organisationTypes.map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </select>
            <ChevronDown size={16} aria-hidden="true" className="pointer-events-none absolute top-1/2 right-4 -translate-y-1/2" />
          </div>
          {err('organisationType')}
        </div>
        {text('country', p.country, { auto: 'country-name' })}
      </div>
      {text('contact', p.contact, { auto: 'name' })}
      <div className="grid gap-[22px] [grid-template-columns:repeat(auto-fit,minmax(min(220px,100%),1fr))]">
        {text('email', p.email, { type: 'email', auto: 'email' })}
        {text('website', p.website, { type: 'url', auto: 'url', required: false })}
      </div>
      <div>
        <label className="lbl" htmlFor={fieldId('proposal')}>
          {p.proposal} *
        </label>
        <textarea id={fieldId('proposal')} className="inp" value={form.proposal} onChange={(e) => set('proposal', e.target.value)} aria-invalid={inv('proposal')} aria-describedby={desc('proposal')} />
        {err('proposal')}
      </div>
      <div className="hp" aria-hidden="true">
        <label htmlFor="p-company">Company</label>
        <input id="p-company" type="text" tabIndex={-1} autoComplete="off" value={form.company} onChange={(e) => set('company', e.target.value)} />
      </div>
      <div>
        <div className="flex items-start gap-3">
          <input id={fieldId('privacy')} className="chk" type="checkbox" checked={form.privacy} onChange={(e) => set('privacy', e.target.checked)} aria-invalid={inv('privacy')} aria-describedby={desc('privacy')} />
          <label htmlFor={fieldId('privacy')} className="muted text-[14px] leading-normal">
            <ConsentText text={props.consentText ?? ''} phrase={t.privacyPhrase} linkLabel={getDictionary(locale).footer.privacy} href={props.privacyHref} /> *
          </label>
        </div>
        {err('privacy')}
      </div>
      {status === 'error' && (
        <p role="alert" className="rounded-[6px] bg-error-bg px-4 py-3.5 text-[14px] text-error-text">
          {serverError || t.failed} {p.retry(props.email)}
        </p>
      )}
      <div>
        <button type="submit" className="btn btn-navy min-w-[220px]" disabled={status === 'loading'} aria-busy={status === 'loading'}>
          {status === 'loading' && <span className="spin" aria-hidden="true" />}
          {status === 'loading' ? t.sending : p.submit}
          {status !== 'loading' && (
            <span className="arr" aria-hidden="true">
              →
            </span>
          )}
        </button>
      </div>
    </form>
  )
}
