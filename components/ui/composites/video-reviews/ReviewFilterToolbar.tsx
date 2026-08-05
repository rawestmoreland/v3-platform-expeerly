"use client";

import { useMemo, useState, type ReactNode } from "react";
import { Heading } from "@/components/ui/atoms/Heading";
import { Icon, type IconName } from "@/components/ui/atoms/Icon";
import { Tag } from "@/components/ui/atoms/Tag";
import { Text } from "@/components/ui/atoms/Text";
import { OutlineNeutral } from "@/components/ui/atoms/button/OutlineNeutral";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/composites/Popover";
import {
  ALL_FILTER_VALUE,
  type BrandReviewFilterOption,
  type BrandReviewSortOption,
} from "@/lib/fixtures/brand-reviews-grid";
import { t } from "@/lib/i18n";
import { cn } from "@/lib/utils";

const SORT_OPTIONS: readonly { value: BrandReviewSortOption; labelKey: string }[] = [
  { value: "most-reviewed", labelKey: "player.brand.sortMostReviewed" },
  { value: "highest-rated", labelKey: "player.brand.sortHighestRated" },
  { value: "most-viewed", labelKey: "player.brand.sortMostViewed" },
  { value: "newest", labelKey: "player.brand.sortNewest" },
];

type OptionMenuListProps = {
  value: string;
  allLabel: string;
  options: BrandReviewFilterOption[];
  onSelect: (value: string) => void;
};

function OptionMenuList({ value, allLabel, options, onSelect }: OptionMenuListProps) {
  const optionClassName = (optionValue: string) =>
    cn(
      "w-full rounded-md px-3 py-2 text-left text-body-small",
      optionValue === value
        ? "bg-surface-active font-bold text-foreground-title"
        : "text-foreground-title-subtle hover:bg-surface-hover hover:text-secondary",
    );

  return (
    <ul className="flex max-h-[40dvh] flex-col gap-1 overflow-y-auto">
      <li>
        <button type="button" onClick={() => onSelect(ALL_FILTER_VALUE)} className={optionClassName(ALL_FILTER_VALUE)}>
          {allLabel}
        </button>
      </li>
      {options.map((option) => (
        <li key={option.value}>
          <button
            type="button"
            onClick={() => onSelect(option.value)}
            className={optionClassName(option.value)}
          >
            {option.label}
          </button>
        </li>
      ))}
    </ul>
  );
}

type ToolbarMenuProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  label: string;
  iconName: IconName;
  ariaLabel: string;
  active?: boolean;
  contentClassName?: string;
  popoverAlign?: "start" | "center" | "end";
  buttonClassName?: string;
  children: ReactNode;
};

function ToolbarMenu({
  open,
  onOpenChange,
  label,
  iconName,
  ariaLabel,
  active = false,
  contentClassName,
  popoverAlign = "end",
  buttonClassName,
  children,
}: ToolbarMenuProps) {
  return (
    <Popover open={open} onOpenChange={onOpenChange}>
      <PopoverTrigger asChild>
        <OutlineNeutral
          type="button"
          size="medium"
          aria-label={ariaLabel}
          aria-expanded={open}
          iconLeft={<Icon name={iconName} size="sm" />}
          iconRight={
            <Icon
              name="chevron-down"
              size="sm"
              className={cn("transition-transform", open && "rotate-180")}
            />
          }
          className={cn(
            active && "border-border-focus text-foreground-body",
            buttonClassName,
          )}
        >
          {label}
        </OutlineNeutral>
      </PopoverTrigger>
      <PopoverContent align={popoverAlign} className={cn("p-2", contentClassName ?? "w-72")}>
        {children}
      </PopoverContent>
    </Popover>
  );
}

type ActiveFilterTagsProps = {
  hasProductFilter: boolean;
  hasReviewerFilter: boolean;
  activeProductLabel?: string;
  activeReviewerLabel?: string;
  onClearProduct: () => void;
  onClearReviewer: () => void;
};

