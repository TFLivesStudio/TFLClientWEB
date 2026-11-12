import Link from "next/link";
import Image from "next/image";
import { Ambient } from "@/components/ambient";
import { Gallery } from "@/components/gallery";
import { DownloadCTA, FAQ } from "@/components/ui";
import { getReleases, releasePath } from "@/lib/releases";
import { seo } from "@/lib/seo";
export const metadata = {
  ...seo(
    "TFL Client | Launcher de Minecraft Java",
    "Instala Minecraft, organiza tus versiones y gestiona tus mods desde un mismo launcher.",
    "/",
  ),
  title: { absolute: "TFL Client | Launcher de Minecraft Java" },
};
export default async function Home() {
  const { releases } = await getReleases();
  const stable = releases.find((r) => r.channel === "stable");
  return (
    <>
      <section className="hero">
        <Ambient />
        <div className="shell hero-content">
          <span className="eyebrow">LAUNCHER DE MINECRAFT JAVA · TFLIVES</span>
          <h1>TFL Client</h1>
          <p>
            Instala Minecraft, organiza tus versiones y gestiona tus mods desde
            un mismo launcher.
          </p>
          <div className="hero-actions">
            <DownloadCTA />
            <Link href="/caracteristicas" className="button secondary">
              Ver características →
            </Link>
          </div>
          <p className="platform-note">
            Windows, macOS y Linux · Instaladores según publicación
          </p>
          <div className="hero-gallery">
            <Gallery />
          </div>
        </div>
      </section>
      <section className="shell section overview">
        <div>
          <span className="eyebrow">QUÉ HACE TFL CLIENT</span>
          <h2>Una biblioteca para tus instalaciones de Minecraft</h2>
        </div>
        <div>
          <p>
            Crea instalaciones separadas para cada versión o combinación de
            mods. Desde el launcher puedes gestionar Java, contenido y ajustes
            por instancia, sin intercambiar archivos entre perfiles.
          </p>
          <p>
            El inicio de sesión con Microsoft se realiza dentro de la
            aplicación. Necesitas acceso a Minecraft Java Edition para jugar con
            tu cuenta.
          </p>
          <Link className="text-link" href="/caracteristicas">
            Funciones y compatibilidad →
          </Link>
        </div>
      </section>
      <section className="shell section product-split">
        <div className="product-description">
          <span className="eyebrow">PERSONALIZACIÓN DEL LAUNCHER</span>
          <h2>Estilo, superficie y densidad de la interfaz</h2>
          <p>
            Elige entre Modern y Pixel, cambia el color de acento, la tipografía
            y la densidad. Los ajustes visuales del launcher son independientes
            de los gráficos de Minecraft.
          </p>
          <Link href="/ayuda/instalaciones">Crear una instalación →</Link>
        </div>
        <Image
          src="/images/launcher-settings.webp"
          alt="Panel de apariencia del frontend oficial de TFL Client"
          width={1440}
          height={900}
          sizes="(max-width:760px) 100vw, 60vw"
        />
      </section>
      <section className="shell section selection-overview">
        <span className="eyebrow">DISTRIBUCIÓN OFICIAL</span>
        <h2>TFL Selection: mods gestionados por TFLives</h2>
        <p>
          Selection se instala desde el launcher y utiliza un catálogo firmado.
          Su conjunto de mods lo publica el equipo; una instalación normal te
          permite gestionar tu propio contenido.
        </p>
        <div className="comparison-table">
          <div>
            <h3>Instalación normal</h3>
            <p>
              Eliges la versión, el loader y los mods que quieres mantener.
              Revisa tú la compatibilidad del contenido.
            </p>
          </div>
          <div>
            <h3>TFL Selection</h3>
            <p>
              Eliges un target y un canal publicado. TFLives define la
              composición y el launcher gestiona sus archivos oficiales.
            </p>
          </div>
        </div>
        <Link className="button secondary" href="/selection">
          Consultar versiones y requisitos de Selection →
        </Link>
      </section>
      <section className="shell section release-home">
        <div>
          <span className="eyebrow">PUBLICACIONES OFICIALES</span>
          <h2>Última versión estable</h2>
          <p>
            Las betas se muestran por separado en el historial y en Descargas.
          </p>
        </div>
        <div>
          {stable ? (
            <>
              <span className="badge stable">Estable</span>
              <h3>
                <Link href={releasePath(stable.tag)}>{stable.tag}</Link>
              </h3>
              <p>
                {stable.body
                  ? stable.body.slice(0, 220) +
                    (stable.body.length > 220 ? "…" : "")
                  : "La publicación no incluye notas."}
              </p>
              <Link className="text-link" href={releasePath(stable.tag)}>
                Notas y archivos →
              </Link>
            </>
          ) : (
            <p>
              No pudimos consultar la versión estable.{" "}
              <a href="https://github.com/TFLivesStudio/TFLClient/releases">
                Ver releases oficiales
              </a>
            </p>
          )}
          <Link className="text-link" href="/novedades">
            Historial completo →
          </Link>
        </div>
      </section>
      <section className="shell section">
        <h2>Primeros pasos</h2>
        <ol className="steps">
          <li>
            <h3>Descarga el instalador</h3>
            <p>Selecciona tu sistema, arquitectura y canal en Descargas.</p>
          </li>
          <li>
            <h3>Añade tu cuenta</h3>
            <p>
              Completa el inicio de sesión con Microsoft dentro de TFL Client.
            </p>
          </li>
          <li>
            <h3>Prepara una instalación</h3>
            <p>
              Crea una instancia normal o elige una publicación de Selection.
            </p>
          </li>
        </ol>
        <Link className="text-link" href="/ayuda">
          Guías de instalación y ayuda →
        </Link>
      </section>
      <section className="shell section faq-section">
        <div>
          <span className="eyebrow">ANTES DE DESCARGAR</span>
          <h2>Preguntas frecuentes</h2>
        </div>
        <FAQ />
      </section>
    </>
  );
}
