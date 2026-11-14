export type Locale = "es" | "en";
export type Dictionary = Readonly<Record<string, string>>;
export function translate(key: string, locale: Locale, dictionary: Dictionary) {
  if (locale === "es") return key;
  const normalized = key.replace(/\s+/g, " ").trim();
  return Object.hasOwn(dictionary, normalized) ? dictionary[normalized] : key;
}
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
export function translator(locale: Locale, dictionary: Dictionary) {
  return Object.assign((key: string) => translate(key, locale, dictionary), { locale });
}
