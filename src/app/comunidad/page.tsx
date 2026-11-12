import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { PageTitle } from "@/components/ui";
import { PlatformIcon } from "@/components/platform-icon";
import { seo } from "@/lib/seo";
export const metadata = seo(
  "Comunidad y proyectos",
  "Repositorios oficiales de TFLives, reportes de problemas y participación.",
  "/comunidad",
);
export default function Community() {
  return (
    <>
      <PageTitle
        label="TFLIVES"
        title="Proyectos y participación"
        description="El desarrollo de TFL Client y sus proyectos relacionados se puede seguir en sus repositorios oficiales. Cada uno tiene una responsabilidad distinta."
      />
      <section className="shell section community-projects">
        {[
          [
            "TFL Client",
            "Launcher, instalaciones, cuentas y gestión de contenido.",
            "TFLClient",
          ],
          [
            "TFL Selection",
            "Catálogo firmado, manifiestos y distribución oficial.",
            "TFLClientSelection",
          ],
          [
            "TFL Core",
            "Interfaz, HUD y herramientas dentro del juego.",
            "TFLClientMOD",
          ],
        ].map(([t, d, r]) => (
          <article key={r}>
            <PlatformIcon name="GitHub" />
            <div>
              <h2>{t}</h2>
              <p>{d}</p>
            </div>
            <a
              className="text-link"
              href={`https://github.com/TFLivesStudio/${r}`}
            >
              Repositorio oficial{" "}
              <ArrowUpRight className="inline-icon" size={15} />
            </a>
          </article>
        ))}
      </section>
      <section className="shell section participation">
        <h2>Cómo participar</h2>
        <div>
          <h3>Encontraste un error</h3>
          <p>
            Busca una incidencia existente y añade pasos para reproducirlo. Si
            no existe, abre un reporte en el proyecto correspondiente con su
            versión exacta.
          </p>
          <Link href="/ayuda/reportar">
            Preparar logs y un reporte seguro →
          </Link>
        </div>
        <div>
          <h3>Quieres proponer un cambio</h3>
          <p>
            Revisa las instrucciones y el estado del repositorio antes de abrir
            una propuesta o un pull request. Una idea para el launcher no
            implica un cambio en la distribución de Selection.
          </p>
          <a href="https://github.com/TFLivesStudio">
            Organización oficial en GitHub{" "}
            <ArrowUpRight className="inline-icon" size={15} />
          </a>
        </div>
      </section>
    </>
  );
}
