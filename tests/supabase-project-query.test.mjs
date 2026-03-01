import test from "node:test";
import assert from "node:assert/strict";

import {
  createSupabaseProjectQueryRunner,
  getProjectRefFromSupabaseUrl,
} from "../scripts/lib/supabase-project-query.mjs";

test("getProjectRefFromSupabaseUrl extracts project ref", () => {
  const ref = getProjectRefFromSupabaseUrl("https://abc123xyz.supabase.co");
  assert.equal(ref, "abc123xyz");
});

test("createSupabaseProjectQueryRunner posts SQL payload", async () => {
  const originalFetch = global.fetch;
  let capturedUrl = "";
  let capturedInit = null;

  global.fetch = async (url, init) => {
    capturedUrl = String(url);
    capturedInit = init;
    return new Response(JSON.stringify([{ ok: true }]), { status: 200 });
  };

  try {
    const runQuery = createSupabaseProjectQueryRunner({
      projectRef: "proj123",
      accessToken: "token-123",
    });

    const rows = await runQuery("select 1;");
    assert.deepEqual(rows, [{ ok: true }]);
    assert.equal(
      capturedUrl,
      "https://api.supabase.com/v1/projects/proj123/database/query",
    );
    assert.equal(capturedInit.method, "POST");
    assert.equal(capturedInit.headers.Authorization, "Bearer token-123");
    assert.equal(capturedInit.headers["Content-Type"], "application/json");
    assert.deepEqual(JSON.parse(capturedInit.body), { query: "select 1;" });
  } finally {
    global.fetch = originalFetch;
  }
});

test("createSupabaseProjectQueryRunner supports read-only endpoint", async () => {
  const originalFetch = global.fetch;
  let capturedUrl = "";

  global.fetch = async (url) => {
    capturedUrl = String(url);
    return new Response("[]", { status: 200 });
  };

  try {
    const runQuery = createSupabaseProjectQueryRunner({
      projectRef: "proj123",
      accessToken: "token-123",
    });

    const rows = await runQuery("select 1;", { readOnly: true });
    assert.deepEqual(rows, []);
    assert.equal(
      capturedUrl,
      "https://api.supabase.com/v1/projects/proj123/database/query/read-only",
    );
  } finally {
    global.fetch = originalFetch;
  }
});

test("createSupabaseProjectQueryRunner returns truncated excerpt on failure", async () => {
  const originalFetch = global.fetch;

  global.fetch = async () =>
    new Response("0123456789", { status: 500, statusText: "Server Error" });

  try {
    const runQuery = createSupabaseProjectQueryRunner({
      projectRef: "proj123",
      accessToken: "token-123",
      defaultExcerptMax: 5,
    });

    await assert.rejects(
      () => runQuery("select 1;"),
      /Supabase query failed \(500 Server Error\): 01234\.\.\./,
    );
  } finally {
    global.fetch = originalFetch;
  }
});
