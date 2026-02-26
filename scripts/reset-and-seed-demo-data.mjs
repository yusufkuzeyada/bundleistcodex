import { readFileSync } from "node:fs";
import path from "node:path";

const ADMIN_EMAIL = "yusufbicer@gmail.com";

const TABLES_TO_CLEAR = [
  "payment_transactions",
  "notifications",
  "shipments",
  "consolidation_orders",
  "consolidations",
  "orders",
  "newsletter_subscribers",
  "suppliers",
];

const DEMO_SUPPLIERS = [
  {
    name: "Istanbul Textile Export",
    companyLocation: "Istanbul, Turkey",
    phoneNumber: "+90 212 111 1001",
    contactPerson: "Mert Aydin",
    rating: 4.7,
  },
  {
    name: "Marmara Machinery Co",
    companyLocation: "Istanbul, Turkey",
    phoneNumber: "+90 212 111 1002",
    contactPerson: "Ece Demir",
    rating: 4.6,
  },
  {
    name: "Bosphorus Industrial Parts",
    companyLocation: "Istanbul, Turkey",
    phoneNumber: "+90 212 111 1003",
    contactPerson: "Kerem Yilmaz",
    rating: 4.5,
  },
  {
    name: "Anatolia Packaging Group",
    companyLocation: "Istanbul, Turkey",
    phoneNumber: "+90 212 111 1004",
    contactPerson: "Seda Kaya",
    rating: 4.8,
  },
  {
    name: "Golden Horn Electronics",
    companyLocation: "Istanbul, Turkey",
    phoneNumber: "+90 212 111 1005",
    contactPerson: "Burak Arslan",
    rating: 4.4,
  },
];

