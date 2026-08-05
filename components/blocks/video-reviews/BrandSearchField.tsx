"use client";

import { useEffect, useId, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import {
  DialogWindow,
  DialogWindowContent,
  PrimaryPink,
  SearchField,
  SearchResultItem,
  SearchResults,
} from "@/components/ui";
import type { BrandFixture } from "@/lib/fixtures/video-reviews";
import { t } from "@/lib/i18n";

const TOP_BRAND_LIMIT = 10;

export type BrandSearchFieldProps = {
  topBrands: BrandFixture[];
  allBrands: BrandFixture[];
};

function normalizeQuery(value: string): string {
  return value.trim().toLowerCase();
}

export function BrandSearchField({ topBrands, allBrands }: BrandSearchFieldProps) {
  const router = useRouter();
  const fieldId = useId();
  const listboxId = `${fieldId}-listbox`;
  const containerRef = useRef<HTMLDivElement>(null);
  const [query, setQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [unknownBrandName, setUnknownBrandName] = useState("");

  const normalizedQuery = normalizeQuery(query);

  const visibleBrands = useMemo(() => {
    if (!normalizedQuery) {
      return topBrands.slice(0, TOP_BRAND_LIMIT);
    }

    return allBrands.filter((brand) => brand.name.toLowerCase().includes(normalizedQuery));
  }, [allBrands, normalizedQuery, topBrands]);

  const showResults = isOpen && visibleBrands.length > 0;

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const handlePointerDown = (event: MouseEvent) => {
      if (!containerRef.current?.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handlePointerDown);
    return () => document.removeEventListener("mousedown", handlePointerDown);
  }, [isOpen]);

  const goToBrand = (brandSlug: string) => {
    setIsOpen(false);
    setQuery("");
    router.push(`/video-reviews/brand/${brandSlug}`);
  };

  const goToSubmitReview = () => {
    setIsDialogOpen(false);
    setIsOpen(false);
    setQuery("");
    router.push("/sign-in?sign-up");
  };

  const handleSearchSubmit = () => {
    const brandQuery = query.trim();
    if (!brandQuery) {
      setIsOpen(true);
      return;
    }

    const exactMatch = allBrands.find((brand) => brand.name.toLowerCase() === normalizedQuery);
    if (exactMatch) {
      goToBrand(exactMatch.slug);
      return;
    }

    if (visibleBrands.length === 1) {
      goToBrand(visibleBrands[0].slug);
      return;
    }

    if (visibleBrands.length > 0) {
      setIsOpen(true);
      return;
    }

    setUnknownBrandName(brandQuery);
    setIsOpen(false);
    setIsDialogOpen(true);
  };

  return (
    <>
      <div ref={containerRef} className="relative flex flex-col">
        <SearchField
          id={fieldId}
          label={t("player.hub.brandSearchLabel")}
          placeholder={t("player.hub.brandSearchPlaceholder")}
          value={query}
          state={isOpen ? "highlighted" : "default"}
          autoComplete="off"
          role="combobox"
          aria-expanded={showResults}
          aria-controls={showResults ? listboxId : undefined}
          onSearchSubmit={handleSearchSubmit}
          onFocus={() => setIsOpen(true)}
          onChange={(event) => {
            setQuery(event.target.value);
            setIsOpen(true);
          }}
          onKeyDown={(event) => {
            if (event.key === "Escape") {
              setIsOpen(false);
            }
          }}
        />

        {showResults ? (
          <SearchResults id={listboxId} className="absolute left-0 right-0 top-full z-50">
            {visibleBrands.map((brand) => (
              <SearchResultItem
                key={brand.slug}
                aria-selected="false"
                onMouseDown={(event) => event.preventDefault()}
                onClick={() => goToBrand(brand.slug)}
              >
                {brand.name}
              </SearchResultItem>
            ))}
          </SearchResults>
        ) : null}
      </div>

      <DialogWindow open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogWindowContent
          title={t("player.hub.brandSearchNoReviewsTitle")}
          description={t("player.hub.brandSearchNoReviewsDescription", {
            brand: unknownBrandName,
          })}
          footer={
            <PrimaryPink size="medium" onClick={() => goToSubmitReview()}>
              {t("player.hub.brandSearchBeFirst")}
            </PrimaryPink>
          }
        />
      </DialogWindow>
    </>
  );
}
