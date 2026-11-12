import Image from "next/image";
import { Crosshair, LayoutDashboard, MapPin, ArrowUpRight } from "lucide-react";
import { PageTitle, DownloadCTA } from "@/components/ui";
export const metadata = { title: "TFL Selection & Core" };
export default function Selection() {
  return (
    <>
      <PageTitle
        label="EL ECOSISTEMA TFL"
        title="Distintos proyectos. Un mismo universo."
        description="El launcher abre la puerta. Selection define la distribución. Core vive dentro del juego."
      />
      <section className="shell selection-banner">
        <Image
          src="/images/forest.webp"
          alt="Arte ambiental de bosque del launcher"
          fill
          sizes="100vw"
        />
        <div>
          <span className="eyebrow">TFL SELECTION</span>
          <h2>
            Curado por TFLives.
            <br />
            Pensado como un conjunto.
          </h2>
          <p>
            Una distribución oficial con una composición de mods definida por el
            equipo. La instalación y las actualizaciones se gestionan desde TFL
            Client.
          </p>
          <DownloadCTA />
          <small>
            La disponibilidad de versiones se consulta en el launcher. Esta web
            no ofrece un catálogo de versiones verificadas.
          </small>
        </div>
      </section>
      <section className="section shell">
        <div className="heading-row">
          <div className="section-heading">
            <span className="eyebrow">DENTRO DE MINECRAFT</span>
            <h2>Conoce TFL Core.</h2>
          </div>
          <span className="status-tag">ALPHA EXPERIMENTAL</span>
        </div>
        <p className="intro-copy">
          El mod de cliente de TFLives. Su documentación actual describe un HUD
          configurable, perfiles y herramientas de juego. La versión
          0.3.0-alpha.1 todavía no tiene validación en una partida real.
        </p>
        <div className="feature-detail-grid">
          {[
            [
              LayoutDashboard,
              "Tu HUD, a tu manera",
              "Widgets configurables y un editor con anclas, escala y cuadrícula.",
            ],
            [
              Crosshair,
              "Herramientas en partida",
              "Crosshair configurable, zoom y toggle sprint, descritos en la alpha actual.",
            ],
            [
              MapPin,
              "Orientación y perfiles",
              "Waypoints locales y perfiles para diferentes formas de jugar.",
            ],
          ].map(([Icon, t, d]) => {
            const I = Icon as typeof Crosshair;
            return (
              <article className="feature-card" key={String(t)}>
                <I className="blue-icon" />
                <h3>{String(t)}</h3>
                <p>{String(d)}</p>
              </article>
            );
          })}
        </div>
        <div className="notice">
          Las funciones anteriores pertenecen a TFL Core, no al launcher.
          Consulta los requisitos, el estado y las limitaciones de la alpha
          antes de instalarla. Aún no hay capturas oficiales de Core disponibles
          en esta web.
        </div>
        <a
          className="text-link"
          href="https://github.com/TFLivesStudio/TFLClientMOD#readme"
        >
          Ver documentación y requisitos de Core
          <ArrowUpRight size={17} />
        </a>
      </section>
    </>
  );
}
