import Image from "next/image";
import tfl from "../../public/icons/launchers/tfl.png";
import prism from "../../public/icons/launchers/prism.svg";
import cmclient from "../../public/icons/launchers/cmclient.png";
import labymod from "../../public/icons/launchers/labymod.png";
import lunar from "../../public/icons/launchers/lunar.png";
import { getTranslator } from "@/i18n/server";
const measurements = [
  ["TFL Client", 9, tfl],
  ["Prism Launcher", 100, prism],
  ["CMClient", 150, cmclient],
  ["LabyMod", 880, labymod],
  ["Lunar Client", 940, lunar],
] as const;
export async function MemoryComparison() {
  const tr = await getTranslator();
  return (
    <section className="shell section memory-section">
      <div className="memory-context">
      <span className="eyebrow">{tr("NÚCLEO NATIVO EN RUST")}</span>
      <h2>{tr("Memoria observada en el equipo de TFLives")}</h2>
      <p>
        {tr(
          "El núcleo nativo de TFL Client está escrito en Rust; su interfaz utiliza Svelte. Estos son los valores de memoria aportados por TFLives en un AMD A10 PRO 8750B con Windows 10.",
        )}
      </p>
      <p className="measurement-note">
        {tr("Observaciones de un solo equipo; no es un benchmark independiente ni una promesa de consumo.")}
      </p>
      <p className="measurement-note">
        {tr(
          "Mediciones aportadas por el equipo, no verificadas independientemente. No se proporcionó el método ni el estado de cada aplicación. No son requisitos de RAM ni una garantía de consumo en otros equipos; tampoco miden los FPS o la memoria de una partida.",
        )}
      </p>
      </div>
      <div className="memory-scroll">
        <table className="memory-table">
          <caption>
            {tr("Comparación de memoria de los launchers, en MB")}
          </caption>
          <thead>
            <tr>
              <th scope="col">Launcher</th>
              <th scope="col">{tr("Uso de memoria")}</th>
              <th scope="col">MB</th>
            </tr>
          </thead>
          <tbody>
            {measurements.map(([name, value, icon]) => (
              <tr
                key={name}
                className={name === "TFL Client" ? "memory-tfl" : ""}
              >
                <th scope="row">
                  <span className="launcher-name">
                    <span
                      className={`launcher-icon-shell ${name === "Lunar Client" ? "lunar-halo" : ""}`}
                    >
                      <Image
                        src={icon}
                        alt=""
                        width={36}
                        height={36}
                      />
                    </span>
                    <span>{name}</span>
                  </span>
                </th>
                <td>
                  <span className="memory-track" aria-hidden="true">
                    <span style={{ width: `${value / 10}%` }} />
                  </span>
                </td>
                <td>
                  <strong>{value}</strong> MB
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
