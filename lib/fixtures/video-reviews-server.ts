import "server-only";

import {
  categoryMatchesReviewCategorySlug,
  getCategoryBySlug,
} from "@/lib/data/interest-categories-dev";
import type { LocaleId } from "@/lib/i18n";
import { getLocale } from "@/lib/i18n";
import data from "@/lib/fixtures/video-reviews-data.json";
import type { ReviewFixture } from "@/lib/fixtures/video-reviews";

const reviews = data.reviews as ReviewFixture[];

export function getReviewByPath(
  params: {
    categorySlug: string;
    brandSlug: string;
    productSlug: string;
    reviewId: string;
  },
  locale: LocaleId = getLocale(),
): ReviewFixture | undefined {
  const category = getCategoryBySlug(params.categorySlug, locale);
  if (!category) return undefined;

  const review = reviews.find(
    (candidate) =>
      candidate.publicReviewId === params.reviewId &&
      candidate.brandSlug === params.brandSlug &&
      candidate.productSlug === params.productSlug,
  );

  if (!review || !categoryMatchesReviewCategorySlug(category, review.categorySlug)) {
    return undefined;
  }

  return review;
}
