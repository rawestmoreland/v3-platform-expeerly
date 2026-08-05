import { cn } from "@/lib/utils";

/**
 * Shared button size table. All sized button atoms in the design system use these three sizes.
 *  - large: 42px, body-regular-bold (16)
 *  - medium: 38px, body-small-bold — matches input / select row height
 *  - small: 32px, body-extra-small-bold (12)
 */
export const buttonSizeClasses = {
  large: "h-[42px] px-5 py-2.5 gap-2 text-body-regular-bold",
  medium: "h-[38px] px-4 gap-2 text-body-small-bold",
  small: "h-[32px] px-4 py-2 gap-1 text-body-extra-small-bold",
} as const;

export type ButtonSize = keyof typeof buttonSizeClasses;

/** Shared visuals for PrimaryPink and link-styled primary CTAs (avoid `<a><button>` nesting). */
export function primaryPinkClassName(size: ButtonSize = "large", className?: string) {
  return cn(
    "inline-flex items-center justify-center rounded-lg whitespace-nowrap cursor-pointer",
    buttonSizeClasses[size],
    "bg-primary text-primary-foreground",
    "hover:bg-primary-hover active:bg-primary-active disabled:bg-disabled disabled:cursor-not-allowed disabled:opacity-60 disabled:pointer-events-none",
    className,
  );
}

/** Link-styled outline neutral CTA (matches OutlineNeutral atom). */
export function outlineNeutralLinkClassName(size: ButtonSize = "large", className?: string) {
  return cn(
    "inline-flex items-center justify-center rounded-lg whitespace-nowrap cursor-pointer no-underline",
    buttonSizeClasses[size],
    "border border-border bg-surface text-foreground-title-subtle",
    "hover:border-border-focus hover:text-secondary",
    "active:border-border-focus active:text-secondary",
    className,
  );
}

/** Shared visuals for solid secondary (brand blue) link/button CTAs. */
export function secondaryBlueClassName(size: ButtonSize = "large", className?: string) {
  return cn(
    "inline-flex items-center justify-center rounded-lg whitespace-nowrap cursor-pointer",
    buttonSizeClasses[size],
    "bg-secondary text-foreground-on-dark",
    "hover:brightness-110 active:brightness-95 disabled:bg-disabled disabled:cursor-not-allowed disabled:opacity-60 disabled:pointer-events-none",
    className,
  );
}

/** Link-styled outline secondary CTA (brand blue). */
export function outlineSecondaryLinkClassName(size: ButtonSize = "large", className?: string) {
  return cn(
    "inline-flex items-center justify-center rounded-lg whitespace-nowrap cursor-pointer no-underline",
    buttonSizeClasses[size],
    "border border-secondary bg-transparent text-secondary",
    "hover:brightness-110 active:brightness-95",
    className,
  );
}

/** Link-styled outline white CTA for dark backgrounds (matches OutlineWhite atom). */
export function outlineWhiteLinkClassName(size: ButtonSize = "large", className?: string) {
  return cn(
    "inline-flex items-center justify-center rounded-lg whitespace-nowrap cursor-pointer no-underline",
    buttonSizeClasses[size],
    "border border-foreground-on-dark bg-transparent text-foreground-on-dark",
    "hover:border-foreground-on-dark/80 hover:text-foreground-on-dark/80",
    "active:border-foreground-on-dark/60 active:text-foreground-on-dark/60",
    className,
  );
}

/** Link-styled ghost CTA (matches Ghost atom). */
export function ghostLinkClassName(size: ButtonSize = "medium", className?: string) {
  return cn(
    "inline-flex items-center justify-center rounded-lg whitespace-nowrap cursor-pointer no-underline",
    buttonSizeClasses[size],
    "bg-transparent text-primary",
    "hover:bg-primary/10 hover:text-primary-hover",
    "active:text-primary-active",
    className,
  );
}

/** Link-styled outline primary CTA (matches OutlinePrimary atom). */
export function outlinePrimaryLinkClassName(size: ButtonSize = "large", className?: string) {
  return cn(
    "inline-flex items-center justify-center rounded-lg whitespace-nowrap cursor-pointer",
    buttonSizeClasses[size],
    "border border-primary bg-transparent text-primary",
    "hover:border-primary-hover hover:text-primary-hover",
    "active:border-primary-active active:text-primary-active",
    className,
  );
}
