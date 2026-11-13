import { getTranslator } from "@/i18n/server";
import Link from "@/components/locale-link";
import { PageTitle, DownloadCTA } from "@/components/ui";
import { getCatalog } from "@/lib/selection";
import { seo } from "@/lib/seo";
export async function generateMetadata() {
  const tr = await getTranslator();
  return seo(
    "TFL Selection",
    tr(
      "Clientes oficiales de Minecraft de TFLives para diferentes formas de jugar.",
    ),
    "/selection",
    tr.locale,
  );
}
export default async function Selection() {
  const tr = await getTranslator();
  const { catalog } = await getCatalog();
  return (
    <>
      <PageTitle
        label={tr("CLIENTES OFICIALES")}
        title="TFL Selection"
        description={tr(
          "Clientes de Minecraft preparados por TFLives para distintas formas de jugar: PvP, Minecraft técnico y otras experiencias del equipo.",
        )}
      />
      <section className="shell section selection-intro">
        <div>
          <h2>{tr("Elige el cliente para tu partida")}</h2>
          <p>
            {tr(
              "TFL Selection reúne los clientes oficiales que puedes encontrar en TFL Client. Cada propuesta tiene una configuración y una selección de mods preparadas por el equipo, para que no tengas que reunirlos por separado.",
            )}
          </p>
          <p>
            {tr(
              "Las propuestas disponibles dependen de lo que haya publicado TFLives. Consulta su descripción y su canal antes de instalar.",
            )}
          </p>
          <DownloadCTA />
        </div>
        <div className="comparison">
          <span className="eyebrow">{tr("IMPULSADO POR TFL CORE")}</span>
          <h3>{tr("Herramientas dentro de Minecraft")}</h3>
          <p>
            {tr(
              "TFL Core forma parte del trabajo del equipo para personalizar la experiencia dentro del juego. Las funciones incluidas dependen del cliente que elijas.",
            )}
          </p>
          <a className="button secondary" href="https://discord.gg/tflives">
            {tr("Consultar en Discord")}
          </a>
        </div>
      </section>
      <section className="shell section">
        <h2>{tr("Clientes disponibles")}</h2>
        {catalog ? (
          <div className="catalog-grid">
            {catalog.targets
              .filter((t) => Object.keys(t.channels).length)
              .map((t) => (
                <article className="catalog-card" key={t.targetId}>
                  <header className="catalog-heading">
                    <h3>
                      {t.displayName || `Minecraft ${t.minecraftVersion}`}
                    </h3>
                    <span className="catalog-version">
                      Minecraft {t.minecraftVersion}
                    </span>
                  </header>
                  <div className="catalog-channels">
                    {Object.entries(t.channels).map(([channel, p]) => (
                      <div
                        key={channel}
                        className={`channel-row channel-${channel}`}
                      >
                        <div className="channel-heading">
                          <span className={`badge ${channel}`}>
                            {channel === "stable"
                              ? tr("Estable")
                              : channel === "beta"
                                ? tr("Beta")
                                : tr("Desarrollo")}
                          </span>
                          <strong>{p.release}</strong>
                        </div>
                        <p>
                          {channel === "stable"
                            ? tr("Versión publicada para uso habitual.")
                            : tr(
                                "Versión de prueba. Lee su descripción en el launcher antes de instalar.",
                              )}
                        </p>
                      </div>
                    ))}
                  </div>
                </article>
              ))}
          </div>
        ) : (
          <div className="notice">
            {tr(
              "No pudimos consultar los clientes disponibles. Abre TFL Selection en el launcher para revisar su disponibilidad.",
            )}
          </div>
        )}
      </section>
      <section className="shell section">
        <h2>{tr("Cómo instalar un cliente")}</h2>
        <ol className="instruction-list">
          <li>
            {tr("Descarga TFL Client e inicia sesión dentro de la aplicación.")}
          </li>
          <li>
            {tr("Abre TFL Selection y elige uno de los clientes publicados.")}
          </li>
          <li>
            {tr(
              "Revisa su descripción y canal. Confirma la instalación y espera a que termine.",
            )}
          </li>
          <li>{tr("Abre la instalación desde tu biblioteca para jugar.")}</li>
        </ol>
        <Link className="text-link" href="/ayuda/selection">
          {tr("Guía de instalación →")}
        </Link>
      </section>
    </>
  );
}
