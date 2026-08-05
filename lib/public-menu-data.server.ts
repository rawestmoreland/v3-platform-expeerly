import "server-only";

import {
  getAllInterestCategories,
  getCategoryProductPagePath,
} from "@/lib/data/interest-categories-dev";
import { getAllBrands } from "@/lib/fixtures/video-reviews";
import type { LocaleId } from "@/lib/i18n";
import { pickLocalized } from "@/lib/i18n/content";
import { pathnameWithLocale } from "@/lib/i18n/routing";
import type { PublicMenuCatalog } from "@/lib/public-menu-types";

export function buildPublicMenuCatalog(locale: LocaleId): PublicMenuCatalog {
  const brands = getAllBrands().map((brand) => ({
    id: brand.slug,
    label: brand.name,
    href: pathnameWithLocale(`/video-reviews/brand/${brand.slug}`, locale),
  }));

  const categories = getAllInterestCategories().map((category) => ({
    id: category.uniqueCategoryId,
    label: pickLocalized(category.displayName, locale, "title") ?? category.slugs.en,
    href: pathnameWithLocale(getCategoryProductPagePath(category, locale), locale),
  }));

  return { brands, categories };
}
