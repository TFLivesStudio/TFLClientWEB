import Link from "next/link";
import { PageTitle } from "@/components/ui";
export default function NotFound() {
  return (
    <>
      <PageTitle
        label="404 / FUERA DEL MAPA"
        title="Este mundo no existe."
        description="La página que buscas no está aquí. Volvamos al punto de aparición."
      />
      <div className="shell section">
        <Link href="/" className="button">
          Volver al inicio
        </Link>
      </div>
    </>
  );
}
