import { chmod } from "node:fs/promises";
import { existsSync } from "node:fs";
import path from "node:path";
import { execFileSync } from "node:child_process";

const ROOT = process.cwd();
const HOOKS_DIR = path.join(ROOT, ".githooks");
const HOOK_FILES = ["pre-commit", "pre-push"];

function runGit(args) {
  return execFileSync("git", args, {
    cwd: ROOT,
    encoding: "utf8",
    stdio: ["ignore", "pipe", "pipe"],
  }).trim();
}

async function ensureHookPermissions() {
  for (const hook of HOOK_FILES) {
    const filePath = path.join(HOOKS_DIR, hook);
    if (!existsSync(filePath)) {
      throw new Error(`Missing hook file: ${filePath}`);
    }
    await chmod(filePath, 0o755);
  }
}

async function main() {
  try {
    runGit(["rev-parse", "--is-inside-work-tree"]);
  } catch (error) {
    throw new Error(
      "Not inside a git repository, cannot configure hooks.",
      { cause: error },
    );
  }

  await ensureHookPermissions();
  runGit(["config", "core.hooksPath", ".githooks"]);

  console.log("Git hooks installed:");
  for (const hook of HOOK_FILES) {
    console.log(`- .githooks/${hook}`);
  }
  console.log("Configured git setting: core.hooksPath=.githooks");
}

main().catch((error) => {
  console.error(error instanceof Error ? error.message : String(error));
  process.exitCode = 1;
});
