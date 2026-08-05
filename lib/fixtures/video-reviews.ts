import data from "@/lib/fixtures/video-reviews-data.json";
import { getLocalizedCategorySlug } from "@/lib/data/interest-category-slugs";
import type { LocaleId } from "@/lib/i18n";
import { formatUiDate, getLocale, t } from "@/lib/i18n";
import type { LocalizedStringMap } from "@/lib/i18n/content";
import { pickLocalized } from "@/lib/i18n/content";
import { pathnameWithLocale } from "@/lib/i18n/routing";

export type BrandFixture = {
  slug: string;
  name: string;
  logoSrc: string;
  websiteUrl?: string;
  rating: number;
  reviewsCount: number;
  siteTitle: LocalizedStringMap;
  metaDescription: LocalizedStringMap;
  bodyText?: LocalizedStringMap;
  footerText?: LocalizedStringMap;
};

export type ReviewProductFixture = {
  gtinEan?: string;
  vendorProductNumber?: string;
  buyLink?: string;
};

export type ReviewTranscriptMap = Record<
  string,
  { title?: string; text?: string } | undefined
>;

export type ReviewFixture = {
  publicReviewId: string;
  categorySlug: string;
  brandSlug: string;
  productSlug: string;
  productName: string;
  brandName: string;
  playbackId: string;
  videoUrl: string;
  posterUrl: string;
  reviewerAvatarUrl: string;
  starRating: number;
  resolution: string;
  published: boolean;
  publishedAt?: string;
  reviewerName: string;
  reviewerDisplayName?: string;
  videoTitle: LocalizedStringMap;
  pageTitle: LocalizedStringMap;
  metaDescription: LocalizedStringMap;
  summary: LocalizedStringMap;
  transcript: ReviewTranscriptMap;
  faqs: Array<Record<string, { title?: string; text?: string } | undefined>>;
  product?: ReviewProductFixture;
};

export type ReviewOpportunityFixture = {
  id: string;
  brandSlug: string;
  brandName: string;
  productSlug: string;
  productName: string;
  imageSrc: string;
};

export type ReviewerBrandSummary = {
  brandSlug: string;
  brandName: string;
};

export type ReviewerProfileFixture = {
  city: string;
  bio?: LocalizedStringMap;
  portraitUrl?: string;
};

export type ReviewerSummaryFixture = {
  reviewerName: string;
  reviewerDisplayName: string;
  reviewerAvatarUrl: string;
  reviewCount: number;
  city?: string;
  quote?: string;
  brands: ReviewerBrandSummary[];
};

const REVIEWER_BIO_MAX_LENGTH = 140;

function getReviewerBio(reviewerName: string): string | undefined {
  const bio = reviewerProfiles[reviewerName]?.bio;
  if (!bio) {
    return undefined;
  }

  const locale = getLocale();
  const text = pickLocalized(bio, locale, "text");
  if (!text) {
    return undefined;
  }

  const trimmed = text.trim();
  if (trimmed.length <= REVIEWER_BIO_MAX_LENGTH) {
    return trimmed;
  }

  return `${trimmed.slice(0, REVIEWER_BIO_MAX_LENGTH - 3)}...`;
}

const brands = data.brands as BrandFixture[];
const reviews = data.reviews as ReviewFixture[];
const reviewOpportunities = data.reviewOpportunities as ReviewOpportunityFixture[];
const reviewerProfiles = (data.reviewerProfiles ?? {}) as Record<string, ReviewerProfileFixture>;

const LANDING_FEATURED_REVIEWER_COUNT = 6;

function buildReviewerPortraitUrl(playbackId: string): string {
  return `https://image.mux.com/${playbackId}/thumbnail.jpg?width=200&height=200&fit_mode=smartcrop&time=1`;
}

export function getReviewerPortraitUrl(
  reviewerName: string,
  fallbackUrl?: string,
): string | undefined {
  const profile = reviewerProfiles[reviewerName];
  if (profile?.portraitUrl) {
    return profile.portraitUrl;
  }

  const portraitReview = reviews.find(
    (review) =>
      review.reviewerName === reviewerName && !review.productSlug.startsWith("hub-"),
  );
  if (portraitReview) {
    return buildReviewerPortraitUrl(portraitReview.playbackId);
  }

  return fallbackUrl;
}

function reviewerHasPortraitReview(reviewerName: string): boolean {
  return reviews.some(
    (review) =>
      review.reviewerName === reviewerName && !review.productSlug.startsWith("hub-"),
  );
}

const MIN_PRODUCT_REVIEWS = 3;

