"use client";

import { usePathname, useRouter } from "next/navigation";
import { Icon } from "@/components/ui/atoms/Icon";
import { RightMenuItem } from "@/components/ui/molecules/RightMenuItem";
import {
  appNavDesignSystemChildren,
  appNavDesignSystemGroup,
  appNavLogoutItem,
  appNavPrimaryItems,
  bdnNavItems,
  companyNavItems,
  publicHeaderNavLinks,
  publicNavLocaleOptions,
  reviewerNavItems,
  resolveRightMenuVariant,
  type AppNavItemConfig,
  type RightMenuVariant,
} from "@/lib/app-nav-config";
import { getLocale, t } from "@/lib/i18n";
import { setPreferredLocaleCookie } from "@/lib/i18n/locale-actions";
import { pathnameWithLocale, stripLocalePrefix } from "@/lib/i18n/routing";
import type { PublicMenuCatalog } from "@/lib/public-menu-types";
import type { LocaleId } from "@/locales/index";
import { cn } from "@/lib/utils";

export interface RightMenuProps {
  className?: string;
  onItemClick?: () => void;
  variant?: RightMenuVariant;
  publicMenuCatalog?: PublicMenuCatalog;
}

function NavItemsList({
  items,
  onNavigate,
  onPlaceholder,
}: {
  items: readonly AppNavItemConfig[];
  onNavigate: (href: string) => void;
  onPlaceholder: () => void;
}) {
  return (
    <>
      {items.map((item) => (
        <RightMenuItem
          key={item.id}
          icon={<Icon name={item.icon} size="lg" />}
          label={t(item.labelKey)}
          onClick={() => {
            if (item.href) {
              onNavigate(item.href);
              return;
            }
            onPlaceholder();
          }}
        />
      ))}
    </>
  );
}

function MenuDivider() {
  return <hr className="my-1 w-full border-0 border-t border-border" aria-hidden />;
}

export function RightMenu({ className, onItemClick, variant, publicMenuCatalog: _publicMenuCatalog }: RightMenuProps) {
  const router = useRouter();
  const pathname = usePathname();
  const locale = getLocale();
  const resolvedVariant = variant ?? resolveRightMenuVariant(pathname);

  const handleNavigate = (href: string) => {
    onItemClick?.();
    router.push(href);
  };

  const handleExternalNavigate = (href: string) => {
    onItemClick?.();
    window.open(href, "_blank", "noopener,noreferrer");
  };

  const handlePlaceholder = () => {
    onItemClick?.();
  };

  const handleLogout = () => {
    onItemClick?.();
    router.push(appNavLogoutItem.href ?? "/");
  };

  const handleLocaleChange = async (nextLocale: LocaleId) => {
    onItemClick?.();
    const { pathnameWithoutLocale } = stripLocalePrefix(pathname);
    await setPreferredLocaleCookie(nextLocale);
    const nextPath = pathnameWithLocale(pathnameWithoutLocale, nextLocale);
    router.push(nextPath);
    router.refresh();
  };

  const currentLocaleLabelKey =
    publicNavLocaleOptions.find((option) => option.id === locale)?.labelKey ??
    "app.nav.public.locale.en";

  return (
    <aside
      id="right-menu"
      aria-label={t("app.nav.ariaLabel")}
      className={cn(
        "flex min-h-menu w-menu flex-col items-start gap-2 rounded-lg bg-surface p-2 shadow-md",
        className,
      )}
    >
      <div className="flex w-full flex-col gap-2">
        {resolvedVariant === "public" ? (
          <>
            {publicHeaderNavLinks.map((item) => (
              <RightMenuItem
                key={item.id}
                icon={<Icon name={item.icon} size="lg" />}
                label={t(item.labelKey)}
                onClick={() => {
                  if (item.external) {
                    handleExternalNavigate(item.href);
                    return;
                  }
                  handleNavigate(item.href);
                }}
              />
            ))}

            <MenuDivider />

            <RightMenuItem
              icon={<Icon name="globe" size="lg" />}
              label={t(currentLocaleLabelKey)}
              submenuIndicator="right"
              submenu={publicNavLocaleOptions.map((option) => ({
                id: option.id,
                label: t(option.labelKey),
                onClick: () => handleLocaleChange(option.id),
              }))}
            />
          </>
        ) : null}

        {resolvedVariant === "company" ? (
          <NavItemsList
            items={companyNavItems}
            onNavigate={handleNavigate}
            onPlaceholder={handlePlaceholder}
          />
        ) : null}

        {resolvedVariant === "reviewer" ? (
          <NavItemsList
            items={reviewerNavItems}
            onNavigate={handleNavigate}
            onPlaceholder={handlePlaceholder}
          />
        ) : null}

        {resolvedVariant === "bdn" ? (
          <>
            <NavItemsList
              items={bdnNavItems}
              onNavigate={handleNavigate}
              onPlaceholder={handlePlaceholder}
            />

            <RightMenuItem
              icon={<Icon name={appNavDesignSystemGroup.icon} size="lg" />}
              label={t(appNavDesignSystemGroup.labelKey)}
              defaultSubmenuOpen={pathname.startsWith("/bdn/designsystem")}
              submenu={appNavDesignSystemChildren.map((item) => ({
                id: item.id,
                label: t(item.labelKey),
                onClick: () => handleNavigate(item.href),
              }))}
            />
          </>
        ) : null}

        {resolvedVariant === "default" ? (
          <>
            <NavItemsList
              items={appNavPrimaryItems}
              onNavigate={handleNavigate}
              onPlaceholder={handlePlaceholder}
            />

            <RightMenuItem
              icon={<Icon name={appNavDesignSystemGroup.icon} size="lg" />}
              label={t(appNavDesignSystemGroup.labelKey)}
              defaultSubmenuOpen={pathname.startsWith("/bdn/designsystem")}
              submenu={appNavDesignSystemChildren.map((item) => ({
                id: item.id,
                label: t(item.labelKey),
                onClick: () => handleNavigate(item.href),
              }))}
            />
          </>
        ) : null}

        {resolvedVariant !== "public" ? (
          <RightMenuItem
            icon={<Icon name={appNavLogoutItem.icon} size="lg" />}
            label={t(appNavLogoutItem.labelKey)}
            onClick={handleLogout}
          />
        ) : null}
      </div>
    </aside>
  );
}
