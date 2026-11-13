import { ScanSection } from "@/components/scan-section";
import { LauncherFeatures } from "@/components/launcher-features";
import { ArrowDown } from "lucide-react";
import { getTranslator } from "@/i18n/server";
import { MemoryComparison } from "@/components/memory-comparison";
import Link from "@/components/locale-link";
import { LauncherImage } from "@/components/launcher-image";
import { Ambient } from "@/components/ambient";
import { Gallery } from "@/components/gallery";
import { DownloadCTA, FAQ } from "@/components/ui";
import { getReleases, releasePath } from "@/lib/releases";
import { StructuredData } from "@/components/structured-data";
import { localeUrl } from "@/i18n/shared";
import { origin, seo } from "@/lib/seo";
export async function generateMetadata() {
  const tr = await getTranslator();
  return {
    ...seo(
      tr("TFL Client | Launcher de Minecraft Java"),
      tr(
        "Instala Minecraft, organiza tus versiones y gestiona tus mods desde un mismo launcher.",
      ),
      "/",
      tr.locale,
    ),
    title: { absolute: tr("TFL Client | Launcher de Minecraft Java") },
  };
}
export default async function Home() {
  const tr = await getTranslator();
  const { releases } = await getReleases();
  const stable = releases.find((r) => r.channel === "stable");
  return (
    <>
      <StructuredData
        data={{
          "@context": "https://schema.org",
          "@type": "SoftwareApplication",
          "@id": `${origin}/#launcher`,
          name: "TFL Client",
          url: localeUrl("/", tr.locale),
          applicationCategory: "GameApplication",
          operatingSystem: "Windows, macOS, Linux",
          description: tr(
            "Instala Minecraft, organiza tus versiones y gestiona tus mods desde un mismo launcher.",
          ),
          image: `${origin}/images/social/tfl-client-${tr.locale}.png`,
          publisher: { "@id": `${origin}/#organization` },
          downloadUrl: localeUrl("/descargas", tr.locale),
          ...(stable ? { softwareVersion: stable.tag } : {}),
        }}
      />
      <section className="hero">
        <Ambient />
        <div className="shell hero-content">
          <span className="eyebrow">
            {tr("LAUNCHER DE MINECRAFT JAVA · TFLIVES")}
          </span>
          <h1>TFL Client</h1>
          <p>
            {tr(
              "Instala Minecraft, organiza tus versiones y gestiona tus mods desde un mismo launcher.",
            )}
          </p>
          <div className="hero-actions">
            <DownloadCTA />
            <Link href="/caracteristicas" className="button secondary">
              {tr("Ver características →")}
            </Link>
          </div>
          <p className="platform-note">
            {tr("Windows, macOS y Linux · Instaladores según publicación")}
          </p>
          <a className="hero-scroll-cue" href="#launcher-preview">
            <span>{tr("Explora el launcher")}</span>
            <ArrowDown size={18} aria-hidden="true" />
          </a>
        </div>
      </section>
      <section
        id="launcher-preview"
        className="shell launcher-showcase"
        aria-label={tr("Capturas del launcher")}
      >
        <Gallery />
      </section>
      <section className="shell section overview">
        <div>
          <span className="eyebrow">{tr("QUÉ HACE TFL CLIENT")}</span>
          <h2>{tr("Una biblioteca para tus instalaciones de Minecraft")}</h2>
        </div>
        <div>
          <p>
            {tr(
              "Crea instalaciones separadas para cada versión o combinación de mods. Desde el launcher puedes gestionar Java, contenido y ajustes por instancia, sin intercambiar archivos entre perfiles.",
            )}
          </p>
          <p>
            {tr(
              "El inicio de sesión con Microsoft se realiza dentro de la aplicación. Necesitas acceso a Minecraft Java Edition para jugar con tu cuenta.",
            )}
          </p>
          <Link className="text-link" href="/caracteristicas">
            {tr("Funciones y compatibilidad →")}
          </Link>
        </div>
      </section>
      <section className="shell section product-split">
        <div className="product-description">
          <span className="eyebrow">{tr("PERSONALIZACIÓN DEL LAUNCHER")}</span>
          <h2>{tr("Estilo, superficie y densidad de la interfaz")}</h2>
          <p>
            {tr(
              "Elige entre Modern y Pixel, cambia el color de acento, la tipografía y la densidad. Los ajustes visuales del launcher son independientes de los gráficos de Minecraft.",
            )}
          </p>
          <Link href="/ayuda/instalaciones">
            {tr("Crear una instalación →")}
          </Link>
        </div>
        <div className="themed-product-image">
          <LauncherImage
            src="/images/launcher-settings.webp"
            alt={tr("Panel de apariencia del frontend oficial de TFL Client")}
            width={1440}
            height={900}
            sizes="(max-width:760px) 100vw, 60vw"
          />
        </div>
      </section>
      <LauncherFeatures />
      <MemoryComparison />
      <ScanSection />
      <section className="shell section selection-overview">
        <span className="eyebrow">{tr("DISTRIBUCIÓN OFICIAL")}</span>
        <h2>{tr("TFL Selection: la biblioteca de clientes de TFLives")}</h2>
        <p>
          {tr(
            "Desde la biblioteca TFL Selection eliges TFLClient, el cliente modificado de Minecraft. TFL Client es el launcher que lo instala y lo abre.",
          )}
        </p>
        <div className="comparison-table">
          <div>
            <h3>{tr("Instalación normal")}</h3>
            <p>
              {tr(
                "Eliges la versión, el loader y los mods que quieres mantener. Revisa tú la compatibilidad del contenido.",
              )}
            </p>
          </div>
          <div>
            <h3>TFLClient</h3>
            <p>
              {tr(
                "Encuentras TFLClient en la biblioteca TFL Selection y lo instalas desde el launcher TFL Client.",
              )}
            </p>
          </div>
        </div>
        <Link className="button secondary" href="/selection">
          {tr("Ver clientes de TFL Selection →")}
        </Link>
      </section>
      <section className="shell section release-home">
        <div>
          <span className="eyebrow">{tr("PUBLICACIONES OFICIALES")}</span>
          <h2>{tr("Última versión estable")}</h2>
          <p>
            {tr(
              "Las betas se muestran por separado en el historial y en Descargas.",
            )}
          </p>
        </div>
        <div>
          {stable ? (
            <>
              <span className="badge stable">{tr("Estable")}</span>
              <h3>
                <Link href={releasePath(stable.tag)}>{stable.tag}</Link>
              </h3>
              <p>
                {stable.body
                  ? stable.body.slice(0, 220) +
                    (stable.body.length > 220 ? "…" : "")
                  : tr("La publicación no incluye notas.")}
              </p>
              <Link className="text-link" href={releasePath(stable.tag)}>
                {tr("Notas y archivos →")}
              </Link>
            </>
          ) : (
            <p>
              {tr("No pudimos consultar la versión estable.")}{" "}
              <a href="https://github.com/TFLivesStudio/TFLClient/releases">
                {tr("Ver releases oficiales")}
              </a>
            </p>
          )}
          <Link className="text-link" href="/novedades">
            {tr("Historial completo →")}
          </Link>
        </div>
      </section>
      <section className="shell section">
        <h2>{tr("Primeros pasos")}</h2>
        <ol className="steps">
          <li>
            <h3>{tr("Descarga el instalador")}</h3>
            <p>
              {tr("Selecciona tu sistema, arquitectura y canal en Descargas.")}
            </p>
          </li>
          <li>
            <h3>{tr("Añade tu cuenta")}</h3>
            <p>
              {tr(
                "Completa el inicio de sesión con Microsoft dentro de TFL Client.",
              )}
            </p>
          </li>
          <li>
            <h3>{tr("Prepara una instalación")}</h3>
            <p>
              {tr(
                "Crea una instancia normal o elige una publicación de Selection.",
              )}
            </p>
          </li>
        </ol>
        <Link className="text-link" href="/ayuda">
          {tr("Guías de instalación y ayuda →")}
        </Link>
      </section>
      <section className="shell section faq-section">
        <div>
          <span className="eyebrow">{tr("ANTES DE DESCARGAR")}</span>
          <h2>{tr("Preguntas frecuentes")}</h2>
        </div>
        <FAQ />
      </section>
    </>
  );
}