export function getAllBrands(): BrandFixture[] {
  return brands;
}

export function getBrandsSortedByReviewCount(): BrandFixture[] {
  const countBySlug = new Map<string, number>();
  for (const review of reviews) {
    countBySlug.set(review.brandSlug, (countBySlug.get(review.brandSlug) ?? 0) + 1);
  }

  return [...brands].sort((left, right) => {
    const leftCount = countBySlug.get(left.slug) ?? left.reviewsCount;
    const rightCount = countBySlug.get(right.slug) ?? right.reviewsCount;
    if (rightCount !== leftCount) {
      return rightCount - leftCount;
    }
    return left.name.localeCompare(right.name);
  });
}

export function getAllReviews(): ReviewFixture[] {
  return reviews;
}

export function getReviewOpportunities(limit = 12): ReviewOpportunityFixture[] {
  const reviewCountByProduct = new Map<string, number>();

  for (const review of reviews) {
    const key = `${review.brandSlug}:${review.productSlug}`;
    reviewCountByProduct.set(key, (reviewCountByProduct.get(key) ?? 0) + 1);
  }

  return reviewOpportunities
    .filter((opportunity) => {
      const key = `${opportunity.brandSlug}:${opportunity.productSlug}`;
      const count = reviewCountByProduct.get(key) ?? 0;
      return count < MIN_PRODUCT_REVIEWS;
    })
    .slice(0, limit);
}

export function getReviewOpportunitiesForBrand(brandSlug: string): Array<
  ReviewOpportunityFixture & { reviewCount: number }
> {
  const reviewCountByProduct = new Map<string, number>();

  for (const review of reviews) {
    if (review.brandSlug !== brandSlug) {
      continue;
    }

    const key = review.productSlug;
    reviewCountByProduct.set(key, (reviewCountByProduct.get(key) ?? 0) + 1);
  }

  return reviewOpportunities
    .filter((opportunity) => opportunity.brandSlug === brandSlug)
    .map((opportunity) => ({
      ...opportunity,
      reviewCount: reviewCountByProduct.get(opportunity.productSlug) ?? 0,
    }))
    .filter((opportunity) => opportunity.reviewCount < MIN_PRODUCT_REVIEWS)
    .sort((left, right) => left.productName.localeCompare(right.productName));
}

export function getBrandProductCount(brandSlug: string, brandReviews: ReviewFixture[]): number {
  const productSlugs = new Set(brandReviews.map((review) => review.productSlug));

  for (const opportunity of reviewOpportunities) {
    if (opportunity.brandSlug === brandSlug) {
      productSlugs.add(opportunity.productSlug);
    }
  }

  return productSlugs.size;
}

export type BrandProductGroupItem = {
  id: string;
  src?: string;
  alt: string;
  fallback: string;
};

function productFallbackLabel(productName: string): string {
  const parts = productName.trim().split(/\s+/);
  if (parts.length >= 2) {
    return `${parts[0]?.[0] ?? ""}${parts[1]?.[0] ?? ""}`.toUpperCase();
  }

  return productName.slice(0, 2).toUpperCase();
}

export function getBrandProductGroupItems(
  brandSlug: string,
  brandReviews: ReviewFixture[],
): BrandProductGroupItem[] {
  const products = new Map<string, BrandProductGroupItem>();

  for (const review of brandReviews) {
    if (products.has(review.productSlug)) {
      continue;
    }

    products.set(review.productSlug, {
      id: review.productSlug,
      src: getReviewProductImageSrc(review) ?? review.posterUrl,
      alt: review.productName,
      fallback: productFallbackLabel(review.productName),
    });
  }

  for (const opportunity of reviewOpportunities) {
    if (opportunity.brandSlug !== brandSlug || products.has(opportunity.productSlug)) {
      continue;
    }

    products.set(opportunity.productSlug, {
      id: opportunity.productSlug,
      src: opportunity.imageSrc,
      alt: opportunity.productName,
      fallback: productFallbackLabel(opportunity.productName),
    });
  }

  return [...products.values()].sort((left, right) => {
    const imageDiff = Number(Boolean(right.src)) - Number(Boolean(left.src));
    if (imageDiff !== 0) {
      return imageDiff;
    }

    return left.alt.localeCompare(right.alt);
  });
}

