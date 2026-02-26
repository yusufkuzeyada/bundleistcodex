import { readFileSync } from "node:fs";
import path from "node:path";

function readEnvFile(filePath) {
  const out = {};
  const content = readFileSync(filePath, "utf8");
  for (const rawLine of content.split(/\r?\n/)) {
    const line = rawLine.trim();
    if (!line || line.startsWith("#")) continue;
    const firstEq = line.indexOf("=");
    if (firstEq < 1) continue;
    const key = line.slice(0, firstEq).trim().replace(/^\uFEFF/, "");
    let value = line.slice(firstEq + 1).trim();
    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1);
    }
    out[key] = value;
  }
  return out;
}

function toCount(rows, key) {
  const value = rows?.[0]?.[key];
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : 0;
}

async function main() {
  const envFromFile = readEnvFile(path.join(process.cwd(), ".env"));
  const supabaseUrl = process.env.SUPABASE_URL || envFromFile.SUPABASE_URL;
  const accessToken =
    process.env.SUPABASE_ACCESS_TOKEN || envFromFile.SUPABASE_ACCESS_TOKEN;

  if (!supabaseUrl || !accessToken) {
    throw new Error("Missing SUPABASE_URL or SUPABASE_ACCESS_TOKEN.");
  }

  const projectRef = new URL(supabaseUrl).hostname.split(".")[0];

  async function runQuery(query, { readOnly = false } = {}) {
    const endpoint = `https://api.supabase.com/v1/projects/${projectRef}/database/query${readOnly ? "/read-only" : ""}`;
    const response = await fetch(endpoint, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ query }),
    });
    const text = await response.text();
    if (!response.ok) {
      const excerpt = text.length > 600 ? `${text.slice(0, 600)}...` : text;
      throw new Error(
        `Supabase query failed (${response.status} ${response.statusText}): ${excerpt}`,
      );
    }
    return text ? JSON.parse(text) : [];
  }

  const preview = await runQuery(
    `
      with individual_order_mismatch as (
        select count(*)::int as count
        from public.shipments s
        join public.orders o
          on o.id = coalesce(s.order_id, s.related_id)
        where s.type = 'individual'
          and s.status = 'Completed'
          and o.status = 'Delivered'
      ),
      consolidation_mismatch as (
        select count(*)::int as count
        from public.shipments s
        join public.consolidations c
          on c.id = coalesce(s.related_id, s.consolidation_id)
        where s.type = 'consolidation'
          and s.status = 'Completed'
          and c.status = 'Delivered'
      ),
      consolidation_order_mismatch as (
        select count(*)::int as count
        from public.consolidation_orders co
        join public.consolidations c
          on c.id = co.consolidation_id
        join public.orders o
          on o.id = co.order_id
        where c.status = 'Completed'
          and o.status = 'Delivered'
      )
      select
        (select count from individual_order_mismatch) as individual_order_mismatch_count,
        (select count from consolidation_mismatch) as consolidation_mismatch_count,
        (select count from consolidation_order_mismatch) as consolidation_order_mismatch_count;
    `,
    { readOnly: true },
  );

  console.log("Preview:");
  console.log(
    `  individual shipment -> order mismatches: ${toCount(preview, "individual_order_mismatch_count")}`,
  );
  console.log(
    `  consolidation shipment -> consolidation mismatches: ${toCount(preview, "consolidation_mismatch_count")}`,
  );
  console.log(
    `  completed consolidation -> order mismatches: ${toCount(preview, "consolidation_order_mismatch_count")}`,
  );

  const updatedConsolidations = await runQuery(`
    with completed_consolidation_shipments as (
      select distinct coalesce(s.related_id, s.consolidation_id) as consolidation_id
      from public.shipments s
      where s.type = 'consolidation'
        and s.status = 'Completed'
        and coalesce(s.related_id, s.consolidation_id) is not null
    ),
    updated as (
      update public.consolidations c
         set status = 'Completed'
        from completed_consolidation_shipments cs
       where c.id = cs.consolidation_id
         and c.status = 'Delivered'
      returning c.id
    )
    select count(*)::int as updated_count from updated;
  `);

  const updatedIndividualOrders = await runQuery(`
    with updated as (
      update public.orders o
         set status = 'Completed'
        from public.shipments s
       where s.type = 'individual'
         and s.status = 'Completed'
         and o.id = coalesce(s.order_id, s.related_id)
         and o.status = 'Delivered'
      returning o.id
    )
    select count(*)::int as updated_count from updated;
  `);

  const updatedConsolidationOrders = await runQuery(`
    with updated as (
      update public.orders o
         set status = 'Completed'
        from public.consolidation_orders co
        join public.consolidations c
          on c.id = co.consolidation_id
       where co.order_id = o.id
         and c.status = 'Completed'
         and o.status = 'Delivered'
      returning o.id
    )
    select count(*)::int as updated_count from updated;
  `);

  console.log("Applied:");
  console.log(
    `  consolidations updated to Completed: ${toCount(updatedConsolidations, "updated_count")}`,
  );
  console.log(
    `  individual orders updated to Completed: ${toCount(updatedIndividualOrders, "updated_count")}`,
  );
  console.log(
    `  consolidation orders updated to Completed: ${toCount(updatedConsolidationOrders, "updated_count")}`,
  );
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
