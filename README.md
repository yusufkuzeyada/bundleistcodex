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

## Important note

This setup removes hash suffixes from chunk names and runs formatter on `js/css/html` so files become readable and directly editable.
Variable/function names still come from the build output, so this is not equivalent to original source code.

## Netlify

- Deploy publish directory is locked in `netlify.toml` as `site`.
- SPA rewrites are defined for both main app and dashboard routes.

