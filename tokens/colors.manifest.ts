/** Hex values must match tokens/colors.css — run npm run tokens:check */
export type SemanticColorManifestRow = {
  id: string;
  token: string;
  legacyName: string;
  hex: string;
  swatchClass: string;
};

export type SemanticColorManifestSection = {
  category: string;
  rows: SemanticColorManifestRow[];
};

export const SEMANTIC_COLOR_MANIFEST: SemanticColorManifestSection[] = [
  {
    "category": "Brand",
    "rows": [
      {
        "id": "primary",
        "token": "--color-primary",
        "legacyName": "—",
        "hex": "#E10E8C",
        "swatchClass": "bg-primary"
      },
      {
        "id": "primaryHover",
        "token": "--color-primary-hover",
        "legacyName": "pink-500",
        "hex": "#FA0F9C",
        "swatchClass": "bg-primary-hover"
      },
      {
        "id": "primaryActive",
        "token": "--color-primary-active",
        "legacyName": "pink-700",
        "hex": "#C6186B",
        "swatchClass": "bg-primary-active"
      },
      {
        "id": "secondary",
        "token": "--color-secondary",
        "legacyName": "blue-500",
        "hex": "#4B49EB",
        "swatchClass": "bg-secondary"
      },
      {
        "id": "tertiary",
        "token": "--color-tertiary",
        "legacyName": "—",
        "hex": "#2FEDF9",
        "swatchClass": "bg-tertiary"
      }
    ]
  },
  {
    "category": "Surfaces",
    "rows": [
      {
        "id": "background",
        "token": "--color-background",
        "legacyName": "—",
        "hex": "#FAFAFF",
        "swatchClass": "bg-background"
      },
      {
        "id": "surface",
        "token": "--color-surface",
        "legacyName": "—",
        "hex": "#FFFFFF",
        "swatchClass": "bg-surface"
      },
      {
        "id": "surfaceHover",
        "token": "--color-surface-hover",
        "legacyName": "—",
        "hex": "#F3F3FF",
        "swatchClass": "bg-surface-hover"
      },
      {
        "id": "surfaceActive",
        "token": "--color-surface-active",
        "legacyName": "—",
        "hex": "#E8E8FF",
        "swatchClass": "bg-surface-active"
      },
      {
        "id": "surfaceMuted",
        "token": "--color-surface-muted",
        "legacyName": "grey-100",
        "hex": "#F7F7F7",
        "swatchClass": "bg-surface-muted"
      },
      {
        "id": "disabled",
        "token": "--color-disabled",
        "legacyName": "grey-200",
        "hex": "#EBEBEA",
        "swatchClass": "bg-disabled"
      },
      {
        "id": "tooltip",
        "token": "--color-tooltip",
        "legacyName": "navy-500",
        "hex": "#2C1277",
        "swatchClass": "bg-tooltip"
      }
    ]
  },
  {
    "category": "Foreground and text",
    "rows": [
      {
        "id": "foregroundTitle",
        "token": "--color-foreground-title",
        "legacyName": "navy-500",
        "hex": "#2C1277",
        "swatchClass": "bg-foreground-title"
      },
      {
        "id": "foregroundTitleSubtle",
        "token": "--color-foreground-title-subtle",
        "legacyName": "—",
        "hex": "#6B59A0",
        "swatchClass": "bg-foreground-title-subtle"
      },
      {
        "id": "foregroundBody",
        "token": "--color-foreground-body",
        "legacyName": "—",
        "hex": "#080218",
        "swatchClass": "bg-foreground-body"
      },
      {
        "id": "foregroundMuted",
        "token": "--color-foreground-muted",
        "legacyName": "grey-500",
        "hex": "#706F74",
        "swatchClass": "bg-foreground-muted"
      },
      {
        "id": "foregroundDisabled",
        "token": "--color-foreground-disabled",
        "legacyName": "grey-300",
        "hex": "#D1D1D4",
        "swatchClass": "bg-foreground-disabled"
      },
      {
        "id": "foregroundAccent",
        "token": "--color-foreground-accent",
        "legacyName": "blue-500",
        "hex": "#4B49EB",
        "swatchClass": "bg-foreground-accent"
      },
      {
        "id": "foregroundOnDark",
        "token": "--color-foreground-on-dark",
        "legacyName": "—",
        "hex": "#FFFFFF",
        "swatchClass": "bg-foreground-on-dark border border-border-input"
      }
    ]
  },
  {
    "category": "Borders",
    "rows": [
      {
        "id": "border",
        "token": "--color-border",
        "legacyName": "—",
        "hex": "#DFDFFF",
        "swatchClass": "bg-border"
      },
      {
        "id": "borderInput",
        "token": "--color-border-input",
        "legacyName": "grey-300",
        "hex": "#D1D1D4",
        "swatchClass": "bg-border-input"
      },
      {
        "id": "borderFocus",
        "token": "--color-border-focus",
        "legacyName": "blue-500",
        "hex": "#4B49EB",
        "swatchClass": "bg-border-focus"
      },
      {
        "id": "borderError",
        "token": "--color-border-error",
        "legacyName": "—",
        "hex": "#F0294D",
        "swatchClass": "bg-border-error"
      }
    ]
  },
  {
    "category": "Status and intent",
    "rows": [
      {
        "id": "destructive",
        "token": "--color-destructive",
        "legacyName": "—",
        "hex": "#D5223F",
        "swatchClass": "bg-destructive"
      },
      {
        "id": "destructiveHover",
        "token": "--color-destructive-hover",
        "legacyName": "—",
        "hex": "#F0294D",
        "swatchClass": "bg-destructive-hover"
      },
      {
        "id": "destructiveActive",
        "token": "--color-destructive-active",
        "legacyName": "—",
        "hex": "#BA1C36",
        "swatchClass": "bg-destructive-active"
      },
      {
        "id": "destructiveSubtle",
        "token": "--color-destructive-subtle",
        "legacyName": "—",
        "hex": "#FFEEF1",
        "swatchClass": "bg-destructive-subtle"
      },
      {
        "id": "warning",
        "token": "--color-warning",
        "legacyName": "yellow-500",
        "hex": "#FFC122",
        "swatchClass": "bg-warning"
      },
      {
        "id": "warningSubtle",
        "token": "--color-warning-subtle",
        "legacyName": "—",
        "hex": "#FFEAB0",
        "swatchClass": "bg-warning-subtle"
      },
      {
        "id": "warningForeground",
        "token": "--color-warning-foreground",
        "legacyName": "—",
        "hex": "#2E2E2F",
        "swatchClass": "bg-warning-foreground"
      },
      {
        "id": "success",
        "token": "--color-success",
        "legacyName": "—",
        "hex": "#2E8B33",
        "swatchClass": "bg-success"
      },
      {
        "id": "successSubtle",
        "token": "--color-success-subtle",
        "legacyName": "—",
        "hex": "#E6F4E7",
        "swatchClass": "bg-success-subtle"
      },
      {
        "id": "info",
        "token": "--color-info",
        "legacyName": "—",
        "hex": "#127A90",
        "swatchClass": "bg-info"
      },
      {
        "id": "infoSubtle",
        "token": "--color-info-subtle",
        "legacyName": "—",
        "hex": "#D6FCFF",
        "swatchClass": "bg-info-subtle"
      }
    ]
  }
];
