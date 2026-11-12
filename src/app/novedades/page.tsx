import { ArrowUpRight, GitBranch } from "lucide-react";
import { PageTitle } from "@/components/ui";
import { getRelease } from "@/lib/releases";
export const metadata = { title: "Novedades" };
export default async function News() {
  const { release } = await getRelease();
  return (
    <>
      <PageTitle
        label="DESDE EL EQUIPO"
        title="El siguiente capítulo de TFL."
        description="Publicaciones oficiales, notas de versión y la evolución del proyecto."
      />
      <section className="shell section news-content">
        <article className="feature-card">
          <GitBranch className="blue-icon" />
          <span className="eyebrow">VERSIONES DEL LAUNCHER</span>
          <h2>
            {release ? release.name : "Sigue las publicaciones oficiales."}
          </h2>
          <p>
            {release
              ? "Consulta los cambios y los archivos de esta versión en GitHub."
              : "Las notas de versión se publican en el repositorio de TFL Client. No pudimos mostrar una versión estable aquí en este momento."}
          </p>
          <a
            href={
              release?.url ??
              "https://github.com/TFLivesStudio/TFLClient/releases"
            }
            className="text-link"
          >
            Ver publicaciones
            <ArrowUpRight size={17} />
          </a>
        </article>
        <article className="feature-card">
          <span className="eyebrow">NOTICIAS DEL EQUIPO</span>
          <h2>Las historias están por llegar.</h2>
          <p>
            Todavía no hay artículos editoriales publicados en esta web.
            Mientras tanto, puedes seguir el desarrollo en los repositorios
            oficiales.
          </p>
          <a href="https://github.com/TFLivesStudio" className="text-link">
            Explorar TFLives en GitHub
            <ArrowUpRight size={17} />
          </a>
        </article>
      </section>
    </>
  );
}
