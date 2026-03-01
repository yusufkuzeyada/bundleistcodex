-- Draft order temporary documents bucket and policies
-- Temp docs stay during Draft/Submitted/Pending and are auto-cleaned at Processing.
-- Date: 2026-03-01

begin;

insert into storage.buckets (
  id,
  name,
  public,
  file_size_limit,
  allowed_mime_types
)
values (
  'order-draft-temp',
  'order-draft-temp',
  false,
  10485760, -- 10 MB
  array[
    'application/pdf',
    'image/jpeg',
    'image/png',
    'image/webp'
  ]::text[]
)
on conflict (id) do update
set
  public = excluded.public,
  file_size_limit = excluded.file_size_limit,
  allowed_mime_types = excluded.allowed_mime_types;

drop policy if exists order_draft_temp_select on storage.objects;
create policy order_draft_temp_select
on storage.objects
for select
to authenticated
using (
  bucket_id = 'order-draft-temp'
  and (
    is_admin()
    or (
      split_part(name, '/', 1) ~* '^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$'
      and exists (
        select 1
        from public.orders o
        where
          o.id = split_part(name, '/', 1)::uuid
          and o.customer_id = auth.uid()
      )
    )
  )
);

drop policy if exists order_draft_temp_insert on storage.objects;
create policy order_draft_temp_insert
on storage.objects
for insert
to authenticated
with check (
  bucket_id = 'order-draft-temp'
  and owner = auth.uid()
  and (
    is_admin()
    or (
      split_part(name, '/', 1) ~* '^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$'
      and exists (
        select 1
        from public.orders o
        where
          o.id = split_part(name, '/', 1)::uuid
          and o.customer_id = auth.uid()
          and o.status in ('Draft'::order_status, 'Submitted'::order_status, 'Pending'::order_status)
      )
    )
  )
);

drop policy if exists order_draft_temp_delete on storage.objects;
create policy order_draft_temp_delete
on storage.objects
for delete
to authenticated
using (
  bucket_id = 'order-draft-temp'
  and (
    is_admin()
    or (
      split_part(name, '/', 1) ~* '^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$'
      and exists (
        select 1
        from public.orders o
        where
          o.id = split_part(name, '/', 1)::uuid
          and o.customer_id = auth.uid()
          and o.status in ('Draft'::order_status, 'Submitted'::order_status, 'Pending'::order_status)
      )
    )
  )
);

commit;

