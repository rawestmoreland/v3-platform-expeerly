import type { Metadata } from "next";
import { CarouselsShowcase } from "@/app/(platform)/bdn/designsystem/ui/showcase/carousels-showcase";
import { designSystemPageTitle } from "@/app/(platform)/bdn/designsystem/content";
import { t } from "@/lib/i18n";

export const metadata: Metadata = {
  title: designSystemPageTitle(t("designsystem.hub.sections.carousels.title")),
};

export default function CarouselsComponentsPage() {
  return (
    <>
      <h1 className="text-title-2 text-foreground-title">{t("designsystem.hub.sections.carousels.title")}</h1>
      <p className="mt-2 max-w-2xl text-body-regular text-foreground-title-subtle">
        {t("designsystem.hub.sections.carousels.pageIntro")}
      </p>

      <div className="mt-6">
        <CarouselsShowcase />
      </div>
    </>
  );
}
