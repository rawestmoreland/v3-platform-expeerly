import {
  ArchiveIcon,
  BarChart3Icon,
  DownloadIcon,
  FileTextIcon,
  FolderOpenIcon,
} from "@/components/ui/icons";
import { t } from "@/lib/i18n";
import {
  Breadcrumbs,
  GhostNeutral,
  TabbedNavigation,
  TabbedNavigationMenuItem,
  VerticalNavigation,
  VerticalNavigationMenuItem,
} from "@/components/ui";

function getTabs() {
  return [
    { href: "/bdn/designsystem/components/navigation#overview", label: t("designsystem.showcase.navigation.tabOverview") },
    { href: "/bdn/designsystem/components/navigation#activity", label: t("designsystem.showcase.navigation.tabActivity"), active: true },
    { href: "/bdn/designsystem/components/navigation#settings", label: t("designsystem.showcase.navigation.tabSettings") },
    { href: "/bdn/designsystem/components/navigation#disabled", label: t("designsystem.showcase.navigation.tabDisabled"), disabled: true },
  ] as const;
}

function getBreadcrumbItems() {
  return [
    { href: "/bdn/designsystem", label: t("designsystem.showcase.navigation.designSystem") },
    { href: "/bdn/designsystem/components", label: t("designsystem.showcase.navigation.components") },
    { label: t("designsystem.showcase.navigation.navigation") },
  ] as const;
}

function getVerticalItems() {
  return [
    {
      href: "/bdn/designsystem/components/navigation#summary",
      label: t("designsystem.showcase.navigation.verticalSummary"),
      icon: <FileTextIcon className="h-4 w-4" />,
    },
    {
      href: "/bdn/designsystem/components/navigation#reports",
      label: t("designsystem.showcase.navigation.verticalReports"),
      icon: <BarChart3Icon className="h-4 w-4" />,
      active: true,
    },
    {
      href: "/bdn/designsystem/components/navigation#exports",
      label: t("designsystem.showcase.navigation.verticalExports"),
      icon: <DownloadIcon className="h-4 w-4" />,
    },
    {
      href: "/bdn/designsystem/components/navigation#archived",
      label: t("designsystem.showcase.navigation.verticalArchived"),
      icon: <ArchiveIcon className="h-4 w-4" />,
      disabled: true,
    },
  ] as const;
}

const menuItemClassName =
  "h-9 w-full justify-start text-body-small font-normal text-foreground-title-subtle hover:bg-surface-hover hover:text-secondary active:bg-surface-active active:text-secondary";
const selectedMenuItemClassName =
  "h-9 w-full justify-start bg-surface-active text-body-small font-bold text-foreground-title hover:bg-surface-active hover:text-foreground-title active:bg-surface-active active:text-foreground-title";

