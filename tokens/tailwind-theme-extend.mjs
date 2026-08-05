import { legacyPrimitiveColors } from "./tailwind-legacy-colors.mjs";

/** Semantic colors — values live in tokens/colors.css; wired here for Tailwind utilities. */
export const semanticColors = {
  primary: {
    DEFAULT: "var(--color-primary)",
    foreground: "var(--color-primary-foreground)",
    hover: "var(--color-primary-hover)",
    active: "var(--color-primary-active)",
  },
  secondary: "var(--color-secondary)",
  tertiary: "var(--color-tertiary)",
  background: "var(--color-background)",
  surface: {
    DEFAULT: "var(--color-surface)",
    hover: "var(--color-surface-hover)",
    active: "var(--color-surface-active)",
    muted: "var(--color-surface-muted)",
  },
  disabled: "var(--color-disabled)",
  tooltip: {
    DEFAULT: "var(--color-tooltip)",
    foreground: "var(--color-tooltip-foreground)",
  },
  foreground: {
    title: "var(--color-foreground-title)",
    "title-subtle": "var(--color-foreground-title-subtle)",
    body: "var(--color-foreground-body)",
    muted: "var(--color-foreground-muted)",
    disabled: "var(--color-foreground-disabled)",
    accent: "var(--color-foreground-accent)",
    "on-dark": "var(--color-foreground-on-dark)",
  },
  border: {
    DEFAULT: "var(--color-border)",
    input: "var(--color-border-input)",
    focus: "var(--color-border-focus)",
    error: "var(--color-border-error)",
  },
  destructive: {
    DEFAULT: "var(--color-destructive)",
    hover: "var(--color-destructive-hover)",
    active: "var(--color-destructive-active)",
    subtle: "var(--color-destructive-subtle)",
    foreground: "var(--color-destructive-foreground)",
  },
  warning: {
    DEFAULT: "var(--color-warning)",
    subtle: "var(--color-warning-subtle)",
    foreground: "var(--color-warning-foreground)",
  },
  success: {
    DEFAULT: "var(--color-success)",
    subtle: "var(--color-success-subtle)",
    foreground: "var(--color-success-foreground)",
  },
  info: {
    DEFAULT: "var(--color-info)",
    subtle: "var(--color-info-subtle)",
    foreground: "var(--color-info-foreground)",
  },
};

export const themeFontSize = {
  display: ["var(--display-size)", { lineHeight: "var(--display-line-height)", fontWeight: "800" }],
  "heading-1": ["var(--heading-1-size)", { lineHeight: "var(--heading-1-line-height)", fontWeight: "800" }],
  "heading-2": ["var(--heading-2-size)", { lineHeight: "var(--heading-2-line-height)", fontWeight: "800" }],
  "heading-3": ["var(--heading-3-size)", { lineHeight: "var(--heading-3-line-height)", fontWeight: "800" }],
  "title-1": ["var(--title-1-size)", { lineHeight: "var(--title-1-line-height)", fontWeight: "800" }],
  "title-2": ["var(--title-2-size)", { lineHeight: "var(--title-2-line-height)", fontWeight: "800" }],
  "title-3": ["var(--title-3-size)", { lineHeight: "var(--title-3-line-height)", fontWeight: "800" }],
  "title-4": ["var(--title-4-size)", { lineHeight: "var(--title-4-line-height)", fontWeight: "800" }],
  "body-large": ["var(--body-large-size)", { lineHeight: "var(--body-large-line-height)", fontWeight: "400" }],
  "body-large-bold": ["var(--body-large-size)", { lineHeight: "var(--body-large-line-height)", fontWeight: "700" }],
  "body-regular": ["var(--body-regular-size)", { lineHeight: "var(--body-regular-line-height)", fontWeight: "400" }],
  "body-regular-bold": [
    "var(--body-regular-size)",
    { lineHeight: "var(--body-regular-line-height)", fontWeight: "700" },
  ],
  "body-small": ["var(--body-small-size)", { lineHeight: "var(--body-small-line-height)", fontWeight: "400" }],
  "body-small-bold": ["var(--body-small-size)", { lineHeight: "var(--body-small-line-height)", fontWeight: "700" }],
  "body-extra-small": [
    "var(--body-extra-small-size)",
    { lineHeight: "var(--body-extra-small-line-height)", fontWeight: "400" },
  ],
  "body-extra-small-bold": [
    "var(--body-extra-small-size)",
    { lineHeight: "var(--body-extra-small-line-height)", fontWeight: "700" },
  ],
};

export const themeExtend = {
  fontFamily: {
    sans: ["var(--font-mulish)", "system-ui", "sans-serif"],
  },
  colors: {
    ...legacyPrimitiveColors,
    ...semanticColors,
  },
  ringColor: {
    focus: "var(--color-border-focus)",
  },
  boxShadow: {
    sm: "var(--shadow-sm)",
    md: "var(--shadow-md)",
    lg: "var(--shadow-lg)",
  },
  fontSize: themeFontSize,
  borderRadius: {
    lg: "var(--radius)",
    md: "calc(var(--radius) - 2px)",
    sm: "calc(var(--radius) - 4px)",
  },
  maxWidth: {
    content: "var(--layout-content-max-width)",
  },
  minHeight: {
    "main-below-header": "var(--layout-main-min-height)",
    menu: "var(--layout-menu-min-height)",
  },
  height: {
    header: "var(--layout-header-height)",
  },
  width: {
    menu: "var(--layout-menu-width)",
  },
  spacing: {
    "menu-dropdown": "var(--layout-menu-dropdown-offset)",
  },
  screens: {
    mobileS: "320px",
    mobileM: "375px",
    mobileL: "425px",
    "mid-tablet": "550px",
    "mid-lg": "1200px",
  },
};
