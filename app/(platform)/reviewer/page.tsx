import type { Metadata } from "next";
import { ReviewerWelcomeScreen } from "@/components/screens";
import { t } from "@/lib/i18n";

export const metadata: Metadata = {
  title: t("app.reviewerWelcome.metaTitle"),
  description: t("app.reviewerWelcome.metaDescription"),
};

export default function ReviewerHomePage() {
  return <ReviewerWelcomeScreen />;
}
