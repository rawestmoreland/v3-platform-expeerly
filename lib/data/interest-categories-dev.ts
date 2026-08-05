import fs from "node:fs";
import path from "node:path";
import type { LocaleId } from "@/lib/i18n";
import { getLocale } from "@/lib/i18n";
import type { LocalizedStringMap } from "@/lib/i18n/content";
import { DEFAULT_LOCALE, SUPPORTED_LOCALES } from "@/locales/index";

const DEV_CSV_PATH = path.join(process.cwd(), "lib/data/interest-categories.csv");

export type InterestCategoryRecord = {
  uniqueCategoryId: string;
  displayName: LocalizedStringMap;
  slugs: Record<LocaleId, string>;
  siteTitle: LocalizedStringMap;
  metaDescription: LocalizedStringMap;
  bodyText: LocalizedStringMap;
  footerText: LocalizedStringMap;
  iconLink?: string;
};

let cachedCategories: InterestCategoryRecord[] | null = null;

function parseCsvRecords(text: string): string[][] {
  const records: string[][] = [];
  let row: string[] = [];
  let field = "";
  let inQuotes = false;

  for (let i = 0; i < text.length; i += 1) {
    const char = text[i];
    const next = text[i + 1];

    if (inQuotes) {
      if (char === '"' && next === '"') {
        field += '"';
        i += 1;
      } else if (char === '"') {
        inQuotes = false;
      } else {
        field += char;
      }
      continue;
    }

    if (char === '"') {
      inQuotes = true;
    } else if (char === ",") {
      row.push(field);
      field = "";
    } else if (char === "\n" || (char === "\r" && next === "\n")) {
      row.push(field);
      field = "";
      if (row.some((cell) => cell.length > 0)) records.push(row);
      row = [];
      if (char === "\r") i += 1;
    } else if (char !== "\r") {
      field += char;
    }
  }

  if (field.length > 0 || row.length > 0) {
    row.push(field);
    records.push(row);
  }

  return records;
}

function toLocalizedTitleMap(
  en: string,
  de: string,
  fr: string,
  it: string,
): LocalizedStringMap {
  return {
    en: en ? { title: en } : undefined,
    de: de ? { title: de } : undefined,
    fr: fr ? { title: fr } : undefined,
    it: it ? { title: it } : undefined,
  };
}

function toLocalizedDescMap(
  en: string,
  de: string,
  fr: string,
  it: string,
): LocalizedStringMap {
  return {
    en: en ? { desc: en } : undefined,
    de: de ? { desc: de } : undefined,
    fr: fr ? { desc: fr } : undefined,
    it: it ? { desc: it } : undefined,
  };
}

function toLocalizedTextMap(
  en: string,
  de: string,
  fr: string,
  it: string,
): LocalizedStringMap {
  return {
    en: en ? { text: en } : undefined,
    de: de ? { text: de } : undefined,
    fr: fr ? { text: fr } : undefined,
    it: it ? { text: it } : undefined,
  };
}

function rowToRecord(headers: string[], values: string[]): InterestCategoryRecord | null {
  const row: Record<string, string> = {};
  headers.forEach((header, index) => {
    row[header] = (values[index] ?? "").trim();
  });

  const slugEn = row["URL category slug EN"] ?? "";
  if (!slugEn || /^\d+$/.test(slugEn)) return null;

  const slugs = {
    en: slugEn,
    de: row["URL category slug DE"] || slugEn,
    fr: row["URL category slug FR"] || slugEn,
    it: row["URL category slug IT"] || slugEn,
  } satisfies Record<LocaleId, string>;

  const icon = row["Category icon link"]?.trim();

  return {
    uniqueCategoryId: row.unique_category_id,
    displayName: toLocalizedTitleMap(
      row["Category Display Name EN"],
      row["Category Display Name DE"],
      row["Category Display Name FR"],
      row["Category Display Name IT"],
    ),
    slugs,
    siteTitle: toLocalizedTitleMap(
      row["Sitetitle Category EN"],
      row["Sitetitle Category DE"],
      row["Sitetitle Category FR"],
      row["Sitetitle Category IT"],
    ),
    metaDescription: toLocalizedDescMap(
      row["Meta category description EN"],
      row["Meta category description DE"],
      row["Meta category description FR"],
      row["Meta description category IT"],
    ),
    bodyText: toLocalizedTextMap(
      row["Teaser Category body text EN"],
      row["Teaser Category body text DE"],
      row["Teaser Category body text FR"],
      row["Teaser Category body text IT"],
    ),
    footerText: toLocalizedTextMap(
      row["Footer Category SEO text EN"],
      row["Footer Category SEO text DE"],
      row["Footer Category SEO text FR"],
      row["Footer Category SEO text IT"],
    ),
    iconLink: icon || undefined,
  };
}

function loadCategoriesFromCsv(): InterestCategoryRecord[] {
  if (!fs.existsSync(DEV_CSV_PATH)) {
    throw new Error(`Dev interest categories CSV not found: ${DEV_CSV_PATH}`);
  }

  const raw = fs.readFileSync(DEV_CSV_PATH, "utf8");
  const table = parseCsvRecords(raw);
  if (table.length < 2) return [];

  const headers = table[0];
  return table
    .slice(1)
    .map((values) => rowToRecord(headers, values))
    .filter((record): record is InterestCategoryRecord => record !== null);
}

/** Dev-only: reads category catalog from `lib/data/interest-categories.csv`. */
export function getAllInterestCategories(): InterestCategoryRecord[] {
  if (!cachedCategories) {
    cachedCategories = loadCategoriesFromCsv();
  }

  return cachedCategories;
}

export function getCategorySlug(category: InterestCategoryRecord, locale: LocaleId): string {
  return category.slugs[locale] ?? category.slugs[DEFAULT_LOCALE];
}

export function getCategoryBySlug(
  slug: string,
  _locale: LocaleId = getLocale(),
): InterestCategoryRecord | undefined {
  return getAllInterestCategories().find((category) =>
    SUPPORTED_LOCALES.some((supported) => category.slugs[supported] === slug),
  );
}

export function getCategoryByEnglishSlug(slug: string): InterestCategoryRecord | undefined {
  return getAllInterestCategories().find((category) => category.slugs.en === slug);
}

export function getCategoryProductPagePath(
  category: InterestCategoryRecord,
  locale: LocaleId = getLocale(),
): string {
  return `/video-reviews/productcategory/${getCategorySlug(category, locale)}`;
}

export function categoryMatchesReviewCategorySlug(
  category: InterestCategoryRecord,
  reviewCategorySlug: string,
): boolean {
  return category.slugs.en === reviewCategorySlug;
}
