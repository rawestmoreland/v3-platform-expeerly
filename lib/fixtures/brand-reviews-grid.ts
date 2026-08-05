import type { ReviewFixture } from "@/lib/fixtures/video-reviews";
import { getReviewerPortraitUrl } from "@/lib/fixtures/video-reviews";

export type BrandReviewerAvatar = {
  src?: string;
  alt: string;
  fallback: string;
};

function reviewerInitials(name: string): string {
  const parts = name.trim().split(/\s+/);
  if (parts.length >= 2) {
    return `${parts[0]?.[0] ?? ""}${parts[1]?.[0] ?? ""}`.toUpperCase();
  }

  return name.slice(0, 2).toUpperCase();
}

export function getBrandReviewerAvatars(reviews: ReviewFixture[]): BrandReviewerAvatar[] {
  const byReviewer = new Map<string, BrandReviewerAvatar>();

  for (const review of reviews) {
    if (byReviewer.has(review.reviewerName)) {
      continue;
    }

    const displayName = review.reviewerDisplayName ?? review.reviewerName;
    byReviewer.set(review.reviewerName, {
      src: getReviewerPortraitUrl(review.reviewerName, review.reviewerAvatarUrl),
      alt: displayName,
      fallback: reviewerInitials(displayName),
    });
  }

  return [...byReviewer.values()];
}

export type BrandReviewSortOption =
  | "most-reviewed"
  | "highest-rated"
  | "most-viewed"
  | "newest";

export type BrandReviewFilters = {
  categorySlug: string;
  productSlug: string;
  reviewerName: string;
};

export type BrandReviewFilterOption = {
  value: string;
  label: string;
};

export type BrandReviewFilterOptions = {
  categories: BrandReviewFilterOption[];
  products: BrandReviewFilterOption[];
  reviewers: BrandReviewFilterOption[];
};

export const ALL_FILTER_VALUE = "all";

export const DEFAULT_BRAND_REVIEW_FILTERS: BrandReviewFilters = {
  categorySlug: ALL_FILTER_VALUE,
  productSlug: ALL_FILTER_VALUE,
  reviewerName: ALL_FILTER_VALUE,
};

export function getReviewViewCount(review: ReviewFixture): number {
  const id = Number(review.publicReviewId) || 0;
  return (id % 9000) + 100;
}

export function formatReviewViewCount(count: number): string {
  if (count >= 1_000_000) {
    return `${(count / 1_000_000).toFixed(1).replace(/\.0$/, "")}m`;
  }

  if (count >= 1000) {
    return `${(count / 1000).toFixed(1).replace(/\.0$/, "")}k`;
  }

  return String(count);
}

function getProductReviewCounts(reviews: ReviewFixture[]): Map<string, number> {
  const counts = new Map<string, number>();

  for (const review of reviews) {
    counts.set(review.productSlug, (counts.get(review.productSlug) ?? 0) + 1);
  }

  return counts;
}

export function buildBrandReviewFilterOptions(
  reviews: ReviewFixture[],
  getCategoryLabel: (categorySlug: string) => string,
): BrandReviewFilterOptions {
  const categories = new Map<string, string>();
  const products = new Map<string, string>();
  const reviewers = new Map<string, string>();

  for (const review of reviews) {
    if (!categories.has(review.categorySlug)) {
      categories.set(review.categorySlug, getCategoryLabel(review.categorySlug));
    }

    if (!products.has(review.productSlug)) {
      products.set(review.productSlug, review.productName);
    }

    const reviewerKey = review.reviewerName;
    if (!reviewers.has(reviewerKey)) {
      reviewers.set(reviewerKey, review.reviewerDisplayName ?? review.reviewerName);
    }
  }

  const toSortedOptions = (entries: Map<string, string>): BrandReviewFilterOption[] =>
    [...entries.entries()]
      .sort((left, right) => left[1].localeCompare(right[1]))
      .map(([value, label]) => ({ value, label }));

  return {
    categories: toSortedOptions(categories),
    products: toSortedOptions(products),
    reviewers: toSortedOptions(reviewers),
  };
}

export function filterBrandReviews(
  reviews: ReviewFixture[],
  filters: BrandReviewFilters,
): ReviewFixture[] {
  return reviews.filter((review) => {
    if (
      filters.categorySlug !== ALL_FILTER_VALUE &&
      review.categorySlug !== filters.categorySlug
    ) {
      return false;
    }

    if (filters.productSlug !== ALL_FILTER_VALUE && review.productSlug !== filters.productSlug) {
      return false;
    }

    if (
      filters.reviewerName !== ALL_FILTER_VALUE &&
      review.reviewerName !== filters.reviewerName
    ) {
      return false;
    }

    return true;
  });
}

export function sortBrandReviews(
  reviews: ReviewFixture[],
  sort: BrandReviewSortOption,
  productReviewCounts: Map<string, number>,
): ReviewFixture[] {
  const sorted = [...reviews];

  switch (sort) {
    case "most-reviewed":
      return sorted.sort((left, right) => {
        const countDiff =
          (productReviewCounts.get(right.productSlug) ?? 0) -
          (productReviewCounts.get(left.productSlug) ?? 0);

        if (countDiff !== 0) {
          return countDiff;
        }

        return Number(right.publicReviewId) - Number(left.publicReviewId);
      });
    case "highest-rated":
      return sorted.sort((left, right) => {
        const ratingDiff = right.starRating - left.starRating;
        if (ratingDiff !== 0) {
          return ratingDiff;
        }

        return Number(right.publicReviewId) - Number(left.publicReviewId);
      });
    case "most-viewed":
      return sorted.sort(
        (left, right) => getReviewViewCount(right) - getReviewViewCount(left),
      );
    case "newest":
      return sorted.sort(
        (left, right) => Number(right.publicReviewId) - Number(left.publicReviewId),
      );
  }
}
