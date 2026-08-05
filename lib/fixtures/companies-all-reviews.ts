import {
  getReviewByPublicId,
  type ReviewFixture,
} from "@/lib/fixtures/video-reviews";

/** Prototype: organic community reviews (not tied to a brand campaign). */
const COMMUNITY_REVIEW_IDS = ["100000001", "100000002", "100000003"] as const;

export type CompaniesCampaignReviewFixture = {
  review: ReviewFixture;
  campaignLabelKey:
    | "app.companiesAllReviews.campaigns.mieleCordlessLaunch"
    | "app.companiesAllReviews.campaigns.mieleHomeKitchen";
};

const CAMPAIGN_REVIEWS: Array<{
  reviewId: string;
  campaignLabelKey: CompaniesCampaignReviewFixture["campaignLabelKey"];
}> = [
  {
    reviewId: "100000004",
    campaignLabelKey: "app.companiesAllReviews.campaigns.mieleCordlessLaunch",
  },
  {
    reviewId: "100000005",
    campaignLabelKey: "app.companiesAllReviews.campaigns.mieleCordlessLaunch",
  },
  {
    reviewId: "100000006",
    campaignLabelKey: "app.companiesAllReviews.campaigns.mieleHomeKitchen",
  },
];

function resolveReviews(ids: readonly string[]): ReviewFixture[] {
  return ids
    .map((id) => getReviewByPublicId(id))
    .filter((review): review is ReviewFixture => review !== undefined);
}

export function getCompaniesCommunityReviews(): ReviewFixture[] {
  return resolveReviews(COMMUNITY_REVIEW_IDS);
}

export function getCompaniesCampaignReviews(): CompaniesCampaignReviewFixture[] {
  return CAMPAIGN_REVIEWS.flatMap(({ reviewId, campaignLabelKey }) => {
    const review = getReviewByPublicId(reviewId);
    if (!review) return [];
    return [{ review, campaignLabelKey }];
  });
}
