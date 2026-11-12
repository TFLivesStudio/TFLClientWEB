import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { PageTitle, DownloadCTA } from "@/components/ui";
import { getCatalog, getManifest } from "@/lib/selection";
import { seo } from "@/lib/seo";
export const metadata = seo(
  "TFL Selection",
  "Distribución oficial administrada desde TFL Client. Canales publicados y requisitos del catálogo firmado.",
  "/selection",
);
export default async function Selection() {
  const { catalog } = await getCatalog();
  const published = catalog?.targets.filter(
    (t) => Object.keys(t.channels).length,
  );
  return (
    <>
      <PageTitle
        label="DISTRIBUCIÓN OFICIAL"
        title="TFL Selection"
        description="Una instalación de Minecraft con un conjunto de mods definido por TFLives. Se instala y se administra desde TFL Client."
      />
      <section className="shell section selection-intro">
        <div>
          <h2>Una selección gestionada, no una lista editable de mods</h2>
          <p>
            En una instalación normal eliges qué mods añadir o quitar. En
            Selection, TFLives publica el conjunto completo y sus
            actualizaciones. El launcher usa esa distribución para mantener la
            instalación alineada con los archivos oficiales.
          </p>
          <DownloadCTA />
        </div>
        <div className="comparison">
          <h3>¿Qué puedes cambiar?</h3>
          <p>
            Puedes jugar y conservar tus mundos y ajustes de Minecraft. La
            composición de mods de Selection está gestionada por el equipo; no
            es un perfil para mezclar mods libremente.
          </p>
          <Link href="/caracteristicas">
            Prefiero administrar mis propios mods →
          </Link>
        </div>
      </section>
      <section className="shell section">
        <h2>Versiones publicadas</h2>
        <p>
          El catálogo se comprueba mediante su firma Ed25519 antes de mostrar
          canales como verificados. Los requisitos adicionales se muestran solo
          si también se verifica el manifiesto de la release.
        </p>
        {!catalog ? (
          <div className="notice">
            No pudimos verificar el catálogo oficial. No se muestran versiones
            como disponibles.{" "}
            <a href="https://github.com/TFLivesStudio/TFLClientSelection">
              Consultar el repositorio
            </a>
          </div>
        ) : (
          <>
            <p className="verified">
              Catálogo verificado · generación {catalog.generation}
            </p>
            <div className="catalog-grid">
              {await Promise.all(
                published!.map(async (t) => (
                  <article className="catalog-card" key={t.targetId}>
                    <h3>
                      {t.displayName || `Minecraft ${t.minecraftVersion}`}
                    </h3>
                    <p>{t.summary}</p>
                    <dl>
                      <dt>Minecraft</dt>
                      <dd>{t.minecraftVersion}</dd>
                      <dt>Loader</dt>
                      <dd>{t.loader}</dd>
                    </dl>
                    {await Promise.all(
                      Object.entries(t.channels).map(async ([c, ch]) => {
                        const m = await getManifest(t, ch);
                        return (
                          <div className="channel-row" key={c}>
                            <span className={`badge ${c}`}>
                              {
                                (
                                  {
                                    stable: "Estable",
                                    beta: "Beta",
                                    dev: "Desarrollo",
                                  } as Record<string, string>
                                )[c]
                              }
                            </span>
                            <strong>{ch.release}</strong>
                            {m ? (
                              <p>
                                Java {m.java} · loader {m.loader} · TFL Client ≥{" "}
                                {m.minimum}
                              </p>
                            ) : (
                              <p>
                                El catálogo está verificado. No pudimos
                                verificar los requisitos del manifiesto;
                                consúltalos en el launcher.
                              </p>
                            )}
                            <a
                              href={`https://github.com/TFLivesStudio/TFLClientSelection/releases/tag/${encodeURIComponent(ch.tag)}`}
                            >
                              Publicación oficial{" "}
                              <ArrowUpRight className="inline-icon" size={15} />
                            </a>
                          </div>
                        );
                      }),
                    )}
                  </article>
                )),
              )}
            </div>
            {!published?.length && (
              <p>El catálogo no contiene canales publicados.</p>
            )}
            <p className="notice">
              {catalog.targets
                .filter((t) => !Object.keys(t.channels).length)
                .map(
                  (t) =>
                    `Minecraft ${t.minecraftVersion} (${t.loader}): sin canal publicado.`,
                )
                .join(" ")}{" "}
              Estos targets no se ofrecen como versiones instalables.
            </p>
          </>
        )}
      </section>
      <section className="shell section">
        <h2>Instalar desde el launcher</h2>
        <ol className="instruction-list">
          <li>
            Actualiza TFL Client y abre TFL Selection dentro de la aplicación.
          </li>
          <li>
            Elige un target con un canal publicado. Beta y desarrollo son
            versiones de prueba.
          </li>
          <li>
            Revisa los requisitos que muestra el launcher y sigue su proceso de
            instalación y verificación.
          </li>
        </ol>
        <p>
          La web informa sobre las publicaciones. No instala mods ni sustituye
          las comprobaciones del launcher.
        </p>
      </section>
      <section className="shell section core-section">
        <span className="eyebrow">MOD DENTRO DEL JUEGO</span>
        <h2>TFL Core y Selection son proyectos distintos</h2>
        <p>
          Selection define la distribución. Core es un mod que aporta la
          interfaz y herramientas dentro de Minecraft; su presencia depende de
          la distribución publicada, no del nombre del launcher.
        </p>
        <h3>Estado documentado de Core</h3>
        <p>
          El README oficial consultado describe 0.3.0-alpha.1, una alpha para
          Minecraft 26.3, Fabric y Java 25 sin validación en una partida real.
          No debe confundirse con una versión estable de Selection.
        </p>
        <ul>
          <li>
            HUD configurable con widgets, anclas, escala y editor de posiciones.
          </li>
          <li>
            Crosshair, zoom, toggle sprint y waypoints locales documentados en
            la alpha.
          </li>
          <li>
            Perfiles y diagnóstico de módulos; sin promesas de mejora de FPS.
          </li>
        </ul>
        <a
          className="text-link"
          href="https://github.com/TFLivesStudio/TFLClientMOD#readme"
        >
          Estado y limitaciones en el repositorio de Core{" "}
          <ArrowUpRight className="inline-icon" size={15} />
        </a>
      </section>
    </>
  );
}
