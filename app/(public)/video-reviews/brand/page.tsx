import type { Metadata } from "next";
import { PageCanvas } from "@/components/layout/PageCanvas";
import { BrandOverviewScreen } from "@/components/screens";
import { applyRequestLocale } from "@/lib/i18n/request";
import { t } from "@/lib/i18n";

export async function generateMetadata(): Promise<Metadata> {
  await applyRequestLocale();
  return {
    title: t("player.hub.title"),
    description: t("player.hub.description"),
  };
}

export default async function BrandOverviewPage() {
  await applyRequestLocale();

  return (
    <PageCanvas>
      <BrandOverviewScreen />
    </PageCanvas>
  );
}
