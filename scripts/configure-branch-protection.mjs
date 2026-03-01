import { execFileSync } from "node:child_process";

const APPLY_FLAG = "--apply";
const BRANCH_FLAG = "--branch";

function runGit(args) {
  return execFileSync("git", args, {
    encoding: "utf8",
    stdio: ["ignore", "pipe", "pipe"],
  }).trim();
}

function tryRunGit(args) {
  try {
    return runGit(args);
  } catch {
    return "";
  }
}

function resolveOwnerRepo() {
  const fromEnvOwner = String(process.env.GITHUB_OWNER || "").trim();
  const fromEnvRepo = String(process.env.GITHUB_REPO || "").trim();
  if (fromEnvOwner && fromEnvRepo) {
    return { owner: fromEnvOwner, repo: fromEnvRepo };
  }

  const remote = runGit(["remote", "get-url", "origin"]);
  const httpsMatch = remote.match(/github\.com[:/](.+?)\/(.+?)(?:\.git)?$/i);
  if (!httpsMatch) {
    throw new Error(
      "Could not parse owner/repo from origin remote. Set GITHUB_OWNER and GITHUB_REPO.",
    );
  }

  return { owner: httpsMatch[1], repo: httpsMatch[2] };
}

function getArgValue(flag) {
  const index = process.argv.indexOf(flag);
  if (index === -1) {
    return "";
  }
  return process.argv[index + 1] || "";
}

function getFirstPositionalArg() {
  return (
    process.argv
      .slice(2)
      .find((arg) => arg && !arg.startsWith("-")) || ""
  );
}

function resolveDefaultBranch() {
  const explicitEnvDefault = String(process.env.GITHUB_DEFAULT_BRANCH || "").trim();
  if (explicitEnvDefault) {
    return explicitEnvDefault;
  }

  const symbolicRef = tryRunGit(["symbolic-ref", "refs/remotes/origin/HEAD"]);
  const symbolicPrefix = "refs/remotes/origin/";
  if (symbolicRef.startsWith(symbolicPrefix)) {
    const resolved = symbolicRef.slice(symbolicPrefix.length).trim();
    if (resolved) {
      return resolved;
    }
  }

  const remoteShow = tryRunGit(["remote", "show", "origin"]);
  const headBranchMatch = remoteShow.match(/HEAD branch:\s+(.+)$/m);
  if (headBranchMatch && headBranchMatch[1]) {
    return headBranchMatch[1].trim();
  }

  const currentBranch = tryRunGit(["branch", "--show-current"]);
  if (currentBranch) {
    return currentBranch;
  }

  return "main";
}

function resolveRequiredCheckContexts() {
  const fromPlural = String(process.env.GITHUB_REQUIRED_CHECK_CONTEXTS || "").trim();
  const fromSingle = String(process.env.GITHUB_REQUIRED_CHECK_CONTEXT || "").trim();
  const raw = fromPlural || fromSingle || "validate";
  const contexts = raw
    .split(",")
    .map((part) => part.trim())
    .filter(Boolean);
  return contexts.length > 0 ? contexts : ["validate"];
}

function buildProtectionPayload(requiredCheckContexts) {
  return {
    required_status_checks: {
      strict: true,
      contexts: requiredCheckContexts,
    },
    enforce_admins: true,
    required_pull_request_reviews: {
      dismiss_stale_reviews: true,
      require_code_owner_reviews: false,
      required_approving_review_count: 1,
      require_last_push_approval: false,
    },
    restrictions: null,
    required_linear_history: true,
    allow_force_pushes: false,
    allow_deletions: false,
    block_creations: false,
    required_conversation_resolution: true,
    lock_branch: false,
    allow_fork_syncing: true,
  };
}

async function main() {
  const apply = process.argv.includes(APPLY_FLAG);
  const token = String(process.env.GITHUB_TOKEN || "").trim();
  const explicitBranch = String(
    getArgValue(BRANCH_FLAG) || getFirstPositionalArg() || "",
  ).trim();
  const defaultBranch = resolveDefaultBranch();
  const branch = explicitBranch || defaultBranch;
  const { owner, repo } = resolveOwnerRepo();
  const requiredCheckContexts = resolveRequiredCheckContexts();
  const payload = buildProtectionPayload(requiredCheckContexts);
  const endpoint = `https://api.github.com/repos/${owner}/${repo}/branches/${branch}/protection`;

  if (!apply) {
    console.log("Dry run only. No changes were sent to GitHub.");
    console.log(`Target: ${owner}/${repo} (${branch})`);
    console.log(`Required status checks: ${requiredCheckContexts.join(", ")}`);
    console.log(`Endpoint: ${endpoint}`);
    console.log("Payload:");
    console.log(JSON.stringify(payload, null, 2));
    console.log(
      "To apply, rerun with --apply and set GITHUB_TOKEN with repo admin permissions.",
    );
    return;
  }

  if (!token) {
    throw new Error("GITHUB_TOKEN is required when using --apply.");
  }

  const response = await fetch(endpoint, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/vnd.github+json",
      "X-GitHub-Api-Version": "2022-11-28",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  const rawBody = await response.text();
  let parsedBody = null;
  if (rawBody) {
    try {
      parsedBody = JSON.parse(rawBody);
    } catch {
      parsedBody = rawBody;
    }
  }

  if (!response.ok) {
    throw new Error(
      `GitHub API failed (${response.status}): ${
        typeof parsedBody === "string" ? parsedBody : JSON.stringify(parsedBody)
      }`,
    );
  }

  console.log(`Branch protection updated for ${owner}/${repo}:${branch}.`);
}

main().catch((error) => {
  console.error(error instanceof Error ? error.message : String(error));
  process.exitCode = 1;
});
