"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import {
  outlinePrimaryLinkClassName,
  outlineNeutralLinkClassName,
  primaryPinkClassName,
} from "@/components/ui/atoms/button/buttonClasses";
import { PublicDesktopHeaderNav } from "@/components/ui/composites/PublicDesktopHeaderNav";
import { RightMenu } from "@/components/ui/composites/RightMenu";
import { appContentContainerClassName } from "@/components/layout/contentContainerClasses";
import { MenuButton } from "@/components/ui/molecules/MenuButton";
import { appNavLogoutItem, isPublicSitePath, isReviewerPath } from "@/lib/app-nav-config";
import { t } from "@/lib/i18n";
import type { PublicMenuCatalog } from "@/lib/public-menu-types";
import { cn } from "@/lib/utils";

const AUTH_LINKS = {
  signUp: "/sign-in?sign-up",
  login: "/sign-in",
} as const;

const headerAuthLinkFocus =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus focus-visible:ring-offset-2 focus-visible:ring-offset-surface";

export type AppHeaderProps = {
  publicMenuCatalog?: PublicMenuCatalog;
};

export function AppHeader({ publicMenuCatalog }: AppHeaderProps) {
  const pathname = usePathname() ?? "/";
  const isPublic = isPublicSitePath(pathname);
  const isReviewer = isReviewerPath(pathname);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isHeaderVisible, setIsHeaderVisible] = useState(true);
  const [headerHeight, setHeaderHeight] = useState(0);
  const headerRef = useRef<HTMLElement>(null);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const handleDocumentMouseDown = (event: MouseEvent) => {
      const target = event.target as Node;

      if (headerRef.current && !headerRef.current.contains(target)) {
        setIsMenuOpen(false);
      }
    };

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleDocumentMouseDown);
    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("mousedown", handleDocumentMouseDown);
      document.removeEventListener("keydown", handleEscape);
    };
  }, []);

  useEffect(() => {
    const header = headerRef.current;
    if (!header) {
      return;
    }

    const syncHeaderHeight = () => {
      setHeaderHeight(header.offsetHeight);
    };

    syncHeaderHeight();

    const resizeObserver = new ResizeObserver(syncHeaderHeight);
    resizeObserver.observe(header);

    return () => {
      resizeObserver.disconnect();
    };
  }, [isPublic]);

  useEffect(() => {
    const scrollThreshold = 10;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const delta = currentScrollY - lastScrollY.current;

      if (currentScrollY <= 0) {
        setIsHeaderVisible(true);
      } else if (delta < -scrollThreshold) {
        setIsHeaderVisible(false);
        setIsMenuOpen(false);
      } else if (delta > scrollThreshold) {
        setIsHeaderVisible(true);
      }

      lastScrollY.current = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
      <header
        ref={headerRef}
        className={cn(
          "fixed top-0 left-0 right-0 z-40 w-full shrink-0 border-b border-border bg-surface",
          "transition-transform duration-300 ease-in-out",
          "h-header",
          isPublic && "md:h-auto md:min-h-header md:py-6",
          !isHeaderVisible && "-translate-y-full pointer-events-none",
        )}
      >
      <div
        className={cn(
          appContentContainerClassName,
          "relative flex h-full items-center justify-between gap-3 md:gap-6",
        )}
      >
        <Link
          href="/"
          className={cn(
            "inline-flex shrink-0 -ml-4 rounded md:ml-0",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus focus-visible:ring-offset-2 focus-visible:ring-offset-surface",
          )}
        >
          <Image
            src="/expeerly-logo.svg"
            alt={t("app.home.logoAlt")}
            width={150}
            height={40}
            priority
            className={cn(
              "h-8 w-[120px]",
              "md:h-[40px] md:w-[150px]",
              isPublic && "md:h-14 md:w-[180px]",
            )}
          />
        </Link>

        {isPublic ? <PublicDesktopHeaderNav className="hidden md:flex" /> : null}

        <div className="flex shrink-0 items-center gap-1 md:gap-3">
          {isReviewer ? (
            <Link
              href={appNavLogoutItem.href ?? "/"}
              className={cn(
                outlineNeutralLinkClassName("small"),
                "md:hidden",
                headerAuthLinkFocus,
              )}
              aria-label={t("app.nav.logout")}
            >
              {t("app.nav.logout")}
            </Link>
          ) : !isPublic ? (
            <>
              <Link
                href={AUTH_LINKS.signUp}
                className={cn(
                  primaryPinkClassName("small"),
                  "no-underline md:hidden",
                  headerAuthLinkFocus,
                )}
                aria-label={t("app.auth.signUpAriaLabel")}
              >
                {t("app.auth.signUpLabel")}
              </Link>
              <Link
                href={AUTH_LINKS.login}
                className={cn(
                  outlinePrimaryLinkClassName("small"),
                  "no-underline md:hidden",
                  headerAuthLinkFocus,
                )}
                aria-label={t("app.auth.loginAriaLabel")}
              >
                {t("app.auth.loginLabel")}
              </Link>
            </>
          ) : null}
          {isReviewer ? (
            <Link
              href={appNavLogoutItem.href ?? "/"}
              className={cn(
                outlineNeutralLinkClassName("medium"),
                "hidden no-underline md:inline-flex",
                headerAuthLinkFocus,
              )}
              aria-label={t("app.nav.logout")}
            >
              {t("app.nav.logout")}
            </Link>
          ) : (
            <>
              <Link
                href={AUTH_LINKS.login}
                className={cn(
                  outlinePrimaryLinkClassName("medium"),
                  "hidden no-underline md:inline-flex",
                  headerAuthLinkFocus,
                )}
                aria-label={t("app.auth.loginAriaLabel")}
              >
                {t("app.auth.loginLabel")}
              </Link>
              <Link
                href={AUTH_LINKS.signUp}
                className={cn(
                  primaryPinkClassName("medium"),
                  "hidden no-underline md:inline-flex",
                  headerAuthLinkFocus,
                )}
                aria-label={t("app.auth.signUpAriaLabel")}
              >
                {t("app.auth.signUpLabel")}
              </Link>
            </>
          )}

          <div className={cn("relative", isPublic && "md:hidden")}>
            <MenuButton
              isOpen={isMenuOpen}
              onClick={() => setIsMenuOpen((open) => !open)}
            />
            {isMenuOpen && !isPublic ? (
              <RightMenu
                className="absolute right-0 top-full z-20 mt-0 w-menu"
                onItemClick={() => setIsMenuOpen(false)}
                publicMenuCatalog={publicMenuCatalog}
              />
            ) : null}
          </div>
        </div>
      </div>

      {isMenuOpen && isPublic ? (
        <RightMenu
          className="absolute inset-x-6 top-full z-20 mt-[10px] !w-auto md:hidden"
          onItemClick={() => setIsMenuOpen(false)}
          publicMenuCatalog={publicMenuCatalog}
        />
      ) : null}
      </header>
      <div aria-hidden="true" className="shrink-0" style={{ height: headerHeight }} />
    </>
  );
}
