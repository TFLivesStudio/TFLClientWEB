import { getTranslator } from "@/i18n/server";
import { dictionaryForLocale } from "@/i18n/server-dictionary";
import { SiteProviders } from "@/components/site-providers";
import { LocaleProvider } from "@/i18n/provider";
import { headers } from "next/headers";
import { socialImage } from "@/lib/seo";
import { siteStructuredData } from "@/lib/structured-data";
import { StructuredData } from "@/components/structured-data";
import type { Metadata, Viewport } from "next";
import "@fontsource/manrope/latin-400.css";
import "@fontsource/manrope/latin-600.css";
import "@fontsource/manrope/latin-700.css";
import "@fontsource/manrope/latin-800.css";
import "@fontsource/inter/latin-400.css";
import "@fontsource/inter/latin-500.css";
import "@fontsource/inter/latin-600.css";
import "./globals.css";

import { Header } from "@/components/header";
import { Footer } from "@/components/ui";
export async function generateMetadata(): Promise<Metadata> {
  const tr = await getTranslator();
  return {
    metadataBase: new URL("https://launcher.tflives.com"),
    applicationName: "TFL Client",
    category: "technology",
    openGraph: { images: [socialImage(tr.locale)] },
    twitter: { card: "summary_large_image", images: [socialImage(tr.locale)] },
    title: {
      default: tr("TFL Client | Launcher de Minecraft Java"),
      template: "%s | TFL Client",
    },
    description: tr(
      "Instala Minecraft, organiza tus versiones y gestiona tus mods desde un mismo launcher.",
    ),
    robots: {
      index: process.env.VERCEL_ENV === "production",
      follow: process.env.VERCEL_ENV === "production",
      googleBot: {
        index: process.env.VERCEL_ENV === "production",
        follow: process.env.VERCEL_ENV === "production",
        "max-image-preview": "large",
        "max-snippet": -1,
        "max-video-preview": -1,
      },
    },
  };
}
export const viewport: Viewport = {
  themeColor: "#4c8eff",
  colorScheme: "dark light",
};
export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const tr = await getTranslator();
  const path = (await headers()).get("x-tfl-path") || "/";
  return (
    <html
      lang={tr.locale}
      suppressHydrationWarning
      data-scroll-behavior="smooth"
    >
      <body>
        <StructuredData data={siteStructuredData(tr.locale, path)} />
        <LocaleProvider
          locale={tr.locale}
          dictionary={dictionaryForLocale(tr.locale)}
        >
          <SiteProviders>
            <a href="#contenido" className="skip-link">
              {tr("Saltar al contenido")}
            </a>
            <Header />
            <main id="contenido">{children}</main>
            <Footer />
          </SiteProviders>
        </LocaleProvider>
      </body>
    </html>
  );
}
