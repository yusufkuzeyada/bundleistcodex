-- Draft/submitted orders may omit value/volume/weight.
-- Operational statuses still require strictly positive metrics.
-- Date: 2026-03-01

begin;

alter table public.orders
  drop constraint if exists orders_value_check;

alter table public.orders
  drop constraint if exists orders_volume_m3_check;

alter table public.orders
  drop constraint if exists orders_weight_kg_check;

alter table public.orders
  add constraint orders_value_check
  check (
    (
      status in ('Draft'::order_status, 'Submitted'::order_status)
      and value >= 0
    )
    or (
      status not in ('Draft'::order_status, 'Submitted'::order_status)
      and value > 0
    )
  );

alter table public.orders
  add constraint orders_volume_m3_check
  check (
    (
      status in ('Draft'::order_status, 'Submitted'::order_status)
      and volume_m3 >= 0
    )
    or (
      status not in ('Draft'::order_status, 'Submitted'::order_status)
      and volume_m3 > 0
    )
  );

alter table public.orders
  add constraint orders_weight_kg_check
  check (
    (
      status in ('Draft'::order_status, 'Submitted'::order_status)
      and weight_kg >= 0
    )
    or (
      status not in ('Draft'::order_status, 'Submitted'::order_status)
      and weight_kg > 0
    )
  );

commit;
