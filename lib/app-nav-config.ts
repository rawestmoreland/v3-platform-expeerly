import type { IconName } from "@/components/ui/icons";
import { stripLocalePrefix } from "@/lib/i18n/routing";
import type { LocaleId } from "@/locales/index";

export type PublicNavLabelKey =
  | "app.nav.public.exploreReviews"
  | "app.nav.public.learnMore"
  | "app.nav.public.submitVideoReview"
  | "app.nav.public.forBrandsAndRetailers"
  | "app.nav.public.forBrands"
  | "app.nav.public.forRetailers"
  | "app.nav.public.brands"
  | "app.nav.public.categories"
  | "app.nav.public.language"
  | "app.nav.public.locale.en"
  | "app.nav.public.locale.de"
  | "app.nav.public.locale.fr"
  | "app.nav.public.locale.it";

export type AppNavLabelKey =
  | PublicNavLabelKey
  | "app.nav.dashboard"
  | "app.nav.manageBrandAssets"
  | "app.nav.distributionAnalytics"
  | "app.nav.adminPortal"
  | "app.nav.accountSettings"
  | "app.nav.designSystem"
  | "app.nav.designSystemOverview"
  | "app.nav.designSystemTypography"
  | "app.nav.designSystemColor"
  | "app.nav.designSystemStyles"
  | "app.nav.designSystemAccessibility"
  | "app.nav.designSystemComponents"
  | "app.nav.logout"
  | "app.nav.companies.seeAllVideoReviews"
  | "app.nav.companies.manageReviewCampaigns"
  | "app.nav.companies.credits"
  | "app.nav.reviewer.home"
  | "app.nav.reviewer.myReviews"
  | "app.nav.reviewer.runningCampaigns";

export type AppNavItemConfig = {
  id: string;
  labelKey: AppNavLabelKey;
  icon: IconName;
  href: string | null;
};

export type RightMenuVariant = "public" | "default" | "company" | "reviewer" | "bdn";

export function isMarketingLandingPath(pathname: string): boolean {
  const { pathnameWithoutLocale } = stripLocalePrefix(pathname);
  return pathnameWithoutLocale === "/";
}

export function isPublicSitePath(pathname: string): boolean {
  const { pathnameWithoutLocale } = stripLocalePrefix(pathname);

  if (pathnameWithoutLocale === "/") return true;
  if (pathnameWithoutLocale.startsWith("/video-reviews")) return true;
  if (pathnameWithoutLocale.startsWith("/sign-in")) return true;
  return false;
}

export function isPublicStickyAuthPath(pathname: string): boolean {
  const { pathnameWithoutLocale } = stripLocalePrefix(pathname);

  if (!isPublicSitePath(pathname)) return false;
  if (pathnameWithoutLocale.startsWith("/sign-in")) return false;
  return true;
}

export function isReviewerPath(pathname: string): boolean {
  const { pathnameWithoutLocale } = stripLocalePrefix(pathname);
  return pathnameWithoutLocale.startsWith("/reviewer");
}

export function resolveRightMenuVariant(pathname: string): RightMenuVariant {
  if (isPublicSitePath(pathname)) return "public";
  if (pathname.startsWith("/company")) return "company";
  if (pathname.startsWith("/reviewer")) return "reviewer";
  if (pathname.startsWith("/bdn")) return "bdn";
  return "default";
}

export type PublicNavLinkConfig = {
  id: string;
  labelKey: PublicNavLabelKey;
  icon: IconName;
  href: string;
  external?: boolean;
};

export const PUBLIC_MENU_EXTERNAL_LINKS = {
  learnMore: "https://www.get.expeerly.com/",
  forBrands: "https://www.get.expeerly.com/for-brands",
  forRetailers: "https://www.get.expeerly.com/for-retailers",
} as const;

export const publicHeaderNavLinks: PublicNavLinkConfig[] = [
  {
    id: "explore-reviews",
    labelKey: "app.nav.public.exploreReviews",
    icon: "layout-grid",
    href: "/video-reviews/brand",
  },
  {
    id: "submit-review",
    labelKey: "app.nav.public.submitVideoReview",
    icon: "play-square",
    href: "/sign-in?sign-up",
  },
  {
    id: "for-brands-and-retailers",
    labelKey: "app.nav.public.forBrandsAndRetailers",
    icon: "external-link",
    href: PUBLIC_MENU_EXTERNAL_LINKS.learnMore,
    external: true,
  },
];

export const publicNavPrimaryLinks: PublicNavLinkConfig[] = [
  {
    id: "learn-more",
    labelKey: "app.nav.public.learnMore",
    icon: "info",
    href: PUBLIC_MENU_EXTERNAL_LINKS.learnMore,
    external: true,
  },
  {
    id: "submit-video-review",
    labelKey: "app.nav.public.submitVideoReview",
    icon: "play-square",
    href: "/sign-in?sign-up",
  },
  {
    id: "for-brands",
    labelKey: "app.nav.public.forBrands",
    icon: "tag",
    href: PUBLIC_MENU_EXTERNAL_LINKS.forBrands,
    external: true,
  },
  {
    id: "for-retailers",
    labelKey: "app.nav.public.forRetailers",
    icon: "shopping-cart",
    href: PUBLIC_MENU_EXTERNAL_LINKS.forRetailers,
    external: true,
  },
];

