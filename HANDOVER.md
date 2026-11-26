# PEREGRINE: handover

Status on 25 October 2026. Built by DuaDev.

## What is built

- **Nine pages**, with all copy from the client's FINAL Word documents: Home, Universities & Pathways, Boarding Schools, Seasonal Camps, Tourist & Visitor Visas, About Us, Partner With Us, Book a Consultation, and the Privacy Policy (from "POLITIKA E PRIVATËSISË.docx", added 29 October 2026, linked in the footer and from both consent checkboxes). Layout and components follow the approved Claude Design prototype, with champagne added as a restrained accent next to navy.
- **Admin panel** at `/admin` (Payload CMS 3): every page is a stack of sections the owner can edit, reorder, hide, add and remove, with section thumbnails, live preview (desktop 1440 / tablet 834 / mobile 390), drafts, autosave, scheduled publishing, 25 versions per page with compare and restore. Changes go live within seconds (on-demand revalidation, no redeploy).
- **Content libraries**: 20 destinations (tagged for universities, boarding schools and camps), 15 fields of study, 31 FAQs in four categories, 7 services that drive the booking form (including General Enquiry).
- **Booking form** (`/book-a-consultation`), the three-step form from "Formulari.docx": 1. contact details, gender, who is filling it in and the service; 2. only that service's questions (single and multiple choice, "Other" with a text box, destinations from the library); 3. anything else and consent. A parent or guardian is also asked for the student's name and, where the service does not ask it, age. Switching service drops the previous service's answers. Service preselected from `?service=` (`higher-education`, `boarding`, `language-courses`, `camps`, `student-visa`, `tourist-visa`, `general`). The questions are fixed in `src/lib/consultationForm.ts` (both languages); client and server validation; honeypot; rate limit. Enquiries store the answers in English as question and answer pairs.
- **Partnership form** on Partner With Us, same protections.
- **Enquiries** from both forms are stored in the admin (Owner only), with status, internal notes and CSV export (`/api/enquiries/export.csv`, `/api/partner-enquiries/export.csv`).
- **Guardrails**: legal notices editable by the Owner only; images need alt text and a confirmed licence before a page can be published; core pages cannot be deleted and their slugs are locked; only the Owner creates pages and manages users and settings; login lockout after 5 failed attempts (15 minutes); passwords of at least 10 characters.
- **Admin dashboard**: quick links to every page, recent edits, items marked "pending approval", images missing alt text or licence.
- **SEO**: title, description, canonical and Open Graph per page; `sitemap.xml` (published pages only) and `robots.txt` for `https://peregrine.al`; `/admin` is noindex and excluded.
- **Accessibility**: one `h1` per page, skip link, visible focus, keyboard-operable menu, carousel, timeline and FAQ, labelled inputs, `aria-invalid`/`aria-describedby`, error summary with focus on the first invalid field, reduced-motion support. Checked: no horizontal scroll at 390, 1024, 1200, 1320, 1440 and 1920 px on any page.
- **Languages**: English at `/about-us`, Albanian at `/sq/about-us`, with a language switch in the header, `hreflang` alternates and both languages in the sitemap. Page copy is translated in the admin (language selector at the top of each page); fixed interface text (form labels and errors, menu aids, 404) is in `src/lib/dictionary.ts`. Enquiries record the language they were sent in. The Albanian copy was drafted by DuaDev and is **pending the client's review**: see `docs/TRANSLATION-REVIEW.md`. Payload has no Albanian admin translation, so the admin itself is English only.

Verified locally against a temporary Postgres: migrate, seed (and re-seed with no duplicates), every route, both forms saving, all guardrails, live revalidation, `npm run build`, `npm run lint`, `npm run typecheck`, `npm test` (14 tests).

## Placeholders still visible

- **All photos.** Every image area shows a navy placeholder with its photo brief. Upload licensed photos in Media (alt text + "Licence confirmed"), then choose them in the section. Destination photos are chosen on each Destination. The client's mockup images are AI renders and must not be used.
- **Destination photos** are in place: 20 openly licensed Wikimedia Commons photos of national landmarks (`npm run seed:photos`, records in `src/seed/data/destination-photos.json`; the three visa destination cards use `visa-photos.json`). Most are CC BY or CC BY-SA, so each card shows a credit linking to the source; keep the credit if a photo is reused elsewhere, and replace rather than edit the Media credit.
- **Founder portrait** (About Us).
- **"Address to be confirmed"** tag (footer, contact block). Untick in Site Settings → Address confirmed.
- **Privacy Policy details** the client has to supply (shown in brackets, with a "pending approval" tag on the page): legal name of the entity, NIPT/NUIS, registered address, effective and last-updated dates, the retention period for enquiries that do not become clients, and the hosting and email providers in section 12. Once filled in, untick "Pending approval" in the section settings. Section 13 (promotional communications) should be adapted once PEREGRINE decides whether it will send marketing; the site has no newsletter sign-up today.
- **Social links**: the footer says "links to be supplied". Add them in Site Settings → Social links and the note disappears.

