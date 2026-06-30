export const LOCALE_COOKIE = "bella-roca-locale";
export const locales = ["en", "es"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "en";

export function isLocale(value: string): value is Locale {
  return locales.includes(value as Locale);
}

export function detectLocaleFromHeader(acceptLanguage: string | null): Locale {
  if (!acceptLanguage) return defaultLocale;
  const lower = acceptLanguage.toLowerCase();
  if (lower.includes("es")) return "es";
  return defaultLocale;
}
