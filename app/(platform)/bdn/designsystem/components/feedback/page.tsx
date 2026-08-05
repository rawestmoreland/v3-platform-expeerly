import type { Metadata } from "next";
import { FeedbackShowcase } from "@/app/(platform)/bdn/designsystem/ui/showcase/feedback-showcase";
import { designSystemPageTitle } from "@/app/(platform)/bdn/designsystem/content";
import { t } from "@/lib/i18n";

export const metadata: Metadata = {
  title: designSystemPageTitle(t("designsystem.hub.sections.feedback.title")),
};

export default function FeedbackComponentsPage() {
  return (
    <>
      <h1 className="text-title-2 text-foreground-title">{t("designsystem.hub.sections.feedback.title")}</h1>
      <p className="mt-2 max-w-2xl text-body-regular text-foreground-title-subtle">
        {t("designsystem.hub.sections.feedback.pageIntro")}
      </p>

      <div className="mt-6">
        <FeedbackShowcase />
      </div>
    </>
  );
}
