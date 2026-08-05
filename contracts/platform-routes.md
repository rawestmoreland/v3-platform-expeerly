# Platform routes (app.expeerly.com prototype)

**Status:** Active  
**Related:** [layout-shell-page-canvas.md](./layout-shell-page-canvas.md), [i18n-locales.md](./i18n-locales.md), [public-routes.md](./public-routes.md)

Authenticated-style app surfaces for **company**, **reviewers**, and **admin / BND**. Not part of the public www / player sitemap.

## App router

```text
app/(platform)/
  company/**           → PageCanvas → AppContentContainer → screen
  reviewer/**          → PageCanvas → AppContentContainer → screen
  bdn/(admin)/**         → PageCanvas → AppContentContainer → stub (admin menu)
  bdn/designsystem/**    → own layout (no PageCanvas; ESLint-exempt showcases)
```

Route group `(platform)` does **not** appear in URLs (`/company`, not `/platform/company`).

## Canonical paths

### Company

| Route | Role |
|-------|------|
| `/company` | Company dashboard |
| `/company/all-reviews` | Community vs campaign reviews (fixtures) |
| `/company/campaigns` | Manage review campaigns (stub) |
| `/company/brand-assets` | Brand assets & products (stub) |
| `/company/analytics` | Distribution & analytics (stub) |
| `/company/account-settings` | Account settings (stub) |
| `/company/credits` | Credits (stub) |

Legacy `/companies/**` redirects to `/company/**` in `proxy.ts`.

### Reviewer

| Route | Role |
|-------|------|
| `/reviewer` | Reviewer welcome / home (Allison draft) |
| `/reviewer/submit-review` | Community review submit wizard (EAN → receipt → video) |
| `/reviewer/myreviews` | Community, self-submitted, and campaign reviews (fixtures) |
| `/reviewer/campaigns` | Running campaigns list + apply stub |
| `/reviewer/account-settings` | Account settings (stub) |
| `/reviewer/onboarding` | Redirects to `/reviewer` (legacy) |

### Admin / BND

| Route | Role |
|-------|------|
| `/bdn` | Redirects to `/bdn/dashboard` |
| `/bdn/dashboard` | Dashboard (stub) |
| `/bdn/brand-assets` | Manage brand assets (stub) |
| `/bdn/analytics` | Distribution & analytics (stub) |
| `/bdn/admin-portal` | Admin portal (stub) |
| `/bdn/account-settings` | Account settings (stub) |
| `/bdn/designsystem` | Design system hub + component showcases |

**Sign-in** (`/sign-in`) stays under `app/(public)/` — shared auth entry, also locale-exempt in URL routing.

**Auth routes** (App Router, not under `(platform)`):

| Route | Role |
|-------|------|
| `/auth/callback` | Supabase email-confirm / OAuth code exchange |
| `/auth/sign-out` | Sign out + redirect home |

## Screens

`components/screens/platform/*Screen` — compose `components/ui/` only; no feature UI in `app/(platform)/**` page files (except design system under `app/(platform)/bdn/designsystem/`).

## Locale URL policy

Platform paths are **exempt** from `/{locale}/` URL prefixes. See `LOCALE_EXEMPT_PATH_PREFIXES` in `lib/i18n/routing.ts`.

UI strings still use `t("app.*")` / `t("designsystem.*")` and locale files (runtime locale via `NEXT_LOCALE` cookie, not path segment).

## Data & nav

Prototype: fixtures + stubs; no Supabase. Nav: `lib/app-nav-config.ts` (`companyNavItems`, `reviewerNavItems`, `bdnNavItems` + `appNavDesignSystemChildren` on `/bdn/**`).
