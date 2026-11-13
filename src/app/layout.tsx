import { getTranslator } from "@/i18n/server";
import { SiteProviders } from "@/components/site-providers";
import { LocaleProvider } from "@/i18n/provider";
import type { Metadata } from "next";
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
    openGraph: {
      images: [
        {
          url: "/images/launcher-settings.webp",
          width: 1440,
          height: 900,
          alt: tr("Configuración de TFL Client"),
        },
      ],
    },
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
    },
  };
}
export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const tr = await getTranslator();
  return (
    <html lang={tr.locale} suppressHydrationWarning>
      <body>
        <LocaleProvider locale={tr.locale}>
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
