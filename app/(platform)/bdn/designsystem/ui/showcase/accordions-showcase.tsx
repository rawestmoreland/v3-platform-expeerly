"use client";

import { Accordion } from "@/components/ui";
import { t } from "@/lib/i18n";

function getLargeItems() {
  return [
    {
      id: "large-overview",
      title: t("designsystem.showcase.accordions.items.largeOverview.title"),
      content: t("designsystem.showcase.accordions.items.largeOverview.content"),
    },
    {
      id: "large-assets",
      title: t("designsystem.showcase.accordions.items.largeAssets.title"),
      content: t("designsystem.showcase.accordions.items.largeAssets.content"),
    },
    {
      id: "large-reporting",
      title: t("designsystem.showcase.accordions.items.largeReporting.title"),
      content: t("designsystem.showcase.accordions.items.largeReporting.content"),
    },
  ] as const;
}

function getSmallItems() {
  return [
    {
      id: "small-filters",
      title: t("designsystem.showcase.accordions.items.smallFilters.title"),
      content: t("designsystem.showcase.accordions.items.smallFilters.content"),
    },
    {
      id: "small-status",
      title: t("designsystem.showcase.accordions.items.smallStatus.title"),
      content: t("designsystem.showcase.accordions.items.smallStatus.content"),
    },
  ] as const;
}

function getExtraSmallItems() {
  return [
    {
      id: "extra-small-details",
      title: t("designsystem.showcase.accordions.items.extraSmallDetails.title"),
      content: t("designsystem.showcase.accordions.items.extraSmallDetails.content"),
    },
    {
      id: "extra-small-guidance",
      title: t("designsystem.showcase.accordions.items.extraSmallGuidance.title"),
      content: t("designsystem.showcase.accordions.items.extraSmallGuidance.content"),
    },
  ] as const;
}

export function AccordionsShowcase() {
  const largeItems = getLargeItems();
  const smallItems = getSmallItems();
  const extraSmallItems = getExtraSmallItems();

  return (
    <div className="grid gap-6">
      <section className="rounded-lg border border-border bg-surface p-5">
        <h2 className="text-title-2 text-foreground-title">{t("designsystem.showcase.accordions.largeTitle")}</h2>
        <p className="mt-1 max-w-2xl text-body-small text-foreground-muted">
          {t("designsystem.showcase.accordions.largeIntro")}
        </p>
        <div className="mt-4">
          <Accordion items={largeItems} defaultOpenId="large-overview" />
        </div>
      </section>

      <section className="rounded-lg border border-border bg-surface p-5">
        <h2 className="text-title-2 text-foreground-title">{t("designsystem.showcase.accordions.smallTitle")}</h2>
        <p className="mt-1 max-w-2xl text-body-small text-foreground-muted">
          {t("designsystem.showcase.accordions.smallIntro")}
        </p>
        <div className="mt-4 max-w-md">
          <Accordion items={smallItems} size="small" defaultOpenId="small-filters" />
        </div>
      </section>

      <section className="rounded-lg border border-border bg-surface p-5">
        <h2 className="text-title-2 text-foreground-title">{t("designsystem.showcase.accordions.extraSmallTitle")}</h2>
        <p className="mt-1 max-w-2xl text-body-small text-foreground-muted">
          {t("designsystem.showcase.accordions.extraSmallIntro")}
        </p>
        <div className="mt-4 max-w-md">
          <Accordion items={extraSmallItems} size="extra-small" defaultOpenId="extra-small-details" />
        </div>
      </section>
    </div>
  );
}
