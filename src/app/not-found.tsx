import Link from "next/link";
import { PageTitle } from "@/components/ui";
export default function NotFound() {
  return (
    <>
      <PageTitle
        label="404 / FUERA DEL MAPA"
        title="Página no encontrada"
        description="La dirección no corresponde a una página publicada. Consulta la navegación o vuelve al inicio."
      />
      <div className="shell section">
        <Link href="/" className="button">
          Volver al inicio
        </Link>
      </div>
    </>
  );
}
