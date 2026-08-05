import type { Metadata } from "next";
import { CompaniesAllReviewsScreen } from "@/components/screens";
import { t } from "@/lib/i18n";

export const metadata: Metadata = {
  title: t("app.companiesAllReviews.metaTitle"),
  description: t("app.companiesAllReviews.metaDescription"),
};

export default function CompaniesAllReviewsPage() {
  return <CompaniesAllReviewsScreen />;
}
