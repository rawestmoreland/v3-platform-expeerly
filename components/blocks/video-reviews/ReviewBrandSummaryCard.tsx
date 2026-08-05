import Image from "next/image";
import Link from "next/link";
import { Heading } from "@/components/ui/atoms/Heading";
import { Icon } from "@/components/ui/atoms/Icon";
import { Text } from "@/components/ui/atoms/Text";
import { Card } from "@/components/ui/composites/Card";
import { getBrandBodyText, getBrandReviewStats, type BrandFixture } from "@/lib/fixtures/video-reviews";
import { t } from "@/lib/i18n";
import { cn } from "@/lib/utils";

export type ReviewBrandSummaryCardProps = {
  brand: BrandFixture;
  className?: string;
};

export function ReviewBrandSummaryCard({ brand, className }: ReviewBrandSummaryCardProps) {
  const brandHref = `/video-reviews/brand/${brand.slug}`;
  const description = getBrandBodyText(brand);
  const reviewCount = getBrandReviewStats(brand.slug).count;

  return (
    <Card padding="small" surface="muted" className={cn("mt-6", className)}>
      <div className="flex gap-4">
        <Link
          href={brandHref}
          className={cn(
            "flex h-14 w-14 shrink-0 items-center justify-center overflow-hidden rounded-lg border border-border bg-surface p-2 no-underline",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus focus-visible:ring-offset-2 focus-visible:ring-offset-surface",
          )}
          aria-label={t("player.hub.seeAllBrandAriaLabel", { brand: brand.name })}
        >
          <Image
            src={brand.logoSrc}
            alt=""
            width={48}
            height={48}
            className="max-h-full max-w-full object-contain"
          />
        </Link>

        <div className="min-w-0 flex-1">
          <Heading as="h3" variant="title-2">
            {brand.name}
          </Heading>
          {description ? (
            <Text as="p" variant="body-small-muted" className="mt-1 line-clamp-2">
              {description}
            </Text>
          ) : null}
          <Link
            href={brandHref}
            className={cn(
              "mt-3 inline-flex items-center gap-1 rounded-lg border border-border bg-surface px-3 py-2 text-body-extra-small-bold text-foreground-title-subtle no-underline",
              "hover:border-border-focus hover:text-secondary",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus focus-visible:ring-offset-2 focus-visible:ring-offset-surface",
            )}
          >
            {t("player.review.allBrandReviews", { brand: brand.name, count: reviewCount })}
            <Icon name="chevron-right" size="sm" aria-hidden />
          </Link>
        </div>
      </div>
    </Card>
  );
}
