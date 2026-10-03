# CLAUDE.md

Guidance for AI agents (and humans) working in the **template-web-next** repo.

> **This is not the Next.js you remember.** Next 16 / React 19 differ from older training data (async request APIs, `next build` no longer lints, Turbopack by default). Check `node_modules/next/dist/docs/` or nextjs.org/docs for the installed version before writing framework code.

## What template-web-next is

Next.js app template with CI, e2e tests and docs. A Next.js (App Router) app with Tailwind v4, deployed on Vercel.

## Commands

`mise trust && mise install` once per clone, then `mise run install`. **pnpm is the package manager**; never use npm or yarn, never commit another lockfile. `mise` puts `node_modules/.bin` on PATH and loads `.env`, so run tools bare (`next`, `vitest`, `biome`, `playwright`), not through `pnpm exec`.

- `mise run check`: `biome ci .` + `tsc --noEmit`. **Must be clean before committing.** `pnpm format` auto-fixes.
- `mise run test`: vitest (jsdom + Testing Library) in `tests/`. **Must be green.**
- `mise run build`: `next build`. Then `mise run e2e` runs Playwright (`e2e/`) against `next start` on port 3100. First time: `playwright install chromium`.
- `pnpm dev`: dev server on :3000.

CI runs the same tasks (plus e2e on Ubuntu with `--with-deps`).

## Architecture

- `app/`: App Router. `layout.tsx` is the root; pages are Server Components unless marked `"use client"`.
- `tests/`: unit/component tests. `e2e/`: Playwright specs.
- Tailwind v4 is CSS-first: `app/globals.css` has `@import "tailwindcss"`; there is no `tailwind.config.js`.
- Backend logic goes in Route Handlers (`app/**/route.ts`) or Server Actions.

## Conventions that bite

- Biome is the only linter/formatter (with its `next` and `react` rule domains); no ESLint, no Prettier.
- Don't read request data (`cookies()`, `headers()`, `params`) without `await`: they are async now.
- Vercel deploys via the Git integration using `vercel.json`; there is no deploy workflow. Free-tier deployment limits are real: avoid pushing many throwaway branches.
- pnpm skips dependency build scripts; allow new ones in `pnpm-workspace.yaml` (`allowBuilds`).

## Things that bit us

- (none yet)

## Changelog

`CHANGELOG.md` follows [Keep a Changelog](https://keepachangelog.com). Every user-facing change adds a bullet under `## [Unreleased]` in the same change as the code.

## Git workflow

- Branch off `main`. Conventional commits (commitlint via lefthook). PRs are draft by default.
- **Worktrees go in `.claude/worktrees/<branch-with-dashes>` inside this repo.** Never under `/tmp` or a scratchpad, and never run installs or builds there. Remove after merge.
- Dependabot patch/minor PRs auto-merge on green; major bumps need a human.

## Docs site

`docs/` is a VitePress site and its own pnpm root (`cd docs && pnpm install && pnpm dev`; build with `pnpm build`). `.github/workflows/docs.yml` deploys it to GitHub Pages on pushes to `main` that touch `docs/`. The base path is `/template-web-next/`; set `DOCS_BASE=/` when it moves to a custom domain. A dead link fails the build, so link repo files via github.com URLs.
