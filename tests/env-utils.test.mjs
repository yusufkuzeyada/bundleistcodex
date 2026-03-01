import test from "node:test";
import assert from "node:assert/strict";
import { mkdtemp, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import path from "node:path";

import { loadEnv, readEnvFile } from "../scripts/lib/env.mjs";

test("readEnvFile parses comments, quoted values, and blanks", async () => {
  const tempRoot = await mkdtemp(path.join(tmpdir(), "bundleist-env-"));
  const envPath = path.join(tempRoot, ".env");
  await writeFile(
    envPath,
    [
      "# comment",
      "A=1",
      "B = two",
      "C=\"three four\"",
      "D='five six'",
      "",
    ].join("\n"),
    "utf8",
  );

  try {
    const loaded = readEnvFile(envPath, { optional: false });
    assert.deepEqual(loaded, {
      A: "1",
      B: "two",
      C: "three four",
      D: "five six",
    });
  } finally {
    await rm(tempRoot, { recursive: true, force: true });
  }
});

test("loadEnv merges files in order and allows process env override", async () => {
  const tempRoot = await mkdtemp(path.join(tmpdir(), "bundleist-env-"));
  const firstEnv = path.join(tempRoot, ".env.base");
  const secondEnv = path.join(tempRoot, ".env.local");

  await writeFile(firstEnv, "A=base\nB=base\n", "utf8");
  await writeFile(secondEnv, "B=local\nC=local\n", "utf8");

  process.env.B = "process";
  process.env.D = "process-only";

  try {
    const noProcess = loadEnv({
      cwd: tempRoot,
      files: [".env.base", ".env.local"],
      includeProcessEnv: false,
    });
    assert.deepEqual(noProcess, { A: "base", B: "local", C: "local" });

    const withProcess = loadEnv({
      cwd: tempRoot,
      files: [".env.base", ".env.local"],
      includeProcessEnv: true,
    });
    assert.equal(withProcess.A, "base");
    assert.equal(withProcess.B, "process");
    assert.equal(withProcess.C, "local");
    assert.equal(withProcess.D, "process-only");
  } finally {
    delete process.env.B;
    delete process.env.D;
    await rm(tempRoot, { recursive: true, force: true });
  }
});
