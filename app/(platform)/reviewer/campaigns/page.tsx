import type { Metadata } from "next";
import { ReviewerCampaignsScreen } from "@/components/screens/platform/ReviewerCampaignsScreen";
import { t } from "@/lib/i18n";

export const metadata: Metadata = {
  title: t("app.reviewerCampaigns.metaTitle"),
  description: t("app.reviewerCampaigns.metaDescription"),
};

export default function ReviewerCampaignsPage() {
  return <ReviewerCampaignsScreen />;
}
