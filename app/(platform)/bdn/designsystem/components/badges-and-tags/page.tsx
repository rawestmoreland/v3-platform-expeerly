import type { Metadata } from "next";
import { BadgesShowcase } from "@/app/(platform)/bdn/designsystem/ui/showcase/badges-showcase";
import { designSystemPageTitle } from "@/app/(platform)/bdn/designsystem/content";
import { t } from "@/lib/i18n";

export const metadata: Metadata = {
  title: designSystemPageTitle(t("designsystem.hub.sections.badgesAndTags.title")),
};

export default function BadgesAndTagsComponentsPage() {
  return (
    <>
      <h1 className="text-title-2 text-foreground-title">{t("designsystem.hub.sections.badgesAndTags.title")}</h1>
      <p className="mt-2 max-w-2xl text-body-regular text-foreground-title-subtle">
        {t("designsystem.hub.sections.badgesAndTags.pageIntro")}
      </p>

      <div className="mt-6">
        <BadgesShowcase />
      </div>
    </>
  );
}
