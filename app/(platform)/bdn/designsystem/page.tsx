import { BlocksIcon, PaletteIcon, SparklesIcon } from "@/components/ui/icons";
import { t } from "@/lib/i18n";

export default function DesignSystemOverviewPage() {
  return (
    <div className="flex min-h-[calc(100vh-70px-4rem)] flex-col items-center justify-center py-16 text-center">
      <div className="max-w-3xl">
        <h1 className="text-heading-1 text-foreground-title">{t("designsystem.home.title")}</h1>
        <p className="mt-3 text-body-regular text-foreground-title-subtle">{t("designsystem.home.intro")}</p>
      </div>

      <section className="mt-8 max-w-4xl rounded-lg border border-border bg-surface p-5 text-left shadow-sm">
        <h2 className="text-body-regular-bold text-foreground-title">{t("designsystem.home.howToTitle")}</h2>
        <div className="mt-4 grid gap-4 md:grid-cols-3">
          <div>
            <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-surface-hover text-foreground-title">
              <PaletteIcon className="h-5 w-5" aria-hidden />
            </span>
            <h3 className="mt-3 text-body-small-bold text-foreground-title">
              {t("designsystem.home.foundationsTitle")}
            </h3>
            <p className="mt-1 text-body-small text-foreground-muted">{t("designsystem.home.foundationsBody")}</p>
          </div>
          <div>
            <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-surface-hover text-foreground-title">
              <BlocksIcon className="h-5 w-5" aria-hidden />
            </span>
            <h3 className="mt-3 text-body-small-bold text-foreground-title">
              {t("designsystem.home.componentsTitle")}
            </h3>
            <p className="mt-1 text-body-small text-foreground-muted">{t("designsystem.home.componentsBody")}</p>
          </div>
          <div>
            <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-surface-hover text-foreground-title">
              <SparklesIcon className="h-5 w-5" aria-hidden />
            </span>
            <h3 className="mt-3 text-body-small-bold text-foreground-title">{t("designsystem.home.extendTitle")}</h3>
            <p className="mt-1 text-body-small text-foreground-muted">{t("designsystem.home.extendBody")}</p>
          </div>
        </div>
      </section>
    </div>
  );
}
