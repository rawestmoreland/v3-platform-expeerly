# Design tokens — architecture

**Status:** Active  
**Governance:** [AGENTS.md](../AGENTS.md) — tokens before atoms; Tailwind utilities for styling.

**Values** live under `tokens/`. **Utility class names** are wired in `tailwind.config.mjs` (via `tokens/tailwind-theme-extend.mjs`).

## Layers

```text
tokens/*.css                    VALUES (--color-primary, type scale, shadows)
        ↓
tailwind.config.mjs             WIRING (bg-primary → var(--color-primary))
        ↓
components/ui, app              USAGE (class names)
        ↓
tokens/colors.manifest.ts       COLOR TABLE (metadata; hex synced with colors.css)
locales/bdn/{locale}.json       USAGE COPY (“used for …”)
```

| Layer | Owns | Does not own |
|-------|------|----------------|
| `tokens/` | Hex, px, CSS custom properties | React components |
| `tailwind.config.mjs` | Utility registration | Duplicate hex for semantics |
| `tokens/colors.manifest.ts` | Color table metadata for DS page | React / route code |
| `lib/` | `i18n`, `utils` | Token catalogs |

## `tokens/` file reference

| File | Purpose |
|------|---------|
| `colors.css` | Semantic `--color-*` values (product UI) |
| `typography.css` | Type scale CSS variables |
| `shadows.css` | Elevation shadows |
| `layout.css` | `--radius`, header height, content max width, menu layout |
| `colors.manifest.ts` | DS color table metadata (hex must match `colors.css`) |
| `tailwind-theme-extend.mjs` | Tailwind `theme.extend` wiring |
| `tailwind-legacy-colors.mjs` | Legacy `pink-*`, `grey-*` — design system reference only |

## Edit order

1. Change a value in `tokens/colors.css`, `tokens/typography.css`, or `tokens/shadows.css`.
2. Confirm the matching utility exists in `tokens/tailwind-theme-extend.mjs` / `tailwind.config.mjs` (semantic colors use `var(--color-*)` only).
3. Run `npm run tokens:check` (semantic hex vs manifest).
4. For typography docs: `npm run tokens:docs`.
5. Spot-check `/bdn/designsystem/colors` and a product screen.

## Rules

1. **Semantic first in product** — `bg-primary`, `text-foreground-title`, not `bg-pink-500`.
2. **Legacy primitives** — `tokens/tailwind-legacy-colors.mjs` + Colors page only; not for `components/ui`.
3. **No hex in components** — change `tokens/colors.css`, then run `npm run tokens:check`.
4. **DS usage text** — `designsystem.tokens.colors.{id}.usage` in locale files.
5. Do not add hex or new palette names under `components/ui`.

## Product vs design system

- **Product** (`components/ui`, `app`): semantic utilities only (`bg-primary`, `text-foreground-body`, …).
- **Design system** (`app/bdn/designsystem/` routes, `app/bdn/designsystem/ui/*` showcases): usage copy in `locales/bdn/{locale}.json`; color table reads `tokens/colors.manifest.ts`.

## Scripts

- `npm run tokens:check` — manifest hex matches `tokens/colors.css`
- `npm run tokens:docs` — regenerate typography table for DS page

## Related

- [design-system-atomic-design-audit.md](./design-system-atomic-design-audit.md)
