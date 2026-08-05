import type { Metadata } from "next";
import { CompaniesHomeScreen } from "@/components/screens";
import { t } from "@/lib/i18n";

export const metadata: Metadata = {
  title: t("app.companiesHome.metaTitle"),
  description: t("app.companiesHome.metaDescription"),
};

export default function CompaniesHomePage() {
  return <CompaniesHomeScreen />;
}
