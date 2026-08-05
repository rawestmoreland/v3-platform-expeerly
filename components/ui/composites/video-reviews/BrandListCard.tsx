import Image from "next/image";
import Link from "next/link";
import { Text } from "@/components/ui/atoms/Text";
import { Card, CardTitle } from "@/components/ui/composites/Card";
import { StarRating } from "@/components/ui/molecules/video-reviews/StarRating";
import {
  getBrandReviewStats,
  type BrandFixture,
} from "@/lib/fixtures/video-reviews";
import { t } from "@/lib/i18n";
import { cn } from "@/lib/utils";

export type BrandListCardProps = {
  brand: BrandFixture;
  className?: string;
};

export function BrandListCard({ brand, className }: BrandListCardProps) {
  const brandHref = `/video-reviews/brand/${brand.slug}`;
  const { count, averageRating } = getBrandReviewStats(brand.slug);

  return (
    <Link
      href={brandHref}
      className={cn(
        "group flex h-full flex-col no-underline",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus focus-visible:ring-offset-2 focus-visible:ring-offset-background",
        className,
      )}
      aria-label={t("marketing.landing.brandCardAriaLabel", { brand: brand.name })}
    >
      <Card
        padding="small"
        className={cn(
          "flex h-full flex-col gap-3 transition-[box-shadow,border-color]",
          "group-hover:border-border-focus group-hover:shadow-sm",
        )}
      >
        <div className="flex h-20 items-center justify-center rounded-lg bg-surface-muted p-3">
          <Image
            src={brand.logoSrc}
            alt=""
            width={120}
            height={48}
            className="max-h-12 max-w-full object-contain"
          />
        </div>

        <div className="min-w-0">
          <CardTitle className="truncate">{brand.name}</CardTitle>

          <div className="mt-2 flex flex-col gap-1">
            <Text as="p" variant="body-extra-small-muted">
              {t("player.hub.brandReviewCount", { count })}
            </Text>
            {averageRating !== null ? (
              <div className="flex flex-wrap items-center gap-2">
                <StarRating rating={averageRating} showScore={false} />
                <Text as="span" variant="body-extra-small-muted">
                  {t("player.hub.brandAverageRating", {
                    rating: averageRating.toFixed(1),
                  })}
                </Text>
              </div>
            ) : null}
          </div>
        </div>
      </Card>
    </Link>
  );
}
