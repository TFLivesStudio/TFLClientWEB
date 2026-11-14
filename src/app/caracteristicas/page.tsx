import { LauncherFeatures } from "@/components/launcher-features";
import { getTranslator } from "@/i18n/server";
import Link from "@/components/locale-link";
import { Gallery } from "@/components/gallery";
import { PageTitle, EndCTA } from "@/components/ui";
import { seo } from "@/lib/seo";
export async function generateMetadata() {
  const tr = await getTranslator();
  return seo(
    tr("Características"),
    tr(
      "Instalaciones, versiones, mods, autenticación y personalización de TFL Client.",
    ),
    "/caracteristicas",
    tr.locale,
  );
}
export default async function Features() {
  const tr = await getTranslator();
  return (
    <>
      <div className="shell feature-lead">
        <PageTitle
        label={tr("FUNCIONES DEL LAUNCHER")}
        title={tr("Instalaciones y contenido, separados por perfil")}
        description={tr(
          "TFL Client reúne la preparación de Minecraft y la gestión de cada instalación. Estas funciones corresponden al launcher, no a los mods que se ejecutan dentro del juego.",
        )}
      />
        <Gallery />
      </div>
      <section className="shell section capabilities">
        {[
          [
            "01",
            tr("Instalaciones y versiones"),
            tr(
              "Crea instalaciones independientes para distintas versiones de Minecraft y loaders. Cada perfil mantiene sus archivos y configuración, para no mezclar el contenido de partidas diferentes.",
            ),
            "instalaciones",
          ],
          [
            "02",
            tr("Mods, shaders y recursos"),
            tr(
              "Gestiona contenido desde las pestañas de cada instalación. La compatibilidad sigue dependiendo de Minecraft, el loader y las dependencias de cada mod; el launcher no hace compatibles combinaciones arbitrarias.",
            ),
            "mods-recursos",
          ],
          [
            "03",
            tr("Java y configuración"),
            tr(
              "La aplicación incluye gestión de Java y ajustes por instancia. Revisa los requisitos de tu versión de Minecraft antes de cambiar Java o la memoria asignada.",
            ),
            "compatibilidad",
          ],
          [
            "04",
            tr("Cuenta Microsoft"),
            tr(
              "La sesión se inicia dentro de la aplicación. La web no administra cuentas de jugadores ni solicita contraseñas de Microsoft.",
            ),
            "cuenta-microsoft",
          ],
          [
            "05",
            tr("Estilo y herramientas"),
            tr(
              "El launcher permite cambiar estilo Modern o Pixel, superficies, acento, tipografía y densidad. También incluye consola, logs y diagnóstico para investigar errores. Sus efectos visuales no equivalen a mejoras de FPS dentro de Minecraft.",
            ),
            "reportar",
          ],
          [
            "06",
            tr("Actualizaciones y Selection"),
            tr(
              "El launcher TFL Client tiene canales estable y beta. TFLClient tiene sus propias versiones dentro de la biblioteca TFL Selection. Actualizar el launcher no publica ni instala automáticamente una versión nueva del cliente.",
            ),
            "selection",
          ],
        ].map(([n, t, d, slug]) => (
          <article key={n}>
            <span className="story-number">{n}</span>
            <div>
              <h2>{t}</h2>
              <p>{d}</p>
              <Link href={`/ayuda/${slug}`} className="text-link">
                {tr("Guía relacionada →")}
              </Link>
            </div>
          </article>
        ))}
      </section>
      <LauncherFeatures />
      <EndCTA />
    </>
  );
}
