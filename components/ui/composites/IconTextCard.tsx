import * as React from "react";
import { cn } from "@/lib/utils";
import { Heading, type HeadingVariant } from "../atoms/Heading";
import { Text } from "../atoms/Text";
import { Card } from "./Card";

export interface IconTextCardProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "title"> {
  media: React.ReactNode;
  title: React.ReactNode;
  titleVariant?: HeadingVariant;
  description?: React.ReactNode;
  footer?: React.ReactNode;
  iconWell?: boolean;
  titleClassName?: string;
}

export function IconTextCard({
  media,
  title,
  titleVariant = "title-bold",
  description,
  footer,
  iconWell = true,
  titleClassName,
  className,
  ...props
}: IconTextCardProps) {
  return (
    <Card padding="small" className={cn("h-full", className)} {...props}>
      <div className="flex h-full flex-col gap-4">
        <div className="flex items-start gap-3">
          <div
            className={cn(
              "shrink-0",
              iconWell &&
                "flex h-10 w-10 items-center justify-center rounded-lg bg-surface-hover text-foreground-title",
            )}
          >
            {media}
          </div>
          <div className="min-w-0">
            <Heading as="h3" variant={titleVariant} className={titleClassName}>
              {title}
            </Heading>
            {description ? (
              typeof description === "string" ? (
                <Text as="p" variant="body-small-muted" className="mt-1">
                  {description}
                </Text>
              ) : (
                <div className="mt-1">{description}</div>
              )
            ) : null}
          </div>
        </div>
        {footer ? <div>{footer}</div> : null}
      </div>
    </Card>
  );
}
