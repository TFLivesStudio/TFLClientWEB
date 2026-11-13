import en from "./en.json";
export type Locale = "es" | "en";
export const translate = (key: string, locale: Locale) =>
  locale === "en"
    ? ((en as Record<string, string>)[key.replace(/\s+/g, " ").trim()] ?? key)
    : key;
export const stripLocale = (path: string) =>
  path.replace(/^\/en(?=\/|$)/, "") || "/";
export const localizedPath = (path: string, locale: Locale) =>
  locale === "en" ? "/en" + (path === "/" ? "" : path) : path;
export const localeUrl = (path: string, locale: Locale) =>
  "https://launcher.tflives.com" + localizedPath(path, locale);
export function languageHref(
  path: string,
  locale: Locale,
  currentUrl?: string,
) {
  const localized = localizedPath(stripLocale(path), locale);
  if (!currentUrl) return localized;
  const current = new URL(currentUrl);
  return localized + current.search + current.hash;
}
export function translator(locale: Locale) {
  return Object.assign((key: string) => translate(key, locale), { locale });
}
