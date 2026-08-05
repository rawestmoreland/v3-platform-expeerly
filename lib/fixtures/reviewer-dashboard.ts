import {
  getReviewByPublicId,
  getReviewerPortraitUrl,
  type ReviewFixture,
} from "@/lib/fixtures/video-reviews";

export type ReviewerDashboardProfileFixture = {
  displayName: string;
  initials: string;
  avatarSrc?: string;
  roleLocationKey: "app.reviewerDashboard.profile.roleLocation";
};

export type ReviewerDashboardStatsFixture = {
  reviewCount: number;
  earnedAmount: number;
  impressions: number;
};

export type ReviewerDashboardReviewStatus = "live" | "in_review";

export type ReviewerDashboardReviewFixture = {
  review: ReviewFixture;
  productNameKey?: "app.reviewerDashboard.reviews.philips.productName" | "app.reviewerDashboard.reviews.braun.productName";
  timeAgoHours: number;
  views: number;
  status: ReviewerDashboardReviewStatus;
};

const DASHBOARD_REVIEW_ENTRIES: Array<{
  reviewId: string;
  productNameKey?: ReviewerDashboardReviewFixture["productNameKey"];
  timeAgoHours: number;
  views: number;
  status: ReviewerDashboardReviewStatus;
}> = [
  {
    reviewId: "100000041",
    timeAgoHours: 2,
    views: 2400,
    status: "live",
  },
  {
    reviewId: "100000002",
    productNameKey: "app.reviewerDashboard.reviews.philips.productName",
    timeAgoHours: 72,
    views: 1100,
    status: "live",
  },
  {
    reviewId: "100000003",
    productNameKey: "app.reviewerDashboard.reviews.braun.productName",
    timeAgoHours: 168,
    views: 0,
    status: "in_review",
  },
];

export function getReviewerDashboardProfile(): ReviewerDashboardProfileFixture {
  return {
    displayName: "Sarah M.",
    initials: "SM",
    avatarSrc: getReviewerPortraitUrl("Sarah"),
    roleLocationKey: "app.reviewerDashboard.profile.roleLocation",
  };
}

export function getReviewerDashboardStats(): ReviewerDashboardStatsFixture {
  return {
    reviewCount: 14,
    earnedAmount: 280,
    impressions: 28000,
  };
}

export function getReviewerDashboardReviews(): ReviewerDashboardReviewFixture[] {
  return DASHBOARD_REVIEW_ENTRIES.flatMap((entry) => {
    const review = getReviewByPublicId(entry.reviewId);
    if (!review) {
      return [];
    }

    return [
      {
        review,
        productNameKey: entry.productNameKey,
        timeAgoHours: entry.timeAgoHours,
        views: entry.views,
        status: entry.status,
      },
    ];
  });
}
