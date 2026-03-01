import test from "node:test";
import assert from "node:assert/strict";
import { createRequire } from "node:module";

const require = createRequire(import.meta.url);
const {
  htmlResponse,
  isValidUuid,
  jsonResponse,
  parseBearerToken,
  parseJsonResponse,
  readHeader,
} = require("../netlify/functions/_shared.js");

test("jsonResponse returns standard JSON response shape", () => {
  const response = jsonResponse(201, { ok: true });

  assert.equal(response.statusCode, 201);
  assert.equal(response.headers["content-type"], "application/json; charset=utf-8");
  assert.equal(response.headers["cache-control"], "no-store");
  assert.deepEqual(JSON.parse(response.body), { ok: true });
});

test("htmlResponse returns standard HTML response shape", () => {
  const response = htmlResponse(200, "<h1>Hello</h1>");

  assert.equal(response.statusCode, 200);
  assert.equal(response.headers["content-type"], "text/html; charset=utf-8");
  assert.equal(response.headers["cache-control"], "no-store");
  assert.equal(response.body, "<h1>Hello</h1>");
});

test("parseBearerToken extracts token and rejects malformed values", () => {
  assert.equal(parseBearerToken("Bearer abc123"), "abc123");
  assert.equal(parseBearerToken("bearer    xyz"), "xyz");
  assert.equal(parseBearerToken("Token abc123"), "");
  assert.equal(parseBearerToken(null), "");
});

test("readHeader resolves case-insensitively from event or raw headers", () => {
  const event = {
    headers: {
      Authorization: "Bearer test-token ",
      "x-forwarded-host": "example.com",
    },
  };

  assert.equal(readHeader(event, "authorization"), "Bearer test-token");
  assert.equal(readHeader(event, "X-Forwarded-Host"), "example.com");
  assert.equal(readHeader({ "x-test": "v1" }, "X-Test"), "v1");
  assert.equal(readHeader(event, "missing"), "");
});

test("parseJsonResponse handles JSON text and empty payload", async () => {
  const jsonPayload = await parseJsonResponse(
    new Response(JSON.stringify({ ok: true }), {
      status: 200,
      headers: { "content-type": "application/json" },
    }),
  );
  assert.deepEqual(jsonPayload, { ok: true });

  const textPayload = await parseJsonResponse(
    new Response("plain text", { status: 200 }),
  );
  assert.equal(textPayload, "plain text");

  const emptyPayload = await parseJsonResponse(new Response("", { status: 200 }));
  assert.equal(emptyPayload, null);
});

test("isValidUuid validates RFC4122 values", () => {
  assert.equal(isValidUuid("123e4567-e89b-12d3-a456-426614174000"), true);
  assert.equal(isValidUuid("not-a-uuid"), false);
  assert.equal(isValidUuid(""), false);
});
