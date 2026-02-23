# Supabase Map

Generated (UTC): 2026-02-23T10:08:47.936Z

## Project
- Project: `fbpemdlnlsgqkovnatro` (v4newsupa) | Region: `eu-north-1` | Status: `ACTIVE_HEALTHY`
- Database: PostgreSQL 17 (17.4.1.054)
- Created at: 2025-07-13T13:41:39.418238Z

## Folder Snapshot
- Top level: file: `.dev-server.log`, file: `.env`, file: `.env.codex.supabase.txt`, file: `.env.example`, file: `.gitignore`, dir: `.netlify`, dir: `docs`, dir: `netlify`, file: `netlify.toml`, dir: `node_modules`, file: `package-lock.json`, file: `package.json`, file: `README.md`, dir: `scripts`, dir: `site`
- Files under `site/`: 40
- Largest JS bundles: `site/dashboard/assets/app.js` (563622 bytes), `site/dashboard/assets/consolidationspage.js` (316834 bytes), `site/assets/react.js` (265456 bytes), `site/dashboard/assets/react.js` (256431 bytes), `site/assets/app.js` (255913 bytes)

## Schema Summary
| Schema | Object Type | Count |
| --- | --- | --- |
| `auth` | BASE TABLE | 20 |
| `extensions` | VIEW | 2 |
| `public` | BASE TABLE | 11 |
| `public` | VIEW | 1 |
| `realtime` | BASE TABLE | 3 |
| `storage` | BASE TABLE | 8 |
| `supabase_migrations` | BASE TABLE | 1 |
| `vault` | BASE TABLE | 1 |
| `vault` | VIEW | 1 |

## Public Tables
### blog_posts
- Columns (19): `id:uuid`, `title:text`, `content:text`, `excerpt:text`, `author_id:uuid`, `created_at:timestamptz`, `updated_at:timestamptz`, `published:bool`, `slug:text`, `image_url:text`, `title_en:text`, `title_tr:text`, `title_fr:text`, `excerpt_en:text`, `excerpt_tr:text`, `excerpt_fr:text`, `content_en:text`, `content_tr:text`, `content_fr:text`
- Primary key: `id`
- Foreign keys: `author_id -> customers.id`
- RLS policies: `blog_posts_admin_delete`, `blog_posts_admin_insert`, `blog_posts_admin_select_all`, `blog_posts_admin_update`, `blog_posts_public_select_published`
- Triggers: none
- Frontend usage: surfaces=site | ops=delete:1, insert:2, select:7, update:1 | files=`site/assets/app.js`, `site/assets/blogadmin.js`, `site/assets/bloglist.js`, `site/assets/blogpost.js`

### consolidation_orders
- Columns (2): `consolidation_id:uuid`, `order_id:uuid`
- Primary key: `consolidation_id, order_id`
- Foreign keys: `consolidation_id -> consolidations.id`, `order_id -> orders.id`
- RLS policies: `consolidation_orders_admin_write`, `consolidation_orders_select_visible`
- Triggers: none
- Frontend usage: surfaces=dashboard | ops=delete:1, upsert:1 | files=`site/dashboard/assets/app.js`

### consolidations
- Columns (22): `id:uuid`, `name:text`, `route:text`, `departure_date:date`, `creation_date:timestamptz`, `container_type_id:text`, `container_space_filled_percentage:numeric`, `container_weight_filled_percentage:numeric`, `shipping_cost:numeric`, `status:consolidation_status`, `is_mixed:bool`, `customer_id:uuid`, `shipping_cost_distributed:bool`, `cost_distribution_method:text`, `fixed_rate_per_m3:numeric`, `total_billed_amount:numeric`, `updated_at:timestamptz`, `notes:text`, `involved_customer_ids:_text`, `estimated_shipping_cost:numeric`, `cost_variance:numeric`, `cost_variance_percentage:numeric`
- Primary key: `id`
- Foreign keys: `container_type_id -> container_types.id`, `customer_id -> customers.id`
- RLS policies: `consolidations_admin_write`, `consolidations_select_visible`
- Triggers: `trigger_calculate_cost_variance -> calculate_cost_variance`, `update_consolidations_updated_at -> update_updated_at_column`
- Frontend usage: surfaces=dashboard | ops=insert:1, select:9, update:8 | files=`site/dashboard/assets/app.js`

### container_types
- Columns (4): `id:text`, `name:text`, `max_volume_m3:numeric`, `max_weight_kg:numeric`
- Primary key: `id`
- Foreign keys: none
- RLS policies: `container_types_authenticated_select`
- Triggers: none
- Frontend usage: none detected in local bundle.

