import { ReviewsOverviewSection } from "@/components/blocks/video-reviews/ReviewsOverviewSections";
import { ReviewerCommunitySubmissionsSection } from "@/components/blocks/reviewer/ReviewerCommunitySubmissionsSection";
import { Heading } from "@/components/ui/atoms/Heading";
import { Text } from "@/components/ui/atoms/Text";
import {
  getReviewerCampaignSubmissions,
  getReviewerSelfSubmittedReviews,
} from "@/lib/fixtures/reviewer-my-reviews";
import { t } from "@/lib/i18n";
import { getCurrentReviewerProfile } from "@/lib/supabase/auth";

/**
 * Self-submitted/campaign review fixtures are demo content only — there's no
 * `processed_videos`-equivalent table in this prototype's Supabase project yet
 * (see contracts/schema-live.dbml for the target shape). Signed-out visits
 * (e.g. the anonymous preview link) show the fixtures as a demo; a real
 * logged-in reviewer sees the honest empty state instead of someone else's
 * reviews.
 */
export async function ReviewerMyReviewsScreen() {
  const reviewerProfile = await getCurrentReviewerProfile();
  const hasRealSession = Boolean(reviewerProfile);

  const selfSubmitted = hasRealSession ? [] : getReviewerSelfSubmittedReviews();
  const campaignSubmissions = hasRealSession ? [] : getReviewerCampaignSubmissions();
  const emptyTitle = t("app.reviewerMyReviews.emptySectionTitle");
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
        emptyTitle={emptyTitle}
        emptyMessage={emptyMessage}
      />

      <ReviewsOverviewSection
        icon="megaphone"
        title={t("app.reviewerMyReviews.campaign.title")}
        description={t("app.reviewerMyReviews.campaign.description")}
        listLabel={t("app.reviewerMyReviews.campaign.listAriaLabel")}
        reviews={campaignSubmissions.map((entry) => entry.review)}
        emptyTitle={emptyTitle}
        emptyMessage={emptyMessage}
        renderItemMeta={(review) => {
          const labelKey = campaignMetaByReviewId.get(review.publicReviewId);
          return labelKey ? t(labelKey) : undefined;
        }}
      />
    </div>
  );
}
