import { bodyCellClass, headerCellClass, tableBodyRowClass, variantCellClass } from "./button-matrix";
import { t } from "@/lib/i18n";

const timeClass = "text-body-small text-foreground-muted tabular-nums";

/** Reference patterns for absolute and relative timestamps (semantic time + a11y). */
export function TimestampPatternsSection() {
  return (
    <section className="rounded-lg border border-border bg-surface p-5">
      <h2 className="text-title-2 text-foreground-title">{t("designsystem.showcase.timestampPatterns.title")}</h2>
      <p className="mt-1 text-body-small text-foreground-muted">
        {t("designsystem.showcase.timestampPatterns.intro")}
      </p>

      <div className="mt-6 overflow-x-auto">
        <table className="w-full min-w-[720px] border-collapse text-left">
          <thead>
            <tr className="border-b border-border">
              <th className={headerCellClass}>{t("designsystem.showcase.timestampPatterns.colPattern")}</th>
              <th className={headerCellClass}>{t("designsystem.showcase.timestampPatterns.colExample")}</th>
              <th className={headerCellClass}>{t("designsystem.showcase.timestampPatterns.colWhenToUse")}</th>
            </tr>
          </thead>
          <tbody>
            <tr className={tableBodyRowClass}>
              <td className={variantCellClass}>{t("designsystem.showcase.timestampPatterns.absoluteLong")}</td>
              <td className={bodyCellClass}>
                <time dateTime="2026-05-14T14:32:00.000Z" className={timeClass}>
                  {t("designsystem.showcase.timestampPatterns.absoluteLongExample")}
                </time>
              </td>
              <td className={`${bodyCellClass} text-foreground-muted`}>
                {t("designsystem.showcase.timestampPatterns.absoluteLongWhen")}
              </td>
            </tr>
            <tr className={tableBodyRowClass}>
              <td className={variantCellClass}>{t("designsystem.showcase.timestampPatterns.absoluteCompact")}</td>
              <td className={`${bodyCellClass} text-right`}>
                <time dateTime="2026-05-14T14:32:00.000Z" className={`${timeClass} inline-block`}>
                  {t("designsystem.showcase.timestampPatterns.absoluteCompactExample")}
                </time>
              </td>
              <td className={`${bodyCellClass} text-foreground-muted`}>
                {t("designsystem.showcase.timestampPatterns.absoluteCompactWhen")}
              </td>
            </tr>
            <tr className={tableBodyRowClass}>
              <td className={variantCellClass}>{t("designsystem.showcase.timestampPatterns.relative")}</td>
              <td className={bodyCellClass}>
                <time
                  dateTime="2026-05-12T09:18:00.000Z"
                  title={t("designsystem.showcase.timestampPatterns.relativeTitle")}
                  aria-label={t("designsystem.showcase.timestampPatterns.relativeAriaLabel")}
                  className={timeClass}
                >
                  {t("designsystem.showcase.timestampPatterns.relativeExample")}
                </time>
              </td>
              <td className={`${bodyCellClass} text-foreground-muted`}>
                {t("designsystem.showcase.timestampPatterns.relativeWhen")}
              </td>
            </tr>
            <tr className={tableBodyRowClass}>
              <td className={variantCellClass}>{t("designsystem.showcase.timestampPatterns.relativeJustNow")}</td>
              <td className={bodyCellClass}>
                <time
                  dateTime="2026-05-14T14:31:00.000Z"
                  title={t("designsystem.showcase.timestampPatterns.justNowTitle")}
                  aria-label={t("designsystem.showcase.timestampPatterns.justNowAriaLabel")}
                  className={timeClass}
                >
                  {t("designsystem.showcase.timestampPatterns.justNowExample")}
                </time>
              </td>
              <td className={`${bodyCellClass} text-foreground-muted`}>
                {t("designsystem.showcase.timestampPatterns.justNowWhen")}
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <ul className="mt-4 list-disc space-y-1 pl-5 text-body-small text-foreground-muted">
        <li>
          {t("designsystem.showcase.timestampPatterns.bulletUtc")}
        </li>
        <li>
          {t("designsystem.showcase.timestampPatterns.bulletThrottle")}
        </li>
      </ul>
    </section>
  );
}
