import { B2BPromoRow } from "@/components/blocks/marketing/B2BPromoRow";
import { BrandLogoLink } from "@/components/blocks/marketing/BrandLogoLink";
import { JustAddedReviewRow } from "@/components/blocks/marketing/JustAddedReviewRow";
import { LandingEdgeCarousel } from "@/components/blocks/marketing/LandingEdgeCarousel";
import { LandingSectionHeader } from "@/components/blocks/marketing/LandingSectionHeader";
import { ReviewerCommunityBanner } from "@/components/blocks/marketing/ReviewerCommunityBanner";
import { ReviewerProfileRow } from "@/components/blocks/marketing/ReviewerProfileRow";
import { Heading } from "@/components/ui/atoms/Heading";
import { VideoRatingThumbnailCard, CarouselItem } from "@/components/ui";
import { SearchField } from "@/components/ui/molecules/search/SearchField";
import {
  getAllReviews,
  getBrandsSortedByReviewCount,
  getLandingFeaturedReviewers,
} from "@/lib/fixtures/video-reviews";
import { t } from "@/lib/i18n";

const RECENT_HOURS = [2, 5, 8, 12, 24] as const;

export function LandingScreen() {
  const brands = getBrandsSortedByReviewCount();
  const allReviews = getAllReviews();
  const trendingReviews = allReviews.slice(0, 8);
  const justAddedReviews = [...allReviews].reverse().slice(0, 5);
  const reviewers = getLandingFeaturedReviewers();

  return (
    <div className="bg-background text-foreground-body">
      <div className="mx-auto w-full max-w-content px-6 pb-12 pt-6 md:px-16 md:pb-12 lg:px-20">
        <section className="flex w-full flex-col items-center gap-5 py-10 text-center md:py-16">
          <Heading as="h1" variant="heading-1" className="w-full max-w-2xl">
            {t("marketing.landing.heroTitle")}
          </Heading>
          <div className="w-full max-w-2xl">
            <SearchField
              label={t("marketing.landing.searchAriaLabel")}
              placeholder={t("marketing.landing.searchPlaceholder")}
            />
          </div>
        </section>

        <section className="mt-8 md:mt-12" aria-labelledby="landing-shop-by-brand">
          <LandingSectionHeader
            title={t("marketing.landing.shopByBrandHeading")}
            actionLabel={t("marketing.landing.seeAllBrands")}
            actionHref="/video-reviews/brand"
            actionAriaLabel={t("marketing.landing.seeAllBrandsAriaLabel")}
          />
          <LandingEdgeCarousel
            id="landing-shop-by-brand"
            ariaLabel={t("marketing.landing.shopByBrandHeading")}
            className="mt-4"
            showRightButton={false}
          >
            {brands.map((brand) => (
              <CarouselItem key={brand.slug} size="shrink" role="listitem">
                <BrandLogoLink
                  href={`/video-reviews/brand/${brand.slug}`}
                  logoSrc={brand.logoSrc}
                  brandName={brand.name}
                  ariaLabel={t("marketing.landing.brandCardAriaLabel", { brand: brand.name })}
                />
              </CarouselItem>
            ))}
          </LandingEdgeCarousel>
        </section>

        {trendingReviews.length > 0 ? (
          <section className="mt-8 md:mt-12" aria-labelledby="landing-trending">
            <LandingSectionHeader title={t("marketing.landing.trendingHeading")} />
            <LandingEdgeCarousel
              id="landing-trending"
              ariaLabel={t("marketing.landing.trendingHeading")}
              className="mt-4"
            >
              {trendingReviews.map((review, index) => (
                <CarouselItem key={review.publicReviewId} size="shrink" role="listitem">
                  <VideoRatingThumbnailCard review={review} showGiftedBadge={index % 3 === 0} />
                </CarouselItem>
              ))}
            </LandingEdgeCarousel>
          </section>
        ) : null}

        {reviewers.length > 0 ? (
          <section className="mt-8 md:mt-12" aria-labelledby="landing-reviewers">
            <LandingSectionHeader title={t("marketing.landing.meetReviewersHeading")} />
            <ul
              id="landing-reviewers"
              className="mt-2 flex flex-col gap-6 md:grid md:grid-cols-3"
              aria-label={t("marketing.landing.meetReviewersHeading")}
            >
              {reviewers.map((reviewer) => (
                <ReviewerProfileRow key={reviewer.reviewerName} reviewer={reviewer} />
              ))}
            </ul>
            <ReviewerCommunityBanner className="mt-6" />
          </section>
        ) : null}

        {justAddedReviews.length > 0 ? (
          <section className="mt-8 md:mt-12" aria-labelledby="landing-just-added">
            <LandingSectionHeader title={t("marketing.landing.justAddedHeading")} />
            <ul
              id="landing-just-added"
              className="mt-4"
              aria-label={t("marketing.landing.justAddedHeading")}
            >
              {justAddedReviews.map((review, index) => (
                <JustAddedReviewRow
                  key={review.publicReviewId}
                  review={review}
                  timeAgoLabel={t("marketing.landing.recentTimeHours", {
                    count: RECENT_HOURS[index % RECENT_HOURS.length],
                  })}
                />
              ))}
            </ul>
          </section>
        ) : null}

        <section className="mt-8 md:mt-12" aria-label={t("marketing.landing.forBrandsTitle")}>
          <B2BPromoRow />
        </section>
      </div>
    </div>
  );
}
