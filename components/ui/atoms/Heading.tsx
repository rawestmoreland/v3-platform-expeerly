import * as React from "react";
import { cn } from "@/lib/utils";

export type HeadingVariant =
  | "display"
  | "heading-1"
  | "heading-2"
  | "heading-3"
  | "title-1"
  | "title-2"
  | "title-3"
  | "title-4"
  | "title-bold"
  | "body-bold";

const variantClasses: Record<HeadingVariant, string> = {
  display: "text-display text-foreground-title",
  "heading-1": "text-heading-1 text-foreground-title",
  "heading-2": "text-heading-2 text-foreground-title",
  "heading-3": "text-heading-3 text-foreground-title",
  "title-1": "text-title-1 text-foreground-title",
  "title-2": "text-title-2 text-foreground-title",
  "title-3": "text-title-3 text-foreground-title",
  "title-4": "text-title-4 text-foreground-title",
  "title-bold": "text-body-regular-bold text-foreground-title",
  "body-bold": "text-body-small-bold text-foreground-title",
};

export interface HeadingProps extends React.HTMLAttributes<HTMLHeadingElement> {
  as?: "h1" | "h2" | "h3" | "h4";
  variant?: HeadingVariant;
}

export function Heading({
  as: Component = "h3",
  variant = "title-bold",
  className,
  ...props
}: HeadingProps) {
  return <Component className={cn(variantClasses[variant], className)} {...props} />;
}
