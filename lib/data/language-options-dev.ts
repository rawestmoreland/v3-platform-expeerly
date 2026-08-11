import type { LocaleId } from "@/lib/i18n";
import { getLocale } from "@/lib/i18n";
import { pickLocalized, type LocalizedStringMap } from "@/lib/i18n/content";

/**
 * Dev-only spoken-language catalog. Mirrors `language_options` (code, label, sort_order)
 * from contracts/schema.dbml — that table isn't migrated yet, so this stands in the same
 * way lib/data/interest-categories-dev.ts stands in for the (also unmigrated)
 * interest_categories table. Codes are ISO 639-1; values written to
 * users_analytics_v2.spoken_language_codes and campaigns.reviewer_languages should match.
 */
export type LanguageOptionRecord = {
  code: string;
  displayName: LocalizedStringMap;
  sortOrder: number;
};

function name(en: string, de: string, fr: string, it: string): LocalizedStringMap {
  return {
    en: { title: en },
    de: { title: de },
    fr: { title: fr },
    it: { title: it },
  };
}

const LANGUAGE_OPTIONS: LanguageOptionRecord[] = [
  { code: "en", displayName: name("English", "Englisch", "Anglais", "Inglese"), sortOrder: 0 },
  { code: "de", displayName: name("German", "Deutsch", "Allemand", "Tedesco"), sortOrder: 1 },
  { code: "fr", displayName: name("French", "Französisch", "Français", "Francese"), sortOrder: 2 },
  { code: "it", displayName: name("Italian", "Italienisch", "Italien", "Italiano"), sortOrder: 3 },
  { code: "es", displayName: name("Spanish", "Spanisch", "Espagnol", "Spagnolo"), sortOrder: 4 },
  { code: "pt", displayName: name("Portuguese", "Portugiesisch", "Portugais", "Portoghese"), sortOrder: 5 },
  { code: "nl", displayName: name("Dutch", "Niederländisch", "Néerlandais", "Olandese"), sortOrder: 6 },
  { code: "pl", displayName: name("Polish", "Polnisch", "Polonais", "Polacco"), sortOrder: 7 },
  { code: "sv", displayName: name("Swedish", "Schwedisch", "Suédois", "Svedese"), sortOrder: 8 },
  { code: "da", displayName: name("Danish", "Dänisch", "Danois", "Danese"), sortOrder: 9 },
  { code: "nb", displayName: name("Norwegian", "Norwegisch", "Norvégien", "Norvegese"), sortOrder: 10 },
  { code: "fi", displayName: name("Finnish", "Finnisch", "Finnois", "Finlandese"), sortOrder: 11 },
  { code: "el", displayName: name("Greek", "Griechisch", "Grec", "Greco"), sortOrder: 12 },
  { code: "tr", displayName: name("Turkish", "Türkisch", "Turc", "Turco"), sortOrder: 13 },
  { code: "ru", displayName: name("Russian", "Russisch", "Russe", "Russo"), sortOrder: 14 },
  { code: "uk", displayName: name("Ukrainian", "Ukrainisch", "Ukrainien", "Ucraino"), sortOrder: 15 },
  { code: "cs", displayName: name("Czech", "Tschechisch", "Tchèque", "Ceco"), sortOrder: 16 },
  { code: "sk", displayName: name("Slovak", "Slowakisch", "Slovaque", "Slovacco"), sortOrder: 17 },
  { code: "hu", displayName: name("Hungarian", "Ungarisch", "Hongrois", "Ungherese"), sortOrder: 18 },
  { code: "ro", displayName: name("Romanian", "Rumänisch", "Roumain", "Rumeno"), sortOrder: 19 },
  { code: "ar", displayName: name("Arabic", "Arabisch", "Arabe", "Arabo"), sortOrder: 20 },
  { code: "zh", displayName: name("Chinese", "Chinesisch", "Chinois", "Cinese"), sortOrder: 21 },
  { code: "ja", displayName: name("Japanese", "Japanisch", "Japonais", "Giapponese"), sortOrder: 22 },
  { code: "ko", displayName: name("Korean", "Koreanisch", "Coréen", "Coreano"), sortOrder: 23 },
];

/** Dev-only: static spoken-language catalog (no live `language_options` table yet). */
export function getAllLanguageOptions(): LanguageOptionRecord[] {
  return LANGUAGE_OPTIONS;
}

export function getLanguageOptionLabel(
  language: LanguageOptionRecord,
  locale: LocaleId = getLocale(),
): string {
  return pickLocalized(language.displayName, locale, "title") ?? language.code;
}

export function getLanguageOptionByCode(code: string): LanguageOptionRecord | undefined {
  return LANGUAGE_OPTIONS.find((language) => language.code === code);
}