const DEMO_CUSTOMERS = [
  {
    email: "demo.customer1@bundleist.test",
    password: "BundleistDemo#1",
    name: "Jean Mbala",
    companyName: "Congo Trade One",
    phone: "+243 81 000 1001",
    address: "Matadi, Kongo Central, DR Congo",
  },
  {
    email: "demo.customer2@bundleist.test",
    password: "BundleistDemo#2",
    name: "Aline Kanku",
    companyName: "Matadi Imports SARL",
    phone: "+243 81 000 1002",
    address: "Matadi, Kongo Central, DR Congo",
  },
  {
    email: "demo.customer3@bundleist.test",
    password: "BundleistDemo#3",
    name: "Patrick Nsiala",
    companyName: "Kongo Commerce Hub",
    phone: "+243 81 000 1003",
    address: "Matadi, Kongo Central, DR Congo",
  },
  {
    email: "demo.customer4@bundleist.test",
    password: "BundleistDemo#4",
    name: "Micheline Banza",
    companyName: "Atlantic Matadi Supply",
    phone: "+243 81 000 1004",
    address: "Matadi, Kongo Central, DR Congo",
  },
  {
    email: "demo.customer5@bundleist.test",
    password: "BundleistDemo#5",
    name: "Didier Nzau",
    companyName: "Kongo Central Distribution",
    phone: "+243 81 000 1005",
    address: "Matadi, Kongo Central, DR Congo",
  },
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

function normalizeEmail(value) {
  return String(value || "").trim().toLowerCase();
}

async function main() {
  const envFromFile = readEnvFile(path.join(process.cwd(), ".env"));
  const supabaseUrl = process.env.SUPABASE_URL || envFromFile.SUPABASE_URL;
  const accessToken =
    process.env.SUPABASE_ACCESS_TOKEN || envFromFile.SUPABASE_ACCESS_TOKEN;
  const serviceRoleKey =
    process.env.SUPABASE_SERVICE_ROLE_KEY ||
    envFromFile.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || !accessToken || !serviceRoleKey) {
    throw new Error(
      "Missing SUPABASE_URL, SUPABASE_ACCESS_TOKEN, or SUPABASE_SERVICE_ROLE_KEY.",
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
      const excerpt = text.length > 500 ? `${text.slice(0, 500)}...` : text;
      throw new Error(
        `Supabase query failed (${response.status} ${response.statusText}): ${excerpt}`,
      );
    }
    return text ? JSON.parse(text) : [];
  }

  async function authAdminRequest(method, pathSuffix, body) {
    const response = await fetch(`${supabaseUrl}/auth/v1/admin${pathSuffix}`, {
      method,
      headers: {
        Authorization: `Bearer ${serviceRoleKey}`,
        apikey: serviceRoleKey,
        "Content-Type": "application/json",
      },
      body: body ? JSON.stringify(body) : undefined,
    });
    const text = await response.text();
    if (!response.ok) {
      const excerpt = text.length > 500 ? `${text.slice(0, 500)}...` : text;
      throw new Error(
        `Auth admin request failed (${method} ${pathSuffix}): ${response.status} ${response.statusText} ${excerpt}`,
      );
    }
    return text ? JSON.parse(text) : null;
  }

  async function listAllAuthUsers() {
    const users = [];
    let page = 1;
    const perPage = 200;
    while (true) {
      const data = await authAdminRequest(
        "GET",
        `/users?page=${page}&per_page=${perPage}`,
      );
      const batch = Array.isArray(data?.users) ? data.users : [];
      users.push(...batch);
      if (batch.length < perPage) break;
      page += 1;
    }
    return users;
  }

  const authUsersBefore = await listAllAuthUsers();
  const adminEmailNormalized = normalizeEmail(ADMIN_EMAIL);
  const adminAuthUser = authUsersBefore.find(
    (u) => normalizeEmail(u.email) === adminEmailNormalized,
  );
  if (!adminAuthUser) {
    throw new Error(
      `Admin auth user ${ADMIN_EMAIL} was not found. Aborting to avoid removing access.`,
    );
  }

  for (const tableName of TABLES_TO_CLEAR) {
    await runQuery(`delete from public.${tableName};`);
  }

  await runQuery(`
    delete from public.customers
    where lower(email) <> lower(${sqlString(ADMIN_EMAIL)});
  `);

  await runQuery(`
    update public.customers
    set
      role = 'admin',
      contract_type_id = 'growth'::contract_type,
      has_used_trial_fee = true
    where lower(email) = lower(${sqlString(ADMIN_EMAIL)});
  `);

  const authUsersToDelete = authUsersBefore.filter(
    (u) => normalizeEmail(u.email) !== adminEmailNormalized,
  );
  for (const user of authUsersToDelete) {
    await authAdminRequest("DELETE", `/users/${user.id}`);
  }

  const supplierRows = DEMO_SUPPLIERS.map(
    (s) => `(
      ${sqlString(s.name)},
      ${sqlString(s.companyLocation)},
      ${sqlString(s.phoneNumber)},
      ${sqlString(s.contactPerson)},
      ${Number(s.rating)}
    )`,
  );

  await runQuery(`
    insert into public.suppliers (
      name,
      company_location,
      phone_number,
      contact_person,
      rating
    )
    values
    ${supplierRows.join(",\n")};
  `);

  const supplierRecords = await runQuery(
    `
      select id, name
      from public.suppliers
      order by created_at nulls last, id;
    `,
    { readOnly: true },
  );
  if (!Array.isArray(supplierRecords) || supplierRecords.length < 5) {
    throw new Error("Failed to create demo suppliers.");
  }

  const createdDemoCustomers = [];
  for (const customer of DEMO_CUSTOMERS) {
    const created = await authAdminRequest("POST", "/users", {
      email: customer.email,
      password: customer.password,
      email_confirm: true,
      user_metadata: {
        name: customer.name,
        company_name: customer.companyName,
      },
      app_metadata: {
        provider: "email",
      },
    });
    const authUserId = created?.id || created?.user?.id;
    if (!authUserId) {
      throw new Error(`Failed to create auth user for ${customer.email}`);
    }
    createdDemoCustomers.push({ ...customer, id: authUserId });
  }

  const customerRows = createdDemoCustomers.map(
    (c) => `(
      ${sqlString(c.id)}::uuid,
      ${sqlString(c.name)},
      ${sqlString(c.email)},
      ${sqlString(c.companyName)},
      'growth'::contract_type,
      true,
      now(),
      now(),
      'customer',
      ${sqlString(c.phone)},
      ${sqlString(c.address)},
      ${sqlString("Demo customer for pricing and workflow tests.")}
    )`,
  );

  await runQuery(`
    insert into public.customers (
      id,
      name,
      email,
      company_name,
      contract_type_id,
      has_used_trial_fee,
      created_at,
      updated_at,
      role,
      phone,
      address,
      notes
    )
    values
    ${customerRows.join(",\n")}
    on conflict (id) do update
    set
      name = excluded.name,
      email = excluded.email,
      company_name = excluded.company_name,
      contract_type_id = excluded.contract_type_id,
      has_used_trial_fee = excluded.has_used_trial_fee,
      updated_at = now(),
      role = excluded.role,
      phone = excluded.phone,
      address = excluded.address,
      notes = excluded.notes;
  `);

  const orderRowsSql = [];
  const nowIso = new Date().toISOString();
  createdDemoCustomers.forEach((customer, customerIndex) => {
    for (let i = 1; i <= 2; i += 1) {
      const supplier = supplierRecords[(customerIndex * 2 + (i - 1)) % supplierRecords.length];
      const readyDate = new Date();
      readyDate.setDate(readyDate.getDate() + i);
      orderRowsSql.push(`(
        ${sqlString(`Demo Order ${i} - ${customer.companyName}`)},
        ${(950 + customerIndex * 175 + i * 210).toFixed(2)},
        ${sqlString(supplier.id)}::uuid,
        ${(1.3 + i * 0.45).toFixed(2)},
        ${(210 + i * 40).toFixed(2)},
        ${sqlString(customer.id)}::uuid,
        'Pending'::order_status,
        ${sqlString("Demo test order for pricing workflow validation.")},
        'Turkey',
        'Istanbul',
        'DR Congo',
        'Matadi',
        'Matadi',
        ${sqlString(readyDate.toISOString().slice(0, 10))}::date,
        false,
        ${sqlString(nowIso)}::timestamptz
      )`);
    }
  });

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

  const summaryRows = await runQuery(
    `
      select
        (select count(*) from public.customers) as customers_count,
        (select count(*) from public.customers where role = 'admin') as admins_count,
        (select count(*) from public.customers where role = 'customer') as customer_role_count,
        (select count(*) from public.suppliers) as suppliers_count,
        (select count(*) from public.orders) as orders_count,
        (select count(*) from public.consolidations) as consolidations_count,
        (select count(*) from public.shipments) as shipments_count,
        (select count(*) from public.payment_transactions) as payment_transactions_count,
        (select count(*) from public.notifications) as notifications_count,
        (select count(*) from public.blog_posts) as blog_posts_count,
        (select count(*) from public.newsletter_subscribers) as newsletter_subscribers_count,
        (select count(*)
          from public.orders
          where lower(origin_city) = 'istanbul'
            and lower(destination_port) = 'matadi'
        ) as istanbul_matadi_orders_count;
    `,
    { readOnly: true },
  );

  const summary = summaryRows[0] || {};
  console.log("Reset + demo seed complete.");
  console.log(
    `customers=${summary.customers_count} (admins=${summary.admins_count}, customer-role=${summary.customer_role_count}), suppliers=${summary.suppliers_count}, orders=${summary.orders_count}`,
  );
  console.log(
    `consolidations=${summary.consolidations_count}, shipments=${summary.shipments_count}, payment_transactions=${summary.payment_transactions_count}, notifications=${summary.notifications_count}`,
  );
  console.log(
    `blog_posts=${summary.blog_posts_count}, newsletter_subscribers=${summary.newsletter_subscribers_count}, istanbul_matadi_orders=${summary.istanbul_matadi_orders_count}`,
  );
  console.log("\nDemo Customer Credentials:");
  for (const c of createdDemoCustomers) {
    console.log(
      `- ${c.email} | password: ${c.password} | company: ${c.companyName}`,
    );
  }
}

main().catch((error) => {
  console.error(error instanceof Error ? error.message : String(error));
  process.exit(1);
});
