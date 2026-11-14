import { localeUrl, type Locale } from "@/i18n/shared";
import { translate } from "@/i18n/server-dictionary";
import type { Metadata } from "next";
export const origin = "https://launcher.tflives.com";
export function socialImage(locale: Locale) {
  return {
    url: `${origin}/images/social/tfl-client-${locale}.png`,
    width: 1200,
    height: 630,
    type: "image/png",
    alt: translate(
      "Vista general de TFL Client, launcher de Minecraft Java",
      locale,
    ),
  };
}
export const seo = (
  title: string,
  description: string,
  path: string,
  locale: Locale = "es",
): Metadata => ({
  title,
  description,
  alternates: {
    canonical: localeUrl(path, locale),
    languages: {
      es: localeUrl(path, "es"),
      en: localeUrl(path, "en"),
      "x-default": localeUrl(path, "es"),
    },
  },
  openGraph: {
    title,
    description,
    url: localeUrl(path, locale),
    siteName: "TFL Client",
    locale: locale === "es" ? "es_ES" : "en_US",
    alternateLocale: locale === "es" ? "en_US" : "es_ES",
    type: "website",
    images: [socialImage(locale)],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: [socialImage(locale)],
  },
});
