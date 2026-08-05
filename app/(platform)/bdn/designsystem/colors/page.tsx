import type { Metadata } from "next";
import { DesignSystemColorTokensSection } from "@/app/(platform)/bdn/designsystem/ui/DesignSystemColorTokensSection";
import { designSystemPageTitle } from "@/app/(platform)/bdn/designsystem/content";
import { t } from "@/lib/i18n";

export const metadata: Metadata = {
  title: designSystemPageTitle(t("designsystem.pages.color.heading")),
};

export default function DesignSystemColorsPage() {
  return (
    <>
      <h1 className="text-title-2 text-foreground-title">{t("designsystem.pages.color.heading")}</h1>
      <div className="mt-8">
        <DesignSystemColorTokensSection />
      </div>
    </>
  );
}
