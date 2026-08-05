import Image from "next/image";
import Link from "next/link";
import { Icon } from "@/components/ui/atoms/Icon";
import { Text } from "@/components/ui/atoms/Text";
import { buttonSizeClasses } from "@/components/ui/atoms/button/buttonClasses";
import {
  Card,
  CardDescription,
  CardFooter,
  CardTitle,
} from "@/components/ui/composites/Card";
import { StarRating } from "@/components/ui/molecules/video-reviews/StarRating";
import type { BrandFixture } from "@/lib/fixtures/video-reviews";
import { getLocale, t } from "@/lib/i18n";
import { pickLocalized } from "@/lib/i18n/content";
import { cn } from "@/lib/utils";

export type BrandMarketingCardProps = {
  brand: BrandFixture;
  className?: string;
};

export function BrandMarketingCard({ brand, className }: BrandMarketingCardProps) {
  const locale = getLocale();
  const description =
    pickLocalized(brand.bodyText, locale, "text") ??
    pickLocalized(brand.metaDescription, locale, "desc") ??
    "";
  const href = `/video-reviews/brand/${brand.slug}`;
  const hasReviews = brand.reviewsCount > 0;

  return (
    <Link
      href={href}
      className={cn(
        "group flex h-full flex-col rounded-lg no-underline",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus focus-visible:ring-offset-2 focus-visible:ring-offset-secondary",
        className,
      )}
      aria-label={t("marketing.landing.brandCardAriaLabel", { brand: brand.name })}
    >
      <Card
        padding="none"
        className={cn(
          "flex h-full flex-col overflow-hidden transition-[box-shadow,border-color]",
          "group-hover:border-border-focus group-hover:shadow-md",
          "group-active:border-border-focus group-active:shadow-sm",
        )}
      >
        <div className="flex min-h-36 items-center justify-center bg-surface-muted px-6 py-8">
          <Image
            src={brand.logoSrc}
            alt=""
            width={160}
            height={64}
            className="max-h-16 max-w-full object-contain"
          />
        </div>

        <div className="flex flex-1 flex-col px-5 pt-4">
          <CardTitle>{brand.name}</CardTitle>

          <div className="mt-3 min-h-8">
            {hasReviews ? (
              <div className="flex flex-wrap items-center gap-2">
                <StarRating rating={brand.rating} showScore={false} />
                <Text as="span" variant="body-small-muted">
                  {t("player.brand.reviewsCount", { count: brand.reviewsCount })}
                </Text>
              </div>
            ) : (
              <Text variant="body-small-muted">{t("marketing.landing.brandCardNoReviews")}</Text>
            )}
          </div>

          {description ? (
            <CardDescription className="mt-3 line-clamp-3 text-foreground-body">
              {description}
            </CardDescription>
          ) : null}
        </div>

        <CardFooter className="mt-auto border-t border-border px-5 py-4">
          <span
            className={cn(
              buttonSizeClasses.medium,
              "inline-flex w-full items-center justify-center gap-2 rounded-lg border border-primary bg-surface text-primary",
              "transition-colors group-hover:border-primary-hover group-hover:text-primary-hover",
              "group-active:border-primary-active group-active:text-primary-active",
            )}
          >
            {t("player.hub.viewBrand")}
            <Icon name="chevron-right" size="sm" aria-hidden />
          </span>
        </CardFooter>
      </Card>
    </Link>
  );
}
