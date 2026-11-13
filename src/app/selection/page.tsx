import { ModuleExplorer } from "@/components/module-explorer";
import { getTranslator } from "@/i18n/server";
import Link from "@/components/locale-link";
import { PageTitle, DownloadCTA } from "@/components/ui";
import { getCatalog } from "@/lib/selection";
import { seo } from "@/lib/seo";
import { clientDisplayName } from "@/lib/product-names";
export async function generateMetadata() {
  const tr = await getTranslator();
  return seo(
    "TFL Selection",
    tr(
      "La biblioteca oficial de clientes modificados de TFLives. Descubre TFLClient e instálalo desde el launcher TFL Client.",
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
        label={tr("BIBLIOTECA OFICIAL")}
        title="TFL Selection"
        description={tr(
          "TFL Selection es la biblioteca donde TFLives publica sus clientes modificados de Minecraft. TFLClient es el cliente; TFL Client es el launcher desde el que lo instalas.",
        )}
      />
      <section className="shell section selection-intro">
        <div>
          <h2>{tr("Una biblioteca, un cliente y un launcher")}</h2>
          <p>
            {tr(
              "Abre la biblioteca TFL Selection dentro del launcher TFL Client para encontrar TFLClient. Cada versión publicada del cliente reúne los mods y ajustes preparados por el equipo.",
            )}
          </p>
          <p>
            {tr(
              "La biblioteca muestra las versiones que TFLives ha publicado. Consulta la descripción y el canal de TFLClient antes de instalarlo.",
            )}
          </p>
          <dl className="ecosystem-terms">
            <div>
              <dt>TFL Client</dt>
              <dd>
                {tr("El launcher: instala, actualiza y abre tus instancias.")}
              </dd>
            </div>
            <div>
              <dt>TFL Selection</dt>
              <dd>
                {tr(
                  "La biblioteca: reúne los clientes modificados que publica TFLives.",
                )}
              </dd>
            </div>
            <div>
              <dt>TFLClient</dt>
              <dd>
                {tr(
                  "El cliente: la experiencia modificada que utilizas dentro de Minecraft.",
                )}
              </dd>
            </div>
          </dl>
          <Link href="/ayuda/glosario" className="text-link">
            {tr("Aprende los nombres y términos de TFL →")}
          </Link>
          <DownloadCTA />
        </div>
        <div className="comparison">
          <span className="eyebrow">{tr("IMPULSADO POR TFL CORE")}</span>
          <h3>{tr("Herramientas dentro de Minecraft")}</h3>
          <p>
            {tr(
              "TFLClient ofrece las funciones dentro de Minecraft, impulsadas por TFL Core. Las funciones incluidas dependen de la versión del cliente que instales.",
            )}
          </p>
          <a className="button secondary" href="https://discord.gg/tflives">
            {tr("Consultar en Discord")}
          </a>
        </div>
      </section>
      <section className="shell section">
        <h2>{tr("Versiones de TFLClient en la biblioteca")}</h2>
        {catalog ? (
          <div className="catalog-grid">
            {catalog.targets
              .filter((t) => Object.keys(t.channels).length)
              .map((t) => (
                <article className="catalog-card" key={t.targetId}>
                  <header className="catalog-heading">
                    <h3>
                      {clientDisplayName(t.displayName, t.minecraftVersion)}
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
      <ModuleExplorer />
      <section className="shell section">
        <h2>{tr("Cómo instalar TFLClient")}</h2>
        <ol className="instruction-list">
          <li>
            {tr("Descarga TFL Client e inicia sesión dentro de la aplicación.")}
          </li>
          <li>
            {tr(
              "Abre la biblioteca TFL Selection y elige una versión publicada de TFLClient.",
            )}
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
