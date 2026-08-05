// Badge atom — small label with a semantic variant.
import * as React from "react";
import { cn } from "@/lib/utils";

export type BadgeVariant = "default" | "subtle" | "success" | "warning" | "destructive" | "info";

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  label: string;
  variant?: BadgeVariant;
  iconLeft?: React.ReactNode;
}

const variantStyles: Record<BadgeVariant, string> = {
  default: "bg-surface-hover text-foreground-title-subtle",
  subtle: "border border-border bg-transparent text-foreground-title-subtle",
  success: "bg-success-subtle text-success",
  warning: "bg-warning-subtle text-warning-foreground",
  destructive: "bg-destructive-subtle text-destructive",
  info: "bg-info-subtle text-info",
};

export function Badge({ label, variant = "default", iconLeft, className, ...props }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex h-[32px] items-center justify-center gap-1 rounded-lg px-4",
        "text-body-extra-small",
        variantStyles[variant],
        className,
      )}
      {...props}
    >
      {iconLeft && (
        <span className="inline-flex shrink-0" aria-hidden="true">
          {iconLeft}
        </span>
      )}
      {label}
    </span>
  );
}
