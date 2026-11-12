import { getTranslator } from "@/i18n/server";
import Link from "@/components/locale-link";
import { PageTitle } from "@/components/ui";
export default async function NotFound() {
  const tr = await getTranslator();
  return (
    <>
      <PageTitle
        label={tr("404 / FUERA DEL MAPA")}
        title={tr("Página no encontrada")}
        description={tr(
          "La dirección no corresponde a una página publicada. Consulta la navegación o vuelve al inicio.",
        )}
      />
      <div className="shell section">
        <Link href="/" className="button">
          {tr("Volver al inicio")}
        </Link>
      </div>
    </>
  );
}
