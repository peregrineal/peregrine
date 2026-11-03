import { Info } from 'lucide-react'

import { PendingTag } from '@/components/ui'

import type { BlockOf, BlockProps } from '../types'

/** The note itself, also drawn inside a neighbouring section (see RenderBlocks). */
export function NoticeBox({ block, className = '' }: { block: BlockOf<'notice'>; className?: string }) {
  return (
    <div className={`flex items-start gap-3.5 rounded-[10px] border border-sky/60 bg-white px-5 py-[18px] ${className}`}>
      <Info size={22} strokeWidth={1.5} aria-hidden="true" className="mt-0.5 flex-none text-sky-deep" />
      <p className="muted text-[14px]">{block.text}</p>
    </div>
  )
}

export function Notice({ block }: BlockProps<'notice'>) {
  const bg = block.settings?.background === 'ivory' ? 'bg-mist' : block.settings?.background === 'tint' ? 'bg-tint' : 'bg-white'
  return (
    <section id={block.settings?.anchorId || undefined} className={`${bg} py-8`}>
      <div className="wrap">
        <NoticeBox block={block} className="mx-auto max-w-[860px]" />
        <PendingTag settings={block.settings} className="mt-3" />
      </div>
    </section>
  )
}
