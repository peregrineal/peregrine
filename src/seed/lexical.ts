// Builds Lexical rich-text JSON from plain paragraphs, headings and bullet lists for the seed.

export type Part = string | { list: string[] } | { bold: string } | { h2: string } | { h3: string }

const text = (t: string, format = 0) => ({ type: 'text', text: t, format, detail: 0, mode: 'normal', style: '', version: 1 })

const paragraph = (children: ReturnType<typeof text>[]) => ({
  type: 'paragraph',
  format: '',
  indent: 0,
  version: 1,
  direction: 'ltr',
  textFormat: 0,
  textStyle: '',
  children,
})

export function richText(parts: Part[]) {
  const children = parts.map((p) => {
    if (typeof p === 'string') return paragraph([text(p)])
    if ('bold' in p) return paragraph([text(p.bold, 1)])
    if ('h2' in p || 'h3' in p) {
      const tag = 'h2' in p ? 'h2' : 'h3'
      return { type: 'heading', tag, format: '', indent: 0, version: 1, direction: 'ltr', children: [text('h2' in p ? p.h2 : p.h3)] }
    }
    return {
      type: 'list',
      listType: 'bullet',
      start: 1,
      tag: 'ul',
      format: '',
      indent: 0,
      version: 1,
      direction: 'ltr',
      children: p.list.map((item, i) => ({
        type: 'listitem',
        value: i + 1,
        format: '',
        indent: 0,
        version: 1,
        direction: 'ltr',
        children: [text(item)],
      })),
    }
  })
  return { root: { type: 'root', format: '', indent: 0, version: 1, direction: 'ltr', children } } as const
}