export function NavigationShowcase() {
  const tabs = getTabs();
  const breadcrumbItems = getBreadcrumbItems();
  const verticalItems = getVerticalItems();

  return (
    <div className="grid gap-6">
      <div className="rounded-lg border border-border bg-surface p-5">
        <h2 className="text-title-2 text-foreground-title">{t("designsystem.showcase.navigation.tabbedTitle")}</h2>
        <p className="mt-1 max-w-2xl text-body-small text-foreground-muted">
          {t("designsystem.showcase.navigation.tabbedIntro")}
        </p>
        <div className="mt-4">
          <TabbedNavigation aria-label={t("designsystem.showcase.navigation.exampleSectionsAria")} items={tabs} />
        </div>
      </div>

      <div className="rounded-lg border border-border bg-surface p-5">
        <h2 className="text-title-2 text-foreground-title">{t("designsystem.showcase.navigation.tabbedMenuItemTitle")}</h2>
        <p className="mt-1 max-w-2xl text-body-small text-foreground-muted">
          {t("designsystem.showcase.navigation.tabbedMenuItemIntro")}
        </p>
        <div className="mt-4 flex gap-1 overflow-x-auto">
          <TabbedNavigation aria-label={t("designsystem.showcase.navigation.exampleTabMenuAria")} items={tabs.slice(0, 2)} />
          <TabbedNavigationMenuItem label={t("designsystem.showcase.common.more")}>
            <div className="flex flex-col gap-0.5" role="menu">
              <GhostNeutral type="button" size="small" className={menuItemClassName} role="menuitem">
                {t("designsystem.showcase.navigation.productReviews")}
              </GhostNeutral>
              <GhostNeutral type="button" size="small" className={selectedMenuItemClassName} role="menuitem">
                {t("designsystem.showcase.navigation.reviewRequests")}
              </GhostNeutral>
              <GhostNeutral type="button" size="small" className={menuItemClassName} role="menuitem">
                {t("designsystem.showcase.navigation.archivedReviews")}
              </GhostNeutral>
            </div>
          </TabbedNavigationMenuItem>
        </div>
      </div>

      <div className="rounded-lg border border-border bg-surface p-5">
        <h2 className="text-title-2 text-foreground-title">{t("designsystem.showcase.navigation.breadcrumbsTitle")}</h2>
        <p className="mt-1 max-w-2xl text-body-small text-foreground-muted">
          {t("designsystem.showcase.navigation.breadcrumbsIntro")}
        </p>
        <div className="mt-4">
          <Breadcrumbs items={breadcrumbItems} />
        </div>
      </div>

      <div className="rounded-lg border border-border bg-surface p-5">
        <h2 className="text-title-2 text-foreground-title">{t("designsystem.showcase.navigation.verticalTitle")}</h2>
        <p className="mt-1 max-w-2xl text-body-small text-foreground-muted">
          {t("designsystem.showcase.navigation.verticalIntro")}
        </p>
        <div className="mt-4 max-w-xs">
          <VerticalNavigation aria-label={t("designsystem.showcase.navigation.exampleSidebarSectionsAria")} items={verticalItems} />
        </div>
      </div>

      <div className="rounded-lg border border-border bg-surface p-5">
        <h2 className="text-title-2 text-foreground-title">{t("designsystem.showcase.navigation.verticalMenuItemTitle")}</h2>
        <p className="mt-1 max-w-2xl text-body-small text-foreground-muted">
          {t("designsystem.showcase.navigation.verticalMenuItemIntro")}
        </p>
        <div className="mt-4 max-w-xs">
          <VerticalNavigationMenuItem
            label={t("designsystem.showcase.common.collections")}
            icon={<FolderOpenIcon className="h-4 w-4" />}
          >
            <div className="flex flex-col gap-0.5" role="menu">
              <GhostNeutral type="button" size="small" className={menuItemClassName} role="menuitem">
                {t("designsystem.showcase.navigation.newArrivals")}
              </GhostNeutral>
              <GhostNeutral type="button" size="small" className={selectedMenuItemClassName} role="menuitem">
                {t("designsystem.showcase.navigation.bestSellers")}
              </GhostNeutral>
              <GhostNeutral type="button" size="small" className={menuItemClassName} role="menuitem">
                {t("designsystem.showcase.navigation.reviewsQueue")}
              </GhostNeutral>
            </div>
          </VerticalNavigationMenuItem>
        </div>
      </div>

      <div className="rounded-lg border border-border bg-surface p-5">
        <h2 className="text-title-2 text-foreground-title">{t("designsystem.showcase.navigation.combinedHeaderTitle")}</h2>
        <div className="mt-4 rounded-lg border border-border bg-background p-4">
          <Breadcrumbs items={breadcrumbItems} />
          <div className="mt-4">
            <h3 className="text-title-3 text-foreground-title">{t("designsystem.showcase.navigation.navigationPatternsTitle")}</h3>
            <p className="mt-1 text-body-small text-foreground-muted">
              {t("designsystem.showcase.navigation.navigationPatternsBody")}
            </p>
          </div>
          <TabbedNavigation aria-label={t("designsystem.showcase.navigation.examplePageSectionsAria")} items={tabs} className="mt-5" />
        </div>
      </div>

      <div className="rounded-lg border border-border bg-surface p-5">
        <h2 className="text-title-2 text-foreground-title">{t("designsystem.showcase.navigation.sidebarLayoutTitle")}</h2>
        <div className="mt-4 grid gap-4 rounded-lg border border-border bg-background p-4 md:grid-cols-[220px_1fr]">
          <VerticalNavigation aria-label={t("designsystem.showcase.navigation.exampleSidebarAria")} items={verticalItems} />
          <div className="rounded-lg border border-border bg-surface p-4">
            <Breadcrumbs items={breadcrumbItems} />
            <h3 className="mt-4 text-title-3 text-foreground-title">{t("designsystem.showcase.navigation.reportsTitle")}</h3>
            <p className="mt-1 text-body-small text-foreground-muted">
              {t("designsystem.showcase.navigation.sidebarLayoutBody")}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
