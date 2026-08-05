import {
  de,
  en,
  fr,
  it,
  DEFAULT_LOCALE,
  type LocaleId,
  type LocaleMessages,
} from "@/locales/index";

const messagesByLocale: Record<LocaleId, LocaleMessages> = {
  en,
  de,
  fr,
  it,
};

let activeLocale: LocaleId = DEFAULT_LOCALE;

export function getLocale(): LocaleId {
  return activeLocale;
}

export function setLocale(locale: LocaleId): void {
  activeLocale = locale;
}

export function getUiStrings(): LocaleMessages {
  return messagesByLocale[getLocale()] ?? messagesByLocale[DEFAULT_LOCALE];
}

type MessageParams = Record<string, string | number>;

function getByPath(source: unknown, path: string): unknown {
  return path.split(".").reduce<unknown>((current, segment) => {
    if (current && typeof current === "object" && segment in current) {
      return (current as Record<string, unknown>)[segment];
    }

    return undefined;
  }, source);
}

function interpolate(template: string, params?: MessageParams): string {
  if (!params) return template;

  return template.replace(/\{(\w+)\}/g, (_, key: string) => {
    const value = params[key];
    return value === undefined ? `{${key}}` : String(value);
  });
}

export function t(path: string, params?: MessageParams): string {
  const primary = getByPath(getUiStrings(), path);
  const fallback =
    getLocale() !== DEFAULT_LOCALE ? getByPath(messagesByLocale[DEFAULT_LOCALE], path) : undefined;
  const value = primary ?? fallback;

  if (typeof value === "string") {
    return interpolate(value, params);
  }

  if (Array.isArray(value)) {
    return value.join(", ");
  }

  return path;
}

export function getWeekdayLabels(): readonly string[] {
  return getUiStrings().ui.calendar.weekdays;
}

export function formatUiDate(
  date: Date,
  options?: Intl.DateTimeFormatOptions,
): string {
  return new Intl.DateTimeFormat(getLocale(), options).format(date);
}

export function formatUiBytes(bytes: number): string {
  if (bytes < 1024 * 1024) {
    return t("ui.fileUpload.bytes.kilobytes", { size: Math.round(bytes / 1024) });
  }

  return t("ui.fileUpload.bytes.megabytes", {
    size: Math.round((bytes / 1024 / 1024) * 10) / 10,
  });
}

export type { LocaleId, LocaleMessages };
