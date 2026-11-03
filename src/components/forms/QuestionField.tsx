'use client'

import { ChevronDown } from 'lucide-react'

import type { Choice, Question } from '@/lib/consultationForm'
import type { Answer } from '@/lib/forms'
import type { Locale } from '@/lib/i18n'

type Props = {
  id: string
  type: Question['type']
  label: string
  hint?: string
  placeholder?: string
  note?: string
  required?: boolean
  choices?: Choice[]
  value: Answer | undefined
  otherText?: string
  error?: string
  otherError?: string
  /** Element id of the "Other" text box; the error summary focuses it by this id. */
  otherId?: string
  otherRequired?: boolean
  locale: Locale
  text: { optional: string; selectOption: string; specify: string }
  onChange: (value: Answer) => void
  onOther?: (text: string) => void
}

const asList = (v: Answer | undefined) => (Array.isArray(v) ? v : v ? [v] : [])

/** One question of the consultation form: text, number, buttons, dropdown or several choices. */
export function QuestionField(props: Props) {
  const { id, type, label, hint, required, choices = [], value, error, locale, text } = props
  const errId = error ? `${id}-err` : undefined
  const hintId = hint ? `${id}-hint` : undefined
  const describedBy = [hintId, errId].filter(Boolean).join(' ') || undefined
  const otherId = props.otherId ?? `${id}-other`
  const showOther = asList(value).some((v) => choices.find((c) => c.value === v)?.other)

  const title = (
    <>
      {label}
      {required ? ' *' : <span className="opt"> ({text.optional})</span>}
    </>
  )
  const hintEl = hint ? (
    <p id={hintId} className="muted -mt-1 mb-2.5 text-[13px]">
      {hint}
    </p>
  ) : null
  const errorEl = error ? (
    <p id={errId} className="err">
      {error}
    </p>
  ) : null
  const noteEl = props.note ? <p className="muted mt-2.5 text-[13px]">{props.note}</p> : null
  const otherEl =
    showOther && props.onOther ? (
      <div className="mt-3">
        <label className="lbl" htmlFor={otherId}>
          {text.specify}
          {props.otherRequired ? ' *' : <span className="opt"> ({text.optional})</span>}
        </label>
        <input
          id={otherId}
          className="inp"
          type="text"
          maxLength={200}
          value={props.otherText ?? ''}
          onChange={(e) => props.onOther?.(e.target.value)}
          aria-invalid={props.otherError ? true : undefined}
          aria-describedby={props.otherError ? `${otherId}-err` : undefined}
        />
        {props.otherError && (
          <p id={`${otherId}-err`} className="err">
            {props.otherError}
          </p>
        )}
      </div>
    ) : null

  if (type === 'radio' || type === 'checkboxes') {
    const many = type === 'checkboxes'
    const list = asList(value)
    const toggle = (c: Choice) => {
      if (!many) return props.onChange(c.value)
      if (list.includes(c.value)) return props.onChange(list.filter((v) => v !== c.value))
      // "Not sure yet" and similar answers stand alone.
      const exclusive = new Set(choices.filter((x) => x.exclusive).map((x) => x.value))
      props.onChange(c.exclusive ? [c.value] : [...list.filter((v) => !exclusive.has(v)), c.value])
    }
    return (
      <div>
        <fieldset id={id} tabIndex={-1} className="m-0 min-w-0 border-0 p-0 outline-none" aria-describedby={describedBy} aria-invalid={error ? true : undefined}>
          <legend className="lbl">{title}</legend>
          {hintEl}
          <div className="flex flex-wrap gap-2">
            {choices.map((c) => (
              <label key={c.value} className="chip">
                <input type={many ? 'checkbox' : 'radio'} name={id} value={c.value} checked={list.includes(c.value)} onChange={() => toggle(c)} />
                <span>{c.label[locale]}</span>
              </label>
            ))}
          </div>
        </fieldset>
        {errorEl}
        {noteEl}
        {otherEl}
      </div>
    )
  }

  const v = typeof value === 'string' ? value : ''
  return (
    <div>
      <label className="lbl" htmlFor={id}>
        {title}
      </label>
      {hintEl}
      {type === 'select' ? (
        <div className="relative">
          <select id={id} className="inp" value={v} onChange={(e) => props.onChange(e.target.value)} aria-invalid={error ? true : undefined} aria-describedby={describedBy}>
            <option value="">{text.selectOption}</option>
            {choices.map((c) => (
              <option key={c.value} value={c.value}>
                {c.label[locale]}
              </option>
            ))}
          </select>
          <ChevronDown size={16} aria-hidden="true" className="pointer-events-none absolute top-1/2 right-4 -translate-y-1/2" />
        </div>
      ) : type === 'textarea' ? (
        <textarea id={id} className="inp" maxLength={2000} placeholder={props.placeholder} value={v} onChange={(e) => props.onChange(e.target.value)} aria-invalid={error ? true : undefined} aria-describedby={describedBy} />
      ) : (
        <input
          id={id}
          className={`inp ${type === 'number' ? 'max-w-[140px]' : ''}`}
          type="text"
          inputMode={type === 'number' ? 'numeric' : undefined}
          maxLength={type === 'number' ? 2 : 300}
          placeholder={props.placeholder}
          value={v}
          onChange={(e) => props.onChange(e.target.value)}
          aria-invalid={error ? true : undefined}
          aria-describedby={describedBy}
        />
      )}
      {errorEl}
      {noteEl}
      {otherEl}
    </div>
  )
}
