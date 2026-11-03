import ExcelJS from 'exceljs'
import type { Where } from 'payload'

/** The two form collections that can be downloaded as Excel from the admin. */
export type ExportSlug = 'enquiries' | 'partner-enquiries'

type Row = Record<string, unknown>
type Column = { header: string; width: number; value: (row: Row) => unknown; date?: boolean; wrap?: boolean }

const TIME_ZONE = 'Europe/Tirane'

const STATUS: Record<string, string> = { new: 'New', contacted: 'Contacted', closed: 'Closed' }
const LANGUAGE: Record<string, string> = { en: 'English', sq: 'Shqip' }

const text = (v: unknown) => (v == null ? '' : String(v))

/**
 * Excel dates carry no time zone, so the cell holds Tirana wall-clock time.
 * Otherwise the Owner would see UTC times, one or two hours off.
 */
export function tiranaTime(iso: unknown): Date | '' {
  if (!iso) return ''
  const date = new Date(String(iso))
  if (Number.isNaN(date.getTime())) return ''
  const parts = Object.fromEntries(
    new Intl.DateTimeFormat('en-GB', {
      timeZone: TIME_ZONE,
      hourCycle: 'h23',
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    })
      .formatToParts(date)
      .map((p) => [p.type, p.value]),
  )
  return new Date(Date.UTC(+parts.year, +parts.month - 1, +parts.day, +parts.hour, +parts.minute, +parts.second))
}

const start: Column[] = [
  { header: 'Received', width: 18, value: (r) => tiranaTime(r.createdAt), date: true },
  { header: 'Status', width: 12, value: (r) => STATUS[text(r.status)] ?? text(r.status) },
  { header: 'Language', width: 11, value: (r) => LANGUAGE[text(r.language)] ?? text(r.language) },
]

const end: Column[] = [
  { header: 'Consent', width: 10, value: (r) => (r.consent ? 'Yes' : 'No') },
  { header: 'Internal notes', width: 40, value: (r) => text(r.internalNotes), wrap: true },
  { header: 'ID', width: 8, value: (r) => r.id },
]

type Answer = { question?: string | null; answer?: string | null }

/** One column per service question, in the order the questions first appear. */
function answerColumns(rows: Row[]): Column[] {
  const questions: string[] = []
  for (const row of rows) {
    for (const a of (row.answers as Answer[] | undefined) ?? []) {
      const q = a?.question?.trim()
      if (q && !questions.includes(q)) questions.push(q)
    }
  }
  return questions.map((q) => ({
    header: q,
    width: Math.min(Math.max(q.length, 18), 40),
    wrap: true,
    value: (r) =>
      ((r.answers as Answer[] | undefined) ?? [])
        .filter((a) => a?.question?.trim() === q)
        .map((a) => text(a.answer))
        .join('; '),
  }))
}

/** Fields kept from the first version of the form, added only when some row has them. */
function legacyColumns(rows: Row[]): Column[] {
  const legacy: Column[] = [
    { header: 'Follow-up answer (old form)', width: 30, value: (r) => text(r.detail), wrap: true },
    { header: 'Destinations (old form)', width: 30, value: (r) => text(r.destinations), wrap: true },
  ]
  return legacy.filter((c) => rows.some((r) => c.value(r) !== ''))
}

export function columnsFor(slug: ExportSlug, rows: Row[]): Column[] {
  if (slug === 'partner-enquiries') {
    return [
      ...start,
      { header: 'Organisation', width: 28, value: (r) => text(r.organisation) },
      { header: 'Organisation type', width: 22, value: (r) => text(r.organisationType) },
      { header: 'Country', width: 16, value: (r) => text(r.country) },
      { header: 'Contact person & position', width: 28, value: (r) => text(r.contact) },
      { header: 'Email', width: 28, value: (r) => text(r.email) },
      { header: 'Website', width: 26, value: (r) => text(r.website) },
      { header: 'Proposal', width: 60, value: (r) => text(r.proposal), wrap: true },
      ...end,
    ]
  }
  return [
    ...start,
    { header: 'First name', width: 16, value: (r) => text(r.firstName) },
    { header: 'Last name', width: 16, value: (r) => text(r.lastName) },
    { header: 'Gender', width: 10, value: (r) => text(r.gender) },
    { header: 'Email', width: 28, value: (r) => text(r.email) },
    { header: 'Phone', width: 18, value: (r) => text(r.phone) },
    { header: 'Filled in by', width: 14, value: (r) => text(r.role) },
    { header: 'Service', width: 26, value: (r) => text(r.service) },
    { header: 'Student / participant', width: 22, value: (r) => text(r.participantName) },
    { header: 'Age', width: 8, value: (r) => text(r.participantAge) },
    ...answerColumns(rows),
    { header: 'Additional information', width: 50, value: (r) => text(r.message), wrap: true },
    ...legacyColumns(rows),
    ...end,
  ]
}

