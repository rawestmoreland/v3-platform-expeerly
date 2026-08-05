import { cookies } from "next/headers";
import { DEFAULT_LOCALE } from "@/locales/index";
import { setLocale, type LocaleId } from "@/lib/i18n";
import { isSupportedLocaleSegment, LOCALE_COOKIE_NAME } from "@/lib/i18n/routing";

export async function applyRequestLocale(): Promise<LocaleId> {
  const cookieStore = await cookies();
  const value = cookieStore.get(LOCALE_COOKIE_NAME)?.value;

  if (value && isSupportedLocaleSegment(value)) {
    setLocale(value);
    return value;
  }

  setLocale(DEFAULT_LOCALE);
  return DEFAULT_LOCALE;
}
