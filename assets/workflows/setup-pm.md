---
description: Configure your preferred package manager (npm/pnpm/yarn/bun)
---

# Package Manager Setup

Configure your preferred JavaScript/TypeScript package manager for this project.

## Detection Priority

When determining which package manager to use:

1. **Lock file** — Presence of `package-lock.json`, `yarn.lock`, `pnpm-lock.yaml`, or `bun.lockb`
2. **package.json** — `packageManager` field
3. **Fallback** — First available (pnpm > bun > yarn > npm)

## Setup Steps

1. Ask the user which package manager they prefer
2. Check if it's installed: `which pnpm` / `which yarn` / `which bun`
3. If not installed, provide install instructions
4. Set `packageManager` field in `package.json`
5. Generate appropriate lock file

## Install Instructions

```bash
# pnpm
npm install -g pnpm

# yarn
npm install -g yarn

# bun
curl -fsSL https://bun.sh/install | bash
```
