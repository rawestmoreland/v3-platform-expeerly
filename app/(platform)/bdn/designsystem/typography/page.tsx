import type { Metadata } from "next";
import type { ReactNode } from "react";
import {
  bodyTokens,
  displayTokens,
  headingTokens,
  titleTokens,
} from "./typography-table.generated";
import { designSystemPageTitle } from "../content";
import { t } from "@/lib/i18n";

export const metadata: Metadata = {
  title: designSystemPageTitle(t("designsystem.pages.typography.heading")),
};

function ResponsiveTokenTable({
  sectionKey,
  rows,
  renderSample,
}: {
  sectionKey: "display" | "headings" | "titles";
  rows: ReadonlyArray<{ label: string; className: string; mobile: string; desktop: string }>;
  renderSample: (className: string) => ReactNode;
}) {
  return (
    <section className="mt-8 rounded-lg border border-border bg-surface p-5">
      <h2 className="text-title-2 text-foreground-title">
        {t(`designsystem.pages.typography.sections.${sectionKey}`)}
      </h2>
      <div className="mt-4 overflow-x-auto">
        <table className="w-full min-w-[640px] border-collapse text-left text-body-regular text-foreground-body">
          <thead>
            <tr className="border-b border-border bg-surface-muted">
              <th className="px-3 py-2.5 text-body-extra-small font-bold text-foreground-muted">
                {t("designsystem.pages.typography.table.token")}
              </th>
              <th className="px-3 py-2.5 text-body-extra-small font-bold text-foreground-muted">
                {t("designsystem.pages.typography.table.mobile")}
              </th>
              <th className="px-3 py-2.5 text-body-extra-small font-bold text-foreground-muted">
                {t("designsystem.pages.typography.table.desktop")}
              </th>
              <th className="px-3 py-2.5 text-body-extra-small font-bold text-foreground-muted">
                {t("designsystem.pages.typography.table.sample")}
              </th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.label} className="border-b border-border last:border-b-0">
                <td className="px-3 py-3 align-middle font-mono text-body-small">{row.className}</td>
                <td className="px-3 py-3 align-middle text-foreground-muted">{row.mobile}</td>
                <td className="px-3 py-3 align-middle text-foreground-muted">{row.desktop}</td>
                <td className="px-3 py-3 align-middle">{renderSample(row.className)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

export default function DesignSystemTypographyPage() {
  return (
    <>
      <h1 className="text-title-2 text-foreground-title">{t("designsystem.pages.typography.heading")}</h1>
      <p className="mt-2 max-w-2xl text-body-regular text-foreground-title-subtle">
        {t("designsystem.pages.typography.introLead")}{" "}
        <code className="text-body-extra-small">{t("designsystem.pages.typography.introGlobals")}</code>{" "}
        {t("designsystem.pages.typography.introAnd")}{" "}
        <code className="text-body-extra-small">{t("designsystem.pages.typography.introTailwind")}</code>.{" "}
        {t("designsystem.pages.typography.introSuffix")}{" "}
        <span className="text-foreground-body">{t("designsystem.pages.typography.breakpointMobile")}</span>{" "}
        {t("designsystem.pages.typography.introBetween")}{" "}
        <span className="text-foreground-body">{t("designsystem.pages.typography.breakpointDesktop")}</span>{" "}
        {t("designsystem.pages.typography.introEnd")}
      </p>

      <ResponsiveTokenTable
        sectionKey="display"
        rows={displayTokens}
        renderSample={(className) => (
          <p className={`${className} text-foreground-title`}>{t("designsystem.pages.typography.samples.display")}</p>
        )}
      />

      <ResponsiveTokenTable
        sectionKey="headings"
        rows={headingTokens}
        renderSample={(className) => (
          <p className={`${className} text-foreground-title`}>{t("designsystem.pages.typography.samples.heading")}</p>
        )}
      />

      <section className="mt-6 rounded-lg border border-border bg-surface p-5">
        <h2 className="text-title-2 text-foreground-title">{t("designsystem.pages.typography.sections.titles")}</h2>
        <div className="mt-4 overflow-x-auto">
          <table className="w-full min-w-[640px] border-collapse text-left text-body-regular text-foreground-body">
            <thead>
              <tr className="border-b border-border bg-surface-muted">
                <th className="px-3 py-2.5 text-body-extra-small font-bold text-foreground-muted">
                  {t("designsystem.pages.typography.table.token")}
                </th>
                <th className="px-3 py-2.5 text-body-extra-small font-bold text-foreground-muted">
                  {t("designsystem.pages.typography.table.mobile")}
                </th>
                <th className="px-3 py-2.5 text-body-extra-small font-bold text-foreground-muted">
                  {t("designsystem.pages.typography.table.desktop")}
                </th>
                <th className="px-3 py-2.5 text-body-extra-small font-bold text-foreground-muted">
                  {t("designsystem.pages.typography.table.sample")}
                </th>
              </tr>
            </thead>
            <tbody>
              {titleTokens.map((row) => {
                const mobileSpec = "mobile" in row ? row.mobile : row.values;
                const desktopSpec = "desktop" in row ? row.desktop : row.values;
                return (
                  <tr key={row.label} className="border-b border-border last:border-b-0">
                    <td className="px-3 py-3 align-middle font-mono text-body-small">{row.className}</td>
                    <td className="px-3 py-3 align-middle text-foreground-muted">{mobileSpec}</td>
                    <td className="px-3 py-3 align-middle text-foreground-muted">{desktopSpec}</td>
                    <td className="px-3 py-3 align-middle">
                      <p className={`${row.className} text-foreground-title`}>
                        {t("designsystem.pages.typography.samples.title")}
                      </p>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </section>

      <section className="mt-6 rounded-lg border border-border bg-surface p-5">
        <h2 className="text-title-2 text-foreground-title">{t("designsystem.pages.typography.sections.body")}</h2>
        <div className="mt-4 overflow-x-auto">
          <table className="w-full min-w-[560px] border-collapse text-left text-body-regular text-foreground-body">
            <thead>
              <tr className="border-b border-border bg-surface-muted">
                <th className="px-3 py-2.5 text-body-extra-small font-bold text-foreground-muted">
                  {t("designsystem.pages.typography.table.token")}
                </th>
                <th className="px-3 py-2.5 text-body-extra-small font-bold text-foreground-muted">
                  {t("designsystem.pages.typography.table.spec")}
                </th>
                <th className="px-3 py-2.5 text-body-extra-small font-bold text-foreground-muted">
                  {t("designsystem.pages.typography.table.sample")}
                </th>
              </tr>
            </thead>
            <tbody>
              {bodyTokens.map((row) => (
                <tr key={row.label} className="border-b border-border last:border-b-0">
                  <td className="px-3 py-3 align-middle font-mono text-body-small">{row.className}</td>
                  <td className="px-3 py-3 align-middle text-foreground-muted">{row.values}</td>
                  <td className="px-3 py-3 align-middle">
                    <p className={`${row.className} text-foreground-body`}>
                      {t("designsystem.pages.typography.samples.body")}
                    </p>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </>
  );
}