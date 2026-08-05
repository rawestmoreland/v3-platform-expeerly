import { t } from "@/lib/i18n";

export const designSystemSectionSlugs = [
  "accordions",
  "assets",
  "badgesAndTags",
  "buttons",
  "cards",
  "carousels",
  "dialogWindows",
  "emptyStates",
  "feedback",
  "filtersAndSorting",
  "iconography",
  "inputs",
  "lists",
  "loadersAndSkeletons",
  "molecules",
  "navigation",
  "pagination",
  "progress",
  "tablesAndRows",
] as const;

export type DesignSystemSectionSlug = (typeof designSystemSectionSlugs)[number];

const sectionPaths: Record<DesignSystemSectionSlug, string> = {
  accordions: "/bdn/designsystem/components/accordions",
  assets: "/bdn/designsystem/components/assets",
  badgesAndTags: "/bdn/designsystem/components/badges-and-tags",
  buttons: "/bdn/designsystem/components/buttons",
  cards: "/bdn/designsystem/components/cards",
  carousels: "/bdn/designsystem/components/carousels",
  dialogWindows: "/bdn/designsystem/components/dialog-windows",
  emptyStates: "/bdn/designsystem/components/empty-states",
  feedback: "/bdn/designsystem/components/feedback",
  filtersAndSorting: "/bdn/designsystem/components/filters-and-sorting",
  iconography: "/bdn/designsystem/components/iconography",
  inputs: "/bdn/designsystem/components/inputs",
  lists: "/bdn/designsystem/components/lists",
  loadersAndSkeletons: "/bdn/designsystem/components/loaders-and-skeletons",
  molecules: "/bdn/designsystem/components/molecules",
  navigation: "/bdn/designsystem/components/navigation",
  pagination: "/bdn/designsystem/components/pagination",
  progress: "/bdn/designsystem/components/progress",
  tablesAndRows: "/bdn/designsystem/components/tables-and-rows",
};

export function getDesignSystemHubSections() {
  return designSystemSectionSlugs.map((slug) => ({
    href: sectionPaths[slug],
    title: t(`designsystem.hub.sections.${slug}.title`),
    description: t(`designsystem.hub.sections.${slug}.description`),
  }));
}

export function designSystemPageTitle(sectionName: string) {
  return t("designsystem.meta.pageTitle", { section: sectionName });
}
