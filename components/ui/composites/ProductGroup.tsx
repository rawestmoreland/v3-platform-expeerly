// ProductGroup composite — overlapping stack of product thumbnails, mirroring AvatarGroup.
import Image from "next/image";
import * as React from "react";
import { t } from "@/lib/i18n";
import { cn } from "@/lib/utils";
import { Text } from "../atoms/Text";

export type ProductGroupItem = {
  id: string;
  src?: string;
  alt: string;
  fallback: string;
};

export interface ProductGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  items: ProductGroupItem[];
  max?: number;
  sizeClassName?: string;
}

export function ProductGroup({
  items,
  max = items.length,
  sizeClassName,
  className,
  "aria-label": ariaLabel,
  ...props
}: ProductGroupProps) {
  const visibleItems = items.slice(0, max);
  const overflowCount = Math.max(items.length - visibleItems.length, 0);
  const tileClassName = cn(
    "relative flex shrink-0 items-center justify-center overflow-hidden rounded-lg border-2 border-surface bg-surface-muted",
    "h-10 w-10",
    sizeClassName,
  );

  return (
    <div
      role="list"
      aria-label={ariaLabel ?? t("ui.productGroup.ariaLabel")}
      className={cn("flex items-center -space-x-2", className)}
      {...props}
    >
      {visibleItems.map((item) => (
        <div key={item.id} role="listitem" className={tileClassName}>
          {item.src ? (
            <Image
              src={item.src}
              alt={item.alt}
              fill
              className="object-contain p-1"
              sizes="32px"
              unoptimized
            />
          ) : (
            <Text as="span" variant="body-extra-small" className="text-body-extra-small-bold px-1">
              {item.fallback}
            </Text>
          )}
        </div>
      ))}
      {overflowCount > 0 ? (
        <div role="listitem" className={tileClassName}>
          <Text as="span" variant="body-extra-small" className="text-body-extra-small-bold">
            {t("ui.productGroup.overflowCount", { count: overflowCount })}
          </Text>
        </div>
      ) : null}
    </div>
  );
}
