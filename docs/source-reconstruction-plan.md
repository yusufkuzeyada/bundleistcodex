# Incremental Source Reconstruction Plan

Goal: move from editing de-minified build artifacts to a maintainable source project without blocking feature delivery.

## Principles

- Keep production behavior stable while rebuilding.
- Extract one bounded area at a time.
- Verify each extraction with side-by-side checks.
- Treat `site/` as generated output once source reconstruction starts.

## Phase 0: Baseline and Guardrails (1-2 days)

- Freeze current behavior baseline:
  - Capture screenshots/flows for `/` and `/dashboard/` critical paths.
  - Keep `docs/feature-map.md` aligned with current modules.
- Establish build/test guardrails:
  - Keep CI green on syntax/lint/tests.
  - Add smoke checklist to PR template.

Exit criteria:
- Baseline artifacts and checklist committed.
- CI required for merges.

## Phase 1: Bootstrap Rebuild Workspace (2-3 days)

- Create a parallel source workspace, e.g. `rebuild/`:
  - `rebuild/package.json`
  - `rebuild/src/`
  - `rebuild/vite.config.*`
- Mount existing static assets temporarily where needed.
- Implement route shells:
  - `/` shell
  - `/dashboard/` shell

Exit criteria:
- `npm run dev` in `rebuild/` serves matching route skeletons.
- Existing deployed app remains unchanged.

## Phase 2: Extract Shared Runtime Primitives (3-5 days)

- Rebuild and centralize:
  - Supabase client bootstrap
  - auth/session bootstrap
  - notification helpers
  - shared utilities (formatting, enums, constants)
- Add unit tests for extracted primitives.

Exit criteria:
- Shared primitives consumed by at least one rebuilt page.
- Legacy bundle still serves remaining pages.

## Phase 3: Migrate Dashboard Verticals One by One (1-2 weeks)

Suggested order (lowest coupling first):
1. Suppliers
2. Customers
3. Payments
4. Orders
5. Consolidations
6. Shipments

Per vertical:
- Move service/data calls to typed module boundary.
- Move UI to source components.
- Add minimal integration tests for status transitions and key mutations.
- Validate with before/after smoke checks.

Exit criteria per vertical:
- Vertical route rendered from source project.
- Legacy bundle no longer required for that vertical.

## Phase 4: Cutover and Decommission Legacy Bundle (2-4 days)

- Switch Netlify publish path to rebuilt output.
- Remove legacy dashboard bundle entrypoints from active path.
- Keep old artifacts in a tagged backup branch for rollback.

Exit criteria:
- Production served from rebuilt source.
- Rollback instructions documented.

## Risk Controls

- Feature flags for page-level cutover (`legacy` vs `rebuild` route switch).
- No schema changes bundled with UI migration unless isolated and tested.
- Keep migrations and UI refactors in separate PRs.

## Immediate Next Tasks

1. Create `rebuild/` scaffold and route shells.
2. Port Supabase/auth bootstrap into `rebuild/src/lib/`.
3. Migrate one low-coupling page (`Suppliers`) as pilot.
