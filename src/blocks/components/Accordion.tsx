'use client'

import { useState, type ReactNode } from 'react'

type Item = { id: string; question: string; answer: ReactNode }

/** One-column accordion, a single item open at a time. */
export function Accordion({ id, items }: { id: string; items: Item[] }) {
  const [open, setOpen] = useState<string | null>(null)
  return (
    <div className="overflow-hidden rounded-[12px] border border-navy/10 bg-white">
      {items.map((item, i) => {
        const isOpen = open === item.id
        const btn = `${id}-b${i}`
        const panel = `${id}-p${i}`
        return (
          <div key={item.id} className={i < items.length - 1 ? 'border-b border-navy/12' : ''}>
            <h3 className="m-0">
              <button
                type="button"
                className="faq-q"
                id={btn}
                aria-expanded={isOpen}
                aria-controls={panel}
                onClick={() => setOpen(isOpen ? null : item.id)}
              >
                <span className="faq-n">{String(i + 1).padStart(2, '0')}</span>
                <span>{item.question}</span>
                <span className="faq-pm" aria-hidden="true">
                  {isOpen ? '−' : '+'}
                </span>
              </button>
            </h3>
            <div className="faq-a" id={panel} role="region" aria-labelledby={btn} hidden={!isOpen}>
              {item.answer}
            </div>
          </div>
        )
      })}
    </div>
  )
}
