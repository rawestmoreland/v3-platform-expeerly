# LayoutShell & PageCanvas

**Code:** `components/layout/LayoutShell.tsx`, `components/layout/PageCanvas.tsx`

## PageCanvas

Single enforcement point for **page layout behavior**.

- Pages pass **fully declared** layout options as props.
- Validates options; forwards result to `LayoutShell`.
- **No structure, no chrome, no content.** (Pass-through today; route layouts may wrap children.)

## AppContentContainer

**Code:** `components/layout/AppContentContainer.tsx`, `contentContainerClasses.ts`

- Shared horizontal inset: `max-w-content` + `px-6 md:px-16 lg:px-20` — aligns main content with **logo (left)** and **RightMenu (right)** in `AppHeader`.
- Used by `AppHeader`, `AppFooter`, and segment layouts for authenticated-style app areas.

### Chrome-aligned routes (prototype)

`app/(platform)/company/**` and `app/(platform)/reviewer/**` use a segment `layout.tsx`:

```text
PageCanvas → AppContentContainer (vertical padding) → Screen
```

Screens must not repeat outer `px-*` or `max-w-content`; optional inner `max-w-*` for readable column width only.

Marketing/player routes (`/`, `/video-reviews/**`, etc.) keep per-screen width until opted in.

## LayoutShell

Single enforcement point for **global layout structure**.

- Renders chrome + `<main>` only.
- Applies layout parameters from `PageCanvas`; does not infer route or page meaning.
- **No page-specific layout decisions.**

## Wiring

```text
app/layout.tsx → LayoutShell → routes
app pages → PageCanvas → Screen (components/screens/) → ui composites/atoms
```

- Root: `LayoutShell` once in `app/layout.tsx`.
- Product pages: wrap in `PageCanvas`; layout options live there, not scattered in wrappers.
- `app/(platform)/bdn/designsystem/`: own segment layout; **no** `PageCanvas`.
- `app/(platform)/bdn/(admin)/`: `PageCanvas` → `AppContentContainer` (admin stubs).

## Related

[prototyping-approach.md](./prototyping-approach.md)
