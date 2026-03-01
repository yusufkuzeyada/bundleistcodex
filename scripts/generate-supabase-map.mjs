import { promises as fs } from "node:fs";
import { existsSync, readFileSync, readdirSync, statSync } from "node:fs";
import path from "node:path";
import { loadEnv } from "./lib/env.mjs";
import {
  createSupabaseProjectQueryRunner,
  getProjectRefFromSupabaseUrl,
} from "./lib/supabase-project-query.mjs";

const ROOT = process.cwd();
const DOCS_DIR = path.join(ROOT, "docs");
const SITE_DIR = path.join(ROOT, "site");

const TABLE_OPS = ["select", "insert", "update", "upsert", "delete"];
const VENDOR_FILES = new Set(["react.js", "radix.js", "supabase.js"]);

function toRel(absPath) {
  return path.relative(ROOT, absPath).split(path.sep).join("/");
}

function requireText(filePath) {
  return readFileSync(filePath, "utf8");
}

function normalizeRows(payload) {
  if (payload == null) return [];
  if (Array.isArray(payload)) return payload;
  if (Array.isArray(payload.value)) return payload.value;
  return [payload];
}

async function fetchJson(url, { method = "GET", headers = {}, body } = {}) {
  const response = await fetch(url, {
    method,
    headers,
    body: body ? JSON.stringify(body) : undefined,
  });
  const text = await response.text();
  if (!response.ok) {
    const excerpt = text.length > 400 ? `${text.slice(0, 400)}...` : text;
    throw new Error(`${response.status} ${response.statusText}: ${excerpt}`);
  }
  if (!text) return null;
  return JSON.parse(text);
}

async function walkFiles(dir) {
  const out = [];
  if (!existsSync(dir)) return out;
  const entries = await fs.readdir(dir, { withFileTypes: true });
  for (const entry of entries) {
    const abs = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      out.push(...(await walkFiles(abs)));
    } else {
      out.push(abs);
    }
  }
  return out;
}

function pushUniqueIssue(list, item) {
  const key = `${item.file}|${item.ref}`;
  if (!list.some((x) => `${x.file}|${x.ref}` === key)) list.push(item);
}

function analyzeProjectStructure(allFiles) {
  const topLevelEntries = readdirSync(ROOT, { withFileTypes: true })
    .filter((e) => e.name !== ".git")
    .map((e) => ({
      name: e.name,
      type: e.isDirectory() ? "dir" : "file",
    }));

  const sitePages = allFiles
    .filter((f) => f.endsWith(".html"))
    .map((f) => toRel(f))
    .sort();

  const jsBundles = allFiles
    .filter((f) => f.endsWith(".js"))
    .map((f) => ({
      file: toRel(f),
      bytes: statSync(f).size,
    }))
    .sort((a, b) => b.bytes - a.bytes);

  return {
    top_level: topLevelEntries,
    site_pages: sitePages,
    largest_js_bundles: jsBundles.slice(0, 12),
    total_site_files: allFiles.length,
  };
}

