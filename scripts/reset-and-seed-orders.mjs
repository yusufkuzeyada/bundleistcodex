import { readFileSync } from "node:fs";
import path from "node:path";

const RESET_TABLES = [
  "payment_transactions",
  "notifications",
  "shipments",
  "consolidation_orders",
  "consolidations",
  "orders",
  "newsletter_subscribers",
];

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

function sqlString(value) {
  return `'${String(value).replace(/'/g, "''")}'`;
}

async function main() {
  const envFromFile = readEnvFile(path.join(process.cwd(), ".env"));
  const supabaseUrl = process.env.SUPABASE_URL || envFromFile.SUPABASE_URL;
  const accessToken =
    process.env.SUPABASE_ACCESS_TOKEN || envFromFile.SUPABASE_ACCESS_TOKEN;

  if (!supabaseUrl || !accessToken) {
    throw new Error(
      "Missing SUPABASE_URL or SUPABASE_ACCESS_TOKEN (.env or process env).",
    );
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
      const excerpt = text.length > 400 ? `${text.slice(0, 400)}...` : text;
      throw new Error(
        `Supabase query failed (${response.status} ${response.statusText}): ${excerpt}`,
      );
    }
    return text ? JSON.parse(text) : [];
  }

  const suppliers = await runQuery(
    `
      select id, name
      from public.suppliers
      order by created_at nulls last, id;
    `,
    { readOnly: true },
  );

  if (!Array.isArray(suppliers) || suppliers.length === 0) {
    throw new Error(
      "Cannot seed orders: no suppliers found. Add suppliers first.",
    );
  }

  const customers = await runQuery(
    `
      select id, company_name, name
      from public.customers
      order by created_at nulls last, id;
    `,
    { readOnly: true },
  );

  if (!Array.isArray(customers) || customers.length === 0) {
    throw new Error(
      "Cannot seed orders: no customers found. Add customers first.",
    );
  }

  await runQuery(`
    update public.customers
    set
      contract_type_id = 'growth'::contract_type,
      has_used_trial_fee = true;
  `);

  for (const tableName of RESET_TABLES) {
    await runQuery(`delete from public.${tableName};`);
  }

  const today = new Date();
  const orderRowsSql = [];
  let customerIndex = 0;
  for (const customer of customers) {
    const customerLabel =
      customer.company_name || customer.name || String(customer.id).slice(0, 8);
    for (let i = 1; i <= 2; i += 1) {
      const supplier = suppliers[(customerIndex * 2 + (i - 1)) % suppliers.length];
      const description = `Standard Seed Order ${i} - ${customerLabel}`;
      const value = (750 + customerIndex * 30 + i * 125).toFixed(2);
      const volume = (1.2 + i * 0.4).toFixed(2);
      const weight = (180 + i * 35).toFixed(2);
      const readyDate = new Date(today);
      readyDate.setDate(today.getDate() + i);
      const readyDateIso = readyDate.toISOString().slice(0, 10);
      const createdAtIso = new Date().toISOString();
      const notes = "Seeded Istanbul to Matadi order for standard-package baseline.";

      orderRowsSql.push(
        `(
          ${sqlString(description)},
          ${value},
          ${sqlString(supplier.id)}::uuid,
          ${volume},
          ${weight},
          ${sqlString(customer.id)}::uuid,
          'Pending'::order_status,
          ${sqlString(notes)},
          'Turkey',
          'Istanbul',
          'DR Congo',
          'Matadi',
          'Matadi',
          ${sqlString(readyDateIso)}::date,
          false,
          ${sqlString(createdAtIso)}::timestamptz
        )`,
      );
    }
    customerIndex += 1;
  }

  if (orderRowsSql.length > 0) {
    await runQuery(`
      insert into public.orders (
        description,
        value,
        supplier_id,
        volume_m3,
        weight_kg,
        customer_id,
        status,
        notes,
        origin_country,
        origin_city,
        destination_country,
        destination_city,
        destination_port,
        ready_date,
        charges_applied,
        creation_date
      )
      values
      ${orderRowsSql.join(",\n")};
    `);
  }

  const summaryRows = await runQuery(
    `
      select
        (select count(*) from public.customers) as customers_count,
        (select count(*) from public.suppliers) as suppliers_count,
        (select count(*) from public.orders) as orders_count,
        (select count(*) from public.consolidations) as consolidations_count,
        (select count(*) from public.shipments) as shipments_count,
        (select count(*) from public.payment_transactions) as payment_transactions_count,
        (select count(*) from public.notifications) as notifications_count,
        (select count(*) from public.blog_posts) as blog_posts_count,
        (select count(*) from public.newsletter_subscribers) as newsletter_subscribers_count;
    `,
    { readOnly: true },
  );

  const summary = summaryRows[0] || {};
  console.log("Reset and seed complete.");
  console.log(
    `customers=${summary.customers_count}, suppliers=${summary.suppliers_count}, orders=${summary.orders_count}`,
  );
  console.log(
    `consolidations=${summary.consolidations_count}, shipments=${summary.shipments_count}, payment_transactions=${summary.payment_transactions_count}, notifications=${summary.notifications_count}`,
  );
  console.log(
    `blog_posts=${summary.blog_posts_count}, newsletter_subscribers=${summary.newsletter_subscribers_count}`,
  );
}

main().catch((error) => {
  console.error(error instanceof Error ? error.message : String(error));
  process.exit(1);
});