function ActiveFilterTags({
  hasProductFilter,
  hasReviewerFilter,
  activeProductLabel,
  activeReviewerLabel,
  onClearProduct,
  onClearReviewer,
}: ActiveFilterTagsProps) {
  if (!hasProductFilter && !hasReviewerFilter) {
    return null;
  }

  return (
    <>
      {hasProductFilter && activeProductLabel ? (
        <Tag label={activeProductLabel} onRemove={onClearProduct} />
      ) : null}
      {hasReviewerFilter && activeReviewerLabel ? (
        <Tag label={activeReviewerLabel} onRemove={onClearReviewer} />
      ) : null}
    </>
  );
}

type ToolbarFilterMenusProps = {
  productOpen: boolean;
  onProductOpenChange: (open: boolean) => void;
  reviewerOpen: boolean;
  onReviewerOpenChange: (open: boolean) => void;
  sortOpen: boolean;
  onSortOpenChange: (open: boolean) => void;
  productSlug: string;
  onSelectProduct: (value: string) => void;
  products: BrandReviewFilterOption[];
  reviewerName: string;
  onSelectReviewer: (value: string) => void;
  reviewers: BrandReviewFilterOption[];
  sort: BrandReviewSortOption;
  onSortChange: (sort: BrandReviewSortOption) => void;
  hasProductFilter: boolean;
  hasReviewerFilter: boolean;
  activeProductLabel?: string;
  activeReviewerLabel?: string;
  popoverAlign?: "start" | "center" | "end";
  fillWidth?: boolean;
};

function ToolbarFilterMenus({
  productOpen,
  onProductOpenChange,
  reviewerOpen,
  onReviewerOpenChange,
  sortOpen,
  onSortOpenChange,
  productSlug,
  onSelectProduct,
  products,
  reviewerName,
  onSelectReviewer,
  reviewers,
  sort,
  onSortChange,
  hasProductFilter,
  hasReviewerFilter,
  activeProductLabel,
  activeReviewerLabel,
  popoverAlign = "end",
  fillWidth = false,
}: ToolbarFilterMenusProps) {
  const menuButtonClassName = fillWidth ? "w-full min-w-0" : undefined;

  const menus = (
    <>
      <ToolbarMenu
        open={productOpen}
        onOpenChange={onProductOpenChange}
        label={t("player.brand.filterProductLabel")}
        iconName="package"
        ariaLabel={t("player.brand.filterProductLabel")}
        active={hasProductFilter}
        popoverAlign={popoverAlign}
        buttonClassName={menuButtonClassName}
      >
        <OptionMenuList
          value={productSlug}
          allLabel={t("player.brand.filterAllProducts")}
          options={products}
          onSelect={onSelectProduct}
        />
      </ToolbarMenu>

      <ToolbarMenu
        open={reviewerOpen}
        onOpenChange={onReviewerOpenChange}
        label={t("player.brand.filterReviewerLabel")}
        iconName="user"
        ariaLabel={t("player.brand.filterReviewerLabel")}
        active={hasReviewerFilter}
        popoverAlign={popoverAlign}
        buttonClassName={menuButtonClassName}
      >
        <OptionMenuList
          value={reviewerName}
          allLabel={t("player.brand.filterAllReviewers")}
          options={reviewers}
          onSelect={onSelectReviewer}
        />
      </ToolbarMenu>

      <ToolbarMenu
        open={sortOpen}
        onOpenChange={onSortOpenChange}
        label={t("player.brand.sortButton")}
        iconName="arrow-up-down"
        ariaLabel={t("player.brand.sortLabel")}
        contentClassName="w-56"
        popoverAlign={popoverAlign}
        buttonClassName={menuButtonClassName}
      >
        <ul className="flex flex-col gap-1">
          {SORT_OPTIONS.map((option) => (
            <li key={option.value}>
              <button
                type="button"
                onClick={() => {
                  onSortChange(option.value);
                  onSortOpenChange(false);
                }}
                className={cn(
                  "w-full rounded-md px-3 py-2 text-left text-body-small",
                  option.value === sort
                    ? "bg-surface-active font-bold text-foreground-title"
                    : "text-foreground-title-subtle hover:bg-surface-hover hover:text-secondary",
                )}
              >
                {t(option.labelKey)}
              </button>
            </li>
          ))}
        </ul>
      </ToolbarMenu>
    </>
  );

  return (
    <>
      {fillWidth ? <div className="grid w-full grid-cols-3 gap-2">{menus}</div> : menus}

      <ActiveFilterTags
        hasProductFilter={hasProductFilter}
        hasReviewerFilter={hasReviewerFilter}
        activeProductLabel={activeProductLabel}
        activeReviewerLabel={activeReviewerLabel}
        onClearProduct={() => onSelectProduct(ALL_FILTER_VALUE)}
        onClearReviewer={() => onSelectReviewer(ALL_FILTER_VALUE)}
      />
    </>
  );
}

