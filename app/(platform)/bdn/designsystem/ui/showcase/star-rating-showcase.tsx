import { StarRating } from "@/components/ui";
import { t } from "@/lib/i18n";

export function StarRatingShowcase() {
  return (
    <div className="grid gap-6 md:grid-cols-2">
      <section className="rounded-lg border border-border bg-surface p-5">
        <h2 className="text-title-2 text-foreground-title">{t("designsystem.showcase.starRating.defaultTitle")}</h2>
        <p className="mt-1 text-body-small text-foreground-muted">
          {t("designsystem.showcase.starRating.defaultIntro")}
        </p>
        <div className="mt-4">
          <StarRating rating={4.2} />
        </div>
      </section>

      <section className="rounded-lg border border-border bg-surface p-5">
        <h2 className="text-title-2 text-foreground-title">{t("designsystem.showcase.starRating.largeTitle")}</h2>
        <p className="mt-1 text-body-small text-foreground-muted">
          {t("designsystem.showcase.starRating.largeIntro")}
        </p>
        <div className="mt-4">
          <StarRating rating={5} size="large" />
        </div>
      </section>

      <section className="rounded-lg border border-border bg-surface p-5">
        <h2 className="text-title-2 text-foreground-title">{t("designsystem.showcase.starRating.starsOnlyTitle")}</h2>
        <p className="mt-1 text-body-small text-foreground-muted">
          {t("designsystem.showcase.starRating.starsOnlyIntro")}
        </p>
        <div className="mt-4">
          <StarRating rating={3.8} showScore={false} />
        </div>
      </section>

      <section className="rounded-lg border border-border bg-tooltip p-5">
        <h2 className="text-title-2 text-foreground-on-dark">{t("designsystem.showcase.starRating.onDarkTitle")}</h2>
        <p className="mt-1 text-body-small text-foreground-on-dark/80">
          {t("designsystem.showcase.starRating.onDarkIntro")}
        </p>
        <div className="mt-4">
          <StarRating rating={4.6} onDark showScore={false} />
        </div>
      </section>
    </div>
  );
}
