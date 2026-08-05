import Image from "next/image";
import Link from "next/link";
import { Heading } from "@/components/ui/atoms/Heading";
import { Icon } from "@/components/ui/atoms/Icon";
import { Text } from "@/components/ui/atoms/Text";
import { ghostLinkClassName } from "@/components/ui/atoms/button/buttonClasses";
import { CarouselItem, EdgeCarousel, VideoRatingThumbnailCard } from "@/components/ui";
import { getReviewsForBrand, type BrandFixture, type ReviewFixture } from "@/lib/fixtures/video-reviews";
import { t } from "@/lib/i18n";
import { cn } from "@/lib/utils";

export type BrandReviewsCarouselSectionProps = {
  brand: BrandFixture;
  reviews: ReviewFixture[];
};

export function BrandReviewsCarouselSection({ brand, reviews }: BrandReviewsCarouselSectionProps) {
  const brandHref = `/video-reviews/brand/${brand.slug}`;
  const headingId = `brand-carousel-${brand.slug}`;
  const reviewCount = getReviewsForBrand(brand.slug).length;

  return (
    <section aria-labelledby={headingId}>
      <div className="flex w-full items-center gap-4">
        <div className="flex min-w-0 flex-1 items-center gap-4">
          <Link
            href={brandHref}
            className="flex h-14 w-14 shrink-0 items-center justify-center overflow-hidden rounded-lg border border-border bg-surface-muted p-2 no-underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            aria-label={t("marketing.landing.brandCardAriaLabel", { brand: brand.name })}
          >
            <Image
              src={brand.logoSrc}
              alt=""
              width={48}
              height={48}
              className="max-h-full max-w-full object-contain"
            />
          </Link>

          <div className="min-w-0">
            <Heading as="h2" variant="title-2" id={headingId} className="truncate">
              {brand.name}
            </Heading>
            <div className="min-w-0 flex flex-col gap-0.5">
              <Text as="p" variant="body-extra-small-muted">
                {t("player.hub.brandReviewCount", { count: reviewCount })}
              </Text>
              <Text as="p" variant="body-extra-small-muted" className="flex items-center gap-1">
                <Icon name="star" size="sm" className="fill-warning text-warning" aria-hidden />
                <span>{brand.rating.toFixed(1)}</span>
              </Text>
            </div>
          </div>
        </div>

        <Link
          href={brandHref}
          className={cn(
            ghostLinkClassName("medium"),
            "ml-auto shrink-0 self-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus focus-visible:ring-offset-2 focus-visible:ring-offset-background",
          )}
          aria-label={t("player.hub.seeAllBrandAriaLabel", { brand: brand.name })}
        >
          {t("player.hub.seeAllBrand")}
          <Icon name="chevron-right" size="sm" aria-hidden />
        </Link>
      </div>

      {reviews.length > 0 ? (
        <EdgeCarousel
          id={`${headingId}-track`}
          ariaLabel={t("player.hub.brandCarouselAriaLabel", { brand: brand.name })}
          className="mt-3"
        >
          {reviews.map((review) => (
            <CarouselItem key={review.publicReviewId} size="shrink" role="listitem">
              <VideoRatingThumbnailCard review={review} hideBrandLogo />
            </CarouselItem>
          ))}
        </EdgeCarousel>
      ) : null}
    </section>
  );
}
