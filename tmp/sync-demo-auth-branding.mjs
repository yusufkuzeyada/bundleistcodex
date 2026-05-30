import { loadEnv } from "../scripts/lib/env.mjs";
import {
  createSupabaseProjectQueryRunner,
  getProjectRefFromSupabaseUrl,
} from "../scripts/lib/supabase-project-query.mjs";

const ADMIN_EMAIL = "yusufbicer@gmail.com";
const ADMIN_COMPANY_NAME = "Sourcevia Admin";

const DEMO_CUSTOMERS = [
  {
    email: "demo.customer1@sourcevia.test",
    legacyEmail: "demo.customer1@bundleist.test",
    password: "SourceviaDemo#1",
    name: "Jean Mbala",
    companyName: "Congo Trade One",
    phone: "+243 81 000 1001",
    address: "Matadi, Kongo Central, DR Congo",
  },
  {
    email: "demo.customer2@sourcevia.test",
    legacyEmail: "demo.customer2@bundleist.test",
    password: "SourceviaDemo#2",
    name: "Aline Kanku",
    companyName: "Matadi Imports SARL",
    phone: "+243 81 000 1002",
    address: "Matadi, Kongo Central, DR Congo",
  },
  {
    email: "demo.customer3@sourcevia.test",
    legacyEmail: "demo.customer3@bundleist.test",
    password: "SourceviaDemo#3",
    name: "Patrick Nsiala",
    companyName: "Kongo Commerce Hub",
    phone: "+243 81 000 1003",
    address: "Matadi, Kongo Central, DR Congo",
  },
  {
    email: "demo.customer4@sourcevia.test",
    legacyEmail: "demo.customer4@bundleist.test",
    password: "SourceviaDemo#4",
    name: "Micheline Banza",
    companyName: "Atlantic Matadi Supply",
    phone: "+243 81 000 1004",
    address: "Matadi, Kongo Central, DR Congo",
  },
  {
    email: "demo.customer5@sourcevia.test",
    legacyEmail: "demo.customer5@bundleist.test",
    password: "SourceviaDemo#5",
    name: "Didier Nzau",
    companyName: "Kongo Central Distribution",
    phone: "+243 81 000 1005",
    address: "Matadi, Kongo Central, DR Congo",
  },
];

function sqlString(value) {
  return `'${String(value).replace(/'/g, "''")}'`;
}

function normalizeEmail(value) {
  return String(value || "").trim().toLowerCase();
}

