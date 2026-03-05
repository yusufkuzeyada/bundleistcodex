import { promises as fs } from "node:fs";
import path from "node:path";
import { transform } from "esbuild";

const ROOT_DIRS = [
  path.resolve("site/assets"),
  path.resolve("site/dashboard/assets"),
];

const MINIFIABLE_EXTENSIONS = new Set([".js", ".css"]);
const SKIPPED_FILES = new Set([path.resolve("site/dashboard/assets/debug-tools.js")]);

async function walkFiles(directoryPath) {
  const entries = await fs.readdir(directoryPath, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    const absolutePath = path.join(directoryPath, entry.name);
    if (entry.isDirectory()) {
      files.push(...(await walkFiles(absolutePath)));
      continue;
    }
    files.push(absolutePath);
  }
  return files;
}

function formatBytes(bytes) {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
}

async function minifyFile(filePath) {
  const extension = path.extname(filePath).toLowerCase();
  const loader = extension === ".css" ? "css" : "js";
  const original = await fs.readFile(filePath, "utf8");
  const result = await transform(original, {
    loader,
    minify: true,
    format: loader === "js" ? "esm" : undefined,
    target: loader === "js" ? "es2020" : undefined,
    legalComments: "none",
  });
  await fs.writeFile(filePath, result.code, "utf8");
  return {
    filePath,
    before: Buffer.byteLength(original, "utf8"),
    after: Buffer.byteLength(result.code, "utf8"),
  };
}

async function main() {
  const candidates = [];
  for (const rootDir of ROOT_DIRS) {
    const allFiles = await walkFiles(rootDir);
    for (const filePath of allFiles) {
      if (
        MINIFIABLE_EXTENSIONS.has(path.extname(filePath).toLowerCase()) &&
        !SKIPPED_FILES.has(filePath)
      ) {
        candidates.push(filePath);
      }
    }
  }

  let totalBefore = 0;
  let totalAfter = 0;
  for (const filePath of candidates) {
    const { before, after } = await minifyFile(filePath);
    totalBefore += before;
    totalAfter += after;
  }

  const savedBytes = totalBefore - totalAfter;
  const savedPercent =
    totalBefore > 0 ? ((savedBytes / totalBefore) * 100).toFixed(2) : "0.00";
  console.log(
    `Minified ${candidates.length} assets. ${formatBytes(totalBefore)} -> ${formatBytes(totalAfter)} (saved ${formatBytes(savedBytes)}, ${savedPercent}%).`,
  );
}

main().catch((error) => {
  console.error("Asset minification failed.");
  console.error(error);
  process.exit(1);
});