export const SHEET_NAME: Record<ExportSlug, string> = {
  enquiries: 'Consultation enquiries',
  'partner-enquiries': 'Partnership enquiries',
}

/** Builds the .xlsx file: bold frozen header row, filters on every column, real date cells. */
export async function buildWorkbook(slug: ExportSlug, rows: Row[]): Promise<Buffer> {
  const columns = columnsFor(slug, rows)
  const workbook = new ExcelJS.Workbook()
  workbook.creator = 'PEREGRINE website'
  workbook.created = new Date()

  const sheet = workbook.addWorksheet(SHEET_NAME[slug], { views: [{ state: 'frozen', ySplit: 1 }] })
  sheet.columns = columns.map((c) => ({ header: c.header, width: c.width }))

  // Empty strings become truly empty cells, so Excel's "(Blanks)" filter finds them.
  for (const row of rows) sheet.addRow(columns.map((c) => (c.value(row) === '' ? null : c.value(row))))

  const header = sheet.getRow(1)
  header.font = { bold: true, color: { argb: 'FFFFFFFF' } }
  header.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FF0B2545' } }
  header.alignment = { vertical: 'middle', wrapText: true }
  header.height = 30

  columns.forEach((c, i) => {
    const column = sheet.getColumn(i + 1)
    if (c.date) column.numFmt = 'dd/mm/yyyy hh:mm'
    column.alignment = { vertical: 'top', wrapText: Boolean(c.wrap) }
  })
  header.alignment = { vertical: 'middle', wrapText: true }

  sheet.autoFilter = { from: { row: 1, column: 1 }, to: { row: 1, column: columns.length } }

  return Buffer.from(await workbook.xlsx.writeBuffer())
}

const SEARCH_FIELDS: Record<ExportSlug, string[]> = {
  enquiries: ['email', 'firstName', 'lastName'],
  'partner-enquiries': ['organisation', 'email'],
}

/**
 * Turns the download link's query into a Payload `where`:
 * `ids=1,2,3` for selected rows or a single enquiry, otherwise the list's own filter (`where`, JSON) and `search`.
 */
export function exportWhere(slug: ExportSlug, query: Record<string, unknown>): Where | undefined {
  const ids = text(query.ids)
    .split(',')
    .map((s) => s.trim())
    .filter((s) => /^\d+$/.test(s))
  if (ids.length) return { id: { in: ids.map(Number) } }

  const parts: Where[] = []
  if (typeof query.where === 'string' && query.where) {
    try {
      const where = JSON.parse(query.where) as Where
      if (where && typeof where === 'object' && Object.keys(where).length) parts.push(where)
    } catch {
      // A malformed filter downloads everything rather than failing.
    }
  }
  const search = text(query.search).trim()
  if (search) parts.push({ or: SEARCH_FIELDS[slug].map((field) => ({ [field]: { like: search } })) })

  if (!parts.length) return undefined
  return parts.length === 1 ? parts[0] : { and: parts }
}

export function exportFilename(slug: ExportSlug, ids: string | undefined, count: number) {
  const day = new Date().toISOString().slice(0, 10)
  const base = slug === 'enquiries' ? 'consultation' : 'partnership'
  const single = ids && !ids.includes(',') && count === 1
  return single ? `${base}-enquiry-${ids}-${day}.xlsx` : `${base}-enquiries-${day}.xlsx`
}
