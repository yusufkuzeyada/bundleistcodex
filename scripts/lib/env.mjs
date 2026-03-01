import { existsSync, readFileSync } from "node:fs";
import path from "node:path";

function parseEnvContent(content) {
  const out = {};
  for (const rawLine of String(content || "").split(/\r?\n/)) {
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

export function readEnvFile(filePath, { optional = true } = {}) {
  if (!existsSync(filePath)) {
    if (optional) return {};
    throw new Error(`Env file not found: ${filePath}`);
  }
  return parseEnvContent(readFileSync(filePath, "utf8"));
}

export function loadEnv({
  cwd = process.cwd(),
  files = [".env"],
  includeProcessEnv = true,
} = {}) {
  const merged = {};

  for (const fileName of files) {
    const absPath = path.isAbsolute(fileName)
      ? fileName
      : path.join(cwd, fileName);
    Object.assign(merged, readEnvFile(absPath));
  }

  if (includeProcessEnv) {
    Object.assign(merged, process.env);
  }

  return merged;
}
