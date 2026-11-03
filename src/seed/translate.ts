/**
 * Fills the Albanian (sq) version of every translatable field from src/seed/data/sq.json,
 * an English -> Albanian dictionary keyed by the exact English text.
 *
 *   npm run translate            fill empty Albanian fields (never overwrites edits made in the admin)
 *   npm run translate:extract    list English text with no translation yet, in sq-missing.json
 *
 * TRANSLATE=force overwrites every Albanian field that has a translation.
 *
 * It reads the English content that is in the database, not the seed files, so changes
 * the owner made in the admin are respected: edited English text simply has no match
 * and stays on the English fallback until it is translated.
 */
import 'dotenv/config'

import fs from 'fs'
import path from 'path'
import { getPayload, type Field, type Payload } from 'payload'
import { fileURLToPath } from 'url'

import config from '../payload.config'

const dirname = path.dirname(fileURLToPath(import.meta.url))
const DICT = path.resolve(dirname, 'data/sq.json')
const ctx = { disableRevalidate: true }

type Json = Record<string, unknown>
type Leaf = { path: (string | number)[]; value: string; maxLength?: number; required?: boolean; defaultValue?: unknown }

const isObj = (v: unknown): v is Json => Boolean(v) && typeof v === 'object' && !Array.isArray(v)

/** Every localized text value in a document, with its path. Lexical text nodes count as leaves. */
function collect(fields: Field[], data: unknown, at: (string | number)[], out: Leaf[], inLocalized = false) {
  if (!isObj(data)) return
  for (const field of fields) {
    const f = field as Field & { name?: string; localized?: boolean; fields?: Field[] }
    const localized = inLocalized || Boolean(f.localized)
    switch (f.type) {
      case 'row':
      case 'collapsible':
        collect(f.fields ?? [], data, at, out, localized)
        break
      case 'tabs':
        for (const tab of (f as { tabs: { name?: string; fields: Field[] }[] }).tabs) {
          if (tab.name) collect(tab.fields, data[tab.name], [...at, tab.name], out, localized)
          else collect(tab.fields, data, at, out, localized)
        }
        break
      case 'group':
        if (f.name) collect(f.fields ?? [], data[f.name], [...at, f.name], out, localized)
        else collect(f.fields ?? [], data, at, out, localized)
        break
      case 'array': {
        const rows = data[f.name!]
        if (Array.isArray(rows)) rows.forEach((row, i) => collect(f.fields ?? [], row, [...at, f.name!, i], out, localized))
        break
      }
      case 'blocks': {
        const rows = data[f.name!]
        const blocks = (f as { blocks: { slug: string; fields: Field[] }[] }).blocks
        if (Array.isArray(rows)) {
          rows.forEach((row, i) => {
            const block = blocks.find((b) => b.slug === (row as Json).blockType)
            if (block) collect(block.fields, row, [...at, f.name!, i], out, localized)
          })
        }
        break
      }
      case 'text':
      case 'textarea': {
        const v = data[f.name!]
        if (localized && typeof v === 'string' && v.trim()) {
          out.push({
            path: [...at, f.name!],
            value: v,
            maxLength: (f as { maxLength?: number }).maxLength,
            required: Boolean((f as { required?: boolean }).required),
            defaultValue: (f as { defaultValue?: unknown }).defaultValue,
          })
        }
        break
      }
      case 'richText': {
        const v = data[f.name!]
        if (localized && isObj(v)) out.push({ path: [...at, f.name!], value: JSON.stringify(v), required: Boolean((f as { required?: boolean }).required) })
        break
      }
    }
  }
}

/** Text nodes of a Lexical document, in order. */
function lexicalTexts(node: unknown, out: Json[] = []): Json[] {
  if (!isObj(node)) return out
  if (node.type === 'text' && typeof node.text === 'string') out.push(node)
  const kids = (node.root as Json | undefined)?.children ?? node.children
  if (Array.isArray(kids)) kids.forEach((k) => lexicalTexts(k, out))
  return out
}

const isLexical = (leaf: Leaf) => leaf.value.startsWith('{')

/** The English strings a leaf needs translated. */
function sources(leaf: Leaf): string[] {
  if (!isLexical(leaf)) return [leaf.value]
  return lexicalTexts(JSON.parse(leaf.value)).map((n) => String(n.text)).filter((t) => t.trim())
}

function getAt(obj: unknown, at: (string | number)[]): unknown {
  return at.reduce<unknown>((o, k) => (o == null ? undefined : (o as Json)[k as string]), obj)
}

function setAt(obj: Json, at: (string | number)[], value: unknown) {
  let o: Json = obj
  for (const k of at.slice(0, -1)) o = o[k as string] as Json
  o[at[at.length - 1] as string] = value
}

type Doc = { label: string; fields: Field[]; en: Json; sq: Json; write: (data: Json) => Promise<unknown> }

