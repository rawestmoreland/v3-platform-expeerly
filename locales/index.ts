import productDe from "./de.json";
import productEn from "./en.json";
import productFr from "./fr.json";
import productIt from "./it.json";
import bdnDe from "./bdn/de.json";
import bdnEn from "./bdn/en.json";
import bdnFr from "./bdn/fr.json";
import bdnIt from "./bdn/it.json";

export type LocaleId = "en" | "de" | "fr" | "it";

export const DEFAULT_LOCALE: LocaleId = "en";

export const SUPPORTED_LOCALES: readonly LocaleId[] = ["en", "de", "fr", "it"];

function mergeMessages(
  product: typeof productEn,
  bdn: typeof bdnEn,
): typeof productEn & typeof bdnEn {
  return { ...product, ...bdn };
}

export const en = mergeMessages(productEn, bdnEn);
export const de = mergeMessages(productDe, bdnDe);
export const fr = mergeMessages(productFr, bdnFr);
export const it = mergeMessages(productIt, bdnIt);

export type LocaleMessages = typeof en;
