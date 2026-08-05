"use server";

import { cookies } from "next/headers";
import type { LocaleId } from "@/locales/index";
import {
  isSupportedLocaleSegment,
  LOCALE_COOKIE_MAX_AGE_SECONDS,
  LOCALE_COOKIE_NAME,
} from "@/lib/i18n/routing";

export async function setPreferredLocaleCookie(locale: LocaleId): Promise<void> {
  if (!isSupportedLocaleSegment(locale)) {
    return;
  }

  const cookieStore = await cookies();
  cookieStore.set(LOCALE_COOKIE_NAME, locale, {
    path: "/",
    sameSite: "lax",
    maxAge: LOCALE_COOKIE_MAX_AGE_SECONDS,
  });
}
