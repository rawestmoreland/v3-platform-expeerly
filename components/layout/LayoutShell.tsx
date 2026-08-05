import { headers } from "next/headers";
import { AppFooter } from "@/components/layout/AppFooter";
import { LandingStickyAuthBar } from "@/components/blocks/marketing/LandingStickyAuthBar";
import { AppHeader } from "@/components/ui/composites/AppHeader";
import { isPublicSitePath, isPublicStickyAuthPath } from "@/lib/app-nav-config";
import { applyRequestLocale } from "@/lib/i18n/request";
import { buildPublicMenuCatalog } from "@/lib/public-menu-data.server";
import { PATHNAME_HEADER } from "@/lib/i18n/routing";
import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

export interface LayoutShellProps {
  children: ReactNode;
}

/**
 * Global layout structure only (chrome + main slot). No route or page meaning.
 * Page layout behavior is declared via PageCanvas (app routes only, not design system).
 */
export async function LayoutShell({ children }: LayoutShellProps) {
  const locale = await applyRequestLocale();
  const headerStore = await headers();
  const pathname = headerStore.get(PATHNAME_HEADER) ?? "/";
  const publicMenuCatalog = isPublicSitePath(pathname)
    ? buildPublicMenuCatalog(locale)
    : undefined;
  const showStickyAuth = isPublicStickyAuthPath(pathname);

  return (
    <>
      <AppHeader publicMenuCatalog={publicMenuCatalog} />
      <div className="flex min-h-screen flex-col bg-background">
        <main className={cn("min-w-0 flex-1", showStickyAuth && "pb-24 md:pb-0")}>{children}</main>
        {showStickyAuth ? <LandingStickyAuthBar /> : null}
        <AppFooter />
      </div>
    </>
  );
}
