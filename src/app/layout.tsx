import type { Metadata } from "next";
import "@fontsource/manrope/latin-400.css";
import "@fontsource/manrope/latin-600.css";
import "@fontsource/manrope/latin-700.css";
import "@fontsource/manrope/latin-800.css";
import "@fontsource/inter/latin-400.css";
import "@fontsource/inter/latin-500.css";
import "@fontsource/inter/latin-600.css";
import "./globals.css";
import "./premium.css";
import { Header } from "@/components/header";
import { Footer } from "@/components/ui";
export const metadata: Metadata = {
  title: {
    default: "TFL Client — Tu Minecraft. Tu universo.",
    template: "%s · TFL Client",
  },
  description:
    "Descubre TFL Client, el launcher de Minecraft de TFLives. Tus instalaciones, TFL Selection y TFL Core, en un mismo ecosistema.",
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
