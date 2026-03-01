import { readdirSync, statSync } from "node:fs";
import path from "node:path";
import { spawnSync } from "node:child_process";

const ROOT = process.cwd();
const TARGET_DIRS = [
  path.join(ROOT, "netlify", "functions"),
  path.join(ROOT, "scripts"),
  path.join(ROOT, "site", "assets"),
  path.join(ROOT, "site", "dashboard", "assets"),
];
const EXTENSIONS = new Set([".js", ".mjs"]);
const SKIP_DIRS = new Set(["node_modules", ".git"]);

function walk(dir) {
  const out = [];
  for (const entry of readdirSync(dir)) {
    if (SKIP_DIRS.has(entry)) continue;
    const absPath = path.join(dir, entry);
    const stat = statSync(absPath);
    if (stat.isDirectory()) {
      out.push(...walk(absPath));
      continue;
    }
    if (EXTENSIONS.has(path.extname(absPath))) {
      out.push(absPath);
    }
  }
  return out;
}

function toRel(absPath) {
  return path.relative(ROOT, absPath).split(path.sep).join("/");
}

const files = TARGET_DIRS.flatMap((dir) => walk(dir)).sort((a, b) =>
  toRel(a).localeCompare(toRel(b)),
);

const failures = [];
for (const file of files) {
  const check = spawnSync(process.execPath, ["--check", file], {
    encoding: "utf8",
  });
  if (check.status !== 0) {
    failures.push({
      file: toRel(file),
      stderr: String(check.stderr || "").trim(),
    });
  }
}

if (failures.length > 0) {
  console.error(`Syntax check failed for ${failures.length} file(s):`);
  for (const failure of failures) {
    console.error(`- ${failure.file}`);
    if (failure.stderr) {
      console.error(failure.stderr);
    }
  }
  process.exit(1);
}

console.log(`Syntax check passed for ${files.length} file(s).`);