export const publicNavCatalogGroups = [
  { id: "brands", labelKey: "app.nav.public.brands" as const, icon: "store" as const satisfies IconName },
  {
    id: "categories",
    labelKey: "app.nav.public.categories" as const,
    icon: "layout-grid" as const satisfies IconName,
  },
] as const;

export const publicNavLocaleOptions: { id: LocaleId; labelKey: PublicNavLabelKey }[] = [
  { id: "en", labelKey: "app.nav.public.locale.en" },
  { id: "de", labelKey: "app.nav.public.locale.de" },
  { id: "fr", labelKey: "app.nav.public.locale.fr" },
  { id: "it", labelKey: "app.nav.public.locale.it" },
];

export const appNavPrimaryItems: AppNavItemConfig[] = [
  { id: "dashboard", labelKey: "app.nav.dashboard", icon: "layout-dashboard", href: null },
  {
    id: "manage-brand-assets",
    labelKey: "app.nav.manageBrandAssets",
    icon: "shopping-bag",
    href: null,
  },
  {
    id: "distribution-analytics",
    labelKey: "app.nav.distributionAnalytics",
    icon: "bar-chart3",
    href: null,
  },
  { id: "admin-portal", labelKey: "app.nav.adminPortal", icon: "user", href: null },
  {
    id: "account-settings",
    labelKey: "app.nav.accountSettings",
    icon: "sliders-horizontal",
    href: null,
  },
];

/** Company app menu when pathname is under `/company`. */
export const companyNavItems: AppNavItemConfig[] = [
  {
    id: "see-all-video-reviews",
    labelKey: "app.nav.companies.seeAllVideoReviews",
    icon: "play-square",
    href: "/company/all-reviews",
  },
  {
    id: "manage-review-campaigns",
    labelKey: "app.nav.companies.manageReviewCampaigns",
    icon: "megaphone",
    href: "/company/campaigns",
  },
  {
    id: "manage-brand-assets",
    labelKey: "app.nav.manageBrandAssets",
    icon: "tag",
    href: "/company/brand-assets",
  },
  {
    id: "distribution-analytics",
    labelKey: "app.nav.distributionAnalytics",
    icon: "bar-chart3",
    href: "/company/analytics",
  },
  {
    id: "account-settings",
    labelKey: "app.nav.accountSettings",
    icon: "sliders-horizontal",
    href: "/company/account-settings",
  },
  {
    id: "credits",
    labelKey: "app.nav.companies.credits",
    icon: "banknote",
    href: "/company/credits",
  },
];

export const reviewerNavItems: AppNavItemConfig[] = [
  {
    id: "home",
    labelKey: "app.nav.reviewer.home",
    icon: "layout-dashboard",
    href: "/reviewer",
  },
  {
    id: "my-reviews",
    labelKey: "app.nav.reviewer.myReviews",
    icon: "play-square",
    href: "/reviewer/myreviews",
  },
  {
    id: "running-campaigns",
    labelKey: "app.nav.reviewer.runningCampaigns",
    icon: "megaphone",
    href: "/reviewer/campaigns",
  },
  {
    id: "account-settings",
    labelKey: "app.nav.accountSettings",
    icon: "sliders-horizontal",
    href: "/reviewer/account-settings",
  },
];

/** Admin / internal app menu when pathname is under `/bdn` (excludes design system docs). */
export const bdnNavItems: AppNavItemConfig[] = [
  { id: "dashboard", labelKey: "app.nav.dashboard", icon: "layout-dashboard", href: "/bdn/dashboard" },
  {
    id: "manage-brand-assets",
    labelKey: "app.nav.manageBrandAssets",
    icon: "shopping-bag",
    href: "/bdn/brand-assets",
  },
  {
    id: "distribution-analytics",
    labelKey: "app.nav.distributionAnalytics",
    icon: "bar-chart3",
    href: "/bdn/analytics",
  },
  { id: "admin-portal", labelKey: "app.nav.adminPortal", icon: "user", href: "/bdn/admin-portal" },
  {
    id: "account-settings",
    labelKey: "app.nav.accountSettings",
    icon: "sliders-horizontal",
    href: "/bdn/account-settings",
  },
];

export type AppNavLinkConfig = {
  id: string;
  labelKey: AppNavItemConfig["labelKey"];
  href: string;
};

export const appNavDesignSystemChildren: AppNavLinkConfig[] = [
  { id: "ds-overview", labelKey: "app.nav.designSystemOverview", href: "/bdn/designsystem" },
  { id: "ds-typography", labelKey: "app.nav.designSystemTypography", href: "/bdn/designsystem/typography" },
  { id: "ds-color", labelKey: "app.nav.designSystemColor", href: "/bdn/designsystem/colors" },
  { id: "ds-styles", labelKey: "app.nav.designSystemStyles", href: "/bdn/designsystem/styles" },
  { id: "ds-accessibility", labelKey: "app.nav.designSystemAccessibility", href: "/bdn/designsystem/accessibility" },
  { id: "ds-components", labelKey: "app.nav.designSystemComponents", href: "/bdn/designsystem/components" },
];

export const appNavDesignSystemGroup = {
  id: "design-system",
  labelKey: "app.nav.designSystem" as const,
  icon: "palette" as const satisfies IconName,
  children: appNavDesignSystemChildren,
};

export const appNavLogoutItem: AppNavItemConfig = {
  id: "logout",
  labelKey: "app.nav.logout",
  icon: "log-out",
  href: "/auth/sign-out",
};
