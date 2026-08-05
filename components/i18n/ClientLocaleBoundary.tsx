"use client";

import { setLocale, type LocaleId } from "@/lib/i18n";
import type { ReactNode } from "react";

/**
 * Keeps module locale in sync on the client so `t()` / `getLocale()` match the
 * server render (cookie from `proxy.ts` + `applyRequestLocale()`).
 */
export function ClientLocaleBoundary({
  locale,
  children,
}: {
  locale: LocaleId;
  children: ReactNode;
}) {
  setLocale(locale);
  return children;
}
