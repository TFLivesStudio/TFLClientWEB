import { getTranslator } from "@/i18n/server";
import { ArrowUpRight } from "lucide-react";
import Link from "@/components/locale-link";
import { PageTitle } from "@/components/ui";
import { PlatformIcon } from "@/components/platform-icon";
import { seo } from "@/lib/seo";
export async function generateMetadata() {
  const tr = await getTranslator();
  return seo(
    tr("Comunidad y proyectos"),
    tr(
      "Repositorios oficiales de TFLives, reportes de problemas y participación.",
    ),
    "/comunidad",
    tr.locale,
  );
}
export default async function Community() {
  const tr = await getTranslator();
  return (
    <>
      <PageTitle
        label="TFLIVES"
        title={tr("Proyectos y participación")}
        description={tr(
          "Sigue el desarrollo del launcher en su repositorio oficial y conversa con la comunidad en Discord.",
        )}
      />
      <section className="shell section community-projects">
        {[
          [
            "TFL Client",
            tr("Launcher, instalaciones, cuentas y gestión de contenido."),
            "TFLClient",
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
              {tr("Repositorio oficial")}{" "}
              <ArrowUpRight className="inline-icon" size={15} />
            </a>
          </article>
        ))}
      </section>
      <section className="shell section participation">
        <h2>{tr("Cómo participar")}</h2>
        <div>
          <h3>{tr("Encontraste un error")}</h3>
          <p>
            {tr(
              "Busca una incidencia existente y añade pasos para reproducirlo. Si no existe, abre un reporte en el proyecto correspondiente con su versión exacta.",
            )}
          </p>
          <Link href="/ayuda/reportar">
            {tr("Preparar logs y un reporte seguro →")}
          </Link>
        </div>
        <div>
          <h3>{tr("Quieres proponer un cambio")}</h3>
          <p>
            {tr(
              "Revisa las instrucciones y el estado del repositorio antes de abrir una propuesta o un pull request. Una idea para el launcher no implica un cambio en los clientes publicados en TFL Selection.",
            )}
          </p>
          <a href="https://discord.gg/tflives">
            {tr("Discord oficial de TFLives")}{" "}
            <ArrowUpRight className="inline-icon" size={15} />
          </a>
        </div>
      </section>
    </>
  );
}
