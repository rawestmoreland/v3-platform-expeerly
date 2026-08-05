import * as React from "react";
import { cn } from "@/lib/utils";
import { Heading, type HeadingVariant } from "../atoms/Heading";
import { Text } from "../atoms/Text";

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  muted?: boolean;
  padding?: "none" | "small" | "medium";
  surface?: "default" | "background" | "muted" | "secondary";
}

const cardPaddingClasses = {
  none: "p-0",
  small: "p-4",
  medium: "p-5",
} as const;

const cardSurfaceClasses = {
  default: "border border-border bg-surface shadow-sm",
  background: "border border-border bg-background",
  muted: "border border-border bg-surface-muted",
  secondary: "border-0 bg-secondary shadow-sm",
} as const;

export function Card({ muted = false, padding = "medium", surface = "default", className, ...props }: CardProps) {
  const resolvedSurface = muted ? "muted" : surface;

  return (
    <div
      className={cn(
        "rounded-lg",
        cardPaddingClasses[padding],
        cardSurfaceClasses[resolvedSurface],
        className,
      )}
      {...props}
    />
  );
}

type CardTitleProps = React.HTMLAttributes<HTMLHeadingElement> & {
  variant?: HeadingVariant;
  tone?: "default" | "on-dark";
};

export function CardTitle({ variant = "title-bold", tone = "default", className, ...props }: CardTitleProps) {
  return (
    <Heading
      as="h3"
      variant={variant}
      className={cn(tone === "on-dark" && "text-foreground-on-dark", className)}
      {...props}
    />
  );
}

export function CardDescription({ className, ...props }: React.HTMLAttributes<HTMLParagraphElement>) {
  return <Text variant="body-small-muted" className={cn("mt-2", className)} {...props} />;
}

export function CardContent({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("mt-4", className)} {...props} />;
}

export function CardFooter({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("mt-5 flex flex-wrap gap-2", className)} {...props} />;
}