async function main() {
  const env = loadEnv();
  const supabaseUrl = env.SUPABASE_URL;
  const accessToken = env.SUPABASE_ACCESS_TOKEN;
  const serviceRoleKey = env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || !accessToken || !serviceRoleKey) {
    throw new Error(
      "Missing SUPABASE_URL, SUPABASE_ACCESS_TOKEN, or SUPABASE_SERVICE_ROLE_KEY.",
    );
  }

  const projectRef = getProjectRefFromSupabaseUrl(supabaseUrl);
  const runQuery = createSupabaseProjectQueryRunner({
    projectRef,
    accessToken,
    defaultExcerptMax: 500,
  });

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
    let hasMore = true;
    while (hasMore) {
      const data = await authAdminRequest(
        "GET",
        `/users?page=${page}&per_page=${perPage}`,
      );
      const batch = Array.isArray(data?.users) ? data.users : [];
      users.push(...batch);
      hasMore = batch.length >= perPage;
      if (hasMore) {
        page += 1;
      }
    }
    return users;
  }

  const authUsersBefore = await listAllAuthUsers();
  const authUsersByEmail = new Map(
    authUsersBefore.map((user) => [normalizeEmail(user.email), user]),
  );

  const resultRows = [];
  const retainedIds = new Set();

  for (const demoCustomer of DEMO_CUSTOMERS) {
    const aliases = [
      normalizeEmail(demoCustomer.email),
      normalizeEmail(demoCustomer.legacyEmail),
    ];
    const matchingUsers = authUsersBefore.filter((user) =>
      aliases.includes(normalizeEmail(user.email)),
    );
    const primaryUser =
      matchingUsers.find(
        (user) => normalizeEmail(user.email) === normalizeEmail(demoCustomer.email),
      ) || matchingUsers[0];

    let userId = primaryUser?.id || null;

    if (primaryUser) {
      await authAdminRequest("PUT", `/users/${primaryUser.id}`, {
        email: demoCustomer.email,
        password: demoCustomer.password,
        email_confirm: true,
        user_metadata: {
          name: demoCustomer.name,
          company_name: demoCustomer.companyName,
          email_verified: true,
        },
        app_metadata: {
          provider: "email",
          providers: ["email"],
        },
      });
      userId = primaryUser.id;
    } else {
      const created = await authAdminRequest("POST", "/users", {
        email: demoCustomer.email,
        password: demoCustomer.password,
        email_confirm: true,
        user_metadata: {
          name: demoCustomer.name,
          company_name: demoCustomer.companyName,
          email_verified: true,
        },
        app_metadata: {
          provider: "email",
          providers: ["email"],
        },
      });
      userId = created?.id || created?.user?.id || null;
    }

    if (!userId) {
      throw new Error(`Failed to resolve auth user for ${demoCustomer.email}`);
    }

    retainedIds.add(String(userId));

    await runQuery(`
      insert into public.customers (
        id,
        name,
        email,
        company_name,
        role,
        phone,
        address,
        updated_at
      )
      values (
        ${sqlString(userId)}::uuid,
        ${sqlString(demoCustomer.name)},
        ${sqlString(demoCustomer.email)},
        ${sqlString(demoCustomer.companyName)},
        'customer',
        ${sqlString(demoCustomer.phone)},
        ${sqlString(demoCustomer.address)},
        now()
      )
      on conflict (id) do update
      set
        name = excluded.name,
        email = excluded.email,
        company_name = excluded.company_name,
        role = excluded.role,
        phone = excluded.phone,
        address = excluded.address,
        updated_at = now();
    `);

    const duplicateUsers = matchingUsers.filter((user) => user.id !== userId);
    for (const duplicateUser of duplicateUsers) {
      await authAdminRequest("DELETE", `/users/${duplicateUser.id}`);
      await runQuery(`
        delete from public.customers
        where id = ${sqlString(duplicateUser.id)}::uuid
           or lower(email) = lower(${sqlString(duplicateUser.email)});
      `);
    }

    resultRows.push({
      email: demoCustomer.email,
      password: demoCustomer.password,
      id: userId,
    });
  }

  await runQuery(`
    update public.customers
    set
      company_name = ${sqlString(ADMIN_COMPANY_NAME)},
      updated_at = now()
    where lower(email) = lower(${sqlString(ADMIN_EMAIL)});
  `);

  const adminAuthUser = authUsersByEmail.get(normalizeEmail(ADMIN_EMAIL));
  if (adminAuthUser) {
    await authAdminRequest("PUT", `/users/${adminAuthUser.id}`, {
      user_metadata: {
        ...(adminAuthUser.user_metadata || {}),
        company_name: ADMIN_COMPANY_NAME,
      },
    });
  }

  await runQuery(`
    delete from public.customers
    where (
      lower(email) like 'demo.customer%@bundleist.test'
      or lower(email) like 'demo.customer%@sourcevia.test'
    )
    and id::text not in (${Array.from(retainedIds)
      .map((id) => sqlString(id))
      .join(", ")});
  `);

  const authUsersAfter = await listAllAuthUsers();
  const demoAuthUsersAfter = authUsersAfter
    .filter((user) => normalizeEmail(user.email).includes("demo.customer"))
    .map((user) => ({
      id: user.id,
      email: user.email,
      last_sign_in_at: user.last_sign_in_at,
    }));

  const customerRowsAfter = await runQuery(
    `
      select id, email, role, company_name
      from public.customers
      where lower(email) = lower(${sqlString(ADMIN_EMAIL)})
         or lower(email) like 'demo.customer%@sourcevia.test'
         or lower(email) like 'demo.customer%@bundleist.test'
      order by role desc, email asc;
    `,
    { readOnly: true },
  );

  console.log("Demo auth + branding sync complete.");
  console.log(JSON.stringify({
    credentials: resultRows,
    demoAuthUsersAfter,
    customerRowsAfter,
  }, null, 2));
}

main().catch((error) => {
  console.error(error instanceof Error ? error.message : String(error));
  process.exit(1);
});
