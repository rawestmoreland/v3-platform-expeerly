import { t } from "@/lib/i18n";

export function StylesShowcase() {
  return (
    <div className="grid gap-6 md:grid-cols-2">
      <div className="rounded-lg border border-border bg-surface p-4">
        <h2 className="text-title-2 text-foreground-title">{t("designsystem.showcase.styles.bordersTitle")}</h2>
        <p className="mt-1 text-body-small text-foreground-muted">
          {t("designsystem.showcase.styles.bordersIntro")}
        </p>
        <div className="mt-3 grid gap-3">
          <div className="rounded-lg border border-solid border-border p-3 text-body-small text-foreground-muted">
            {t("designsystem.showcase.styles.solidLabel")}
          </div>
          <div className="rounded-lg border border-dashed border-border p-3 text-body-small text-foreground-muted">
            {t("designsystem.showcase.styles.dashedLabel")}
          </div>
        </div>
      </div>

      <div className="rounded-lg border border-border bg-surface p-4">
        <h2 className="text-title-2 text-foreground-title">{t("designsystem.showcase.styles.elevationTitle")}</h2>
        <p className="mt-1 text-body-small text-foreground-muted">
          {t("designsystem.showcase.styles.elevationIntro")}
        </p>
        <div className="mt-3 grid gap-4">
          <div className="rounded-lg border border-border bg-surface p-4 text-body-small text-foreground-muted shadow-sm">
            <code className="text-body-extra-small">shadow-sm</code>
          </div>
          <div className="rounded-lg border border-border bg-surface p-4 text-body-small text-foreground-muted shadow-md">
            <code className="text-body-extra-small">shadow-md</code>
          </div>
          <div className="rounded-lg border border-border bg-surface p-4 text-body-small text-foreground-muted shadow-lg">
            <code className="text-body-extra-small">shadow-lg</code>
          </div>
        </div>
      </div>
    </div>
  );
}
