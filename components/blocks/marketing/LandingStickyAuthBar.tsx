"use client";

import Link from "next/link";
import {
  outlinePrimaryLinkClassName,
  primaryPinkClassName,
} from "@/components/ui/atoms/button/buttonClasses";
import { t } from "@/lib/i18n";
import { cn } from "@/lib/utils";

const AUTH_LINKS = {
  signUp: "/sign-in?sign-up",
  login: "/sign-in",
} as const;

const stickyAuthLinkFocus =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus focus-visible:ring-offset-2 focus-visible:ring-offset-surface";

export type LandingStickyAuthBarProps = {
  className?: string;
};

export function LandingStickyAuthBar({ className }: LandingStickyAuthBarProps) {
  return (
    <div
      className={cn(
        "fixed inset-x-0 bottom-0 z-30 border-t border-border bg-surface px-6 py-3 md:hidden",
        className,
      )}
      role="navigation"
      aria-label={t("marketing.landing.stickyAuthAriaLabel")}
    >
      <div className="mx-auto flex w-full max-w-content gap-3">
        <Link
          href={AUTH_LINKS.signUp}
          className={cn(
            primaryPinkClassName("medium"),
            "flex-1 justify-center no-underline",
            stickyAuthLinkFocus,
          )}
          aria-label={t("app.auth.signUpAriaLabel")}
        >
          {t("app.auth.signUpLabel")}
        </Link>
        <Link
          href={AUTH_LINKS.login}
          className={cn(
            outlinePrimaryLinkClassName("medium"),
            "flex-1 justify-center no-underline",
            stickyAuthLinkFocus,
          )}
          aria-label={t("app.auth.loginAriaLabel")}
        >
          {t("app.auth.loginLabel")}
        </Link>
      </div>
    </div>
  );
}
