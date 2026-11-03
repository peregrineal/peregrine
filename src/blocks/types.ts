import type { Page } from '@/payload-types'

export type LayoutBlock = NonNullable<Page['layout']>[number]
export type BlockOf<T extends LayoutBlock['blockType']> = Extract<LayoutBlock, { blockType: T }>

/** Each block gets its own data plus its index (for unique ids and the first-hero priority). */
export type BlockProps<T extends LayoutBlock['blockType']> = { block: BlockOf<T>; index: number; isFirst: boolean }
