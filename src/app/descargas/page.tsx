import { ScanSection } from "@/components/scan-section";
import { getTranslator } from "@/i18n/server";
import { PageTitle } from "@/components/ui";
import { Downloads } from "@/components/downloads";
import { getReleases } from "@/lib/releases";
import { seo } from "@/lib/seo";
export async function generateMetadata() {
  const tr = await getTranslator();
  return seo(
    tr("Descargas"),
    tr(
      "Instaladores oficiales para Windows, macOS y Linux, con canal estable y beta.",
    ),
    "/descargas",
    tr.locale,
  );
}
export default async function Page() {
  const tr = await getTranslator();
  const { releases, status } = await getReleases();
  return (
    <>
      <PageTitle
        label={tr("INSTALADORES OFICIALES")}
        title={tr("Descargar TFL Client")}
        description={tr(
          "Selecciona tu sistema y el canal de actualización. La versión estable es la opción recomendada; las betas se ofrecen por separado.",
        )}
      />
      <section className="shell download-section">
        <Downloads
          release={releases.find((r) => r.channel === "stable") || null}
          beta={releases.find((r) => r.channel === "beta") || null}
          status={status}
        />
        <div className="notice">
          {tr(
            "Los instaladores se descargan desde las releases oficiales de GitHub. Elige la arquitectura de tu equipo cuando el nombre del archivo la indique. Los requisitos de cada instalación de Minecraft pueden ser distintos de los del launcher.",
          )}
        </div>
      </section>
      <ScanSection />
    </>
  );
}
