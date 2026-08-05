import { Fragment } from "react";
import { ColorTokenSwatch } from "@/components/ui";
import { SEMANTIC_COLOR_MANIFEST } from "@/tokens/colors.manifest";
import { mainColorTokens, utilityColorTokens } from "./primitive-palette";
import { t } from "@/lib/i18n";

export function DesignSystemColorTokensSection() {
  return (
    <section className="rounded-lg border border-border bg-surface p-5">
      <h2 className="text-title-2 text-foreground-title">{t("designsystem.showcase.colorTokens.title")}</h2>
      <p className="mt-1 text-body-regular text-foreground-muted">
        {t("designsystem.showcase.colorTokens.intro")}
      </p>
      <div className="mt-4 overflow-x-auto rounded-lg border border-border">
        <table className="w-full min-w-[720px] border-collapse text-left text-body-regular text-foreground-body">
          <thead>
            <tr className="border-b border-border bg-surface-muted">
              <th className="px-3 py-2.5 text-body-extra-small font-bold text-foreground-muted">{t("designsystem.showcase.colorTokens.colCssVariable")}</th>
              <th className="px-3 py-2.5 text-body-extra-small font-bold text-foreground-muted">{t("designsystem.showcase.colorTokens.colLegacyReference")}</th>
              <th className="px-3 py-2.5 text-body-extra-small font-bold text-foreground-muted">{t("designsystem.showcase.colorTokens.colValue")}</th>
              <th className="px-3 py-2.5 text-body-extra-small font-bold text-foreground-muted">{t("designsystem.showcase.colorTokens.colUsedFor")}</th>
            </tr>
          </thead>
          <tbody>
            {SEMANTIC_COLOR_MANIFEST.map((section) => (
              <Fragment key={section.category}>
                <tr className="border-b border-border bg-surface-muted">
                  <td
                    colSpan={4}
                    className="px-3 py-2 text-body-small font-bold text-foreground-title uppercase tracking-wide"
                  >
                    {section.category}
                  </td>
                </tr>
                {section.rows.map((row) => (
                  <tr key={`${section.category}-${row.token}`} className="border-b border-border last:border-b-0">
                    <td className="px-3 py-2 align-middle font-mono text-body-small text-foreground-body">
                      {row.token}
                    </td>
                    <td className="px-3 py-2 align-middle text-foreground-muted">{row.legacyName}</td>
                    <td className="px-3 py-2 align-middle">
                      <div className="flex items-center gap-2">
                        <span
                          className={`inline-block h-8 w-10 shrink-0 rounded border border-border-input ${row.swatchClass}`}
                          aria-hidden
                        />
                        <code className="text-body-extra-small text-foreground-body">{row.hex}</code>
                      </div>
                    </td>
                    <td className="max-w-md px-3 py-2 align-middle text-foreground-body">
                      {t(`designsystem.tokens.colors.${row.id}.usage`)}
                    </td>
                  </tr>
                ))}
              </Fragment>
            ))}
          </tbody>
        </table>
      </div>
      <div className="mt-8 grid gap-6">
        <div>
          <h3 className="text-body-small-bold text-foreground-title">{t("designsystem.showcase.colorTokens.legacyMainTitle")}</h3>
          <div className="mt-3 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {mainColorTokens.map((token) => (
              <ColorTokenSwatch key={token.name} name={token.name} bgClass={token.bgClass} />
            ))}
          </div>
        </div>
        <div>
          <h3 className="text-body-small-bold text-foreground-title">{t("designsystem.showcase.colorTokens.legacyUtilityTitle")}</h3>
          <div className="mt-3 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {utilityColorTokens.map((token) => (
              <ColorTokenSwatch key={token.name} name={token.name} bgClass={token.bgClass} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
