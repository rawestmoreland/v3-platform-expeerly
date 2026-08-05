import Image from "next/image";
import Link from "next/link";
import { Heading } from "@/components/ui/atoms/Heading";
import { Icon } from "@/components/ui/atoms/Icon";
import { Text } from "@/components/ui/atoms/Text";
import { Card } from "@/components/ui/composites/Card";
import { AvatarGroup, type AvatarGroupItem } from "@/components/ui/composites/AvatarGroup";
import { DataCard } from "@/components/ui/composites/DataCard";
import { ProductGroup, type ProductGroupItem } from "@/components/ui/composites/ProductGroup";
import { StarRating } from "@/components/ui";
import type { BrandFixture } from "@/lib/fixtures/video-reviews";
import { t } from "@/lib/i18n";
import { cn } from "@/lib/utils";

export type BrandScreenHeaderProps = {
  brand: BrandFixture;
  bodyText?: string;
  reviewCount: number;
  averageRating: number | null;
  productCount: number;
  reviewerAvatars: AvatarGroupItem[];
  productThumbnails: ProductGroupItem[];
};

export function BrandScreenHeader({
  brand,
  bodyText,
  reviewCount,
  averageRating,
  productCount,
  reviewerAvatars,
  productThumbnails,
}: BrandScreenHeaderProps) {
  return (
    <>
      <Link
        href="/video-reviews/brand"
        className={cn(
          "inline-flex items-center gap-1 text-body-small text-secondary no-underline",
          "hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus focus-visible:ring-offset-2 focus-visible:ring-offset-background",
        )}
      >
        <Icon name="chevron-left" size="sm" aria-hidden />
        {t("player.brand.backToAllBrands")}
      </Link>

      <header className="mt-6 w-full">
        <div className="flex items-center gap-4">
          <Link
            href={brand.websiteUrl ?? "#"}
            target={brand.websiteUrl ? "_blank" : undefined}
            rel={brand.websiteUrl ? "noreferrer" : undefined}
            className="flex h-20 w-20 shrink-0 items-center justify-center overflow-hidden rounded-lg border border-border bg-surface-muted p-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus"
          >
            <Image
              src={brand.logoSrc}
              alt=""
              width={72}
              height={72}
              className="max-h-full max-w-full object-contain"
            />
          </Link>

          <div className="min-w-0 flex-1">
            <Heading as="h1" variant="display">
              {brand.name}
            </Heading>
          </div>
        </div>

        {bodyText ? (
          <Text variant="body-regular" className="mt-5 max-w-2xl">
            {bodyText}
          </Text>
        ) : null}

        <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-3">
          <DataCard value={String(reviewCount)} label={t("player.brand.statReviewsLabel")}>
            {reviewerAvatars.length > 0 ? (
              <AvatarGroup
                items={reviewerAvatars}
                max={4}
                sizeClassName="h-8 w-8"
                reviewerRing
                aria-label={t("player.brand.statReviewersAriaLabel")}
              />
            ) : null}
          </DataCard>

          {averageRating !== null ? (
            <DataCard value={averageRating.toFixed(1)} label={t("player.brand.statAvgRatingLabel")}>
              <StarRating rating={averageRating} showScore={false} />
            </DataCard>
          ) : (
            <Card padding="small" className="text-center sm:text-left">
              <Text as="p" variant="body-regular" className="text-body-regular-bold text-foreground-title">
                {t("player.brand.statAverageRatingEmpty")}
              </Text>
            </Card>
          )}

          <DataCard value={String(productCount)} label={t("player.brand.statProductsLabel")}>
            {productThumbnails.length > 0 ? (
              <ProductGroup
                items={productThumbnails}
                max={4}
                sizeClassName="h-8 w-8"
                aria-label={t("player.brand.statProductsAriaLabel")}
              />
            ) : null}
          </DataCard>
        </div>
      </header>
    </>
  );
}