### customers
- Columns (12): `id:uuid`, `name:text`, `email:text`, `company_name:text`, `contract_type_id:contract_type`, `has_used_trial_fee:bool`, `created_at:timestamptz`, `updated_at:timestamptz`, `role:text`, `phone:text`, `address:text`, `notes:text`
- Primary key: `id`
- Foreign keys: none
- RLS policies: `customers_admin_delete`, `customers_admin_insert`, `customers_self_insert_customer`, `customers_self_or_admin_select`, `customers_self_or_admin_update`
- Triggers: `update_customers_updated_at -> update_updated_at_column`
- Frontend usage: surfaces=dashboard, site | ops=delete:1, insert:6, select:13, update:3 | files=`site/assets/app.js`, `site/dashboard/assets/app.js`

### newsletter_subscribers
- Columns (3): `id:uuid`, `email:text`, `subscribed_at:timestamptz`
- Primary key: `id`
- Foreign keys: none
- RLS policies: `newsletter_subscribers_admin_delete`, `newsletter_subscribers_admin_select`, `newsletter_subscribers_insert_public`
- Triggers: none
- Frontend usage: none detected in local bundle.

### notifications
- Columns (13): `id:uuid`, `message:text`, `timestamp:timestamptz`, `user_id:uuid`, `is_read:bool`, `link_to_page:text`, `link_to_id:uuid`, `importance:text`, `metadata:jsonb`, `event_type:text`, `related_entity_type:text`, `related_entity_id:text`, `target_audience:text`
- Primary key: `id`
- Foreign keys: `user_id -> customers.id`
- RLS policies: `notifications_admin_delete`, `notifications_insert_self_or_admin`, `notifications_select_visible`, `notifications_update_visible`
- Triggers: none
- Frontend usage: surfaces=dashboard | ops=insert:1, select:8, update:4 | files=`site/dashboard/assets/app.js`

### orders
- Columns (12): `id:uuid`, `description:text`, `value:numeric`, `supplier_id:uuid`, `volume_m3:numeric`, `weight_kg:numeric`, `customer_id:uuid`, `status:order_status`, `notes:text`, `creation_date:timestamptz`, `updated_at:timestamptz`, `charges_applied:bool`
- Primary key: `id`
- Foreign keys: `customer_id -> customers.id`, `supplier_id -> suppliers.id`
- RLS policies: `orders_admin_delete`, `orders_admin_update`, `orders_insert_self_or_admin`, `orders_select_self_or_admin`
- Triggers: `update_orders_updated_at -> update_updated_at_column`
- Frontend usage: surfaces=dashboard | ops=delete:2, insert:2, select:18, update:2 | files=`site/dashboard/assets/app.js`

### payment_transactions
- Columns (12): `id:uuid`, `customer_id:uuid`, `date:timestamptz`, `type:transaction_type`, `description:text`, `amount:numeric`, `related_order_id:uuid`, `related_consolidation_id:uuid`, `related_shipment_id:uuid`, `is_adjustment:bool`, `adjustment_reason:text`, `idempotency_key:text`
- Primary key: `id`
- Foreign keys: `customer_id -> customers.id`, `related_consolidation_id -> consolidations.id`, `related_order_id -> orders.id`, `related_shipment_id -> shipments.id`
- RLS policies: `payment_transactions_admin_write`, `payment_transactions_select_self_or_admin`
- Triggers: none
- Frontend usage: surfaces=dashboard | ops=delete:6, insert:2, select:9 | files=`site/dashboard/assets/app.js`

### shipments
- Columns (21): `id:uuid`, `status:text`, `origin:text`, `destination:text`, `shipped_date:timestamptz`, `estimated_delivery:timestamptz`, `actual_delivery:timestamptz`, `customer_id:uuid`, `consolidation_id:uuid`, `created_at:timestamptz`, `updated_at:timestamptz`, `notes:text`, `carrier:text`, `description:text`, `type:text`, `related_id:uuid`, `tracking_url:text`, `is_mixed:bool`, `involved_customer_ids:_text`, `order_id:uuid`, `idempotency_key:text`
- Primary key: `id`
- Foreign keys: `consolidation_id -> consolidations.id`, `customer_id -> customers.id`, `order_id -> orders.id`, `order_id -> orders.id`
- RLS policies: `shipments_admin_write`, `shipments_select_visible`
- Triggers: `trg_enforce_shipment_write_guards -> enforce_shipment_write_guards`, `update_shipments_updated_at -> update_updated_at_column`
- Frontend usage: surfaces=dashboard | ops=delete:2, insert:1, select:20, update:4 | files=`site/dashboard/assets/app.js`

### suppliers
- Columns (8): `id:uuid`, `name:text`, `created_at:timestamptz`, `updated_at:timestamptz`, `company_location:text`, `contact_person:text`, `phone_number:text`, `rating:numeric`
- Primary key: `id`
- Foreign keys: none
- RLS policies: `suppliers_admin_write`, `suppliers_authenticated_select`
- Triggers: `update_suppliers_updated_at -> update_updated_at_column`
- Frontend usage: surfaces=dashboard | ops=delete:2, insert:2, select:12, update:2 | files=`site/dashboard/assets/app.js`

