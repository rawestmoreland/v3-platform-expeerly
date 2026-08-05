import type { Metadata } from "next";
import { ReviewerMyReviewsScreen } from "@/components/screens";
import { t } from "@/lib/i18n";

export const metadata: Metadata = {
  title: t("app.reviewerMyReviews.metaTitle"),
  description: t("app.reviewerMyReviews.metaDescription"),
};

export default function ReviewerMyReviewsPage() {
  return <ReviewerMyReviewsScreen />;
}
