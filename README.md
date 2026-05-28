# Sample Monorepo

This repository is a small example of a **monorepo** managed with **pnpm workspaces**.

## What Is a Monorepo?

A monorepo is a single repository that contains multiple related projects.
Instead of keeping the frontend, backend, blog, and shared utilities in separate
Git repositories, they live together in one place.

In this example, the monorepo contains:

- `apps/client` - React + Vite frontend app
- `apps/blog` - Next.js blog app
- `apps/server` - Express API server
- `packages/utils` - shared TypeScript utility package

The shared package is used by multiple apps through this dependency:

```json
"@local/utils": "workspace:*"
```

That means pnpm links the local `packages/utils` package directly into the apps
instead of downloading it from npm.

## Why Use a Monorepo?

Monorepos are useful when multiple projects share code or are developed
together.

Common uses:

- Share reusable code between apps, such as date formatting, currency helpers,
  API clients, UI components, or validation logic.
- Keep frontend, backend, and shared packages in one Git history.
- Make cross-project changes in one pull request.
- Use one install command for all apps and packages.
- Run commands across the whole workspace, such as build or dev.
- Avoid publishing private shared packages just to use them locally.

In this repo, `@local/utils` contains shared currency and date/time formatting
helpers. The React client, Next.js blog, and Express server can all use that same
package.

## Project Structure

```text
sample-monorepo/
├── apps/
│   ├── blog/          # Next.js app
│   ├── client/        # React + Vite app
│   └── server/        # Express API server
├── packages/
│   └── utils/         # Shared TypeScript utilities
├── package.json       # Root scripts and package manager
├── pnpm-lock.yaml     # Locked dependency versions
└── pnpm-workspace.yaml
```

The workspace is configured in `pnpm-workspace.yaml`:

```yaml
packages:
  - 'apps/*'
  - 'packages/*'
```

This tells pnpm that every package inside `apps/` and `packages/` belongs to the
same workspace.

## Prerequisites

Install:

- Node.js
- pnpm

This repo declares pnpm as its package manager:

```json
"packageManager": "pnpm@11.4.0"
```

If you use Corepack, you can enable pnpm with:

```bash
corepack enable
corepack prepare pnpm@11.4.0 --activate
```

## Setup With pnpm

Install all dependencies from the root of the monorepo:

```bash
pnpm install
```

This installs dependencies for every app and package in the workspace.

## Run the Apps

Run all development servers in parallel:

```bash
pnpm dev
```

The root `dev` script runs:

```bash
pnpm -r --parallel dev
```

That asks pnpm to run the `dev` script in each workspace package that has one.

You can also run one app at a time.

Run the React client:

```bash
pnpm --filter client dev
```

Run the Next.js blog:

```bash
pnpm --filter blog dev
```

Run the Express server:

```bash
pnpm --filter server dev
```

The Express server uses port `3001` by default and exposes:

```text
GET /
GET /rates/today
```

## Build

Build every package and app:

```bash
pnpm build
```

The root `build` script runs:

```bash
pnpm -r build
```

You can also build a specific workspace package:

```bash
pnpm --filter @local/utils build
pnpm --filter client build
pnpm --filter blog build
pnpm --filter server build
```

## Add a New App or Package

To add a new app, create it inside `apps/`:

```text
apps/admin
```

To add a new shared package, create it inside `packages/`:

```text
packages/ui
```

Because `pnpm-workspace.yaml` already includes `apps/*` and `packages/*`, pnpm
will automatically treat those folders as workspace packages once they contain a
`package.json`.

## Example Workspace Dependency

If another app needs to use the shared utility package, add this to that app's
`package.json`:

```json
{
  "dependencies": {
    "@local/utils": "workspace:*"
  }
}
```

Then import from it in TypeScript:

```ts
import { formatCurrencyFromInr } from '@local/utils'

const price = formatCurrencyFromInr(98750, 'INR')
```

pnpm will link the local package automatically during `pnpm install`.
