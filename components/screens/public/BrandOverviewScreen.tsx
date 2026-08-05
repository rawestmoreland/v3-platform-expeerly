"use client";

import { Fragment, useMemo, useState } from "react";
import { BrandReviewsCarouselSection } from "@/components/blocks/video-reviews/BrandReviewsCarouselSection";
import { HubAllBrandsSection } from "@/components/blocks/video-reviews/HubAllBrandsSection";
import { HubBrandSearchToolbar } from "@/components/blocks/video-reviews/HubBrandSearchToolbar";
import { HubExpeerlyPromoCard } from "@/components/blocks/video-reviews/HubExpeerlyPromoCard";
import { Heading } from "@/components/ui/atoms/Heading";
import {
  getAllBrands,
  getBrandsSortedByReviewCount,
  getHubCarouselBrands,
  getHubCarouselReviews,
  sortBrands,
  type BrandSortOption,
} from "@/lib/fixtures/video-reviews";
import { t } from "@/lib/i18n";

export function BrandOverviewScreen() {
  const [sort, setSort] = useState<BrandSortOption>("most-reviewed");

  const brandsAlphabetical = useMemo(
    () => [...getAllBrands()].sort((left, right) => left.name.localeCompare(right.name)),
    [],
  );
  const topBrands = useMemo(() => getBrandsSortedByReviewCount(), []);
  const carouselBrands = useMemo(() => getHubCarouselBrands(), []);
  const carouselBrandSlugs = useMemo(
    () => new Set(carouselBrands.map((brand) => brand.slug)),
    [carouselBrands],
  );

  const listBrands = useMemo(() => {
    const filtered = brandsAlphabetical.filter((brand) => !carouselBrandSlugs.has(brand.slug));
    return sortBrands(filtered, sort);
  }, [brandsAlphabetical, carouselBrandSlugs, sort]);

  return (
    <div className="mx-auto w-full max-w-content px-6 py-10 md:px-16 lg:px-20">
      <section className="flex w-full flex-col items-center gap-6 text-center">
        <Heading as="h1" variant="heading-1" className="w-full max-w-2xl">
          <span className="block">{t("player.hub.titleLine1")}</span>
          <span className="block">{t("player.hub.titleLine2")}</span>
        </Heading>

        <div className="w-full max-w-2xl">
          <HubBrandSearchToolbar
            topBrands={topBrands}
            allBrands={brandsAlphabetical}
            sort={sort}
            onSortChange={setSort}
          />
        </div>
      </section>

      <div className="mt-8 flex flex-col gap-8 md:mt-10 md:gap-10">
        {carouselBrands.map((brand, index) => (
          <Fragment key={brand.slug}>
            <BrandReviewsCarouselSection
              brand={brand}
              reviews={getHubCarouselReviews(brand.slug)}
            />
            {index === 2 ? <HubExpeerlyPromoCard /> : null}
          </Fragment>
        ))}

        <HubAllBrandsSection brands={listBrands} />
      </div>
    </div>
  );
}
