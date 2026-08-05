"use client";

import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { OutlineNeutral } from "@/components/ui/atoms/button/OutlineNeutral";
import { EmptyState } from "@/components/ui/composites/EmptyState";
import { VideoRatingThumbnailCard } from "@/components/ui";
import { ReviewFilterToolbar } from "@/components/ui/composites/video-reviews/ReviewFilterToolbar";
import {
  DEFAULT_BRAND_REVIEW_FILTERS,
  filterBrandReviews,
  sortBrandReviews,
  type BrandReviewFilterOptions,
  type BrandReviewFilters,
  type BrandReviewSortOption,
} from "@/lib/fixtures/brand-reviews-grid";
import type { ReviewFixture } from "@/lib/fixtures/video-reviews";
import { t } from "@/lib/i18n";

const PAGE_SIZE = 8;

export type BrandReviewsGridProps = {
  reviews: ReviewFixture[];
  filterOptions: BrandReviewFilterOptions;
};

export function BrandReviewsGrid({ reviews, filterOptions }: BrandReviewsGridProps) {
  const searchParams = useSearchParams();
  const initialProductSlug = searchParams.get("product") ?? DEFAULT_BRAND_REVIEW_FILTERS.productSlug;
  const [filters, setFilters] = useState<BrandReviewFilters>({
    ...DEFAULT_BRAND_REVIEW_FILTERS,
    productSlug: initialProductSlug,
  });
  const [sort, setSort] = useState<BrandReviewSortOption>("most-viewed");
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);

  const productReviewCounts = useMemo(() => {
    const counts = new Map<string, number>();

    for (const review of reviews) {
      counts.set(review.productSlug, (counts.get(review.productSlug) ?? 0) + 1);
    }

    return counts;
  }, [reviews]);

  const filteredReviews = useMemo(
    () => sortBrandReviews(filterBrandReviews(reviews, filters), sort, productReviewCounts),
    [filters, productReviewCounts, reviews, sort],
  );

  const visibleReviews = filteredReviews.slice(0, visibleCount);
  const hasMore = visibleCount < filteredReviews.length;

  useEffect(() => {
    setVisibleCount(PAGE_SIZE);
  }, [filters, sort, reviews]);

  return (
    <section className="mt-10" aria-labelledby="brand-reviews-heading">
      <ReviewFilterToolbar
        productSlug={filters.productSlug}
        onProductSlugChange={(productSlug) =>
          setFilters((current) => ({ ...current, productSlug }))
        }
        products={filterOptions.products}
        reviewerName={filters.reviewerName}
        onReviewerNameChange={(reviewerName) =>
          setFilters((current) => ({ ...current, reviewerName }))
        }
        reviewers={filterOptions.reviewers}
        sort={sort}
        onSortChange={setSort}
      />

      {filteredReviews.length === 0 ? (
        <EmptyState
          title={t("player.brand.reviewsEmptyTitle")}
          description={t("player.brand.reviewsEmptyDescription")}
          className="mt-6"
        />
      ) : (
        <>
          <ul
            className="mt-5 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5"
            aria-label={t("player.brand.reviewsGridAriaLabel")}
          >
            {visibleReviews.map((review) => (
              <li key={review.publicReviewId} className="min-w-0">
                <VideoRatingThumbnailCard
                  review={review}
                  hideBrandLogo
                  className="w-full"
                  thumbnailClassName="w-full min-w-0"
                />
              </li>
            ))}
          </ul>

          {hasMore ? (
            <OutlineNeutral
              type="button"
              size="medium"
              className="mt-6 w-full"
              onClick={() =>
                setVisibleCount((current) =>
                  Math.min(current + PAGE_SIZE, filteredReviews.length),
                )
              }
            >
              {t("player.brand.loadMoreReviews")}
            </OutlineNeutral>
          ) : null}
        </>
      )}
    </section>
  );
}
