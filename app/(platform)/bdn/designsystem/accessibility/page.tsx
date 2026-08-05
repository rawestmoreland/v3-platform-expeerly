import type { Metadata } from "next";
import { designSystemPageTitle } from "@/app/(platform)/bdn/designsystem/content";
import { t } from "@/lib/i18n";

export const metadata: Metadata = {
  title: designSystemPageTitle(t("designsystem.accessibility.title")),
};

const guidelineKeys = ["keyboard", "focus", "contrast", "disabled", "iconOnly", "motion"] as const;

export default function DesignSystemAccessibilityPage() {
  return (
    <>
      <h1 className="text-title-2 text-foreground-title">{t("designsystem.accessibility.title")}</h1>
      <p className="mt-2 max-w-2xl text-body-regular text-foreground-title-subtle">
        {t("designsystem.accessibility.intro")}
      </p>

      <section className="mt-8 rounded-lg border border-border bg-surface p-5">
        <h2 className="text-title-2 text-foreground-title">{t("designsystem.accessibility.guidelinesTitle")}</h2>
        <div className="mt-4 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {guidelineKeys.map((key) => (
            <div key={key} className="rounded-lg border border-border bg-surface p-4 shadow-sm">
              <h3 className="text-body-small-bold text-foreground-title">
                {t(`designsystem.accessibility.items.${key}.title`)}
              </h3>
              <p className="mt-1 text-body-small text-foreground-muted">
                {t(`designsystem.accessibility.items.${key}.description`)}
              </p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
