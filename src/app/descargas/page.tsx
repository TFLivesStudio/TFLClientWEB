import { PageTitle } from "@/components/ui";
import { Downloads } from "@/components/downloads";
import { getRelease } from "@/lib/releases";
export const metadata = { title: "Descargar" };
export default async function DownloadPage() {
  const result = await getRelease();
  return (
    <>
      <PageTitle
        label="EL PRIMER PASO"
        title="Tu próxima aventura te espera."
        description="Elige tu sistema operativo y consulta la versión oficial de TFL Client."
      />
      <section className="shell download-section">
        <Downloads {...result} />
      </section>
    </>
  );
}
