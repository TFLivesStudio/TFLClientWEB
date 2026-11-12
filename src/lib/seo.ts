import { localizedPath, translate, type Locale } from "@/i18n/shared";
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
    canonical: origin + localizedPath(path, locale),
    languages: {
      es: origin + path,
      en: origin + localizedPath(path, "en"),
      "x-default": origin + path,
    },
  },
  openGraph: {
    title,
    description,
    url: origin + localizedPath(path, locale),
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