## Copy written by DuaDev (please confirm with the client)

The client documents did not cover these, so DuaDev wrote or chose them:

- Meta titles and descriptions for every page (admin → page → SEO tab).
- A few section eyebrows not in the documents (e.g. "Begin your journey", "Your next journey"), the hero eyebrow "International Education & Visa Consultancy" (taken from the client's mockup), and the three Home CTA highlights "Discuss Your Plans / Explore Your Options / Understand the Next Steps" (also from the mockup).
- The English version of the consultation form and of the Privacy Policy (the client supplied both in Albanian), and section 12 of the Privacy Policy in both languages; the partnership "Organisation type" options and its success message.
- The Tourist Visas legal notice combines two sentences from the client's text.
- "Student Visas" has no page of its own in the documents; the Home card and footer link point to the Blueprint Method on Universities & Pathways (`#approach`), which describes visa support.
- "Success Stories" from the mockup nav was left out: the brief rules out testimonials and success claims.
- The documents mention Denmark in an earlier version; the FINAL list of 20 destinations is used (it has Spain and Sweden, no Denmark).

## Decisions the client still has to make (cost or legal)

| Need | Recommended | Why it needs approval |
|---|---|---|
| Database | Neon Postgres (already chosen). Use a separate Neon branch for production. | Plan size and cost. |
| Image storage | Cloudflare R2 (chosen). The `@payloadcms/storage-s3` adapter is wired up and turns on when the `R2_*` variables are set. | Until then uploads are on local disk (`/media`), which is lost on most hosts after a redeploy. **Required before go-live.** |
| Hosting | A Node.js host (Vercel, Railway, Render, a VPS) | The site is no longer a static export. |
| Email | Resend (adapter already installed: set `RESEND_API_KEY`, verify the peregrine.al domain) | Needed for password resets and enquiry notifications. Until then enquiries are saved in the admin and the email is only logged. |
| Storing enquiries | Currently **on** (both forms save to the admin) | Personal data under Albanian data protection law: needs a privacy policy and a retention period. See "Retention" below. |
| Terms of use | Add as a new page (Rich Text section) if the client wants one | Legal text from the client. The Privacy Policy is done. |

## Environment variables

See `.env.example`. `DATABASE_URL`, `PAYLOAD_SECRET`, `NEXT_PUBLIC_SERVER_URL` and `PREVIEW_SECRET` are required; `RESEND_API_KEY`, `EMAIL_FROM` and `ENQUIRY_TO` enable email; `R2_ACCOUNT_ID`, `R2_BUCKET`, `R2_ACCESS_KEY_ID` and `R2_SECRET_ACCESS_KEY` move media to Cloudflare R2; `SEED_OWNER_EMAIL` and `SEED_OWNER_PASSWORD` create the first Owner account during `npm run seed`. `.env` is git-ignored; never commit it.

## Running the seed

```bash
npm run migrate   # on a fresh database
npm run seed      # loads all content; idempotent
npm run translate # fills empty Albanian fields from src/seed/data/sq.json; never overwrites Albanian edits
```

The seed overwrites page sections with the seed copy, so only run it on a new database or one nobody has edited yet.

## Retention (to set once agreed)

There is no automatic deletion yet. Once the client agrees a retention period, delete older enquiries from the admin list (filter by date, select, delete), or add a scheduled Payload job that deletes `enquiries` and `partner-enquiries` older than the period.

## Backups (plan, not set up)

- **Database**: Neon keeps point-in-time history according to the plan. Also take a daily `pg_dump` of the production branch to off-site storage.
- **Media**: once on R2, turn on bucket versioning or a daily copy to a second bucket.
- Test a restore once before go-live. Nothing has been set up on a paid service.

## Before go-live checklist

1. Neon production branch, `npm run migrate`, `npm run seed`, change the Owner password, create Editor accounts.
2. R2 bucket and API token, `R2_*` variables set, existing `/media` files re-uploaded (or copied to the bucket).
3. Email provider and `ENQUIRY_TO`; send a test enquiry.
4. Licensed photos uploaded with alt text and licence confirmed.
5. Address confirmed, social links, Privacy Policy brackets filled in and its "pending approval" tag removed.
6. `NEXT_PUBLIC_SERVER_URL=https://peregrine.al`, HTTPS only.
7. Confirm a **web** licence for Adobe Garamond Pro (`src/fonts`, supplied as desktop .otf files). If there is none, switch to an Adobe Fonts web kit or back to EB Garamond (one change in `src/app/(frontend)/[lang]/layout.tsx`).
