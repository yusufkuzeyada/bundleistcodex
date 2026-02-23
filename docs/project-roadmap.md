# Project Roadmap

Scope: stabilize the de-minified Netlify bundle workspace and make feature work faster and safer.

## Baseline (as of map generation)
- App is an editable static build artifact under `site/` (not original source repo).
- Supabase is live and active with 12 `public` tables, 1 `public` view, multiple SQL functions, and application triggers.
- Edge function exists: `cleanup-notifications`.
- File-name integrity checks are currently clean:
  - No residual hashed `*.js`/`*.css` names.
  - No missing HTML asset references.
  - No missing JS module imports.

## Phase 1: Reliability Foundation
- Keep schema map current:
  - Run `npm run map:supabase` before major feature edits.
  - Commit updates to `docs/supabase-map.json` and `docs/supabase-map.md`.
- Reduce breakage risk in bundle edits:
  - Limit first-pass changes to page-specific files when possible.
  - Use `npm run health` and manual smoke checks for `/` and `/dashboard/` after each change.
- Add a short release checklist:
  - Critical flows: login, customer list, order list, shipment list, blog list, newsletter submit.

## Phase 2: Data Access Hardening
- Create a lightweight data-access layer in plain JS:
  - Extract table/RPC calls into focused modules (customers, orders, shipments, consolidations, payments, notifications).
  - Keep UI components calling module methods, not raw `.from(...)` chains.
- Normalize Supabase config usage:
  - Replace hardcoded URL/key constants in app bundles with a single runtime config source.
  - Keep anon key on client only; move privileged actions to server-side/Edge.
- Fix risky auth-admin pattern:
  - Remove or replace client-side `auth.admin.*` usage with a secure backend endpoint or Edge function.

## Phase 3: Database Governance
- Bring DB changes under explicit migration flow:
  - Maintain SQL migrations in repo for schema, policies, functions, triggers.
  - Store operational SQL changes as versioned files, not one-off dashboard edits.
- Review and tighten RLS policies per table:
  - Confirm admin vs customer access boundaries for `orders`, `shipments`, `payment_transactions`, `notifications`, `customers`.
- Clean up schema inconsistencies:
  - Investigate duplicate FK constraints on `shipments.order_id`.
  - Document intentional multi-FK cases in `docs/supabase-map.md`.

## Phase 4: Maintainability and Speed
- Add feature ownership map updates to PR process:
  - Keep `docs/feature-map.md` aligned with code changes.
- Add regression automation:
  - Minimal E2E smoke tests for core dashboard flows.
  - SQL checks for required functions/triggers before deployment.
- Plan source-reconstruction track (optional but high ROI):
  - Recreate modular source structure (components/services) incrementally from bundle files.
  - Move from direct bundle editing to a maintainable source project when feasible.

