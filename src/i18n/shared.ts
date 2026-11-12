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
export function translator(locale: Locale) {
  return Object.assign((key: string) => translate(key, locale), { locale });
}