## Public Views
- `consolidations_with_orders`

## Public Enums
- `consolidation_status`: `Planning`, `In Progress`, `Completed`, `Cancelled`, `Loading`, `ReadyToShip`, `ArrivedAtDestination`, `Shipped`, `OrderCollection`, `DocumentPreparation`, `QualityCheck`, `InTransit`, `AtOriginPort`, `InTransitSea`, `AtDestinationPort`, `CustomsClearance`, `AwaitingDelivery`, `OutForDelivery`, `Delivered`, `OnHold`
- `contract_type`: `trial`, `growth`, `corporate`
- `notification_importance`: `low`, `medium`, `high`, `critical`
- `order_status`: `Pending`, `Processing`, `QualityCheck`, `ReadyToShip`, `InTransit`, `AtOriginPort`, `InTransitSea`, `AtDestinationPort`, `CustomsClearance`, `AwaitingDelivery`, `OutForDelivery`, `Delivered`, `Completed`, `Cancelled`, `OnHold`, `InConsolidation`, `Draft`, `Submitted`
- `shipment_type`: `individual`, `consolidation`
- `transaction_type`: `Payment`, `Refund`, `ShippingCost`, `Fee`, `IncomingPayment`, `OrderCost`, `ServiceFee`, `MiscellaneousCost`, `OrderCostAdjustment`, `ServiceFeeAdjustment`, `OrderCostReversal`, `ServiceFeeReversal`, `ShippingCostReversal`, `RefundPayout`

## Public Functions
| Function | Args | Returns | Language | Security Definer |
| --- | --- | --- | --- | --- |
| `admin_dashboard_metrics` | `window_days integer, balance_threshold numeric` | `TABLE(total_suppliers bigint, total_orders bigint, total_shipments bigint, total_active_consolidations bigint, pending_orders bigint, in_progress_orders bigint, ready_orders bigint, departing_soon bigint, capacity_risk bigint, missing_tracking bigint, missing_shipment bigint, negative_balances bigint)` | `plpgsql` | no |
| `calculate_cost_variance` | `` | `trigger` | `plpgsql` | no |
| `check_duplicate_payment_transaction` | `p_customer_id uuid, p_related_consolidation_id uuid, p_type transaction_type, p_amount numeric, p_description text` | `boolean` | `plpgsql` | no |
| `check_notification_exists` | `p_user_id uuid, p_event_type text, p_related_entity_type text, p_related_entity_id text, p_hours_back integer` | `boolean` | `plpgsql` | no |
| `cleanup_old_notifications` | `read_retention_days integer, unread_retention_days integer, batch_size integer` | `integer` | `plpgsql` | yes |
| `create_consolidation_shipment_core` | `p_consolidation_id uuid, p_shipping_cost numeric, p_cost_variance numeric, p_cost_variance_percentage numeric, p_carrier text, p_tracking_url text, p_estimated_delivery timestamp with time zone, p_description text, p_status text, p_customer_id uuid, p_involved_customer_ids text[], p_is_mixed boolean, p_origin text, p_destination text, p_idempotency_key text` | `TABLE(shipment_id uuid, consolidation_status text, created boolean)` | `plpgsql` | yes |
| `create_customer_on_signup` | `` | `trigger` | `plpgsql` | yes |
| `enforce_shipment_write_guards` | `` | `trigger` | `plpgsql` | no |
| `is_admin` | `` | `boolean` | `sql` | yes |
| `update_updated_at_column` | `` | `trigger` | `plpgsql` | no |

## Application Triggers
| Table | Trigger | Function | Enabled |
| --- | --- | --- | --- |
| `auth.users` | `create_customer_on_signup_trigger` | `public.create_customer_on_signup` | `O` |
| `public.consolidations` | `trigger_calculate_cost_variance` | `public.calculate_cost_variance` | `O` |
| `public.consolidations` | `update_consolidations_updated_at` | `public.update_updated_at_column` | `O` |
| `public.customers` | `update_customers_updated_at` | `public.update_updated_at_column` | `O` |
| `public.orders` | `update_orders_updated_at` | `public.update_updated_at_column` | `O` |
| `public.shipments` | `trg_enforce_shipment_write_guards` | `public.enforce_shipment_write_guards` | `O` |
| `public.shipments` | `update_shipments_updated_at` | `public.update_updated_at_column` | `O` |
| `public.suppliers` | `update_suppliers_updated_at` | `public.update_updated_at_column` | `O` |

## Edge Functions
- `cleanup-notifications` | status=`ACTIVE` | verify_jwt=`false` | version=`3`

## Frontend RPC Usage
- `admin_dashboard_metrics` | surfaces=dashboard | files=`site/dashboard/assets/app.js`

## Workspace Checks
- Residual hashed filenames: 0
- Missing HTML asset references: 0
- Missing JS module imports: 0

