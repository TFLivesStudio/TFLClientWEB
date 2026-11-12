import { PageTitle, FAQ } from "@/components/ui";
import { ArrowUpRight, Download, UserRound, Boxes } from "lucide-react";
export const metadata = { title: "Centro de ayuda" };
export default function Help() {
  return (
    <>
      <PageTitle
        label="ESTAMOS PARA AYUDARTE"
        title="Vuelve a lo importante: jugar."
        description="Primeros pasos, preguntas frecuentes y acceso a la documentación oficial."
      />
      <section className="shell section help-content">
        <div className="feature-detail-grid">
          {[
            [
              Download,
              "01 / Instala",
              "Abre Descargas, elige tu sistema y revisa los requisitos de la publicación.",
            ],
            [
              UserRound,
              "02 / Inicia sesión",
              "Abre TFL Client y sigue la autenticación Microsoft dentro de la aplicación. Nunca envíes tu contraseña por soporte.",
            ],
            [
              Boxes,
              "03 / Crea una instalación",
              "Prepara una instalación desde el launcher. Cada una mantiene su propio contenido y sus ajustes.",
            ],
          ].map(([Icon, t, d]) => {
            const I = Icon as typeof Boxes;
            return (
              <article className="feature-card" key={String(t)}>
                <I className="blue-icon" />
                <h2>{String(t)}</h2>
                <p>{String(d)}</p>
              </article>
            );
          })}
        </div>
        <h2 className="help-subtitle">Preguntas frecuentes</h2>
        <FAQ />
        <div className="notice">
          <h3>¿Encontraste un problema?</h3>
          <p>
            Revisa primero si ya está reportado. Al abrir una incidencia incluye
            tu sistema, versión del launcher y pasos para reproducirlo. Elimina
            datos personales de los registros.
          </p>
          <a
            href="https://github.com/TFLivesStudio/TFLClient/issues"
            className="text-link"
          >
            Consultar incidencias en GitHub
            <ArrowUpRight size={16} />
          </a>
        </div>
      </section>
    </>
  );
}
