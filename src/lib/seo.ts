import { localeUrl, translate, type Locale } from "@/i18n/shared";
import type { Metadata } from "next";
export const origin = "https://launcher.tflives.com";
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
    type: "website",
    images: [
      {
        url: origin + "/images/launcher-settings.webp",
        width: 1440,
        height: 900,
        alt: translate("Configuración de TFL Client", locale),
      },
    ],
  },
  twitter: { card: "summary_large_image", title, description },
});
