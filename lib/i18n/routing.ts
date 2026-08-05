import { DEFAULT_LOCALE, SUPPORTED_LOCALES, type LocaleId } from "@/locales/index";

export const LOCALE_COOKIE_NAME = "NEXT_LOCALE";

/** Set by `proxy.ts` on each request for server components (locale-stripped path). */
export const PATHNAME_HEADER = "x-pathname";

/** Persist browser-detected or user-selected locale across sessions. */
export const LOCALE_COOKIE_MAX_AGE_SECONDS = 60 * 60 * 24 * 365;

export function formatLocaleCookieValue(locale: LocaleId): string {
  return `${LOCALE_COOKIE_NAME}=${locale};path=/;max-age=${LOCALE_COOKIE_MAX_AGE_SECONDS};SameSite=Lax`;
}

/**
 * Path prefixes that receive a locale segment in the URL (e.g. `/de/video-reviews`).
 * www / player / marketing surfaces only.
 */
export const LOCALE_PREFIXED_PATH_PREFIXES = [
  "/",
  "/video-reviews",
] as const;

/**
 * App (authenticated) paths: never prefixed with `/{locale}`.
 * UI copy may still use `t()` / `locales/*.json`.
 */
export const LOCALE_EXEMPT_PATH_PREFIXES = [
  "/company",
  "/reviewer",
  "/sign-in",
  "/bdn",
] as const;

export function isLocaleExemptPath(pathname: string): boolean {
  return LOCALE_EXEMPT_PATH_PREFIXES.some(
    (prefix) => pathname === prefix || pathname.startsWith(`${prefix}/`),
  );
}

export function shouldPrefixPathWithLocale(pathname: string): boolean {
  if (isLocaleExemptPath(pathname)) return false;

  return LOCALE_PREFIXED_PATH_PREFIXES.some((prefix) => {
    if (prefix === "/") {
      return pathname === "/" || pathname.startsWith("/video-reviews");
    }

    return pathname === prefix || pathname.startsWith(`${prefix}/`);
  });
}

export function isSupportedLocaleSegment(segment: string): segment is LocaleId {
  return (SUPPORTED_LOCALES as readonly string[]).includes(segment);
}

export function stripLocalePrefix(pathname: string): {
  locale: LocaleId | null;
  pathnameWithoutLocale: string;
} {
  const segments = pathname.split("/").filter(Boolean);
  const first = segments[0];

  if (first && isSupportedLocaleSegment(first)) {
    if (first === DEFAULT_LOCALE) {
      const rest = segments.slice(1);
      const pathnameWithoutLocale = rest.length === 0 ? "/" : `/${rest.join("/")}`;
      return { locale: null, pathnameWithoutLocale };
    }
    const rest = segments.slice(1);
    const pathnameWithoutLocale = rest.length === 0 ? "/" : `/${rest.join("/")}`;
    return {
      locale: first,
      pathnameWithoutLocale,
    };
  }

  return { locale: null, pathnameWithoutLocale: pathname };
}

/**
 * Picks the best supported locale from `Accept-Language` (no cookie / URL segment).
 */
export function negotiateLocaleFromAcceptLanguage(
  acceptLanguage: string | null | undefined,
): LocaleId {
  if (!acceptLanguage?.trim()) {
    return DEFAULT_LOCALE;
  }

  const preferences = acceptLanguage
    .split(",")
    .map((part) => {
      const [tag, ...params] = part.trim().split(";");
      const qParam = params.find((p) => p.trim().startsWith("q="));
      const q = qParam ? Number.parseFloat(qParam.trim().slice(2)) : 1;
      const primary = tag.trim().split("-")[0]?.toLowerCase() ?? "";
      return { primary, q: Number.isFinite(q) ? q : 0 };
    })
    .filter((entry) => entry.primary)
    .sort((a, b) => b.q - a.q);

  for (const { primary } of preferences) {
    if (isSupportedLocaleSegment(primary)) {
      return primary;
    }
  }

  return DEFAULT_LOCALE;
}

export function resolvePreferredLocale(
  cookieValue: string | undefined,
  acceptLanguage: string | null | undefined,
): LocaleId {
  if (cookieValue && isSupportedLocaleSegment(cookieValue)) {
    return cookieValue;
  }

  return negotiateLocaleFromAcceptLanguage(acceptLanguage);
}

export function pathnameWithLocale(pathname: string, locale: LocaleId): string {
  if (locale === DEFAULT_LOCALE || !shouldPrefixPathWithLocale(pathname)) {
    return pathname;
  }

  if (pathname === "/") {
    return `/${locale}`;
  }

  return `/${locale}${pathname}`;
}
