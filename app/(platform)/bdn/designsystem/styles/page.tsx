import type { Metadata } from "next";
import { StylesShowcase } from "@/app/(platform)/bdn/designsystem/ui/showcase/styles-showcase";
import { designSystemPageTitle } from "@/app/(platform)/bdn/designsystem/content";
import { t } from "@/lib/i18n";

export const metadata: Metadata = {
  title: designSystemPageTitle(t("designsystem.pages.styles.heading")),
};

export default function DesignSystemStylesPage() {
  return (
    <>
      <h1 className="text-title-2 text-foreground-title">{t("designsystem.pages.styles.heading")}</h1>
      <p className="mt-2 max-w-2xl text-body-regular text-foreground-title-subtle">
        {t("designsystem.pages.styles.intro")}
      </p>
      <div className="mt-6">
        <StylesShowcase />
      </div>
    </>
  );
}
