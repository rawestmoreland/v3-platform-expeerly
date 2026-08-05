import { LandingSectionHeader } from "@/components/blocks/marketing/LandingSectionHeader";
import { ReviewerCampaignList } from "@/components/blocks/reviewer/ReviewerCampaignList";
import { ReviewerDashboardProfile } from "@/components/blocks/reviewer/ReviewerDashboardProfile";
import { ReviewerDashboardReviewList } from "@/components/blocks/reviewer/ReviewerDashboardReviewList";
import { ReviewerDashboardStats } from "@/components/blocks/reviewer/ReviewerDashboardStats";
import { ReviewerSubmitReviewCard } from "@/components/blocks/reviewer/ReviewerSubmitReviewCard";
import {
  getReviewerDashboardProfile,
  getReviewerDashboardReviews,
  getReviewerDashboardStats,
} from "@/lib/fixtures/reviewer-dashboard";
import { t } from "@/lib/i18n";

/** Allison’s post-sign-in reviewer home (community CTA + campaigns). */
export function ReviewerWelcomeScreen() {
  const profile = getReviewerDashboardProfile();
  const stats = getReviewerDashboardStats();
  const hasReviews = getReviewerDashboardReviews().length > 0;

  return (
    <div className="mx-auto flex w-full max-w-content flex-col gap-8">
      <ReviewerDashboardProfile profile={profile} />
      <ReviewerDashboardStats stats={stats} />
      <ReviewerSubmitReviewCard />

      <section aria-labelledby="reviewer-campaign-list-heading">
        <LandingSectionHeader
          title={t("app.reviewerWelcome.campaignListTitle")}
          description={t("app.reviewerWelcome.campaignListDescription")}
          headingId="reviewer-campaign-list-heading"
          className="mb-4"
        />
        <ReviewerCampaignList />
      </section>

      {hasReviews ? (
        <section aria-labelledby="reviewer-dashboard-reviews-heading">
          <LandingSectionHeader
            title={t("app.reviewerDashboard.reviews.title")}
            headingId="reviewer-dashboard-reviews-heading"
            className="mb-4"
          />
          <ReviewerDashboardReviewList />
        </section>
      ) : null}
    </div>
  );
}
