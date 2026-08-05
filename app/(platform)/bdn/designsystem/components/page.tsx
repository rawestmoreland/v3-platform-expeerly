import type { Metadata } from "next";
import Link from "next/link";
import { getDesignSystemHubSections } from "@/app/(platform)/bdn/designsystem/content";
import { t } from "@/lib/i18n";

export const metadata: Metadata = {
  title: t("designsystem.meta.componentsHubTitle"),
};

export default function DesignSystemComponentsHubPage() {
  const sections = getDesignSystemHubSections();

  return (
    <>
      <h1 className="text-title-2 text-foreground-title">{t("designsystem.hub.title")}</h1>
      <p className="mt-2 max-w-2xl text-body-regular text-foreground-title-subtle">
        {t("designsystem.hub.description")}
      </p>

      <ul className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {sections.map((s) => (
          <li key={s.href}>
            <Link
              href={s.href}
              className="block rounded-lg border border-border bg-surface p-5 shadow-sm transition-colors hover:border-border-focus hover:bg-surface-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            >
              <span className="text-body-small-bold text-foreground-title">{s.title}</span>
              <span className="mt-1 block text-body-small text-foreground-muted">{s.description}</span>
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
}
