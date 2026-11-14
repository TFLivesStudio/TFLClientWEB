import { getTranslator } from "@/i18n/server";
import { ArrowRight, Download, Library, Gamepad2 } from "lucide-react";

export async function EcosystemFlow({ headingLevel = 3 }: { headingLevel?: 2 | 3 } = {}) {
  const tr = await getTranslator();
  const Heading = headingLevel === 2 ? "h2" : "h3";
  const items = [
    [Download, "Instalar", "Launcher", "TFL Client", "El launcher: instala, actualiza y abre tus instancias."],
    [Library, "Elegir", "Biblioteca", "TFL Selection", "La biblioteca: reúne los clientes modificados que publica TFLives."],
    [Gamepad2, "Jugar", "Cliente", "TFLClient", "El cliente: la experiencia modificada que utilizas dentro de Minecraft."],
  ] as const;
  return (
    <ol className="ecosystem-flow" aria-label={tr("Instalar, elegir y jugar")}>
      {items.map(([Icon, action, role, name, description], i) => (
        <li key={name}>
          <div className="ecosystem-action">
            <span>0{i + 1} / {tr(action)}</span>
            {i < 2 && <ArrowRight size={18} aria-hidden="true" />}
          </div>
          <Icon className="ecosystem-icon" size={24} aria-hidden="true" />
          <span className="ecosystem-role">{tr(role)}</span>
          <Heading className="ecosystem-name">{name}</Heading>
          <p>{tr(description)}</p>
        </li>
      ))}
    </ol>
  );
}
