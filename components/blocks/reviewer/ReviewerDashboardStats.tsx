import { DataCard } from "@/components/ui/composites/DataCard";
import type { ReviewerDashboardStatsFixture } from "@/lib/fixtures/reviewer-dashboard";
import { t } from "@/lib/i18n";

export type ReviewerDashboardStatsProps = {
  stats: ReviewerDashboardStatsFixture;
};

const statLabelClassName = "text-body-extra-small-bold text-foreground-title-subtle";

function formatImpressions(count: number): string {
  if (count >= 1000) {
    const value = count / 1000;
    return Number.isInteger(value) ? `${value}k` : `${value.toFixed(1).replace(/\.0$/, "")}k`;
  }

  return String(count);
}

export function ReviewerDashboardStats({ stats }: ReviewerDashboardStatsProps) {
  return (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
      <DataCard
        value={String(stats.reviewCount)}
        label={t("app.reviewerDashboard.stats.reviewsLabel")}
        labelClassName={statLabelClassName}
      />
      <DataCard
        value={t("app.reviewerDashboard.stats.earnedValue", { amount: stats.earnedAmount })}
        label={t("app.reviewerDashboard.stats.earnedLabel")}
        labelClassName={statLabelClassName}
      />
      <DataCard
        value={formatImpressions(stats.impressions)}
        label={t("app.reviewerDashboard.stats.impressionsLabel")}
        labelClassName={statLabelClassName}
      />
    </div>
  );
}
