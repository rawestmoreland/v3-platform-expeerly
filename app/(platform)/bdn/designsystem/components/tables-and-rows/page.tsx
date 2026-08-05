import type { Metadata } from "next";
import { TablesShowcase } from "@/app/(platform)/bdn/designsystem/ui/showcase/tables-showcase";
import { designSystemPageTitle } from "@/app/(platform)/bdn/designsystem/content";
import { t } from "@/lib/i18n";

export const metadata: Metadata = {
  title: designSystemPageTitle(t("designsystem.hub.sections.tablesAndRows.title")),
};

export default function TablesAndRowsComponentsPage() {
  return (
    <>
      <h1 className="text-title-2 text-foreground-title">{t("designsystem.hub.sections.tablesAndRows.title")}</h1>
      <p className="mt-2 max-w-2xl text-body-regular text-foreground-title-subtle">
        {t("designsystem.hub.sections.tablesAndRows.pageIntro")}
      </p>

      <div className="mt-6">
        <TablesShowcase />
      </div>
    </>
  );
}
