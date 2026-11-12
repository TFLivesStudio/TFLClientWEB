import type { Metadata } from "next";
export const origin = "https://launcher.tflives.com";
export const seo = (
  title: string,
  description: string,
  path: string,
): Metadata => ({
  title,
  description,
  alternates: { canonical: origin + path },
  openGraph: {
    title,
    description,
    url: origin + path,
    siteName: "TFL Client",
    locale: "es_ES",
    type: "website",
    images: [
      {
        url: origin + "/images/launcher-settings.webp",
        width: 1440,
        height: 900,
        alt: "Configuración de TFL Client",
      },
    ],
  },
  twitter: { card: "summary_large_image", title, description },
});