function analyzeWorkspaceChecks(allFiles) {
  const hashedResidualFiles = allFiles
    .filter((f) => /-[A-Za-z0-9_-]{6,}\.(js|css)$/i.test(path.basename(f)))
    .map((f) => toRel(f))
    .sort();

  const missingHtmlAssetRefs = [];
  const htmlFiles = allFiles.filter((f) => f.endsWith(".html"));
  for (const htmlFile of htmlFiles) {
    const relFile = toRel(htmlFile);
    const content = requireText(htmlFile);
    const re = /(?:src|href)\s*=\s*["']([^"']+)["']/g;
    let match;
    while ((match = re.exec(content)) !== null) {
      const rawRef = match[1];
      const ref = rawRef.split("#")[0].split("?")[0];
      if (!ref) continue;
      if (
        ref.startsWith("http://") ||
        ref.startsWith("https://") ||
        ref.startsWith("//") ||
        ref.startsWith("data:") ||
        ref.startsWith("mailto:") ||
        ref.startsWith("javascript:")
      ) {
        continue;
      }
      const target = ref.startsWith("/")
        ? path.join(SITE_DIR, ref.slice(1).replace(/\//g, path.sep))
        : path.resolve(path.dirname(htmlFile), ref.replace(/\//g, path.sep));
      if (!existsSync(target)) {
        pushUniqueIssue(missingHtmlAssetRefs, { file: relFile, ref: rawRef });
      }
    }
  }

  const missingModuleImports = [];
  const jsFiles = allFiles.filter((f) => f.endsWith(".js"));
  for (const jsFile of jsFiles) {
    const relFile = toRel(jsFile);
    const content = requireText(jsFile);
    const patterns = [
      /import\s+(?:[^"'`]+from\s+)?["']([^"']+)["']/g,
      /import\(\s*["']([^"']+)["']\s*\)/g,
    ];
    for (const pattern of patterns) {
      let match;
      while ((match = pattern.exec(content)) !== null) {
        const rawRef = match[1];
        if (!(rawRef.startsWith(".") || rawRef.startsWith("/"))) continue;
        const target = rawRef.startsWith("/")
          ? path.join(SITE_DIR, rawRef.slice(1).replace(/\//g, path.sep))
          : path.resolve(path.dirname(jsFile), rawRef.replace(/\//g, path.sep));
        if (!existsSync(target)) {
          pushUniqueIssue(missingModuleImports, { file: relFile, ref: rawRef });
        }
      }
    }
  }

  return {
    hashed_residual_files: hashedResidualFiles,
    missing_html_asset_refs: missingHtmlAssetRefs.sort((a, b) =>
      `${a.file}:${a.ref}`.localeCompare(`${b.file}:${b.ref}`),
    ),
    missing_module_imports: missingModuleImports.sort((a, b) =>
      `${a.file}:${a.ref}`.localeCompare(`${b.file}:${b.ref}`),
    ),
  };
}

function analyzeFrontendSupabaseUsage(allFiles) {
  const jsFiles = allFiles.filter(
    (f) => f.endsWith(".js") && !VENDOR_FILES.has(path.basename(f)),
  );

  const tables = new Map();
  const rpcs = new Map();
  const authMethods = new Map();

  const addUse = (map, key, relFile, surface, op) => {
    if (!map.has(key)) {
      map.set(key, {
        name: key,
        files: new Set(),
        surfaces: new Set(),
        operations: {},
      });
    }
    const entry = map.get(key);
    entry.files.add(relFile);
    entry.surfaces.add(surface);
    if (op) entry.operations[op] = (entry.operations[op] || 0) + 1;
  };

  for (const jsFile of jsFiles) {
    const relFile = toRel(jsFile);
    const surface = relFile.includes("/dashboard/") ? "dashboard" : "site";
    const content = requireText(jsFile);

    const fromRegex = /\.from\("([A-Za-z0-9_]+)"\)/g;
    let fromMatch;
    while ((fromMatch = fromRegex.exec(content)) !== null) {
      const table = fromMatch[1];
      const snippet = content.slice(fromMatch.index, fromMatch.index + 220);
      const hitOps = TABLE_OPS.filter((op) =>
        new RegExp(`\\.${op}\\(`).test(snippet),
      );
      if (hitOps.length === 0) {
        addUse(tables, table, relFile, surface, "unknown");
      } else {
        for (const op of hitOps) addUse(tables, table, relFile, surface, op);
      }
    }

    const rpcRegex = /\.rpc\("([A-Za-z0-9_]+)"/g;
    let rpcMatch;
    while ((rpcMatch = rpcRegex.exec(content)) !== null) {
      addUse(rpcs, rpcMatch[1], relFile, surface, "call");
    }

    const authRegex = /\.auth\.([A-Za-z0-9_]+)/g;
    let authMatch;
    while ((authMatch = authRegex.exec(content)) !== null) {
      const method = authMatch[1];
      if (method === "storageKey" || method === "token") continue;
      addUse(authMethods, method, relFile, surface, "call");
    }
  }

  const normalizeMap = (map) =>
    Array.from(map.values())
      .map((entry) => ({
        name: entry.name,
        files: Array.from(entry.files).sort(),
        surfaces: Array.from(entry.surfaces).sort(),
        operations: Object.fromEntries(
          Object.entries(entry.operations).sort(([a], [b]) => a.localeCompare(b)),
        ),
      }))
      .sort((a, b) => a.name.localeCompare(b.name));

  return {
    tables: normalizeMap(tables),
    rpcs: normalizeMap(rpcs),
    auth_methods: normalizeMap(authMethods),
  };
}

function groupBy(items, key) {
  const out = new Map();
  for (const item of items) {
    const value = item[key];
    if (!out.has(value)) out.set(value, []);
    out.get(value).push(item);
  }
  return out;
}

function toMdTable(headers, rows) {
  const headerLine = `| ${headers.join(" | ")} |`;
  const sepLine = `| ${headers.map(() => "---").join(" | ")} |`;
  const body = rows.map((row) => `| ${row.join(" | ")} |`);
  return [headerLine, sepLine, ...body].join("\n");
}

function markdownForMap(mapData) {
  const {
    generated_at_utc,
    project,
    edge_functions,
    database,
    frontend_usage,
    workspace_checks,
    project_structure,
  } = mapData;

  const publicObjects = database.public_objects;
  const publicTables = publicObjects.filter((o) => o.table_type === "BASE TABLE");
  const publicViews = publicObjects.filter((o) => o.table_type !== "BASE TABLE");
  const columnsByTable = groupBy(database.public_columns, "table_name");
  const pkByTable = groupBy(database.public_primary_keys, "table_name");
  const fkByTable = groupBy(database.public_foreign_keys, "table_name");
  const policiesByTable = groupBy(database.public_policies, "table_name");
  const publicTableTriggers = database.public_triggers.filter(
    (t) => t.table_schema === "public",
  );
  const triggersByTable = groupBy(publicTableTriggers, "table_name");
  const usageByTable = new Map(frontend_usage.tables.map((t) => [t.name, t]));
  const normalizePgArray = (value) => {
    if (Array.isArray(value)) return value;
    if (typeof value === "string") {
      const trimmed = value.replace(/^\{/, "").replace(/\}$/, "");
      if (!trimmed) return [];
      return trimmed.split(",").map((x) => x.replace(/^"|"$/g, "").trim());
    }
    return [];
  };

  const lines = [];
  lines.push("# Supabase Map");
  lines.push("");
  lines.push(`Generated (UTC): ${generated_at_utc}`);
  lines.push("");
  lines.push("## Project");
  lines.push(
    `- Project: \`${project.ref}\` (${project.name}) | Region: \`${project.region}\` | Status: \`${project.status}\``,
  );
  lines.push(
    `- Database: PostgreSQL ${project.database.postgres_engine} (${project.database.version})`,
  );
  lines.push(`- Created at: ${project.created_at}`);
  lines.push("");
  lines.push("## Folder Snapshot");
  const topDirs = project_structure.top_level
    .map((e) => `${e.type === "dir" ? "dir" : "file"}: \`${e.name}\``)
    .join(", ");
  lines.push(`- Top level: ${topDirs}`);
  lines.push(`- Files under \`site/\`: ${project_structure.total_site_files}`);
  lines.push(
    `- Largest JS bundles: ${project_structure.largest_js_bundles
      .slice(0, 5)
      .map((b) => `\`${b.file}\` (${b.bytes} bytes)`)
      .join(", ")}`,
  );
  lines.push("");
  lines.push("## Schema Summary");
  lines.push(
    toMdTable(
      ["Schema", "Object Type", "Count"],
      database.schema_summary.map((r) => [
        `\`${r.table_schema}\``,
        r.table_type,
        String(r.count),
      ]),
    ),
  );
  lines.push("");
  lines.push("## Public Tables");
  for (const table of publicTables) {
    const tableName = table.table_name;
    const columns = columnsByTable.get(tableName) || [];
    const pkRows = pkByTable.get(tableName) || [];
    const fkRows = fkByTable.get(tableName) || [];
    const policyRows = policiesByTable.get(tableName) || [];
    const triggerRows = triggersByTable.get(tableName) || [];
    const usage = usageByTable.get(tableName);

    lines.push(`### ${tableName}`);
    lines.push(
      `- Columns (${columns.length}): ${columns
        .map((c) => `\`${c.column_name}:${c.udt_name}\``)
        .join(", ")}`,
    );
    lines.push(
      `- Primary key: ${
        pkRows.length > 0 ? pkRows.map((p) => `\`${p.columns}\``).join(", ") : "none"
      }`,
    );
    lines.push(
      `- Foreign keys: ${
        fkRows.length > 0
          ? fkRows
              .map(
                (f) =>
                  `\`${f.column_name} -> ${f.foreign_table}.${f.foreign_column}\``,
              )
              .join(", ")
          : "none"
      }`,
    );
    lines.push(
      `- RLS policies: ${
        policyRows.length > 0 ? policyRows.map((p) => `\`${p.policy_name}\``).join(", ") : "none"
      }`,
    );
    lines.push(
      `- Triggers: ${
        triggerRows.length > 0
          ? triggerRows.map((t) => `\`${t.trigger_name} -> ${t.function_name}\``).join(", ")
          : "none"
      }`,
    );
    if (usage) {
      const ops = Object.entries(usage.operations)
        .map(([op, count]) => `${op}:${count}`)
        .join(", ");
      lines.push(
        `- Frontend usage: surfaces=${usage.surfaces.join(", ")} | ops=${ops} | files=${usage.files
          .map((f) => `\`${f}\``)
          .join(", ")}`,
      );
    } else {
      lines.push("- Frontend usage: none detected in local bundle.");
    }
    lines.push("");
  }

  lines.push("## Public Views");
  lines.push(
    publicViews.length > 0
      ? publicViews.map((v) => `- \`${v.table_name}\``).join("\n")
      : "- none",
  );
  lines.push("");

  lines.push("## Public Enums");
  lines.push(
    database.public_enums.length > 0
      ? database.public_enums
          .map((e) => {
            const labels = normalizePgArray(e.labels);
            return `- \`${e.enum_name}\`: ${labels.map((l) => `\`${l}\``).join(", ")}`;
          })
          .join("\n")
      : "- none",
  );
  lines.push("");

  lines.push("## Public Functions");
  lines.push(
    toMdTable(
      ["Function", "Args", "Returns", "Language", "Security Definer"],
      database.public_functions.map((f) => [
        `\`${f.function_name}\``,
        `\`${f.args || ""}\``,
        `\`${f.return_type}\``,
        `\`${f.language}\``,
        f.security_definer ? "yes" : "no",
      ]),
    ),
  );
  lines.push("");

  lines.push("## Application Triggers");
  lines.push(
    database.public_triggers.length > 0
      ? toMdTable(
          ["Table", "Trigger", "Function", "Enabled"],
          database.public_triggers.map((t) => [
            `\`${t.table_schema}.${t.table_name}\``,
            `\`${t.trigger_name}\``,
            `\`${t.function_schema}.${t.function_name}\``,
            `\`${t.enabled}\``,
          ]),
        )
      : "No non-internal application triggers.",
  );
  lines.push("");

  lines.push("## Edge Functions");
  if (edge_functions.length === 0) {
    lines.push("- none");
  } else {
    for (const fn of edge_functions) {
      lines.push(
        `- \`${fn.slug || fn.name}\` | status=\`${fn.status}\` | verify_jwt=\`${fn.verify_jwt}\` | version=\`${fn.version}\``,
      );
    }
  }
  lines.push("");

  lines.push("## Frontend RPC Usage");
  lines.push(
    frontend_usage.rpcs.length > 0
      ? frontend_usage.rpcs
          .map(
            (r) =>
              `- \`${r.name}\` | surfaces=${r.surfaces.join(", ")} | files=${r.files
                .map((f) => `\`${f}\``)
                .join(", ")}`,
          )
          .join("\n")
      : "- none",
  );
  lines.push("");

  lines.push("## Workspace Checks");
  lines.push(
    `- Residual hashed filenames: ${workspace_checks.hashed_residual_files.length}`,
  );
  lines.push(
    `- Missing HTML asset references: ${workspace_checks.missing_html_asset_refs.length}`,
  );
  lines.push(
    `- Missing JS module imports: ${workspace_checks.missing_module_imports.length}`,
  );
  lines.push("");

  return `${lines.join("\n")}\n`;
}

async function main() {
  const env = loadEnv({
    cwd: ROOT,
    files: [".env.codex.supabase.txt", ".env"],
  });

  const supabaseUrl = env.SUPABASE_URL;
  const accessToken = env.SUPABASE_ACCESS_TOKEN;
  if (!supabaseUrl) {
    throw new Error("Missing SUPABASE_URL in .env or process env.");
  }
  if (!accessToken) {
    throw new Error("Missing SUPABASE_ACCESS_TOKEN in .env or process env.");
  }

  const projectRef = getProjectRefFromSupabaseUrl(supabaseUrl);
  const runQuery = createSupabaseProjectQueryRunner({
    projectRef,
    accessToken,
    defaultExcerptMax: 400,
  });
  const project = await fetchJson(
    `https://api.supabase.com/v1/projects/${projectRef}`,
    {
      headers: { Authorization: `Bearer ${accessToken}` },
    },
  );
  const edgeFunctions = normalizeRows(
    await fetchJson(`https://api.supabase.com/v1/projects/${projectRef}/functions`, {
      headers: { Authorization: `Bearer ${accessToken}` },
    }),
  );

  const queries = {
    schema_summary: `
      select table_schema, table_type, count(*)::int as count
      from information_schema.tables
      where table_schema not in ('pg_catalog','information_schema')
      group by table_schema, table_type
      order by table_schema, table_type;
    `,
    public_objects: `
      select table_name, table_type
      from information_schema.tables
      where table_schema='public'
      order by case when table_type='BASE TABLE' then 0 else 1 end, table_name;
    `,
    public_columns: `
      select table_name, ordinal_position, column_name, data_type, udt_name, is_nullable, column_default
      from information_schema.columns
      where table_schema='public'
      order by table_name, ordinal_position;
    `,
    public_enums: `
      select t.typname as enum_name, array_agg(e.enumlabel order by e.enumsortorder) as labels
      from pg_type t
      join pg_enum e on e.enumtypid=t.oid
      join pg_namespace n on n.oid=t.typnamespace
      where n.nspname='public'
      group by t.typname
      order by t.typname;
    `,
    public_primary_keys: `
      select c.relname as table_name,
             con.conname as constraint_name,
             string_agg(att.attname, ', ' order by ord.ordinality) as columns
      from pg_constraint con
      join pg_class c on c.oid = con.conrelid
      join pg_namespace n on n.oid = c.relnamespace
      join unnest(con.conkey) with ordinality as ord(attnum, ordinality) on true
      join pg_attribute att
        on att.attrelid = c.oid
       and att.attnum = ord.attnum
      where n.nspname = 'public'
        and con.contype = 'p'
      group by c.relname, con.conname
      order by c.relname;
    `,
    public_foreign_keys: `
      select c.relname as table_name,
             att.attname as column_name,
             c2.relname as foreign_table,
             att2.attname as foreign_column,
             con.conname as constraint_name
      from pg_constraint con
      join pg_class c on c.oid = con.conrelid
      join pg_namespace n on n.oid = c.relnamespace
      join pg_class c2 on c2.oid = con.confrelid
      join generate_subscripts(con.conkey, 1) as s(i) on true
      join pg_attribute att
        on att.attrelid = c.oid
       and att.attnum = con.conkey[s.i]
      join pg_attribute att2
        on att2.attrelid = c2.oid
       and att2.attnum = con.confkey[s.i]
      where n.nspname = 'public'
        and con.contype = 'f'
      order by c.relname, att.attname;
    `,
    public_indexes: `
      select tablename as table_name, indexname as index_name, indexdef as index_definition
      from pg_indexes
      where schemaname='public'
      order by tablename, indexname;
    `,
    public_functions: `
      select p.proname as function_name,
             pg_get_function_identity_arguments(p.oid) as args,
             pg_get_function_result(p.oid) as return_type,
             l.lanname as language,
             p.prosecdef as security_definer
      from pg_proc p
      join pg_namespace n on n.oid = p.pronamespace
      join pg_language l on l.oid = p.prolang
      where n.nspname = 'public'
      order by p.proname;
    `,
    public_triggers: `
      select tblns.nspname as table_schema,
             c.relname as table_name,
             funcns.nspname as function_schema,
             t.tgname as trigger_name,
             p.proname as function_name,
             pg_get_triggerdef(t.oid, true) as definition,
             t.tgenabled as enabled
      from pg_trigger t
      join pg_class c on c.oid=t.tgrelid
      join pg_namespace tblns on tblns.oid=c.relnamespace
      join pg_proc p on p.oid=t.tgfoid
      join pg_namespace funcns on funcns.oid=p.pronamespace
      where not t.tgisinternal
        and (tblns.nspname='public' or funcns.nspname='public')
      order by tblns.nspname, c.relname, t.tgname;
    `,
    public_policies: `
      select tablename as table_name,
             policyname as policy_name,
             permissive,
             roles,
             cmd,
             qual,
             with_check
      from pg_policies
      where schemaname='public'
      order by tablename, policyname;
    `,
    public_views: `
      select table_name as view_name, view_definition
      from information_schema.views
      where table_schema='public'
      order by table_name;
    `,
    public_row_estimates: `
      select relname as table_name, n_live_tup::bigint as estimated_rows
      from pg_stat_user_tables
      where schemaname='public'
      order by relname;
    `,
    migrations: `
      select version, coalesce(name, '') as name, coalesce(array_length(statements, 1), 0) as statement_count
      from supabase_migrations.schema_migrations
      order by version desc;
    `,
    storage_buckets: `
      select id, name, public, file_size_limit, allowed_mime_types, created_at, updated_at
      from storage.buckets
      order by name;
    `,
  };

  const queryResults = await Promise.all(
    Object.entries(queries).map(async ([key, sql]) => [
      key,
      normalizeRows(await runQuery(sql, { readOnly: true })),
    ]),
  );
  const database = Object.fromEntries(queryResults);

  const allSiteFiles = await walkFiles(SITE_DIR);
  const projectStructure = analyzeProjectStructure(allSiteFiles);
  const workspaceChecks = analyzeWorkspaceChecks(allSiteFiles);
  const frontendUsage = analyzeFrontendSupabaseUsage(allSiteFiles);

  const output = {
    generated_at_utc: new Date().toISOString(),
    project: {
      id: project.id,
      ref: project.ref,
      name: project.name,
      region: project.region,
      status: project.status,
      created_at: project.created_at,
      database: project.database,
    },
    edge_functions: edgeFunctions,
    database,
    frontend_usage: frontendUsage,
    workspace_checks: workspaceChecks,
    project_structure: projectStructure,
  };

  await fs.mkdir(DOCS_DIR, { recursive: true });
  const jsonPath = path.join(DOCS_DIR, "supabase-map.json");
  const mdPath = path.join(DOCS_DIR, "supabase-map.md");
  await fs.writeFile(jsonPath, `${JSON.stringify(output, null, 2)}\n`, "utf8");
  await fs.writeFile(mdPath, markdownForMap(output), "utf8");

  console.log(`Wrote ${toRel(jsonPath)}`);
  console.log(`Wrote ${toRel(mdPath)}`);
}

main().catch((err) => {
  console.error(err instanceof Error ? err.message : String(err));
  process.exit(1);
});

