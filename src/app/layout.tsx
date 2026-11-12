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
export const metadata: Metadata = {
  metadataBase: new URL("https://launcher.tflives.com"),
  openGraph: {
    images: [
      {
        url: "/images/launcher-settings.webp",
        width: 1440,
        height: 900,
        alt: "Configuración de TFL Client",
      },
    ],
  },
  title: {
    default: "TFL Client | Launcher de Minecraft Java",
    template: "%s | TFL Client",
  },
  description:
    "Instala Minecraft, organiza tus versiones y gestiona tus mods desde un mismo launcher.",
  robots: {
    index: process.env.VERCEL_ENV === "production",
    follow: process.env.VERCEL_ENV === "production",
  },
};
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body>
        <a href="#contenido" className="skip-link">
          Saltar al contenido
        </a>
        <Header />
        <main id="contenido">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
