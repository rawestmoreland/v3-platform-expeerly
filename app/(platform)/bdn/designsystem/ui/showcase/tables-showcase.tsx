import { Avatar, AvatarFallback, AvatarImage, Badge, DataTable, DataTableCell, DataTableHeaderCell, DataTableRow } from "@/components/ui";
import { ButtonSizingMatrix, bodyCellClass, headerCellClass, tableBodyRowClass, variantCellClass } from "./button-matrix";
import { TimestampPatternsSection } from "./timestamp-patterns-section";
import { TableRowMenuCell } from "./table-row-menu-cell";
import { t } from "@/lib/i18n";

const numericHeaderClass = `${headerCellClass} text-right`;
const numericCellClass = `${bodyCellClass} text-right tabular-nums`;
const rowMenuHeaderClass = `${headerCellClass} w-12 text-right`;
const rowMenuCellClass = `${bodyCellClass} text-right align-middle`;

export function TablesShowcase() {
  return (
    <div className="grid gap-8">
      <div className="rounded-lg border border-border bg-surface p-5">
        <h2 className="text-title-2 text-foreground-title">{t("designsystem.showcase.tables.denseTableTitle")}</h2>
        <p className="mt-1 text-body-small text-foreground-muted">
          {t("designsystem.showcase.tables.denseTableIntro")}
        </p>
        <div className="mt-4 overflow-x-auto">
          <DataTable className="min-w-[480px]">
            <thead>
              <tr className="border-b border-border">
                <DataTableHeaderCell>{t("designsystem.showcase.tables.colToken")}</DataTableHeaderCell>
                <DataTableHeaderCell>{t("designsystem.showcase.tables.colRole")}</DataTableHeaderCell>
                <DataTableHeaderCell>{t("designsystem.showcase.tables.colExample")}</DataTableHeaderCell>
              </tr>
            </thead>
            <tbody>
              <DataTableRow>
                <DataTableCell className="font-bold">border-border</DataTableCell>
                <DataTableCell>{t("designsystem.showcase.tables.borderBorderRole")}</DataTableCell>
                <DataTableCell className="text-foreground-muted">{t("designsystem.showcase.tables.borderBorderExample")}</DataTableCell>
              </DataTableRow>
              <DataTableRow>
                <DataTableCell className="font-bold">border-border-input</DataTableCell>
                <DataTableCell>{t("designsystem.showcase.tables.borderInputRole")}</DataTableCell>
                <DataTableCell className="text-foreground-muted">{t("designsystem.showcase.tables.borderInputExample")}</DataTableCell>
              </DataTableRow>
              <DataTableRow>
                <DataTableCell className="font-bold">surface-muted</DataTableCell>
                <DataTableCell>{t("designsystem.showcase.tables.surfaceMutedRole")}</DataTableCell>
                <DataTableCell className="text-foreground-muted">{t("designsystem.showcase.tables.surfaceMutedExample")}</DataTableCell>
              </DataTableRow>
            </tbody>
          </DataTable>
        </div>
      </div>

      <div className="rounded-lg border border-border bg-surface p-5">
        <h2 className="text-title-2 text-foreground-title">{t("designsystem.showcase.tables.cellVariantsTitle")}</h2>
        <p className="mt-1 text-body-small text-foreground-muted">
          {t("designsystem.showcase.tables.cellVariantsIntro")}
        </p>
        <div className="mt-4 overflow-x-auto">
          <table className="w-full min-w-[780px] border-collapse text-left">
            <thead>
              <tr className="border-b border-border">
                <th className={headerCellClass}>{t("designsystem.showcase.tables.colName")}</th>
                <th className={headerCellClass}>{t("designsystem.showcase.tables.colOwnerAvatar")}</th>
                <th className={headerCellClass}>{t("designsystem.showcase.tables.colStatus")}</th>
                <th className={`${headerCellClass} text-right`}>{t("designsystem.showcase.tables.colUpdated")}</th>
                <th className={numericHeaderClass}>{t("designsystem.showcase.tables.colRevenue")}</th>
                <th className={rowMenuHeaderClass} aria-label={t("designsystem.showcase.tables.rowActionsAria")}>
                  <span className="sr-only">{t("designsystem.showcase.tables.rowActionsAria")}</span>
                </th>
              </tr>
            </thead>
            <tbody>
              <tr className={tableBodyRowClass}>
                <td className={variantCellClass}>{t("designsystem.showcase.tables.enterpriseRollout")}</td>
                <td className={bodyCellClass}>
                  <span className="inline-flex items-center gap-2">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src="https://i.pravatar.cc/64?img=47" alt={t("designsystem.showcase.tables.jamieChenAlt")} />
                      <AvatarFallback className="text-body-extra-small-bold">JC</AvatarFallback>
                    </Avatar>
                    <span>{t("designsystem.showcase.tables.jamieChen")}</span>
                  </span>
                </td>
                <td className={bodyCellClass}>
                  <Badge label={t("designsystem.showcase.common.active")} variant="success" />
                </td>
                <td className={`${bodyCellClass} text-right`}>
                  <time dateTime="2026-05-14T14:32:00" className="text-body-small text-foreground-muted tabular-nums">
                    {t("designsystem.showcase.tables.demoUpdatedEnterprise")}
                  </time>
                </td>
                <td className={numericCellClass}>
                  {new Intl.NumberFormat("en-US", {
                    style: "currency",
                    currency: "USD",
                    maximumFractionDigits: 0,
                  }).format(124_900)}
                </td>
                <td className={rowMenuCellClass}>
                  <span className="inline-flex justify-end">
                    <TableRowMenuCell />
                  </span>
                </td>
              </tr>
              <tr className={tableBodyRowClass}>
                <td className={variantCellClass}>{t("designsystem.showcase.tables.selfServeOnboarding")}</td>
                <td className={bodyCellClass}>
                  <span className="inline-flex items-center gap-2">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src="https://i.pravatar.cc/64?img=32" alt={t("designsystem.showcase.tables.alexRiveraAlt")} />
                      <AvatarFallback className="text-body-extra-small-bold">AR</AvatarFallback>
                    </Avatar>
                    <span>{t("designsystem.showcase.tables.alexRivera")}</span>
                  </span>
                </td>
                <td className={bodyCellClass}>
                  <Badge label={t("designsystem.showcase.common.draft")} variant="info" />
                </td>
                <td className={`${bodyCellClass} text-right`}>
                  <time dateTime="2026-05-12T09:18:00" className="text-body-small text-foreground-muted tabular-nums">
                    {t("designsystem.showcase.tables.demoUpdatedOnboarding")}
                  </time>
                </td>
                <td className={numericCellClass}>
                  {new Intl.NumberFormat("en-US", {
                    style: "currency",
                    currency: "USD",
                    maximumFractionDigits: 0,
                  }).format(42_500)}
                </td>
                <td className={rowMenuCellClass}>
                  <span className="inline-flex justify-end">
                    <TableRowMenuCell />
                  </span>
                </td>
              </tr>
              <tr className={tableBodyRowClass}>
                <td className={variantCellClass}>{t("designsystem.showcase.tables.partnerApiAccess")}</td>
                <td className={bodyCellClass}>
                  <span className="inline-flex items-center gap-2">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src="https://i.pravatar.cc/64?img=12" alt={t("designsystem.showcase.tables.morganLeeAlt")} />
                      <AvatarFallback className="text-body-extra-small-bold">ML</AvatarFallback>
                    </Avatar>
                    <span>{t("designsystem.showcase.tables.morganLee")}</span>
                  </span>
                </td>
                <td className={bodyCellClass}>
                  <Badge label={t("designsystem.showcase.common.paused")} variant="default" />
                </td>
                <td className={`${bodyCellClass} text-right`}>
                  <time dateTime="2026-04-28T23:05:00" className="text-body-small text-foreground-muted tabular-nums">
                    {t("designsystem.showcase.tables.demoUpdatedPartnerApi")}
                  </time>
                </td>
                <td className={numericCellClass}>
                  {new Intl.NumberFormat("en-US", {
                    style: "currency",
                    currency: "USD",
                    maximumFractionDigits: 0,
                  }).format(8_040)}
                </td>
                <td className={rowMenuCellClass}>
                  <span className="inline-flex justify-end">
                    <TableRowMenuCell />
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <TimestampPatternsSection />

      <div className="rounded-lg border border-border bg-surface p-5">
        <h2 className="text-title-2 text-foreground-title">{t("designsystem.showcase.tables.matrixReferenceTitle")}</h2>
        <p className="mt-1 text-body-small text-foreground-muted">
          {t("designsystem.showcase.tables.matrixReferenceIntro")}
        </p>
        <div className="mt-6">
          <ButtonSizingMatrix />
        </div>
      </div>
    </div>
  );
}
