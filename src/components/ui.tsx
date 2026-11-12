import Link from "next/link";
import { ArrowUpRight, ArrowRight, Download, Code2, Plus } from "lucide-react";
import { Brand } from "./header";
export function DownloadCTA({
  label = "Descargar TFL Client",
}: {
  label?: string;
}) {
  return (
    <Link href="/descargas" className="button">
      <Download size={18} />
      {label}
      <ArrowUpRight size={17} />
    </Link>
  );
}
export function SectionTitle({
  label,
  title,
  description,
}: {
  label: string;
  title: string;
  description?: string;
}) {
  return (
    <div className="section-heading">
      <span className="eyebrow">
        <span />
        {label}
      </span>
      <h2>{title}</h2>
      {description && <p>{description}</p>}
    </div>
  );
}
export function PageTitle({
  label,
  title,
  description,
}: {
  label: string;
  title: string;
  description: string;
}) {
  return (
    <div className="page-title shell">
      <span className="eyebrow">
        <span />
        {label}
      </span>
      <h1>{title}</h1>
      <p>{description}</p>
    </div>
  );
}
export const questions = [
  [
    "¿Qué es TFL Client?",
    "Es el launcher de Minecraft de TFLives: el lugar desde el que gestionas tus instalaciones y accedes al ecosistema TFL.",
  ],
  [
    "¿Necesito una cuenta de Minecraft?",
    "Para jugar con autenticación Microsoft necesitas una cuenta con acceso a Minecraft Java Edition. El inicio de sesión se realiza dentro del launcher, nunca en esta web.",
  ],
  [
    "¿Cuál es la diferencia entre el launcher y TFL Core?",
    "El launcher prepara y abre tus instalaciones. TFL Core es el mod que incorpora la interfaz, los widgets de HUD y las herramientas dentro del juego. Son proyectos distintos.",
  ],
  [
    "¿Puedo elegir los mods de TFL Selection?",
    "Selection es una distribución oficial con un conjunto de mods definido por TFLives. Su composición no es editable como una instalación libre.",
  ],
  [
    "¿Dónde encuentro versiones y requisitos?",
    "En Descargas puedes consultar los archivos publicados y las notas de cada versión en el repositorio oficial. La disponibilidad depende de la plataforma y del canal de publicación.",
  ],
];
export function FAQ() {
  return (
    <div className="faq-list">
      {questions.map(([q, a]) => (
        <details key={q}>
          <summary>
            {q}
            <Plus size={18} />
          </summary>
          <p>{a}</p>
        </details>
      ))}
    </div>
  );
}
export function EndCTA() {
  return (
    <section className="end-cta shell">
      <span className="eyebrow">TU PRÓXIMA PARTIDA EMPIEZA AQUÍ</span>
      <h2>
        Hazlo tuyo.
        <br />
        <span>Juega con TFL.</span>
      </h2>
      <p>Un launcher. Tu mundo de posibilidades.</p>
      <DownloadCTA />
      <Link href="/ayuda" className="text-link">
        ¿Primera vez? Te ayudamos <ArrowRight size={16} />
      </Link>
    </section>
  );
}
export function Footer() {
  return (
    <footer className="footer shell">
      <div className="footer-top">
        <div>
          <Brand />
          <p>
            Hecho por TFLives.
            <br />
            Para quienes viven Minecraft.
          </p>
        </div>
        <div>
          <span>PRODUCTO</span>
          <Link href="/caracteristicas">Launcher</Link>
          <Link href="/selection">TFL Selection & Core</Link>
          <Link href="/descargas">Descargas</Link>
        </div>
        <div>
          <span>EXPLORA</span>
          <Link href="/novedades">Novedades</Link>
          <Link href="/ayuda">Centro de ayuda</Link>
          <Link href="/comunidad">Comunidad</Link>
        </div>
        <div>
          <span>CÓDIGO ABIERTO</span>
          <a href="https://github.com/TFLivesStudio/TFLClient">
            <Code2 size={15} /> Launcher <ArrowUpRight size={14} />
          </a>
          <a href="https://github.com/TFLivesStudio/TFLClientMOD">
            TFL Core <ArrowUpRight size={14} />
          </a>
          <Link href="/privacidad">Privacidad y créditos</Link>
        </div>
      </div>
      <div className="footer-bottom">
        <span>© {new Date().getFullYear()} TFLives · TFL Client</span>
        <span>
          No es un producto oficial de Minecraft. Sin afiliación con Mojang o
          Microsoft.
        </span>
        <span className="made">ES / ESPAÑOL</span>
      </div>
    </footer>
  );
}
