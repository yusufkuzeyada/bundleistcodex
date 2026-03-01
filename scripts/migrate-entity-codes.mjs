import { loadEnv } from "./lib/env.mjs";
import {
  createSupabaseProjectQueryRunner,
  getProjectRefFromSupabaseUrl,
} from "./lib/supabase-project-query.mjs";

async function main() {
  const env = loadEnv();
  const supabaseUrl = env.SUPABASE_URL;
  const accessToken = env.SUPABASE_ACCESS_TOKEN;

  if (!supabaseUrl || !accessToken) {
    throw new Error(
      "Missing SUPABASE_URL or SUPABASE_ACCESS_TOKEN (.env or process env).",
    );
  }

  const projectRef = getProjectRefFromSupabaseUrl(supabaseUrl);
  const runQuery = createSupabaseProjectQueryRunner({
    projectRef,
    accessToken,
    defaultExcerptMax: 400,
  });

  const migrationStatements = [
    `
      alter table public.orders
      add column if not exists order_code text;
    `,
    `
      alter table public.consolidations
      add column if not exists consolidation_code text;
    `,
    `
      create sequence if not exists public.order_code_seq;
    `,
    `
      create sequence if not exists public.consolidation_code_seq;
    `,
    `
      create or replace function public.generate_order_code(p_created_at timestamptz default now())
      returns text
      language plpgsql
      as $$
      begin
        return 'ORD-'
          || to_char(coalesce(p_created_at, now()), 'YYYYMM')
          || '-'
          || lpad(nextval('public.order_code_seq')::text, 6, '0');
      end;
      $$;
    `,
    `
      create or replace function public.generate_consolidation_code(p_created_at timestamptz default now())
      returns text
      language plpgsql
      as $$
      begin
        return 'CON-'
          || to_char(coalesce(p_created_at, now()), 'YYYYMM')
          || '-'
          || lpad(nextval('public.consolidation_code_seq')::text, 6, '0');
      end;
      $$;
    `,
    `
      create or replace function public.set_order_code()
      returns trigger
      language plpgsql
      as $$
      begin
        if new.order_code is null or btrim(new.order_code) = '' then
          new.order_code := public.generate_order_code(coalesce(new.creation_date, now()));
        else
          new.order_code := upper(btrim(new.order_code));
        end if;
        return new;
      end;
      $$;
    `,
    `
      create or replace function public.set_consolidation_code()
      returns trigger
      language plpgsql
      as $$
      begin
        if new.consolidation_code is null or btrim(new.consolidation_code) = '' then
          new.consolidation_code := public.generate_consolidation_code(coalesce(new.creation_date, now()));
        else
          new.consolidation_code := upper(btrim(new.consolidation_code));
        end if;
        return new;
      end;
      $$;
    `,
    `
      drop trigger if exists trg_set_order_code on public.orders;
    `,
    `
      create trigger trg_set_order_code
      before insert on public.orders
      for each row
      execute function public.set_order_code();
    `,
    `
      drop trigger if exists trg_set_consolidation_code on public.consolidations;
    `,
    `
      create trigger trg_set_consolidation_code
      before insert on public.consolidations
      for each row
      execute function public.set_consolidation_code();
    `,
    `
      update public.orders
      set order_code = upper(btrim(order_code))
      where order_code is not null;
    `,
    `
      update public.consolidations
      set consolidation_code = upper(btrim(consolidation_code))
      where consolidation_code is not null;
    `,
    `
      do $$
      declare
        v_max bigint;
      begin
        select coalesce(max((regexp_match(order_code, '([0-9]+)$'))[1]::bigint), 0)
        into v_max
        from public.orders
        where order_code ~ '[0-9]+$';
        if v_max > 0 then
          perform setval('public.order_code_seq', v_max, true);
        end if;
      end
      $$;
    `,
    `
      do $$
      declare
        v_max bigint;
      begin
        select coalesce(max((regexp_match(consolidation_code, '([0-9]+)$'))[1]::bigint), 0)
        into v_max
        from public.consolidations
        where consolidation_code ~ '[0-9]+$';
        if v_max > 0 then
          perform setval('public.consolidation_code_seq', v_max, true);
        end if;
      end
      $$;
    `,
    `
      update public.orders
      set order_code = public.generate_order_code(coalesce(creation_date, now()))
      where order_code is null or btrim(order_code) = '';
    `,
    `
      update public.consolidations
      set consolidation_code = public.generate_consolidation_code(coalesce(creation_date, now()))
      where consolidation_code is null or btrim(consolidation_code) = '';
    `,
    `
      do $$
      declare
        v_max bigint;
      begin
        select coalesce(max((regexp_match(order_code, '([0-9]+)$'))[1]::bigint), 0)
        into v_max
        from public.orders
        where order_code ~ '[0-9]+$';
        if v_max > 0 then
          perform setval('public.order_code_seq', v_max, true);
        end if;
      end
      $$;
    `,
    `
      do $$
      declare
        v_max bigint;
      begin
        select coalesce(max((regexp_match(consolidation_code, '([0-9]+)$'))[1]::bigint), 0)
        into v_max
        from public.consolidations
        where consolidation_code ~ '[0-9]+$';
        if v_max > 0 then
          perform setval('public.consolidation_code_seq', v_max, true);
        end if;
      end
      $$;
    `,
    `
      create unique index if not exists orders_order_code_uidx
      on public.orders (order_code);
    `,
    `
      create unique index if not exists consolidations_consolidation_code_uidx
      on public.consolidations (consolidation_code);
    `,
    `
      alter table public.orders
      alter column order_code set not null;
    `,
    `
      alter table public.consolidations
      alter column consolidation_code set not null;
    `,
    `
      create or replace view public.consolidations_with_orders as
      select
        c.id,
        c.name,
        c.route,
        c.departure_date,
        c.creation_date,
        c.container_type_id,
        c.container_space_filled_percentage,
        c.container_weight_filled_percentage,
        c.shipping_cost,
        c.status,
        c.is_mixed,
        c.customer_id,
        c.shipping_cost_distributed,
        c.cost_distribution_method,
        c.fixed_rate_per_m3,
        c.total_billed_amount,
        c.updated_at,
        c.notes,
        c.involved_customer_ids,
        c.estimated_shipping_cost,
        c.cost_variance,
        c.cost_variance_percentage,
        c.origin_country,
        c.origin_city,
        c.destination_country,
        c.destination_city,
        c.destination_port,
        coalesce(
          array_agg(co.order_id order by co.order_id)
            filter (where co.order_id is not null),
          array[]::uuid[]
        ) as order_ids,
        c.consolidation_code
      from public.consolidations c
      left join public.consolidation_orders co on c.id = co.consolidation_id
      group by c.id;
    `,
  ];

  for (const statement of migrationStatements) {
    await runQuery(statement);
  }

  const validationRows = await runQuery(
    `
      select
        (select count(*) from public.orders) as total_orders,
        (select count(*) from public.orders where order_code is not null and btrim(order_code) <> '') as coded_orders,
        (select count(*) from public.consolidations) as total_consolidations,
        (select count(*) from public.consolidations where consolidation_code is not null and btrim(consolidation_code) <> '') as coded_consolidations,
        (select count(*) from information_schema.columns where table_schema='public' and table_name='consolidations_with_orders' and column_name='consolidation_code') as view_has_consolidation_code;
    `,
    { readOnly: true },
  );

  const v = validationRows[0] || {};
  console.log("Entity code migration complete.");
  console.log(
    `orders: ${v.coded_orders}/${v.total_orders}, consolidations: ${v.coded_consolidations}/${v.total_consolidations}, view_column: ${v.view_has_consolidation_code}`,
  );
}

main().catch((error) => {
  console.error(error instanceof Error ? error.message : String(error));
  process.exit(1);
});
