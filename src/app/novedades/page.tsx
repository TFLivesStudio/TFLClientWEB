import { getTranslator } from "@/i18n/server";
import Link from "@/components/locale-link";
import { PageTitle } from "@/components/ui";
import { getReleases, releasePath } from "@/lib/releases";
import { ReleaseHistory } from "@/components/release-history";
import { seo } from "@/lib/seo";
export async function generateMetadata() {
  const tr = await getTranslator();
  return seo(
    tr("Historial de versiones"),
    tr("Notas originales, versiones estables y betas de TFL Client."),
    "/novedades",
    tr.locale,
  );
}
export default async function News() {
  const tr = await getTranslator();
  const { releases, status } = await getReleases();
  return (
    <>
      <PageTitle
        label={tr("PUBLICACIONES DE TFL CLIENT")}
        title={tr("Historial de versiones")}
        description={tr(
          "Cambios publicados por el equipo en GitHub. Consulta las notas de cada versión antes de actualizar.",
        )}
      />
      <section className="shell section">
        <div className="release-highlights">
          {(["stable", "beta"] as const).map((c) => {
            const r = releases.find((x) => x.channel === c);
            return (
              <article key={c} className={`release-embed ${c}`}>
                <span className="eyebrow">
                  {c === "stable" ? tr("ÚLTIMA ESTABLE") : tr("ÚLTIMA BETA")}
                </span>
                <h2>
                  {r ? (
                    <Link href={releasePath(r.tag)}>{r.tag}</Link>
                  ) : (
                    tr("Sin publicación disponible")
                  )}
                </h2>
                <p>
                  {c === "stable"
                    ? tr("Canal recomendado para uso habitual.")
                    : tr(
                        "Versiones de prueba; pueden tener errores o cambios pendientes.",
                      )}
                </p>
              </article>
            );
          })}
        </div>
        {status === "ok" ? (
          <>
            <p>{tr("Notas originales, sin traducción automática.")}</p>
            <ReleaseHistory releases={releases} />
          </>
        ) : (
          <div className="notice">
            {status === "empty"
              ? tr("Todavía no hay releases publicadas.")
              : status === "rate-limit"
                ? tr(
                    "GitHub está limitando las consultas. Vuelve a intentarlo más tarde.",
                  )
                : tr(
                    "No pudimos recuperar el historial. No se muestran datos parciales.",
                  )}{" "}
            <a href="https://github.com/TFLivesStudio/TFLClient/releases">
              {tr("Consultar GitHub")}
            </a>
          </div>
        )}
      </section>
    </>
  );
}
