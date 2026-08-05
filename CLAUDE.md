# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this repo is

Expeerly v3 is a full platform consolidation: legacy Bubble.io data, campaign management, the public expeerly.com video-review player, and reviewer onboarding are being replatformed into one Next.js app with one Supabase schema. The repo is currently in the **foundation phase** — building the schema contract and clickable prototypes ahead of a foundation sign-off, not full backend parity yet. See `README.md` for the phased plan.

**Governing document:** `AGENTS.md` is the authoritative contributor/agent policy file. Do **not** edit it without explicit CPO approval. Everything below is consistent with it and with `.cursor/rules/*.mdc`; when in doubt, `.cursor/rules/` has the fuller detail for a given area (globs shown below).

## Commands

```bash
npm run dev              # Next.js dev server
npm run build             # production build
npm run typecheck          # tsc --noEmit
npm run lint               # eslint
```

There is no test runner configured in this repo (no `test` script, no Jest/Vitest/Playwright). Validate changes with `typecheck` and `lint`, and by exercising the route in the dev server.

Other scripts (`package.json` `scripts`) are one-off/data tooling, not part of the normal dev loop: `tokens:check`, `tokens:docs`, `fixtures:video-reviews`, `categories:slugs`, `seed:reviewers`, and platform pull/sync jobs under `scripts/{yt,mux,inst,fb,tiktok,loadbee,ops}/`.

## Architecture

### Request flow / rendering pipeline

```
app/layout.tsx → LayoutShell (global chrome, once) → route
route page → PageCanvas (layout options) → Screen (components/screens/**) → ui composites/atoms
```

- `components/layout/LayoutShell.tsx` — global structure only (header + `<main>` slot). No page-specific logic.
- `components/layout/PageCanvas.tsx` — single enforcement point for per-page layout options; pages pass fully-declared props. No structure/chrome of its own.
- `components/layout/AppContentContainer.tsx` — shared horizontal inset (`max-w-content`, responsive `px-*`) used by `AppHeader`/`AppFooter` and by segment layouts under `app/(platform)/company/**` and `app/(platform)/reviewer/**`: `PageCanvas → AppContentContainer → Screen`. Screens must not re-declare outer padding/max-width.
- Route **page files never contain feature UI** — they wire a `Screen` component from `components/screens/platform/**` or `components/screens/public/**`. Details: `contracts/layout-shell-page-canvas.md`, `.cursor/rules/platform-routes.mdc`, `.cursor/rules/public-routes.mdc`.
- The design system site `app/(platform)/bdn/designsystem/**` is an exception: it owns its own layout, does **not** use `PageCanvas`, and its `ui/**` showcase pages are exempt from the locale-literal ESLint rule.

### Route groups (`app/`)

- `app/(public)/` — public www/player prototype. Canonical player URL: `/video-reviews/{categorySlug}/{brandSlug}/{productSlug}/{reviewId}` — never add `/reviewers/` routes here. Canonical paths in `contracts/public-routes.md`.
- `app/(platform)/company/**`, `app/(platform)/reviewer/**` — authenticated app surfaces (company portal, reviewer workspace).
- `app/(platform)/bdn/**` — admin/BDN surface, including `(admin)/*` stubs and the `designsystem/` site. Legacy `/companies/*` URLs are redirected to `/company/*` in `proxy.ts`.
- `app/auth/` — Supabase auth callback / sign-out routes.
- Canonical route paths and nav wiring: `contracts/platform-routes.md`, `contracts/public-routes.md`, `lib/app-nav-config.ts` (`companyNavItems`, `reviewerNavItems`, `bdnNavItems`).

### i18n / locales

- All user-facing copy goes through `t("…")` from `@/lib/i18n`, backed by `locales/{locale}.json` (namespaces `ui.*`, `app.*`, `player.*`, `marketing.*`) and `locales/bdn/{locale}.json` (`designsystem.*`). No inline English strings in `app/`, `components/`, or `lib/` — enforced by the `i18next/no-literal-string` ESLint rule (see `eslint.config.mjs` for the exact allow-list of callees/attributes/words it exempts).
- DB/CSV/fixture content (review titles, FAQs, transcripts) is localized via `pickLocalized()` in `lib/i18n/content.ts`, **not** locale JSON.
- Two independent locale concepts, both driven by `lib/i18n/routing.ts`:
  - **Message locale** (`t()` / `getLocale()`): resolved from the `NEXT_LOCALE` cookie, set in `proxy.ts`, read in `lib/i18n/request.ts`. Applies everywhere.
  - **URL locale segment** (`/de/...`): only for paths in `LOCALE_PREFIXED_PATH_PREFIXES` (`/`, `/video-reviews/**`). `LOCALE_EXEMPT_PATH_PREFIXES` (`/company`, `/reviewer`, `/sign-in`, `/bdn`) are never prefixed — `proxy.ts` redirects e.g. `/de/company` → `/company`.
