# Feature Map

This map is based on `docs/supabase-map.json` and current bundle files under `site/`.

## Entry Points
- Main site bootstrap: `site/assets/index.js`
- Main site app bundle: `site/assets/app.js`
- Dashboard bootstrap: `site/dashboard/assets/index.js`
- Dashboard app bundle: `site/dashboard/assets/app.js`
- Main site page modules: `site/assets/blogadmin.js`, `site/assets/bloglist.js`, `site/assets/blogpost.js`, `site/assets/auth.js`

## Supabase Client Locations
- Public site client init (URL + anon key): `site/assets/app.js`
- Dashboard client init (URL + anon key): `site/dashboard/assets/app.js`
- Dynamic preload wrappers: `site/assets/supabase.js`, `site/dashboard/assets/supabase.js`

## Feature-to-Data Map
- Blog and content admin:
  - Tables: `blog_posts`
  - Files: `site/assets/app.js`, `site/assets/blogadmin.js`, `site/assets/bloglist.js`, `site/assets/blogpost.js`
  - Operations: read/create/update/delete
- Public auth and customer bootstrap:
  - Tables: `customers`
  - Files: `site/assets/app.js`, `site/dashboard/assets/app.js`
  - Operations: auth sign-in/sign-up/sign-out + customer row provisioning
- Newsletter capture:
  - Tables: `newsletter_subscribers`
  - Files: `site/assets/app.js`
  - Operations: insert
- Dashboard core operations:
  - Suppliers: `suppliers` in `site/dashboard/assets/app.js`
  - Orders: `orders` in `site/dashboard/assets/app.js`
  - Shipments: `shipments` in `site/dashboard/assets/app.js`
  - Consolidations: `consolidations`, `consolidation_orders`, `consolidations_with_orders` in `site/dashboard/assets/app.js`
  - Payments/ledger: `payment_transactions` in `site/dashboard/assets/app.js`
  - Notifications: `notifications` in `site/dashboard/assets/app.js`
- Dashboard metrics:
  - RPC: `admin_dashboard_metrics`
  - File: `site/dashboard/assets/app.js`

## DB Automation and Backend Logic
- Public SQL functions include:
  - Metrics: `admin_dashboard_metrics`
  - Shipment/consolidation helpers: `create_consolidation_shipment_core`, `calculate_cost_variance`, `enforce_shipment_write_guards`
  - Operational cleanup: `cleanup_old_notifications`
  - Auth helper: `is_admin`, `create_customer_on_signup`
- Application triggers include:
  - `auth.users` -> `public.create_customer_on_signup`
  - `public.consolidations` -> `public.calculate_cost_variance` and `public.update_updated_at_column`
  - `public.customers`, `public.orders`, `public.shipments`, `public.suppliers` -> `public.update_updated_at_column`
  - `public.shipments` -> `public.enforce_shipment_write_guards`
- Edge function:
  - `cleanup-notifications` (ACTIVE, `verify_jwt=false`)

## Fast Path When You Ask for a Feature Change
1. Run `npm run map:supabase` to refresh live schema and usage.
2. Open `docs/supabase-map.md` for table columns, policies, functions, and triggers.
3. Open this file to jump to the likely bundle file.
4. Edit smallest page-specific file first; if logic is centralized, patch `site/assets/app.js` or `site/dashboard/assets/app.js`.

