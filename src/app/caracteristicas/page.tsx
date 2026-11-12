import {
  Boxes,
  Palette,
  ShieldCheck,
  FolderHeart,
  Sparkles,
  SlidersHorizontal,
} from "lucide-react";
import { PageTitle, EndCTA } from "@/components/ui";
import { Gallery } from "@/components/gallery";
export const metadata = { title: "El launcher" };
export default function Features() {
  return (
    <>
      <PageTitle
        label="CONOCE TFL CLIENT"
        title="Tu juego empieza antes de jugar."
        description="Un espacio para organizar Minecraft, personalizar tu experiencia y dar el siguiente paso."
      />
      <section className="shell">
        <Gallery />
      </section>
      <section className="section shell">
        <div className="feature-detail-grid">
          {[
            [
              Boxes,
              "Instalaciones independientes",
              "Mantén separados los archivos, mods y ajustes de cada instalación.",
            ],
            [
              Palette,
              "Una interfaz a tu manera",
              "Estilos Modern y Pixel, superficies, acentos y tipografías para hacer tuyo el launcher.",
            ],
            [
              ShieldCheck,
              "Sesión de Microsoft",
              "La autenticación ocurre dentro del launcher, sin compartir tus credenciales con esta web.",
            ],
            [
              FolderHeart,
              "Contenido por instalación",
              "Gestiona mods, shaders y paquetes de recursos en el espacio de cada perfil.",
            ],
            [
              SlidersHorizontal,
              "Control visual",
              "Reduce el movimiento, las transparencias y los efectos continuos cuando lo prefieras.",
            ],
            [
              Sparkles,
              "Conexión con TFL Selection",
              "Descubre la distribución oficial de TFLives desde el propio launcher.",
            ],
          ].map(([Icon, title, desc]) => {
            const I = Icon as typeof Boxes;
            return (
              <article className="feature-card" key={String(title)}>
                <I className="blue-icon" size={28} />
                <h2>{String(title)}</h2>
                <p>{String(desc)}</p>
              </article>
            );
          })}
        </div>
      </section>
      <EndCTA />
    </>
  );
}
