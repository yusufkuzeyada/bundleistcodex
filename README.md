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

## Environment variables

- Real values are stored in `.env` (copied from `.env.codex.supabase.txt`).
- `.env` is git-ignored.
- Template variables are in `.env.example`.

## Order Draft Approval Migration

Customer draft orders with admin approval require a Supabase schema/policy update.

- SQL file: `docs/sql/2026-03-01-order-draft-approval.sql`
- SQL file: `docs/sql/2026-03-01-order-draft-metrics-constraints.sql`
- SQL file: `docs/sql/2026-03-01-order-draft-docs-temp-bucket.sql`
- Apply it in Supabase SQL Editor before using the full draft workflow in production.
- Optional env var for cleanup function bucket override: `ORDER_DRAFT_TEMP_BUCKET` (default: `order-draft-temp`).

## Maintainability helpers

- Shared Netlify Function utilities are in `netlify/functions/_shared.js`.
- Shared script utilities are in `scripts/lib/env.mjs` and `scripts/lib/supabase-project-query.mjs`.
- Run `npm run check:syntax` to syntax-check all `netlify/functions` and `scripts` files before deploy.
- Run `npm run lint` for maintainability-focused lint checks.
- Run `npm test` for baseline unit tests around shared helpers.
- Dashboard debug logging is centralized in `site/dashboard/assets/debug-tools.js`.
- Enable dashboard debug logs temporarily with `?dashboard_debug=1` (persisted in local storage).

## CI

- GitHub Actions workflow: `.github/workflows/ci.yml`
- CI runs: `check:syntax`, `lint`, and `test` on pushes and pull requests.

## Local Hooks

- Install repo hooks once per clone:
  - `npm run hooks:install`
- Hook behavior:
  - `pre-commit`: runs `check:syntax` and `lint`
  - `pre-push`: runs `verify` (`check:syntax`, `lint`, `test`)

## Branch Protection

- Full checklist and exact required settings:
  - `docs/branch-protection.md`
- Optional API dry-run:
  - `npm run protect:branch`
- Optional explicit-branch override:
  - `npm run protect:branch -- --branch your-default-branch`
  - `npm run protect:branch -- your-default-branch`

## Source Reconstruction

- Incremental reconstruction plan: `docs/source-reconstruction-plan.md`.

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

### Notification policy and cleanup

Dashboard notification center policy is now explicit:

- Customer page size: `50` (load more for older items)
- Admin page size: `100` (load more for older items)

Automated retention cleanup runs daily off-peak via scheduled Netlify Function:

- Function: `/.netlify/functions/notification-retention-cleanup`
- Schedule: `15 2 * * *` (02:15 UTC daily)
- Defaults: read notifications `21` days, unread notifications `75` days
- Cleanup is batched and repeats within one run until backlog is drained (up to configured max batches)

Optional env vars for this cleanup flow:

- `NOTIFICATION_READ_RETENTION_DAYS` (clamped to `14..30`)
- `NOTIFICATION_UNREAD_RETENTION_DAYS` (clamped to `60..90`)
- `NOTIFICATION_CLEANUP_BATCH_SIZE` (clamped to `500..10000`)
- `NOTIFICATION_CLEANUP_MAX_BATCHES` (clamped to `1..50`)
- `NOTIFICATION_CLEANUP_SECRET` (required header `x-notification-cleanup-secret` for manual invocation)

## Important note

This setup removes hash suffixes from chunk names and runs formatter on `js/css/html` so files become readable and directly editable.
Variable/function names still come from the build output, so this is not equivalent to original source code.

## Netlify

- Deploy publish directory is locked in `netlify.toml` as `site`.
- SPA rewrites are defined for both main app and dashboard routes.

