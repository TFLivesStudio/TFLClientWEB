import Link from "next/link";
import { PageTitle } from "@/components/ui";
import { getReleases, releasePath } from "@/lib/releases";
import { ReleaseHistory } from "@/components/release-history";
import { seo } from "@/lib/seo";
export const metadata = seo(
  "Historial de versiones",
  "Notas originales, versiones estables y betas de TFL Client.",
  "/novedades",
);
export default async function News() {
  const { releases, status } = await getReleases();
  return (
    <>
      <PageTitle
        label="PUBLICACIONES DE TFL CLIENT"
        title="Historial de versiones"
        description="Cambios publicados por el equipo en GitHub. Consulta las notas de cada versión antes de actualizar."
      />
      <section className="shell section">
        <div className="release-highlights">
          {(["stable", "beta"] as const).map((c) => {
            const r = releases.find((x) => x.channel === c);
            return (
              <article key={c}>
                <span className="eyebrow">
                  {c === "stable" ? "ÚLTIMA ESTABLE" : "ÚLTIMA BETA"}
                </span>
                <h2>
                  {r ? (
                    <Link href={releasePath(r.tag)}>{r.tag}</Link>
                  ) : (
                    "Sin publicación disponible"
                  )}
                </h2>
                <p>
                  {c === "stable"
                    ? "Canal recomendado para uso habitual."
                    : "Versiones de prueba; pueden tener errores o cambios pendientes."}
                </p>
              </article>
            );
          })}
        </div>
        {status === "ok" ? (
          <ReleaseHistory releases={releases} />
        ) : (
          <div className="notice">
            {status === "empty"
              ? "Todavía no hay releases publicadas."
              : status === "rate-limit"
                ? "GitHub está limitando las consultas. Vuelve a intentarlo más tarde."
                : "No pudimos recuperar el historial. No se muestran datos parciales."}{" "}
            <a href="https://github.com/TFLivesStudio/TFLClient/releases">
              Consultar GitHub
            </a>
          </div>
        )}
      </section>
    </>
  );
}
