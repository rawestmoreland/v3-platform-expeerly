import type { Metadata } from "next";
import { ReviewerCommunitySubmitScreen } from "@/components/screens/platform/ReviewerCommunitySubmitScreen";
import { t } from "@/lib/i18n";

export const metadata: Metadata = {
  title: t("app.reviewerCommunitySubmit.metaTitle"),
  description: t("app.reviewerCommunitySubmit.metaDescription"),
};

export default function ReviewerSubmitReviewPage() {
  return <ReviewerCommunitySubmitScreen />;
}
