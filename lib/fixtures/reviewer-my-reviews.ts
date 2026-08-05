import {
  getReviewByPublicId,
  type ReviewFixture,
} from "@/lib/fixtures/video-reviews";

/** Prototype: reviews the signed-in reviewer submitted on their own. */
const SELF_SUBMITTED_REVIEW_IDS = ["100000001", "100000002", "100000003"] as const;

export type ReviewerCampaignSubmissionFixture = {
  review: ReviewFixture;
  campaignLabelKey:
    | "app.reviewerMyReviews.campaigns.mieleCordlessLaunch"
    | "app.reviewerMyReviews.campaigns.mieleHomeKitchen";
};

const CAMPAIGN_SUBMISSIONS: Array<{
  reviewId: string;
  campaignLabelKey: ReviewerCampaignSubmissionFixture["campaignLabelKey"];
}> = [
  {
    reviewId: "100000004",
    campaignLabelKey: "app.reviewerMyReviews.campaigns.mieleCordlessLaunch",
  },
  {
    reviewId: "100000005",
    campaignLabelKey: "app.reviewerMyReviews.campaigns.mieleCordlessLaunch",
  },
  {
    reviewId: "100000006",
    campaignLabelKey: "app.reviewerMyReviews.campaigns.mieleHomeKitchen",
  },
];

function resolveReviews(ids: readonly string[]): ReviewFixture[] {
  return ids
    .map((id) => getReviewByPublicId(id))
    .filter((review): review is ReviewFixture => review !== undefined);
}

export function getReviewerSelfSubmittedReviews(): ReviewFixture[] {
  return resolveReviews(SELF_SUBMITTED_REVIEW_IDS);
}

export function getReviewerCampaignSubmissions(): ReviewerCampaignSubmissionFixture[] {
  return CAMPAIGN_SUBMISSIONS.flatMap(({ reviewId, campaignLabelKey }) => {
    const review = getReviewByPublicId(reviewId);
    if (!review) return [];
    return [{ review, campaignLabelKey }];
  });
}
