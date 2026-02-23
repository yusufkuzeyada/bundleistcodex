import { readdirSync, readFileSync, renameSync, statSync, writeFileSync } from "node:fs";
import { extname, join, basename } from "node:path";

const ROOT = "site";
const TEXT_EXTS = new Set([".html", ".js", ".css"]);
const TARGET_EXTS = new Set([".js", ".css"]);
const HASHED_RE = /^(.*)-([A-Za-z0-9_-]{6,})$/;
const REF_RE = /[A-Za-z0-9_-]+-[A-Za-z0-9_-]{6,}\.(?:js|css)/g;

function walk(dir) {
  const out = [];
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    const st = statSync(full);
    if (st.isDirectory()) {
      out.push(...walk(full));
    } else {
      out.push(full);
    }
  }
  return out;
}

const allFiles = walk(ROOT);
const renameOps = [];
const byLowerOldName = new Map();

for (const file of allFiles) {
  const ext = extname(file);
  if (!TARGET_EXTS.has(ext)) continue;

  const name = basename(file);
  const base = basename(file, ext);
  const m = base.match(HASHED_RE);
  if (!m) continue;

  const newName = `${m[1]}${ext}`;
  const newPath = join(file.slice(0, file.length - name.length), newName);
  renameOps.push({ oldPath: file, newPath, oldName: name, newName });
  byLowerOldName.set(name.toLowerCase(), newName);
}

for (const op of renameOps) {
  renameSync(op.oldPath, op.newPath);
}

const filesAfterRename = walk(ROOT);
let replacedCount = 0;

for (const file of filesAfterRename) {
  const ext = extname(file);
  if (!TEXT_EXTS.has(ext)) continue;

  const raw = readFileSync(file, "utf8");
  const next = raw.replace(REF_RE, (match) => {
    const replacement = byLowerOldName.get(match.toLowerCase());
    if (!replacement) return match;
    if (replacement !== match) replacedCount += 1;
    return replacement;
  });

  if (next !== raw) {
    writeFileSync(file, next, "utf8");
  }
}

console.log(`Renamed ${renameOps.length} files.`);
console.log(`Updated ${replacedCount} reference(s).`);

