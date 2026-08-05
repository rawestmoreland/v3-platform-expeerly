"use client";

import { usePathname } from "next/navigation";
import { Icon, type IconName } from "@/components/ui/atoms/Icon";
import { VerticalNavigation } from "@/components/ui";
import { t } from "@/lib/i18n";

const links: {
  href: string;
  sectionKey:
    | "overview"
    | "accordions"
    | "assets"
    | "badgesAndTags"
    | "buttons"
    | "cards"
    | "carousels"
    | "dialogWindows"
    | "emptyStates"
    | "feedback"
    | "filtersAndSorting"
    | "iconography"
    | "inputs"
    | "lists"
    | "loadersAndSkeletons"
    | "molecules"
    | "navigation"
    | "pagination"
    | "progress"
    | "tablesAndRows";
  icon: IconName;
}[] = [
  { href: "/bdn/designsystem/components", sectionKey: "overview", icon: "layout-grid" },
  { href: "/bdn/designsystem/components/accordions", sectionKey: "accordions", icon: "list-collapse" },
  { href: "/bdn/designsystem/components/assets", sectionKey: "assets", icon: "images" },
  { href: "/bdn/designsystem/components/badges-and-tags", sectionKey: "badgesAndTags", icon: "tags" },
  { href: "/bdn/designsystem/components/buttons", sectionKey: "buttons", icon: "mouse-pointer2" },
  { href: "/bdn/designsystem/components/cards", sectionKey: "cards", icon: "credit-card" },
  { href: "/bdn/designsystem/components/carousels", sectionKey: "carousels", icon: "panels-top-left" },
  { href: "/bdn/designsystem/components/dialog-windows", sectionKey: "dialogWindows", icon: "panels-top-left" },
  { href: "/bdn/designsystem/components/empty-states", sectionKey: "emptyStates", icon: "inbox" },
  { href: "/bdn/designsystem/components/feedback", sectionKey: "feedback", icon: "message-square" },
  { href: "/bdn/designsystem/components/filters-and-sorting", sectionKey: "filtersAndSorting", icon: "funnel" },
  { href: "/bdn/designsystem/components/iconography", sectionKey: "iconography", icon: "image" },
  { href: "/bdn/designsystem/components/inputs", sectionKey: "inputs", icon: "text-cursor-input" },
  { href: "/bdn/designsystem/components/lists", sectionKey: "lists", icon: "list" },
  { href: "/bdn/designsystem/components/loaders-and-skeletons", sectionKey: "loadersAndSkeletons", icon: "loader-circle" },
  { href: "/bdn/designsystem/components/molecules", sectionKey: "molecules", icon: "star" },
  { href: "/bdn/designsystem/components/navigation", sectionKey: "navigation", icon: "navigation" },
  { href: "/bdn/designsystem/components/pagination", sectionKey: "pagination", icon: "list-ordered" },
  { href: "/bdn/designsystem/components/progress", sectionKey: "progress", icon: "activity" },
  { href: "/bdn/designsystem/components/tables-and-rows", sectionKey: "tablesAndRows", icon: "table2" },
];

export function DesignSystemComponentsNav() {
  const pathname = usePathname();
  const items = links.map((item) => ({
    href: item.href,
    label: t(`designsystem.componentsNav.sections.${item.sectionKey}`),
    icon: <Icon name={item.icon} size="md" />,
    active: pathname === item.href,
  }));

  return (
    <VerticalNavigation
      items={items}
      aria-label={t("designsystem.componentsNav.ariaLabel")}
      className="w-full"
    />
  );
}
