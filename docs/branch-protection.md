# Branch Protection Guide

Target repository: `yusufkuzeyada/bundleistcodex`  
Protected branch: your GitHub default branch (auto-detected from `origin/HEAD` unless overridden)

## Required GitHub Settings (Exact)

In GitHub repository settings for your default branch, configure:

- Require a pull request before merging: `enabled`
- Required approving reviews: `1`
- Dismiss stale pull request approvals when new commits are pushed: `enabled`
- Require review from Code Owners: `disabled` (enable after CODEOWNERS exists)
- Require status checks to pass before merging: `enabled`
- Require branches to be up to date before merging: `enabled`
- Required status checks: `validate`
- Require conversation resolution before merging: `enabled`
- Require linear history: `enabled`
- Do not allow bypassing the above settings: `enabled` (for admins too)
- Allow force pushes: `disabled`
- Allow deletions: `disabled`

## Setup Checklist

1. Confirm CI workflow exists and is passing:
   - `.github/workflows/ci.yml`
   - Check name expected by protection rule: `validate`
2. Apply rules in GitHub UI (Settings -> Branches -> Add rule for your default branch).
3. Verify with a test PR:
   - PR cannot merge while checks are failing or pending.
   - PR requires at least one approval.
   - Direct push to protected branch is blocked.

## Optional API-Based Configuration

Dry run (prints payload, no changes):

```bash
npm run protect:branch
```

Dry run for an explicit branch (optional override):

```bash
npm run protect:branch -- --branch your-default-branch
```

If your shell strips `--branch`, positional form also works:

```bash
npm run protect:branch -- your-default-branch
```

Apply via GitHub API:

```bash
GITHUB_TOKEN=YOUR_ADMIN_TOKEN npm run protect:branch:apply
```

Apply via GitHub API for an explicit branch (optional override):

```bash
GITHUB_TOKEN=YOUR_ADMIN_TOKEN npm run protect:branch:apply -- --branch your-default-branch
```

Positional fallback:

```bash
GITHUB_TOKEN=YOUR_ADMIN_TOKEN npm run protect:branch:apply -- your-default-branch
```

Optional environment variables:

- `GITHUB_OWNER` (defaults from `origin` remote)
- `GITHUB_REPO` (defaults from `origin` remote)
- `GITHUB_DEFAULT_BRANCH` (overrides auto-detected default branch)
- `GITHUB_REQUIRED_CHECK_CONTEXTS` (comma-separated, defaults to `validate`)
- `GITHUB_REQUIRED_CHECK_CONTEXT` (single-context fallback)

## Notes

- This workspace does not include `gh` CLI by default.
- API apply requires token permissions that can edit branch protection.
