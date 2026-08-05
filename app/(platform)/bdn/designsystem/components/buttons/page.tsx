import type { Metadata } from "next";
import { ButtonsShowcase } from "@/app/(platform)/bdn/designsystem/ui/showcase/buttons-showcase";
import { designSystemPageTitle } from "@/app/(platform)/bdn/designsystem/content";
import { t } from "@/lib/i18n";

export const metadata: Metadata = {
  title: designSystemPageTitle(t("designsystem.hub.sections.buttons.title")),
};

export default function ButtonsComponentsPage() {
  return (
    <>
      <h1 className="text-title-2 text-foreground-title">{t("designsystem.hub.sections.buttons.title")}</h1>
      <div className="mt-6">
        <ButtonsShowcase />
      </div>
    </>
  );
}
