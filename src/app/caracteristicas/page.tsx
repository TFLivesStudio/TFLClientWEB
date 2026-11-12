import Link from "next/link";
import { Gallery } from "@/components/gallery";
import { PageTitle, EndCTA } from "@/components/ui";
import { seo } from "@/lib/seo";
export const metadata = seo(
  "Características",
  "Instalaciones, versiones, mods, autenticación y personalización de TFL Client.",
  "/caracteristicas",
);
export default function Features() {
  return (
    <>
      <PageTitle
        label="FUNCIONES DEL LAUNCHER"
        title="Instalaciones y contenido, separados por perfil"
        description="TFL Client reúne la preparación de Minecraft y la gestión de cada instalación. Estas funciones corresponden al launcher, no a los mods que se ejecutan dentro del juego."
      />
      <section className="shell">
        <Gallery />
      </section>
      <section className="shell section capabilities">
        {[
          [
            "01",
            "Instalaciones y versiones",
            "Crea instalaciones independientes para distintas versiones de Minecraft y loaders. Cada perfil mantiene sus archivos y configuración, para no mezclar el contenido de partidas diferentes.",
            "instalaciones",
          ],
          [
            "02",
            "Mods, shaders y recursos",
            "Gestiona contenido desde las pestañas de cada instalación. La compatibilidad sigue dependiendo de Minecraft, el loader y las dependencias de cada mod; el launcher no hace compatibles combinaciones arbitrarias.",
            "mods-recursos",
          ],
          [
            "03",
            "Java y configuración",
            "La aplicación incluye gestión de Java y ajustes por instancia. Revisa los requisitos de tu versión de Minecraft antes de cambiar Java o la memoria asignada.",
            "compatibilidad",
          ],
          [
            "04",
            "Cuenta Microsoft",
            "La sesión se inicia dentro de la aplicación. La web no administra cuentas de jugadores ni solicita contraseñas de Microsoft.",
            "cuenta-microsoft",
          ],
          [
            "05",
            "Estilo y herramientas",
            "El launcher permite cambiar estilo Modern o Pixel, superficies, acento, tipografía y densidad. También incluye consola, logs y diagnóstico para investigar errores. Sus efectos visuales no equivalen a mejoras de FPS dentro de Minecraft.",
            "reportar",
          ],
          [
            "06",
            "Actualizaciones y Selection",
            "Las releases del launcher tienen canales estable y beta. TFL Selection usa su propio catálogo firmado y una composición de mods administrada por TFLives. Son actualizaciones diferentes.",
            "selection",
          ],
        ].map(([n, t, d, slug]) => (
          <article key={n}>
            <span className="story-number">{n}</span>
            <div>
              <h2>{t}</h2>
              <p>{d}</p>
              <Link href={`/ayuda/${slug}`} className="text-link">
                Guía relacionada →
              </Link>
            </div>
          </article>
        ))}
      </section>
      <EndCTA />
    </>
  );
}
