 "use client";

import { useState } from "react";
import { t } from "@/lib/i18n";
import {
  CheckboxField,
  FilterPanel,
  OutlineNeutral,
  OutlinePrimary,
  PrimaryPink,
  SelectField,
  SelectItem,
  SingleSelectFilterButton,
  Tag,
  ToggleField,
} from "@/components/ui";

export function FiltersAndSortingShowcase() {
  const [selectedProduct, setSelectedProduct] = useState<string | undefined>(undefined);

  const productOptions = [
    { value: "miele", label: t("designsystem.showcase.filtersAndSorting.productOptionMiele") },
    { value: "dyson", label: t("designsystem.showcase.filtersAndSorting.productOptionDyson") },
    { value: "bamix", label: t("designsystem.showcase.filtersAndSorting.productOptionBamix") },
  ];

  return (
    <div className="grid gap-6">
      <section className="rounded-lg border border-border bg-surface p-5">
        <h2 className="text-title-2 text-foreground-title">{t("designsystem.showcase.filtersAndSorting.filterPanelTitle")}</h2>
        <p className="mt-1 max-w-2xl text-body-small text-foreground-muted">
          {t("designsystem.showcase.filtersAndSorting.filterPanelIntro")}
        </p>

        <div className="mt-4 max-w-lg">
          <FilterPanel
            title={t("designsystem.showcase.filtersAndSorting.filtersTitle")}
            description={t("designsystem.showcase.filtersAndSorting.filtersDescription")}
            headerAction={
              <OutlineNeutral type="button" size="small">
                {t("designsystem.showcase.common.reset")}
              </OutlineNeutral>
            }
            footer={
              <>
                <OutlinePrimary type="button" size="small">
                  {t("designsystem.showcase.common.cancel")}
                </OutlinePrimary>
                <PrimaryPink type="button" size="small">
                  {t("designsystem.showcase.filtersAndSorting.applyFilters")}
                </PrimaryPink>
              </>
            }
          >
            <SelectField label={t("designsystem.showcase.filtersAndSorting.statusLabel")} defaultValue="verified">
              <SelectItem value="all">{t("designsystem.showcase.filtersAndSorting.allStatuses")}</SelectItem>
              <SelectItem value="verified">{t("designsystem.showcase.filtersAndSorting.verified")}</SelectItem>
              <SelectItem value="pending">{t("designsystem.showcase.filtersAndSorting.pending")}</SelectItem>
              <SelectItem value="needs-review">{t("designsystem.showcase.filtersAndSorting.needsReview")}</SelectItem>
            </SelectField>

            <div className="grid gap-3">
              <p className="text-body-small-bold text-foreground-title">{t("designsystem.showcase.filtersAndSorting.reviewTypeLabel")}</p>
              <CheckboxField label={t("designsystem.showcase.filtersAndSorting.videoReviews")} defaultChecked />
              <CheckboxField label={t("designsystem.showcase.filtersAndSorting.photoReviews")} />
              <CheckboxField label={t("designsystem.showcase.filtersAndSorting.textReviews")} />
            </div>

            <ToggleField
              label={t("designsystem.showcase.filtersAndSorting.activeCampaignsLabel")}
              hint={t("designsystem.showcase.filtersAndSorting.activeCampaignsHint")}
              defaultChecked
            />
          </FilterPanel>
        </div>
      </section>

      <section className="rounded-lg border border-border bg-surface p-5">
        <h2 className="text-title-2 text-foreground-title">{t("designsystem.showcase.filtersAndSorting.sortingTitle")}</h2>
        <p className="mt-1 max-w-2xl text-body-small text-foreground-muted">
          {t("designsystem.showcase.filtersAndSorting.sortingIntro")}
        </p>

        <div className="mt-4 max-w-sm">
          <div className="rounded-lg border border-border bg-surface p-4 shadow-sm">
            <SelectField label={t("designsystem.showcase.filtersAndSorting.sortByLabel")} defaultValue="newest" hideLabel>
              <SelectItem value="newest">{t("designsystem.showcase.filtersAndSorting.newestFirst")}</SelectItem>
              <SelectItem value="oldest">{t("designsystem.showcase.filtersAndSorting.oldestFirst")}</SelectItem>
              <SelectItem value="rating-high">{t("designsystem.showcase.filtersAndSorting.highestRating")}</SelectItem>
              <SelectItem value="rating-low">{t("designsystem.showcase.filtersAndSorting.lowestRating")}</SelectItem>
            </SelectField>
          </div>
        </div>
      </section>

      <section className="rounded-lg border border-border bg-surface p-5">
        <h2 className="text-title-2 text-foreground-title">
          {t("designsystem.showcase.filtersAndSorting.singleSelectFilterTitle")}
        </h2>
        <p className="mt-1 max-w-2xl text-body-small text-foreground-muted">
          {t("designsystem.showcase.filtersAndSorting.singleSelectFilterIntro")}
        </p>

        <div className="mt-4 rounded-lg border border-border bg-surface p-4 shadow-sm">
          <SingleSelectFilterButton
            label={t("designsystem.showcase.filtersAndSorting.productFilterLabel")}
            ariaLabel={t("designsystem.showcase.filtersAndSorting.productFilterLabel")}
            clearAriaLabel={t("designsystem.showcase.filtersAndSorting.clearProductFilterAriaLabel")}
            options={productOptions}
            value={selectedProduct}
            onValueChange={setSelectedProduct}
          />
        </div>
      </section>

      <section className="rounded-lg border border-border bg-surface p-5">
        <h2 className="text-title-2 text-foreground-title">{t("designsystem.showcase.filtersAndSorting.appliedFiltersTitle")}</h2>
        <p className="mt-1 max-w-2xl text-body-small text-foreground-muted">
          {t("designsystem.showcase.filtersAndSorting.appliedFiltersIntro")}
        </p>

        <div className="mt-4 rounded-lg border border-border bg-surface-muted p-4">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex flex-wrap gap-2">
              <Tag label={t("designsystem.showcase.filtersAndSorting.tagVerified")} />
              <Tag label={t("designsystem.showcase.filtersAndSorting.videoReviews")} />
              <Tag label={t("designsystem.showcase.filtersAndSorting.tagActiveCampaigns")} />
            </div>
            <OutlineNeutral type="button" size="small">
              {t("designsystem.showcase.common.clearAll")}
            </OutlineNeutral>
          </div>
        </div>
      </section>
    </div>
  );
}
