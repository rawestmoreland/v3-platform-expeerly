"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { Icon } from "@/components/ui/atoms/Icon";
import { Text } from "@/components/ui/atoms/Text";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/composites/Popover";
import {
  publicHeaderNavLinks,
  publicNavLocaleOptions,
  type PublicNavLabelKey,
} from "@/lib/app-nav-config";
import { getLocale, t } from "@/lib/i18n";
import { setPreferredLocaleCookie } from "@/lib/i18n/locale-actions";
import { pathnameWithLocale, stripLocalePrefix } from "@/lib/i18n/routing";
import type { LocaleId } from "@/locales/index";
import { cn } from "@/lib/utils";

type DesktopNavLink = {
  id: string;
  labelKey: PublicNavLabelKey;
  href: string;
  external?: boolean;
};

const desktopNavLinks: DesktopNavLink[] = publicHeaderNavLinks.map(
  ({ id, labelKey, href, external }) => ({ id, labelKey, href, external }),
);

const navLinkClassName = cn(
  "inline-flex items-center gap-2 rounded-md px-2 py-2.5 no-underline",
  "text-body-small-bold text-foreground-title",
  "hover:text-secondary",
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus focus-visible:ring-offset-2 focus-visible:ring-offset-surface",
);

export type PublicDesktopHeaderNavProps = {
  className?: string;
};

export function PublicDesktopHeaderNav({ className }: PublicDesktopHeaderNavProps) {
  const router = useRouter();
  const pathname = usePathname();
  const locale = getLocale();
  const [localeOpen, setLocaleOpen] = useState(false);

  const currentLocaleLabelKey =
    publicNavLocaleOptions.find((option) => option.id === locale)?.labelKey ??
    "app.nav.public.locale.en";

  const handleLocaleChange = async (nextLocale: LocaleId) => {
    const { pathnameWithoutLocale } = stripLocalePrefix(pathname);
    await setPreferredLocaleCookie(nextLocale);
    router.push(pathnameWithLocale(pathnameWithoutLocale, nextLocale));
    router.refresh();
    setLocaleOpen(false);
  };

  return (
    <nav
      aria-label={t("app.nav.ariaLabel")}
      className={cn("flex flex-1 items-center justify-center gap-3", className)}
    >
      {desktopNavLinks.map((item) =>
        item.external ? (
          <a
            key={item.id}
            href={item.href}
            target="_blank"
            rel="noopener noreferrer"
            className={navLinkClassName}
          >
            <Text as="span" variant="body-small" className="text-body-small-bold">
              {t(item.labelKey)}
            </Text>
            <Icon name="external-link" size="sm" aria-hidden />
          </a>
        ) : (
          <Link key={item.id} href={item.href} className={navLinkClassName}>
            <Text as="span" variant="body-small" className="text-body-small-bold">
              {t(item.labelKey)}
            </Text>
          </Link>
        ),
      )}

      <Popover open={localeOpen} onOpenChange={setLocaleOpen}>
        <PopoverTrigger asChild>
          <button type="button" className={cn(navLinkClassName, "cursor-pointer bg-transparent")}>
            <Text as="span" variant="body-small" className="text-body-small-bold">
              {t(currentLocaleLabelKey)}
            </Text>
            <Icon name="chevron-down" size="sm" aria-hidden />
          </button>
        </PopoverTrigger>
        <PopoverContent align="end" className="w-48 p-2">
          <ul className="flex flex-col gap-1">
            {publicNavLocaleOptions.map((option) => (
              <li key={option.id}>
                <button
                  type="button"
                  onClick={() => handleLocaleChange(option.id)}
                  className={cn(
                    "w-full rounded-md px-3 py-2 text-left text-body-small",
                    option.id === locale
                      ? "bg-surface-active font-bold text-foreground-title"
                      : "text-foreground-title-subtle hover:bg-surface-hover hover:text-secondary",
                  )}
                >
                  {t(option.labelKey)}
                </button>
              </li>
            ))}
          </ul>
        </PopoverContent>
      </Popover>
    </nav>
  );
}
