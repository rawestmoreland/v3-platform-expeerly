# i18n — locale files

**Status:** Active

## File layout

```text
locales/
  en.json | de.json | fr.json | it.json   # Product UI (ui, app, player, marketing)
  bdn/
    en.json | …                             # Design system only (designsystem.*)
```

One JSON file per language for product; design system copy is isolated under `bdn/`.

## `t()` namespaces

| Prefix | File | Use |
|--------|------|-----|
| `ui.*` | `{locale}.json` | Atoms, molecules, shared UI |
| `app.*` | `{locale}.json` | Shell, nav, app chrome |
| `player.*` | `{locale}.json` | Video review routes (labels, empty states) |
| `marketing.*` | `{locale}.json` | Landing |
| `designsystem.*` | `bdn/{locale}.json` | DS site only |

## Rules

- No user-facing copy inline in `app/`, `components/`, `lib/` (ESLint `i18next/no-literal-string`).
- Exception: `app/bdn/designsystem/ui/**` showcase demos.
- DB/CSV/CMS content: `pickLocalized()` from `lib/i18n/content.ts` — not locale files. Review/brand copy: fixture JSON. **Interest categories (dev):** `lib/data/interest-categories.csv` via `lib/data/interest-categories-dev.ts` (server only); production → Supabase `interest_categories`.

## Loading

`lib/i18n/index.ts` merges `{locale}.json` + `bdn/{locale}.json` for `getUiStrings()`. Non-`en` locales may stub until translated (fallback to `en`).

## `lib/i18n/` modules

| Module | Import | Use |
|--------|--------|-----|
| `index.ts` | `@/lib/i18n` | `t()`, `getLocale()`, formatters |
| `routing.ts` | `@/lib/i18n/routing` | URL prefix rules, cookie names, `Accept-Language` |
| `request.ts` | `@/lib/i18n/request` | RSC: read cookie → `setLocale` |
| `locale-actions.ts` | `@/lib/i18n/locale-actions` | Server action: persist locale cookie |
| `content.ts` | `@/lib/i18n/content` | `pickLocalized()` for fixture/DB copy |

## URL locale vs message locale

- **Messages:** `t("…")` / `getLocale()` — all routes may use translated UI strings; locale from `NEXT_LOCALE` cookie set by `proxy.ts` and read in `lib/i18n/request.ts` (root layout).
- **URL segment:** only paths in `LOCALE_PREFIXED_PATH_PREFIXES` (`lib/i18n/routing.ts`) — `/` and `/video-reviews/**`. Non-`en` locales use `/de/...`, `/fr/...`, `/it/...`; `proxy.ts` rewrites to unprefixed app routes.
- **Never URL-prefixed:** `/company`, `/reviewer`, `/sign-in`, `/bdn` (`LOCALE_EXEMPT_PATH_PREFIXES`). `/de/company` redirects to `/company`.

## Scripts

- `npm run tokens:check` — color manifest vs CSS
- `scripts/build-colors-manifest.mjs` — updates `locales/bdn/en.json` → `designsystem.tokens.colors`
