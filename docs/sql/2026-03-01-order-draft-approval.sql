-- Order draft + admin approval workflow
-- Date: 2026-03-01

begin;

alter table public.orders
  add column if not exists requested_supplier_name text;

comment on column public.orders.requested_supplier_name is
  'Supplier name provided by customer when no supplier record exists yet.';

-- Keep admin insert/update behavior; restrict customer insert to draft/submitted.
drop policy if exists orders_insert_self_or_admin on public.orders;
create policy orders_insert_self_or_admin
on public.orders
for insert
to authenticated
with check (
  is_admin()
  or (
    customer_id = auth.uid()
    and status in ('Draft'::order_status, 'Submitted'::order_status)
  )
);

drop policy if exists orders_admin_update on public.orders;
create policy orders_admin_update
on public.orders
for update
to authenticated
using (is_admin())
with check (is_admin());

-- Customers may only edit their own draft/submitted orders, and keep them in draft/submitted.
drop policy if exists orders_customer_draft_update on public.orders;
create policy orders_customer_draft_update
on public.orders
for update
to authenticated
using (
  customer_id = auth.uid()
  and status in ('Draft'::order_status, 'Submitted'::order_status)
)
with check (
  customer_id = auth.uid()
  and status in ('Draft'::order_status, 'Submitted'::order_status)
);

-- Customers may delete only their own draft/submitted orders.
drop policy if exists orders_customer_draft_delete on public.orders;
create policy orders_customer_draft_delete
on public.orders
for delete
to authenticated
using (
  customer_id = auth.uid()
  and status in ('Draft'::order_status, 'Submitted'::order_status)
);

commit;
