"use client";

import { BrandSearchField } from "@/components/blocks/video-reviews/BrandSearchField";
import { useState } from "react";
import { Icon } from "@/components/ui/atoms/Icon";
import { OutlineNeutral } from "@/components/ui/atoms/button/OutlineNeutral";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/composites/Popover";
import type { BrandFixture, BrandSortOption } from "@/lib/fixtures/video-reviews";
import { cn } from "@/lib/utils";
import { t } from "@/lib/i18n";

export type HubBrandSearchToolbarProps = {
  topBrands: BrandFixture[];
  allBrands: BrandFixture[];
  sort: BrandSortOption;
  onSortChange: (sort: BrandSortOption) => void;
};

export function HubBrandSearchToolbar({
  topBrands,
  allBrands,
  sort,
  onSortChange,
}: HubBrandSearchToolbarProps) {
  const [sortOpen, setSortOpen] = useState(false);

  const SORT_OPTIONS: Array<{ value: BrandSortOption; label: string }> = [
    { value: "most-reviewed", label: t("player.hub.brandSortMostReviewed") },
    { value: "top-rated", label: t("player.hub.brandSortTopRated") },
    { value: "newest", label: t("player.hub.brandSortNewest") },
  ];

  return (
    <div className="flex w-full flex-col gap-3 sm:flex-row sm:items-end">
      <div className="min-w-0 flex-1">
        <BrandSearchField topBrands={topBrands} allBrands={allBrands} />
      </div>

      <div className="w-full shrink-0 sm:w-auto">
        <Popover open={sortOpen} onOpenChange={setSortOpen}>
          <PopoverTrigger asChild>
            <OutlineNeutral
              type="button"
              size="medium"
              aria-label={t("player.hub.brandSortLabel")}
              aria-expanded={sortOpen}
              iconLeft={<Icon name="arrow-up-down" size="sm" />}
              iconRight={
                <Icon
                  name="chevron-down"
                  size="sm"
                  className={cn("transition-transform", sortOpen && "rotate-180")}
                />
              }
              className="w-full sm:w-auto"
            >
              {t("player.brand.sortButton")}
            </OutlineNeutral>
          </PopoverTrigger>
          <PopoverContent align="end" className="w-56 p-2">
            <ul className="flex flex-col gap-1">
              {SORT_OPTIONS.map((option) => (
                <li key={option.value}>
                  <button
                    type="button"
                    onClick={() => {
                      onSortChange(option.value);
                      setSortOpen(false);
                    }}
                    className={cn(
                      "w-full rounded-md px-3 py-2 text-left text-body-small",
                      option.value === sort
                        ? "bg-surface-active font-bold text-foreground-title"
                        : "text-foreground-title-subtle hover:bg-surface-hover hover:text-secondary",
                    )}
                  >
                    {option.label}
                  </button>
                </li>
              ))}
            </ul>
          </PopoverContent>
        </Popover>
      </div>
    </div>
  );
}