export function getReviewerSummaries(): ReviewerSummaryFixture[] {
  const byReviewer = new Map<string, ReviewerSummaryFixture>();

  for (const review of reviews) {
    const key = review.reviewerName;
    const existing = byReviewer.get(key);

    if (existing) {
      existing.reviewCount += 1;
      if (!existing.brands.some((brand) => brand.brandSlug === review.brandSlug)) {
        existing.brands.push({
          brandSlug: review.brandSlug,
          brandName: review.brandName,
        });
      }
      continue;
    }

    byReviewer.set(key, {
      reviewerName: review.reviewerName,
      reviewerDisplayName: review.reviewerDisplayName ?? review.reviewerName,
      reviewerAvatarUrl:
        getReviewerPortraitUrl(key, review.reviewerAvatarUrl) ?? review.reviewerAvatarUrl,
      reviewCount: 1,
      city: reviewerProfiles[key]?.city,
      quote: getReviewerBio(key),
      brands: [{ brandSlug: review.brandSlug, brandName: review.brandName }],
    });
  }

  return [...byReviewer.values()].sort((left, right) => right.reviewCount - left.reviewCount);
}

export function getLandingFeaturedReviewers(): ReviewerSummaryFixture[] {
  return getReviewerSummaries()
    .filter((reviewer) => reviewerHasPortraitReview(reviewer.reviewerName))
    .slice(0, LANDING_FEATURED_REVIEWER_COUNT);
}

export function getBrandBySlug(brandSlug: string): BrandFixture | undefined {
  return brands.find((brand) => brand.slug === brandSlug);
}

export function getReviewProductImageSrc(review: ReviewFixture): string | undefined {
  const exactMatch = reviewOpportunities.find(
    (opportunity) =>
      opportunity.brandSlug === review.brandSlug && opportunity.productSlug === review.productSlug,
  );
  if (exactMatch) {
    return exactMatch.imageSrc;
  }

  const brandMatch = reviewOpportunities.find(
    (opportunity) => opportunity.brandSlug === review.brandSlug,
  );
  if (brandMatch) {
    return brandMatch.imageSrc;
  }

  return getBrandBySlug(review.brandSlug)?.logoSrc;
}

const MIN_HUB_CAROUSEL_REVIEWS = 6;
export const HUB_FEATURED_CAROUSEL_COUNT = 6;

export function getReviewsForBrand(brandSlug: string): ReviewFixture[] {
  return reviews.filter((review) => review.brandSlug === brandSlug);
}

export function getBrandReviewStats(brandSlug: string): {
  count: number;
  averageRating: number | null;
} {
  const brandReviews = getReviewsForBrand(brandSlug);
  const count = brandReviews.length;

  if (count === 0) {
    return { count, averageRating: null };
  }

  const averageRating =
    brandReviews.reduce((sum, review) => sum + review.starRating, 0) / count;

  return { count, averageRating };
}

export type BrandSortOption = "most-reviewed" | "top-rated" | "newest";

function getBrandLatestReviewId(brandSlug: string): number {
  const brandReviews = getReviewsForBrand(brandSlug);

  if (brandReviews.length === 0) {
    return 0;
  }

  return Math.max(...brandReviews.map((review) => Number(review.publicReviewId) || 0));
}

function compareBrandNames(left: BrandFixture, right: BrandFixture): number {
  return left.name.localeCompare(right.name);
}

export function sortBrands(brands: BrandFixture[], sort: BrandSortOption): BrandFixture[] {
  const sorted = [...brands];

  switch (sort) {
    case "most-reviewed":
      return sorted.sort((left, right) => {
        const countDiff =
          getBrandReviewStats(right.slug).count - getBrandReviewStats(left.slug).count;
        return countDiff !== 0 ? countDiff : compareBrandNames(left, right);
      });
    case "top-rated":
      return sorted.sort((left, right) => {
        const leftRating = getBrandReviewStats(left.slug).averageRating ?? 0;
        const rightRating = getBrandReviewStats(right.slug).averageRating ?? 0;
        const ratingDiff = rightRating - leftRating;
        return ratingDiff !== 0 ? ratingDiff : compareBrandNames(left, right);
      });
    case "newest":
      return sorted.sort((left, right) => {
        const latestDiff = getBrandLatestReviewId(right.slug) - getBrandLatestReviewId(left.slug);
        return latestDiff !== 0 ? latestDiff : compareBrandNames(left, right);
      });
  }
}

export function getHubCarouselReviews(brandSlug: string): ReviewFixture[] {
  return getReviewsForBrand(brandSlug).slice(0, MIN_HUB_CAROUSEL_REVIEWS);
}

