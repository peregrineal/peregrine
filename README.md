# PEREGRINE website

Next.js 16 (App Router) + Payload CMS 3 + Postgres (Neon). The public site and the admin panel (`/admin`) are one app.

## First run

```bash
npm install
# 1. Put your Neon connection string in .env (DATABASE_URL). The other values are already generated.
# 2. Create the tables and load all content:
npm run migrate        # creates the schema from src/migrations
npm run seed           # loads the 8 pages, libraries, header, footer, settings and the Owner account
npm run translate      # fills in the Albanian version from src/seed/data/sq.json
npm run dev            # http://localhost:3000 and http://localhost:3000/admin
```

The Owner login is `SEED_OWNER_EMAIL` / `SEED_OWNER_PASSWORD` from `.env`. Change the password after the first login.

`npm run seed` is safe to run again: it updates records in place instead of duplicating them. It **overwrites** page sections with the seed copy, so do not run it against a database the owner has already edited.

## Scripts

| Script | What it does |
|---|---|
| `npm run dev` | Dev server. In development Payload also pushes schema changes to the database automatically. |
| `npm run build` / `npm start` | Production build and server. The build also works without a database (pages then render on first request). |
| `npm run migrate` | Applies migrations (use this for staging and production). |
| `npm run migrate:create <name>` | Creates a migration after changing collections, blocks or fields. |
| `npm run seed` | Loads all content (idempotent). `SEED_ONLY=privacy-policy,services npm run seed` loads only the named pages, libraries or `globals`. |
| `npm run feedback:apply` | Writes the client's feedback of 30 Oct 2026 (FAQ headers, Boarding Schools sections, founder text, five client photos) into an existing database, changed fields only. Home is saved as a draft until its photo licence is confirmed. |
| `npm run translate` | Fills empty Albanian fields from `src/seed/data/sq.json` (matched by the English text in the database). Never overwrites Albanian edits; `TRANSLATE=force` does. |
| `npm run translate:extract` | Lists English text that has no Albanian yet, in `sq-missing.json`. |
| `npm run generate:types` | Regenerates `src/payload-types.ts` after schema changes. |
| `npm run generate:importmap` | Regenerates the admin import map after adding admin components. |
| `npm run lint` / `npm run typecheck` / `npm test` | ESLint, TypeScript and unit tests (guardrails, form validation, links). |

## Where things are

```
src/
  app/(frontend)/          public site: [lang] layout and [[...slug]] page renderer, enquiry API routes, draft preview
  (next.config.ts)         language routing: / is English (rewritten to /en internally), /sq is Albanian
  app/(payload)/           Payload admin and REST/GraphQL API (generated, plus custom.scss branding)
  blocks/configs.ts        the 15 section types the owner can add to a page (admin fields)
  blocks/components/       the React component for each section type
  blocks/RenderBlocks.tsx  maps blockType -> component
  collections/             Pages, Media, Destinations, Fields of Study, FAQs, Services, Enquiries, Users
  globals/                 Site Settings, Header, Footer
  components/              Header, Footer, forms, shared UI, admin dashboard and branding
  lib/                     data access (Payload Local API), links, form validation, guardrails
  seed/                    all site copy from the client's FINAL Word documents
  migrations/              database migrations
public/brand/              logo files; public/admin-thumbnails/ section previews for the admin
docs/ADMIN-GUIDE.md        guide for the owner
HANDOVER.md                status, open decisions and what the client still owes
instructions/              the original brief, prototype and client documents (reference only)
```

## Design system

Tokens live in `src/app/(frontend)/globals.css` (`@theme`). Brand palette only: navy `#0A2240`, deep navy, white and soft light blue `#E1E8F0` (the client asked to drop champagne on 30 October 2026):

- `sky #9DB4CF`: rules and icon outlines. Decorative only on light backgrounds.
- `sky-deep #2E5B8A`: light-blue accent text on white or mist (6.6:1).
- `sky-light #C4D5E8`: accent text on navy. Primary buttons on navy are white.
- `sky-pale #E1E8F0`: icon circles and soft panels.
- `mist #EEF3F8` light blue alternate background (stored as "ivory" in the admin), `tint #F6F8FB` very light blue.

Fonts: Adobe Garamond Pro (headings, `src/fonts`, via `next/font/local`) and Montserrat (body, `next/font/google`), both self-hosted. Confirm the Garamond web licence before go-live.
