import 'server-only'

import type { Payload } from 'payload'

const escape = (s: string) => s.replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]!)

/**
 * Sends the "new enquiry" email to PEREGRINE. The enquiry is already saved in the
 * admin, so a missing email provider never loses data: without RESEND_API_KEY the
 * message is logged instead. Returns whether an email was actually sent.
 */
export async function sendEnquiry(payload: Payload, subject: string, rows: [string, string][]) {
  const to = process.env.ENQUIRY_TO || 'info@peregrine.al'
  const text = rows.map(([k, v]) => `${k}: ${v}`).join('\n')

  if (!process.env.RESEND_API_KEY) {
    payload.logger.info(`[enquiry] email provider not configured, enquiry saved only.\n${subject}\n${text}`)
    return false
  }

  const html = `<h2 style="font-family:Georgia,serif;color:#0A2240">${escape(subject)}</h2><table cellpadding="6" style="font-family:Arial,sans-serif;font-size:14px;color:#0A2240">${rows
    .map(([k, v]) => `<tr><td style="font-weight:bold;vertical-align:top">${escape(k)}</td><td>${escape(v).replace(/\n/g, '<br>')}</td></tr>`)
    .join('')}</table>`

  await payload.sendEmail({ to, subject, text, html })
  return true
}