export function getHubCarouselBrands(): BrandFixture[] {
  return getBrandsSortedByReviewCount()
    .filter((brand) => getReviewsForBrand(brand.slug).length >= MIN_HUB_CAROUSEL_REVIEWS)
    .slice(0, HUB_FEATURED_CAROUSEL_COUNT);
}

export function getReviewsForCategoryEnglishSlug(categorySlugEn: string): ReviewFixture[] {
  return reviews.filter((review) => review.categorySlug === categorySlugEn);
}

export function getRelatedReviews(review: ReviewFixture): ReviewFixture[] {
  return reviews.filter(
    (candidate) =>
      candidate.publicReviewId !== review.publicReviewId &&
      candidate.brandSlug === review.brandSlug &&
      candidate.productSlug === review.productSlug,
  );
}

export function getReviewerSummaryForName(reviewerName: string): ReviewerSummaryFixture | undefined {
  return getReviewerSummaries().find((reviewer) => reviewer.reviewerName === reviewerName);
}

export function getMoreBrandReviews(review: ReviewFixture, limit = 8): ReviewFixture[] {
  return reviews
    .filter(
      (candidate) =>
        candidate.publicReviewId !== review.publicReviewId &&
        candidate.brandSlug === review.brandSlug,
    )
    .slice(0, limit);
}

export function getMoreReviewerReviews(review: ReviewFixture, limit = 8): ReviewFixture[] {
  return reviews
    .filter(
      (candidate) =>
        candidate.publicReviewId !== review.publicReviewId &&
        candidate.reviewerName === review.reviewerName,
    )
    .slice(0, limit);
}

export function getReviewByPublicId(publicReviewId: string): ReviewFixture | undefined {
  return reviews.find((review) => review.publicReviewId === publicReviewId);
}

export function getBrandProductHref(brandSlug: string, productSlug: string): string {
  return `/video-reviews/brand/${brandSlug}?product=${encodeURIComponent(productSlug)}`;
}

export function getBrandBodyText(brand: BrandFixture): string | undefined {
  const locale = getLocale();
  return pickLocalized(brand.bodyText, locale, "text");
}

export function getReviewerHref(reviewerName: string): string {
  const slug = reviewerName.trim().toLowerCase().replace(/\s+/g, "-");
  return `/video-reviews/reviewers/${slug}`;
}

export function getReviewTranscriptText(review: ReviewFixture): string | undefined {
  const locale = getLocale();
  const localized =
    pickLocalized(review.transcript, locale, "text") ??
    pickLocalized(review.transcript, "en", "text");

  if (localized) {
    return localized;
  }

  return Object.values(review.transcript).reduce<string | undefined>((longest, entry) => {
    const text = entry?.text?.trim();
    if (!text) {
      return longest;
    }

    if (!longest || text.length > longest.length) {
      return text;
    }

    return longest;
  }, undefined);
}

function derivePublishedAtIso(review: ReviewFixture): string | undefined {
  const serial = Number(review.publicReviewId) - 100_000_000;
  if (!Number.isFinite(serial) || serial < 0) {
    return undefined;
  }

  const date = new Date(Date.UTC(2024, 0, 1));
  date.setUTCDate(date.getUTCDate() + serial);
  return date.toISOString().slice(0, 10);
}

export function getReviewPublishedLabel(review: ReviewFixture): string {
  const isoDate = review.publishedAt ?? derivePublishedAtIso(review);
  if (!isoDate) {
    return t("player.review.notAvailable");
  }

  return formatUiDate(new Date(`${isoDate}T12:00:00Z`), {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

/** Player URL using locale-specific category slug (matches www sitemap / interest-categories.csv). */
export function getReviewPlayerPath(
  review: ReviewFixture,
  locale: LocaleId = getLocale(),
): string {
  const categorySlug = getLocalizedCategorySlug(review.categorySlug, locale);
  const path = `/video-reviews/${categorySlug}/${review.brandSlug}/${review.productSlug}/${review.publicReviewId}`;
  return pathnameWithLocale(path, locale);
}

export const SAMPLE_REVIEW_ID = "100000001";

export function getSampleReview(): ReviewFixture {
  const sample = reviews.find((review) => review.publicReviewId === SAMPLE_REVIEW_ID);
  if (!sample) {
    throw new Error("Sample review fixture missing");
  }
  return sample;
}

export function getMuxMp4Url(playbackId: string): string {
  return `https://stream.mux.com/${playbackId}/high.mp4`;
}

export function getMuxPosterUrl(playbackId: string): string {
  return `https://image.mux.com/${playbackId}/thumbnail.png?width=720&height=1280&fit_mode=smartcrop`;
}
