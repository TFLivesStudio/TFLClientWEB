import { Cpu, PlugZap, Fingerprint, FolderTree } from "lucide-react";
import { getTranslator } from "@/i18n/server";
import Link from "./locale-link";
import { Gallery } from "./gallery";
export async function LauncherFeatures() {
  const tr = await getTranslator();
  return (
    <section className="shell section launcher-features" id="native-and-mcp">
      <div className="native-feature">
        <div className="feature-icon">
          <Cpu size={26} />
        </div>
        <div>
          <span className="eyebrow">RUST · {tr("NÚCLEO NATIVO")}</span>
          <h2>{tr("Rust en el núcleo del launcher")}</h2>
          <p>
            {tr(
              "La gestión de instalaciones, descargas y procesos se ejecuta en un núcleo nativo escrito en Rust. La interfaz utiliza Svelte; el consumo de Minecraft depende de la versión, los mods y tu equipo.",
            )}
          </p>
        </div>
        <div className="native-details">
          <span>
            <FolderTree size={18} />
            {tr("Instalaciones independientes")}
          </span>
          <span>
            <Cpu size={18} />
            {tr("Procesos nativos")}
          </span>
        </div>
      </div>
      <div className="mcp-feature">
        <div className="mcp-description">
          <span className="eyebrow">
            <PlugZap size={16} /> MODEL CONTEXT PROTOCOL
          </span>
          <h2>{tr("Tu asistente, con permisos que tú decides")}</h2>
          <p>
            {tr(
              "Conecta un asistente local compatible para consultar instalaciones, revisar diagnósticos y realizar las acciones que autorices desde el launcher.",
            )}
          </p>
          <ul>
            <li>
              <Fingerprint size={17} />
              {tr("Aprobación por sesión y permisos por instancia.")}
            </li>
            <li>
              <PlugZap size={17} />
              {tr("Activación opcional en Ajustes → Integraciones.")}
            </li>
            <li>
              <Cpu size={17} />
              {tr("El launcher debe permanecer abierto.")}
            </li>
          </ul>
          <p className="source-note">
            {tr(
              "Requiere una versión con el auxiliar MCP incluido. La compatibilidad depende del cliente local; no es una conexión remota con ChatGPT en la nube.",
            )}
          </p>
          <Link href="/ayuda/mcp" className="text-link">
            {tr("Cómo conectar un asistente →")}
          </Link>
        </div>
        <Gallery kind="mcp" />
      </div>
    </section>
  );
}
