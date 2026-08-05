import slugMap from "@/lib/data/interest-category-slugs.json";
import { DEFAULT_LOCALE, type LocaleId } from "@/locales/index";

export type CategorySlugByLocale = Record<LocaleId, string>;

/** English fixture `categorySlug` → localized URL segment (from interest-categories.csv). */
export const CATEGORY_SLUG_BY_EN = slugMap as Record<string, CategorySlugByLocale>;

export function getLocalizedCategorySlug(
  categorySlugEn: string,
  locale: LocaleId,
): string {
  const entry = CATEGORY_SLUG_BY_EN[categorySlugEn];
  return entry?.[locale] ?? entry?.[DEFAULT_LOCALE] ?? categorySlugEn;
}
