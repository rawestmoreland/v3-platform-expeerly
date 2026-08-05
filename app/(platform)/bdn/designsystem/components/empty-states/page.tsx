import type { Metadata } from "next";
import { EmptyStatesShowcase } from "@/app/(platform)/bdn/designsystem/ui/showcase/empty-states-showcase";
import { designSystemPageTitle } from "@/app/(platform)/bdn/designsystem/content";
import { t } from "@/lib/i18n";

export const metadata: Metadata = {
  title: designSystemPageTitle(t("designsystem.hub.sections.emptyStates.title")),
};

export default function EmptyStatesComponentsPage() {
  return (
    <>
      <h1 className="text-title-2 text-foreground-title">{t("designsystem.hub.sections.emptyStates.title")}</h1>
      <p className="mt-2 max-w-2xl text-body-regular text-foreground-title-subtle">
        {t("designsystem.hub.sections.emptyStates.pageIntro")}
      </p>

      <div className="mt-6">
        <EmptyStatesShowcase />
      </div>
    </>
  );
}
