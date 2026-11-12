import { PageTitle } from "@/components/ui";
import { ArrowUpRight, Code2 } from "lucide-react";
export const metadata = { title: "Comunidad" };
export default function Community() {
  return (
    <>
      <PageTitle
        label="HECHO POR TFLIVES"
        title="Un universo se construye en comunidad."
        description="Descubre el código, sigue el desarrollo y encuentra tu lugar en el ecosistema TFL."
      />
      <section className="shell section feature-detail-grid">
        {[
          ["TFL Client", "El launcher y gestor de instalaciones.", "TFLClient"],
          [
            "TFL Selection",
            "La distribución oficial curada por TFLives.",
            "TFLClientSelection",
          ],
          [
            "TFL Core",
            "El mod de cliente y sus herramientas dentro de Minecraft.",
            "TFLClientMOD",
          ],
        ].map(([t, d, repo]) => (
          <article className="feature-card" key={repo}>
            <Code2 className="blue-icon" />
            <h2>{t}</h2>
            <p>{d}</p>
            <a
              className="text-link"
              href={`https://github.com/TFLivesStudio/${repo}`}
            >
              Ver repositorio
              <ArrowUpRight size={16} />
            </a>
          </article>
        ))}
      </section>
    </>
  );
}
