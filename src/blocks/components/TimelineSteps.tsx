'use client'

import { useState } from 'react'

import { Icon } from '@/components/Icon'

type Step = { key: string; icon?: string | null; kicker?: string | null; title: string; summary?: string | null; body: string[] }
type Labels = { read: string; close: string; stage: string; step: string }

/**
 * `cards`: connected step cards ("Step 1", icon, stage name, short text), nothing to open.
 *
 * `list`: the six stages side by side (three by three on tablets): number, icon, stage name, title and
 * summary. Stages with full text get a "read" button that opens the text in one panel under the row.
 */
export function TimelineSteps({
  id,
  stages,
  labels,
  variant = 'list',
}: {
  id: string
  stages: Step[]
  labels: Labels
  variant?: 'cards' | 'list'
}) {
  const [open, setOpen] = useState<number | null>(null)
  if (variant === 'cards') return <StageCards stages={stages} step={labels.step} />
  const expandable = stages.some((s) => s.body.length)
  const panel = `${id}-panel`
  const current = open === null ? null : stages[open]

  return (
    <div className="flex flex-col gap-6">
      <ol className="steps">
        {stages.map((s, i) => (
          <li key={s.key} className="steps-item" data-open={open === i || undefined}>
            <div className="steps-head" aria-hidden="true">
              <span className="steps-num">{String(i + 1).padStart(2, '0')}</span>
              <span className="steps-ico">
                <Icon name={s.icon} size={24} />
              </span>
            </div>
            {s.kicker && <p className="text-[12px] font-bold tracking-[0.14em] uppercase">{s.kicker}</p>}
            <h3 className="serif text-[17px] leading-snug">{s.title}</h3>
            {/* With the full text one click away, the preview stays short so the row fits on screen. */}
            {s.summary && <p className={`muted text-[13px] leading-relaxed ${s.body.length ? 'line-clamp-4' : ''}`}>{s.summary}</p>}
            {s.body.length > 0 && (
              <button
                type="button"
                className="more cursor-pointer"
                aria-expanded={open === i}
                aria-controls={panel}
                onClick={() => setOpen(open === i ? null : i)}
              >
                <span className="pm" aria-hidden="true">
                  {open === i ? '−' : '+'}
                </span>
                {open === i ? labels.close : labels.read}
                <span className="sr-only">{`: ${labels.stage} ${i + 1}, ${s.title}`}</span>
              </button>
            )}
          </li>
        ))}
      </ol>
      {expandable && (
        <div id={panel} role="region" aria-live="polite" aria-label={current ? `${labels.stage} ${(open ?? 0) + 1}: ${current.title}` : undefined}>
          {current ? (
            <div className="steps-panel">
              <p className="text-[12px] font-bold tracking-[0.14em] uppercase text-sky-deep">
                {String((open ?? 0) + 1).padStart(2, '0')} · {current.kicker}
              </p>
              <p className="serif text-[20px] leading-snug">{current.title}</p>
              {current.body.map((p, i) => (
                <p key={i} className="muted text-[14px]">
                  {p}
                </p>
              ))}
            </div>
          ) : null}
        </div>
      )}
    </div>
  )
}

function StageCards({ stages, step }: { stages: Step[]; step: string }) {
  return (
    <ol className="stage-cards">
      {stages.map((s, i) => (
        <li key={s.key} className="stage-card">
          <div className="stage-card-top">
            <span className="stage-card-step">
              {step} {i + 1}
            </span>
            <span className="stage-card-ico" aria-hidden="true">
              <Icon name={s.icon} size={20} />
            </span>
          </div>
          <h3 className="serif text-[18px] leading-tight font-semibold tracking-[0.06em] uppercase">{s.kicker || s.title}</h3>
          {s.summary && <p className="text-[12.5px] leading-normal text-muted">{s.summary}</p>}
        </li>
      ))}
    </ol>
  )
}
