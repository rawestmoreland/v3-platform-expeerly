import Link from "next/link";
import { Icon } from "@/components/ui/atoms/Icon";
import { MainVideoCard } from "@/components/ui";
import { ReviewPlayerColumnLayout } from "@/components/blocks/video-reviews/ReviewPlayerColumnLayout";
import { ReviewPlayerDetailPanel } from "@/components/blocks/video-reviews/ReviewPlayerDetailPanel";
import { ReviewRelatedCarouselSection } from "@/components/blocks/video-reviews/ReviewRelatedCarouselSection";
import { ReviewStickyBuyBar } from "@/components/blocks/video-reviews/ReviewStickyBuyBar";
import { getCategoryByEnglishSlug } from "@/lib/data/interest-categories-dev";
import {
  getBrandBySlug,
  getBrandProductHref,
  getMoreBrandReviews,
  getMoreReviewerReviews,
  getReviewPublishedLabel,
  getReviewTranscriptText,
  getReviewerSummaryForName,
  type ReviewFixture,
} from "@/lib/fixtures/video-reviews";
import { getLocale, t } from "@/lib/i18n";
import { pickLocalized } from "@/lib/i18n/content";

export type ReviewScreenProps = {
  review: ReviewFixture;
};

export function ReviewScreen({ review }: ReviewScreenProps) {
  const locale = getLocale();
  const brand = getBrandBySlug(review.brandSlug);
  const reviewerSummary = getReviewerSummaryForName(review.reviewerName);
  const moreBrandReviews = getMoreBrandReviews(review);
  const moreReviewerReviews = getMoreReviewerReviews(review);

  const videoTitle =
    pickLocalized(review.videoTitle, locale, "title") ??
    pickLocalized(review.pageTitle, locale, "title") ??
    review.productName;
  const transcriptText = getReviewTranscriptText(review);
  const reviewerLabel = review.reviewerDisplayName ?? review.reviewerName;

  const category = getCategoryByEnglishSlug(review.categorySlug);
  const categoryLabel = category
    ? pickLocalized(category.displayName, locale, "title")
    : undefined;

  const faqEntries = review.faqs
    .map((faq) => {
      const entry = faq[locale] ?? faq.en;
      if (!entry?.title || !entry?.text) {
        return null;
      }
      return { title: entry.title, text: entry.text };
    })
    .filter((entry): entry is { title: string; text: string } => entry !== null);

  return (
    <div className="flex w-full flex-col">
      <div className="mx-auto w-full max-w-content px-6 pb-16 pt-7 md:px-16 lg:px-20">
        <Link
          href={`/video-reviews/brand/${review.brandSlug}`}
          className="inline-flex items-center gap-1 text-body-small text-secondary no-underline underline-offset-4 hover:underline"
        >
          <Icon name="chevron-left" size="sm" aria-hidden />
          {review.brandName}
        </Link>

        <ReviewPlayerColumnLayout
          video={
            <MainVideoCard
              playbackId={review.playbackId}
              posterUrl={review.posterUrl}
              title={videoTitle}
              reviewerName={review.reviewerName}
              reviewerDisplayName={review.reviewerDisplayName}
              reviewerAvatarUrl={review.reviewerAvatarUrl}
              brandSlug={review.brandSlug}
              brandName={review.brandName}
              productName={review.productName}
              starRating={review.starRating}
            />
          }
          details={
            <ReviewPlayerDetailPanel
              review={review}
              brand={brand}
              productHref={getBrandProductHref(review.brandSlug, review.productSlug)}
              reviewerSummary={reviewerSummary}
              categoryLabel={categoryLabel}
              reviewedLabel={getReviewPublishedLabel(review)}
              transcriptText={transcriptText}
              faqEntries={faqEntries}
            />
          }
        />

        <div className="mt-12 flex flex-col gap-10">
          <ReviewRelatedCarouselSection
            heading={t("player.review.moreBrandReviews", { brand: review.brandName })}
            reviews={moreBrandReviews}
          />
          <ReviewRelatedCarouselSection
            heading={t("player.review.moreReviewerReviews", { reviewer: reviewerLabel })}
            reviews={moreReviewerReviews}
          />
        </div>

        <ReviewStickyBuyBar brandName={review.brandName} productName={review.productName} />
      </div>
    </div>
  );
}
