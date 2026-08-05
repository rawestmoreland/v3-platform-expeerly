import { Pagination } from "@/components/ui";
import { t } from "@/lib/i18n";

export function PaginationShowcase() {
  return (
    <div className="grid gap-6">
      <section className="rounded-lg border border-border bg-surface p-5">
        <h2 className="text-title-2 text-foreground-title">{t("designsystem.showcase.pagination.usageGuidanceTitle")}</h2>
        <div className="mt-4 grid gap-4 md:grid-cols-2">
          <div>
            <h3 className="text-body-small-bold text-foreground-title">{t("designsystem.showcase.pagination.usePaginationForTitle")}</h3>
            <p className="mt-1 text-body-small text-foreground-muted">
              {t("designsystem.showcase.pagination.usePaginationForBody")}
            </p>
          </div>
          <div>
            <h3 className="text-body-small-bold text-foreground-title">{t("designsystem.showcase.pagination.useInfiniteScrollForTitle")}</h3>
            <p className="mt-1 text-body-small text-foreground-muted">
              {t("designsystem.showcase.pagination.useInfiniteScrollForBody")}
            </p>
          </div>
        </div>
      </section>

      <section className="rounded-lg border border-border bg-surface p-5">
        <h2 className="text-title-2 text-foreground-title">{t("designsystem.showcase.pagination.defaultTitle")}</h2>
        <p className="mt-1 max-w-2xl text-body-small text-foreground-muted">
          {t("designsystem.showcase.pagination.defaultIntro")}
        </p>
        <div className="mt-4 overflow-x-auto">
          <Pagination currentPage={3} totalPages={7} />
        </div>
      </section>

      <section className="rounded-lg border border-border bg-surface p-5">
        <h2 className="text-title-2 text-foreground-title">{t("designsystem.showcase.pagination.ellipsisTitle")}</h2>
        <p className="mt-1 max-w-2xl text-body-small text-foreground-muted">
          {t("designsystem.showcase.pagination.ellipsisIntro")}
        </p>
        <div className="mt-4 overflow-x-auto">
          <Pagination currentPage={8} totalPages={20} />
        </div>
      </section>

      <section className="rounded-lg border border-border bg-surface p-5">
        <h2 className="text-title-2 text-foreground-title">{t("designsystem.showcase.pagination.compactTitle")}</h2>
        <p className="mt-1 max-w-2xl text-body-small text-foreground-muted">
          {t("designsystem.showcase.pagination.compactIntro")}
        </p>
        <div className="mt-4">
          <Pagination currentPage={2} totalPages={5} compact />
        </div>
      </section>
    </div>
  );
}
