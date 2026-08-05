import type { Metadata } from "next";
import { PageCanvas } from "@/components/layout/PageCanvas";
import { LandingScreen } from "@/components/screens";
import { applyRequestLocale } from "@/lib/i18n/request";
import { t } from "@/lib/i18n";

export async function generateMetadata(): Promise<Metadata> {
  await applyRequestLocale();
  return {
    title: t("marketing.landing.siteTitle"),
    description: t("marketing.landing.metaDescription"),
  };
}

export default async function MarketingLandingPage() {
  await applyRequestLocale();
  return (
    <PageCanvas>
      <LandingScreen />
    </PageCanvas>
  );
}