async function documents(payload: Payload): Promise<Doc[]> {
  const docs: Doc[] = []
  const collections = ['pages', 'destinations', 'fields-of-study', 'faqs', 'services'] as const
  for (const slug of collections) {
    const fields = payload.collections[slug].config.fields
    const read = (locale: 'en' | 'sq') =>
      payload.find({ collection: slug, locale, fallbackLocale: false, depth: 0, limit: 500, overrideAccess: true, pagination: false })
    const [en, sq] = await Promise.all([read('en'), read('sq')])
    for (const doc of en.docs as unknown as Json[]) {
      const sqDoc = (sq.docs as unknown as Json[]).find((d) => d.id === doc.id) ?? {}
      docs.push({
        label: `${slug}: ${String(doc.slug ?? doc.name ?? doc.label ?? doc.question ?? doc.key ?? doc.id)}`,
        fields,
        en: doc,
        sq: sqDoc,
        write: (data) =>
          payload.update({
            collection: slug,
            id: doc.id as number,
            locale: 'sq',
            data: slug === 'pages' ? { ...data, _status: 'published' } : data,
            overrideAccess: true,
            context: ctx,
          }),
      })
    }
  }
  for (const global of payload.config.globals) {
    const slug = global.slug as 'site-settings' | 'header' | 'footer'
    const read = (locale: 'en' | 'sq') => payload.findGlobal({ slug, locale, fallbackLocale: false, depth: 0, overrideAccess: true })
    const [en, sq] = await Promise.all([read('en'), read('sq')])
    docs.push({
      label: `global: ${slug}`,
      fields: global.fields,
      en: en as unknown as Json,
      sq: sq as unknown as Json,
      write: (data) => payload.updateGlobal({ slug, locale: 'sq', data, overrideAccess: true, context: ctx }),
    })
  }
  return docs
}

/** Strip what Payload sets itself before writing a document back. */
function writable(doc: Json): Json {
  const { id: _id, createdAt: _c, updatedAt: _u, globalType: _g, _status: _s, ...rest } = doc
  return rest
}

async function run() {
  // `payload run` does not pass CLI arguments through, so the mode comes from the environment.
  const mode = process.env.TRANSLATE
  const extract = mode === 'extract'
  const force = mode === 'force'
  const dict: Record<string, string> = fs.existsSync(DICT) ? JSON.parse(fs.readFileSync(DICT, 'utf8')) : {}

  const payload = await getPayload({ config })
  const docs = await documents(payload)

  if (extract) {
    const missing = new Set<string>()
    for (const d of docs) {
      const leaves: Leaf[] = []
      collect(d.fields, d.en, [], leaves)
      for (const leaf of leaves) for (const s of sources(leaf)) if (!dict[s]) missing.add(s)
    }
    const out = path.resolve(process.cwd(), 'sq-missing.json')
    fs.writeFileSync(out, JSON.stringify([...missing], null, 2))
    payload.logger.info(`${missing.size} English strings have no Albanian translation. Written to ${out}`)
    return
  }

  let filled = 0
  const untranslated = new Set<string>()
  const tooLong: string[] = []
  for (const d of docs) {
    const leaves: Leaf[] = []
    collect(d.fields, d.en, [], leaves)
    // Arrays and blocks are shared between languages, so the English document is the frame;
    // existing Albanian values are copied over it unless --force.
    const next: Json = structuredClone(d.en)
    let changed = 0
    for (const leaf of leaves) {
      const current = getAt(d.sq, leaf.path)
      // A value identical to the English, or to the field's (English) default, is what Payload filled in
      // for a new block, not a translation.
      const has =
        typeof current === 'string' ? current.trim() !== '' && current !== leaf.value && current !== leaf.defaultValue : isObj(current)
      if (has && !force) {
        setAt(next, leaf.path, current)
        continue
      }
      if (isLexical(leaf)) {
        const doc = JSON.parse(leaf.value)
        let complete = true
        for (const node of lexicalTexts(doc)) {
          const t = String(node.text)
          if (!t.trim()) continue
          if (dict[t]) {
            node.text = dict[t]
          } else {
            complete = false
            untranslated.add(t)
          }
        }
        setAt(next, leaf.path, complete || leaf.required ? doc : has ? current : null)
        if (complete) changed++
        continue
      }
      const sq = dict[leaf.value]
      if (!sq) {
        untranslated.add(leaf.value)
        // Required fields need a value in every language; others fall back to English.
        setAt(next, leaf.path, leaf.required ? leaf.value : has ? current : null)
        continue
      }
      if (leaf.maxLength && sq.length > leaf.maxLength) tooLong.push(`${d.label} ${leaf.path.join('.')}: ${sq.length}/${leaf.maxLength} "${sq}"`)
      setAt(next, leaf.path, sq)
      changed++
    }
    if (!changed) continue
    try {
      await d.write(writable(next))
      filled += changed
      payload.logger.info(`${d.label}: ${changed} fields`)
    } catch (err) {
      payload.logger.error(`${d.label}: not saved. ${err instanceof Error ? err.message : String(err)}`)
    }
  }

  if (tooLong.length) payload.logger.warn(`Translations longer than the field allows:\n${tooLong.join('\n')}`)
  if (untranslated.size) payload.logger.warn(`${untranslated.size} English strings have no translation yet; run npm run translate:extract to list them.`)
  payload.logger.info(`Albanian: ${filled} fields written.`)
}

try {
  await run()
  process.exit(0)
} catch (err) {
  console.error(err)
  process.exit(1)
}
