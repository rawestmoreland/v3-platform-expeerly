import { IndeterminateBar, ProgressBar } from "@/components/ui";
import { t } from "@/lib/i18n";

export function ProgressShowcase() {
  return (
    <div className="grid gap-6">
      <section className="rounded-lg border border-border bg-surface p-5">
        <h2 className="text-title-2 text-foreground-title">{t("designsystem.showcase.progress.determinateTitle")}</h2>
        <p className="mt-1 max-w-2xl text-body-small text-foreground-muted">
          {t("designsystem.showcase.progress.determinateIntro")}
        </p>
        <div className="mt-4 grid gap-4">
          <ProgressBar label={t("designsystem.showcase.progress.profileCompletion")} value={72} />
          <ProgressBar label={t("designsystem.showcase.progress.uploadProgress")} value={38} />
        </div>
      </section>

      <section className="rounded-lg border border-border bg-surface p-5">
        <h2 className="text-title-2 text-foreground-title">{t("designsystem.showcase.progress.indeterminateTitle")}</h2>
        <p className="mt-1 max-w-2xl text-body-small text-foreground-muted">
          {t("designsystem.showcase.progress.indeterminateIntro")}
        </p>
        <div className="mt-4">
          <IndeterminateBar />
        </div>
      </section>

      <section className="rounded-lg border border-border bg-surface p-5">
        <h2 className="text-title-2 text-foreground-title">{t("designsystem.showcase.progress.progressCardTitle")}</h2>
        <p className="mt-1 max-w-2xl text-body-small text-foreground-muted">
          {t("designsystem.showcase.progress.progressCardIntro")}
        </p>
        <div className="mt-4 max-w-md rounded-lg border border-border bg-surface p-4 shadow-sm">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h3 className="text-body-regular-bold text-foreground-title">{t("designsystem.showcase.progress.campaignSetupTitle")}</h3>
              <p className="mt-1 text-body-small text-foreground-muted">
                {t("designsystem.showcase.progress.campaignSetupBody")}
              </p>
            </div>
            <span className="rounded-full bg-surface-active px-2 py-1 text-body-extra-small-bold text-foreground-title">
              3/4
            </span>
          </div>
          <ProgressBar value={75} showValue={false} className="mt-4" />
        </div>
      </section>
    </div>
  );
}
