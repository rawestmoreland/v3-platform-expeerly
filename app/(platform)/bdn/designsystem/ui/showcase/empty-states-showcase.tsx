import { InboxIcon, SearchXIcon } from "@/components/ui/icons";
import { EmptyState, OutlinePrimary, PrimaryPink } from "@/components/ui";
import { t } from "@/lib/i18n";

export function EmptyStatesShowcase() {
  return (
    <div className="grid gap-6">
      <section className="rounded-lg border border-border bg-surface p-5">
        <h2 className="text-title-2 text-foreground-title">{t("designsystem.showcase.emptyStates.defaultTitle")}</h2>
        <p className="mt-1 max-w-2xl text-body-small text-foreground-muted">
          {t("designsystem.showcase.emptyStates.defaultIntro")}
        </p>

        <div className="mt-4">
          <EmptyState
            title={t("designsystem.showcase.emptyStates.noReviewsTitle")}
            description={t("designsystem.showcase.emptyStates.noReviewsDescription")}
            icon={<InboxIcon className="h-6 w-6" aria-hidden />}
            action={
            <PrimaryPink type="button" size="small">
              {t("designsystem.showcase.emptyStates.inviteReviewers")}
            </PrimaryPink>
            }
          />
        </div>
      </section>

      <section className="rounded-lg border border-border bg-surface p-5">
        <h2 className="text-title-2 text-foreground-title">{t("designsystem.showcase.emptyStates.searchTitle")}</h2>
        <p className="mt-1 max-w-2xl text-body-small text-foreground-muted">
          {t("designsystem.showcase.emptyStates.searchIntro")}
        </p>

        <div className="mt-4">
          <EmptyState
            variant="dashed"
            title={t("designsystem.showcase.emptyStates.noMatchingProductsTitle")}
            description={t("designsystem.showcase.emptyStates.noMatchingProductsDescription")}
            icon={<SearchXIcon className="h-6 w-6" aria-hidden />}
            action={
            <OutlinePrimary type="button" size="small">
              {t("designsystem.showcase.emptyStates.clearFilters")}
            </OutlinePrimary>
            }
          />
        </div>
      </section>
    </div>
  );
}