export type ReviewFilterToolbarProps = {
  productSlug: string;
  onProductSlugChange: (productSlug: string) => void;
  products: BrandReviewFilterOption[];
  reviewerName: string;
  onReviewerNameChange: (reviewerName: string) => void;
  reviewers: BrandReviewFilterOption[];
  sort: BrandReviewSortOption;
  onSortChange: (sort: BrandReviewSortOption) => void;
};

export function ReviewFilterToolbar({
  productSlug,
  onProductSlugChange,
  products,
  reviewerName,
  onReviewerNameChange,
  reviewers,
  sort,
  onSortChange,
}: ReviewFilterToolbarProps) {
  const [productOpen, setProductOpen] = useState(false);
  const [reviewerOpen, setReviewerOpen] = useState(false);
  const [sortOpen, setSortOpen] = useState(false);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  const hasProductFilter = productSlug !== ALL_FILTER_VALUE;
  const hasReviewerFilter = reviewerName !== ALL_FILTER_VALUE;

  const activeProductLabel = useMemo(
    () => products.find((option) => option.value === productSlug)?.label,
    [productSlug, products],
  );

  const activeReviewerLabel = useMemo(
    () => reviewers.find((option) => option.value === reviewerName)?.label,
    [reviewerName, reviewers],
  );

  const selectProduct = (value: string) => {
    onProductSlugChange(value);
    setProductOpen(false);
  };

  const selectReviewer = (value: string) => {
    onReviewerNameChange(value);
    setReviewerOpen(false);
  };

  const sharedMenuProps = {
    productOpen,
    onProductOpenChange: setProductOpen,
    reviewerOpen,
    onReviewerOpenChange: setReviewerOpen,
    sortOpen,
    onSortOpenChange: setSortOpen,
    productSlug,
    onSelectProduct: selectProduct,
    products,
    reviewerName,
    onSelectReviewer: selectReviewer,
    reviewers,
    sort,
    onSortChange,
    hasProductFilter,
    hasReviewerFilter,
    activeProductLabel,
    activeReviewerLabel,
  };

  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      <Heading as="h2" variant="heading-3" id="brand-reviews-heading">
        {t("player.brand.allReviewsHeading")}
      </Heading>

      <div className="sm:hidden">
        <div className="overflow-hidden rounded-lg border border-border bg-surface shadow-sm">
          <button
            type="button"
            aria-expanded={mobileFiltersOpen}
            aria-controls="brand-reviews-mobile-filters"
            onClick={() => setMobileFiltersOpen((open) => !open)}
            className={cn(
              "flex w-full items-center gap-3 px-4 py-3 text-left",
              "text-foreground-title transition-colors hover:text-secondary",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus focus-visible:ring-inset",
            )}
          >
            <Icon name="sliders-horizontal" size="sm" aria-hidden className="shrink-0 text-foreground-title-subtle" />
            <Text as="span" variant="body-small" className="min-w-0 flex-1 text-body-small-bold">
              {t("player.brand.filtersTitle")}
            </Text>
            <Icon
              name="chevron-down"
              size="sm"
              aria-hidden
              className={cn(
                "shrink-0 text-foreground-title-subtle transition-transform",
                mobileFiltersOpen && "rotate-180",
              )}
            />
          </button>

          {mobileFiltersOpen ? (
            <div
              id="brand-reviews-mobile-filters"
              className="flex flex-col gap-2 border-t border-border px-4 pb-4 pt-3"
            >
              <ToolbarFilterMenus {...sharedMenuProps} popoverAlign="start" fillWidth />
            </div>
          ) : null}
        </div>
      </div>

      <div className="hidden flex-wrap items-center gap-2 sm:flex sm:shrink-0 sm:justify-end">
        <ToolbarFilterMenus {...sharedMenuProps} />
      </div>
    </div>
  );
}
