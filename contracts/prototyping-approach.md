# v3 prototyping (migration)

## Order

1. **Design system** — finish tokens / atoms / molecules / composites before feature shells.
2. **Sitemap** — all routes and roles; no orphan pages. See [public-routes.md](./public-routes.md).
3. **Modes** - setup prod/dev mode env for robots
3. **i18n** — keys first; no user-facing copy inline in components. See [i18n-locales.md](./i18n-locales.md).
4. **Pages** — thin routes; **screens** in `components/screens/` compose **ui** atoms/molecules/composites. Use **PageCanvas** and **LayoutShell** on **app routes only** (not design system).

## UI governance

- **Locales / icons / tokens:** see `.cursor/rules/platform-ui-governance.mdc` and ESLint (`i18next/no-literal-string`, `no-restricted-imports`, `no-restricted-syntax`).
- **Design system** (`app/bdn/designsystem/`): own layouts; does **not** use `PageCanvas`. Showcase UI under `ui/` is ESLint-exempt for demo copy only.
- **Product pages:** compose `components/ui` atoms → molecules → composites; no ad-hoc primitives on screens.

## Data

- **Prefer real DB early** — this is a migration: wire Supabase reads/writes against the **contract** (`contracts/schema.dbml` + approved migrations on the v3 project). Avoid a parallel mock “source of truth.”
- **Minimal seeds** (or staging) — only the rows each template needs to render; not a full fake dataset.
- **Migrations** — no new/edited migration files without explicit approval; DB wiring assumes the schema that is actually applied.

## Agents / humans

- **Small slices** — one route or behavior per pass; human judges v2 deltas and parity.
