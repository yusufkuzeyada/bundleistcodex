# Local Development Setup

This folder contains a Netlify deployment artifact (static build), not the original source code.

## Quick start

1. Install dependencies:

```bash
npm install
```

2. Convert hashed/minified static output into editable form:

```bash
npm run setup:static
```

3. Start local server:

```bash
npm run dev
```

4. Open:

- Main site: `http://127.0.0.1:4173/`
- Dashboard: `http://127.0.0.1:4173/dashboard/`

5. Stop the dev server (from a new terminal):

```bash
npm run stop
```

## Supabase map snapshot

Generate a fresh live schema + local usage map:

```bash
npm run map:supabase
```

Output files refreshed by this command:

- `docs/supabase-map.json`
- `docs/supabase-map.md`

Related planning docs:

- `docs/feature-map.md`
- `docs/project-roadmap.md`

## Environment variables

- Real values are stored in `.env` (copied from `.env.codex.supabase.txt`).
- `.env` is git-ignored.
- Template variables are in `.env.example`.

### Newsletter email + unsubscribe flow

This workspace now includes Netlify Functions for newsletter:

- Subscribe endpoint: `/.netlify/functions/newsletter-subscribe`
- Unsubscribe endpoint: `/.netlify/functions/newsletter-unsubscribe`

The public footer newsletter form calls the subscribe endpoint, which:

1. Validates the email
2. Inserts into `newsletter_subscribers`
3. Sends a confirmation email using Resend
4. Adds a one-click unsubscribe button/link in the email

Required env vars for this flow:

- `SUPABASE_URL`
- `SUPABASE_SERVICE_ROLE_KEY`
- `RESEND_API_KEY`
- `NEWSLETTER_FROM_EMAIL`
- `NEWSLETTER_UNSUBSCRIBE_SECRET`
- `PUBLIC_SITE_URL` (recommended, used for unsubscribe URL generation)

Notes:

- Resend has a free tier; this keeps initial cost at $0 if your volume stays within free limits.
- `npm run dev` serves static files only. Netlify Functions run in Netlify or via Netlify CLI (`netlify dev`).

## Important note

This setup removes hash suffixes from chunk names and runs formatter on `js/css/html` so files become readable and directly editable.
Variable/function names still come from the build output, so this is not equivalent to original source code.

## Netlify

- Deploy publish directory is locked in `netlify.toml` as `site`.
- SPA rewrites are defined for both main app and dashboard routes.