- Full reference: `contracts/i18n-locales.md`.

### Design system / atomic design

- Strict composition: **Tailwind tokens → atoms → molecules → composites**. No ad-hoc UI (raw HTML + arbitrary Tailwind, one-off primitives) on product screens — if a needed piece doesn't exist, stop and flag an atomic design extension rather than improvising. Non-negotiable per `AGENTS.md`.
- Icons: all Lucide icons are wrapped one-per-file under `components/ui/icons/`; import `lucide-react` **nowhere else** (ESLint-enforced). Product code should use the `Icon` atom (`components/ui/atoms/Icon`), not the icons index directly — a separate ESLint rule blocks `@/components/ui/icons` imports under `app/**` (except the designsystem showcase).
- `components/ui/molecules/**` must not import from `components/ui/composites/**` (ESLint-enforced).
- Design-system primitives live at the root of `molecules/`/`composites/` (or shared DS subfolders like `search/`, `navigation/`); product-only pieces go in a feature subfolder instead, e.g. `molecules/video-reviews/`, `composites/video-reviews/`.
- Tokens live in `tokens/*.css`, wired to Tailwind via `tailwind.config.mjs` / `tokens/tailwind-theme-extend.mjs`. No hex/rgb/hsl literals, no legacy palette classes (`bg-pink-*`, `text-navy-*`, …), no arbitrary bracket layout utilities (`max-w-[1440px]`) in `className` — all ESLint-enforced (`eslint.config.mjs`); use/extend layout tokens instead.
- Reference docs: `contracts/design-tokens.md`, `.cursor/rules/design-system-atomic.mdc`, `.cursor/rules/platform-ui-governance.mdc`. Live showcase: `app/(platform)/bdn/designsystem/`.

### Data layer: fixtures vs. Supabase

- The prototype phase reads from `lib/fixtures/**` (video reviews, campaigns, reviewer dashboard/session, community products, etc.) rather than live queries in most product surfaces — check `contracts/schema.dbml` for field names when wiring fixtures so shapes stay contract-compatible.
- Supabase clients: `lib/supabase/client.ts` (browser), `lib/supabase/server.ts` (RSC), `lib/supabase/admin.ts` (service role/seeds), `lib/supabase/middleware.ts` (session refresh, used from `proxy.ts`), `lib/supabase/auth.ts`.
- Reviewer routes (`/reviewer/**`) are auth-gated in `proxy.ts`: unauthenticated requests redirect to `/sign-in?next=...` whenever Supabase env vars are configured.
- Interest categories: dev data comes from `lib/data/interest-categories.csv` via `lib/data/interest-categories-dev.ts` (server-only); production will read Supabase `interest_categories`.

### Schema contract and migrations (human-gated)

- `contracts/schema.dbml` is the agreed entity/relationship model; `contracts/schema-live.dbml` is a live-schema snapshot (context only, not authoritative for execution). Read the header comment in `schema.dbml` for the ID rulebook — it explains the split between the legacy analytics cluster (bigint `id` + stable `bubble_id` text join key) and planned v3 tables (opaque text `id`).
- **Never create/edit/write `supabase/migrations/**/*.sql`** (or `contracts/schema.dbml`) without explicit user approval of the exact contents first — propose SQL/DBML diffs in chat. This is a hard gate from `AGENTS.md` and `.cursor/rules/database-ops.mdc`.
- v3 runs on its own new Supabase project, separate from the legacy analytics project (`abwvxbcxzrszhtjnhchr`, referenced only when porting migration history). Do not assume new migrations sync to the legacy project.

## Cursor shorthand (this repo's convention, honor if the user types it)

- `crs` — check/report/suggest only, no implementation; response bullets prefixed `✅`/`🟢`/`⚠️`/`❌`, plus `💡` suggestions when there are gaps. Modifiers: `crs 🟢−` (gaps only), `crs 📋` (no suggestions), `crs 💡` (suggestions only), `crs 🔍` (deeper audit).
- `rt pl` — return an implementation plan; normal length OK.
- `iml` — implement the previously agreed plan.
