import { ReviewsOverviewSection } from "@/components/blocks/video-reviews/ReviewsOverviewSections";
import { ReviewerCommunitySubmissionsSection } from "@/components/blocks/reviewer/ReviewerCommunitySubmissionsSection";
import { Heading } from "@/components/ui/atoms/Heading";
import { Text } from "@/components/ui/atoms/Text";
import {
  getReviewerCampaignSubmissions,
  getReviewerSelfSubmittedReviews,
} from "@/lib/fixtures/reviewer-my-reviews";
import { t } from "@/lib/i18n";

export function ReviewerMyReviewsScreen() {
  const selfSubmitted = getReviewerSelfSubmittedReviews();
  const campaignSubmissions = getReviewerCampaignSubmissions();
  const emptyMessage = t("app.reviewerMyReviews.emptySection");

  const campaignMetaByReviewId = new Map(
    campaignSubmissions.map((entry) => [entry.review.publicReviewId, entry.campaignLabelKey]),
  );

  return (
    <div className="flex w-full flex-col gap-10">
      <div className="text-center md:text-left">
        <Heading as="h1" variant="heading-2">
          {t("app.reviewerMyReviews.title")}
        </Heading>
        <Text variant="body-regular" className="mt-3 max-w-2xl">
          {t("app.reviewerMyReviews.description")}
        </Text>
      </div>

      <ReviewerCommunitySubmissionsSection />

      <ReviewsOverviewSection
        icon="play-square"
        title={t("app.reviewerMyReviews.selfSubmitted.title")}
        description={t("app.reviewerMyReviews.selfSubmitted.description")}
        listLabel={t("app.reviewerMyReviews.selfSubmitted.listAriaLabel")}
        reviews={selfSubmitted}
        emptyMessage={emptyMessage}
      />

      <ReviewsOverviewSection
        icon="megaphone"
        title={t("app.reviewerMyReviews.campaign.title")}
        description={t("app.reviewerMyReviews.campaign.description")}
        listLabel={t("app.reviewerMyReviews.campaign.listAriaLabel")}
        reviews={campaignSubmissions.map((entry) => entry.review)}
        emptyMessage={emptyMessage}
        renderItemMeta={(review) => {
          const labelKey = campaignMetaByReviewId.get(review.publicReviewId);
          return labelKey ? t(labelKey) : undefined;
        }}
      />
    </div>
  );
}
