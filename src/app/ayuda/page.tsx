import { ArrowUpRight } from "lucide-react";
import { PageTitle, FAQ } from "@/components/ui";
import { HelpSearch } from "@/components/help-search";
import { seo } from "@/lib/seo";
export const metadata = seo(
  "Centro de ayuda",
  "Instalación, cuentas, mods, Selection y solución de problemas de TFL Client.",
  "/ayuda",
);
export default function Help() {
  return (
    <>
      <PageTitle
        label="DOCUMENTACIÓN DE TFL CLIENT"
        title="Centro de ayuda"
        description="Guías para instalar el launcher, gestionar tus instalaciones y preparar un reporte útil si algo falla."
      />
      <section className="shell section">
        <HelpSearch />
        <h2 className="help-subtitle">Preguntas frecuentes</h2>
        <FAQ />
        <div className="notice">
          <h3>Reportar un problema</h3>
          <p>
            Las incidencias de GitHub son públicas. Revisa la guía de logs antes
            de adjuntar registros o capturas.
          </p>
          <a href="https://github.com/TFLivesStudio/TFLClient/issues">
            Consultar incidencias del launcher{" "}
            <ArrowUpRight className="inline-icon" size={15} />
          </a>
        </div>
      </section>
    </>
  );
}
