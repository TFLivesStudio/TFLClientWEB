import { PageTitle } from "@/components/ui";
import { Downloads } from "@/components/downloads";
import { getReleases } from "@/lib/releases";
import { seo } from "@/lib/seo";
export const metadata = seo(
  "Descargas",
  "Instaladores oficiales para Windows, macOS y Linux, con canal estable y beta.",
  "/descargas",
);
export default async function Page() {
  const { releases, status } = await getReleases();
  return (
    <>
      <PageTitle
        label="INSTALADORES OFICIALES"
        title="Descargar TFL Client"
        description="Selecciona tu sistema y el canal de actualización. La versión estable es la opción recomendada; las betas se ofrecen por separado."
      />
      <section className="shell download-section">
        <Downloads
          release={releases.find((r) => r.channel === "stable") || null}
          beta={releases.find((r) => r.channel === "beta") || null}
          status={status}
        />
        <div className="notice">
          Los instaladores se descargan desde las releases oficiales de GitHub.
          Elige la arquitectura de tu equipo cuando el nombre del archivo la
          indique. Los requisitos de cada instalación de Minecraft pueden ser
          distintos de los del launcher.
        </div>
      </section>
    </>
  );
}
