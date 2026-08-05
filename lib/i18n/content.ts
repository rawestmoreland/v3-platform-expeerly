import type { LocaleId } from "@/locales/index";

export type LocalizedStringMap = Partial<Record<LocaleId, { title?: string; text?: string; desc?: string }>>;

export function pickLocalized(
  map: LocalizedStringMap | undefined,
  locale: LocaleId,
  field: "title" | "text" | "desc",
): string | undefined {
  if (!map) return undefined;

  const localized = map[locale]?.[field] ?? map.en?.[field];
  return localized ?? undefined;
}
