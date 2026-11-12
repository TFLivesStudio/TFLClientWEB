import { getTranslator } from "@/i18n/server";
import { ArrowUpRight } from "lucide-react";
import { PageTitle, FAQ } from "@/components/ui";
import { HelpSearch } from "@/components/help-search";
import { seo } from "@/lib/seo";
export async function generateMetadata() {
  const tr = await getTranslator();
  return seo(
    tr("Centro de ayuda"),
    tr(
      "Instalación, cuentas, mods, Selection y solución de problemas de TFL Client.",
    ),
    "/ayuda",
    tr.locale,
  );
}
export default async function Help() {
  const tr = await getTranslator();
  return (
    <>
      <PageTitle
        label={tr("DOCUMENTACIÓN DE TFL CLIENT")}
        title={tr("Centro de ayuda")}
        description={tr(
          "Guías para instalar el launcher, gestionar tus instalaciones y preparar un reporte útil si algo falla.",
        )}
      />
      <section className="shell section">
        <HelpSearch />
        <h2 className="help-subtitle">{tr("Preguntas frecuentes")}</h2>
        <FAQ />
        <div className="notice">
          <h3>{tr("Reportar un problema")}</h3>
          <p>
            {tr(
              "Las incidencias de GitHub son públicas. Revisa la guía de logs antes de adjuntar registros o capturas.",
            )}
          </p>
          <a href="https://github.com/TFLivesStudio/TFLClient/issues">
            {tr("Consultar incidencias del launcher")}{" "}
            <ArrowUpRight className="inline-icon" size={15} />
          </a>
        </div>
      </section>
    </>
  );
}
