import { CtaLinkPink } from "@/components/ui";
import { t } from "@/lib/i18n";
import { ButtonSizingMatrix, ButtonStatesTable } from "./button-matrix";

export function ButtonsShowcase() {
  return (
    <section className="rounded-lg border border-border bg-surface p-5">
      <p className="text-body-regular text-foreground-muted">
        {t("designsystem.showcase.buttons.introLead")}{" "}
        <code className="text-body-extra-small">{t("designsystem.showcase.buttons.props.iconLeft")}</code>
        {t("designsystem.showcase.buttons.introComma")}{" "}
        <code className="text-body-extra-small">{t("designsystem.showcase.buttons.props.iconRight")}</code>
        {t("designsystem.showcase.buttons.introComma")}{" "}
        <code className="text-body-extra-small">{t("designsystem.showcase.buttons.props.loading")}</code>
        {t("designsystem.showcase.buttons.introComma")} {t("designsystem.showcase.buttons.introOr")}{" "}
        <code className="text-body-extra-small">{t("designsystem.showcase.buttons.props.disabled")}</code>{" "}
        {t("designsystem.showcase.buttons.introSuffix")}
      </p>

      <div className="mt-6">
        <ButtonSizingMatrix />
      </div>

      <div className="mt-8">
        <h3 className="text-body-small-bold text-foreground-title">{t("designsystem.showcase.buttons.ctaLinkTitle")}</h3>
        <div className="mt-3 flex flex-wrap items-center gap-4">
          <CtaLinkPink size="large">{t("designsystem.showcase.buttons.ctaLarge")}</CtaLinkPink>
          <CtaLinkPink size="medium">{t("designsystem.showcase.buttons.ctaMedium")}</CtaLinkPink>
          <CtaLinkPink size="small">{t("designsystem.showcase.buttons.ctaSmall")}</CtaLinkPink>
        </div>
      </div>

      <div className="mt-8">
        <ButtonStatesTable />
      </div>
    </section>
  );
}
