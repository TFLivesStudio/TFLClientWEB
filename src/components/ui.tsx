import { MotionPreferenceControl } from "./motion-preference";
import { AnimatedAccordion } from "./animated-ui";
import { getTranslator } from "@/i18n/server";
import Link from "@/components/locale-link";
import { ArrowUpRight, ArrowRight, Download } from "lucide-react";
import { PlatformIcon } from "./platform-icon";
import { Brand } from "./header";
export async function DownloadCTA({
  label = "Descargar TFL Client",
}: {
  label?: string;
}) {
  const tr = await getTranslator();
  return (
    <Link href="/descargas" className="button">
      <Download size={18} />
      {tr(label)}
      <ArrowUpRight size={17} />
    </Link>
  );
}
export async function SectionTitle({
  label,
  title,
  description,
}: {
  label: string;
  title: string;
  description?: string;
}) {
  const tr = await getTranslator();
  return (
    <div className="section-heading">
      <span className="eyebrow">
        <span />
        {tr(label)}
      </span>
      <h2>{tr(title)}</h2>
      {description && <p>{tr(description)}</p>}
    </div>
  );
}
export async function PageTitle({
  label,
  title,
  description,
}: {
  label: string;
  title: string;
  description: string;
}) {
  const tr = await getTranslator();
  return (
    <div className="page-title shell">
      <span className="eyebrow">
        <span />
        {tr(label)}
      </span>
      <h1>{tr(title)}</h1>
      <p>{tr(description)}</p>
    </div>
  );
}
export const questions = [
  [
    "¿Qué es TFL Client?",
    "Es el launcher de Minecraft de TFLives: el lugar desde el que gestionas versiones, mods y configuraciones de Minecraft Java.",
  ],
  [
    "¿Necesito una cuenta de Minecraft?",
    "Para jugar con autenticación Microsoft necesitas una cuenta con acceso a Minecraft Java Edition. El inicio de sesión se realiza dentro del launcher, nunca en esta web.",
  ],
  [
    "¿Qué ofrece TFL Selection?",
    "Clientes oficiales de Minecraft preparados por TFLives para distintas formas de jugar, como PvP o Minecraft técnico. Puedes elegir e instalar los clientes publicados desde el launcher.",
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
export async function FAQ() {
  const tr = await getTranslator();
  return (
    <div className="faq-list">
      <AnimatedAccordion
        items={questions.map(([q, a]) => ({
          title: tr(q),
          content: <p>{tr(a)}</p>,
        }))}
      />
    </div>
  );
}
export async function EndCTA() {
  const tr = await getTranslator();
  return (
    <section className="end-cta shell">
      <h2>{tr("Instaladores y notas de versión")}</h2>
      <p>
        {tr(
          "Elige el archivo de tu plataforma y revisa los cambios publicados antes de actualizar.",
        )}
      </p>
      <DownloadCTA />
      <Link className="text-link" href="/ayuda">
        {tr("Consultar la documentación")}
        <ArrowRight size={16} />
      </Link>
    </section>
  );
}
export async function Footer() {
  const tr = await getTranslator();
  return (
    <footer className="footer shell">
      <div className="footer-top">
        <div>
          <Brand />
          <p>
            {tr("Hecho por TFLives.")}
            <br />
            {tr("Launcher y proyectos de Minecraft Java.")}
          </p>
        </div>
        <div>
          <span>{tr("PRODUCTO")}</span>
          <Link href="/caracteristicas">Launcher</Link>
          <Link href="/selection">{tr("TFL Selection & Core")}</Link>
          <Link href="/descargas">{tr("Descargas")}</Link>
        </div>
        <div>
          <span>{tr("EXPLORA")}</span>
          <Link href="/novedades">{tr("Novedades")}</Link>
          <Link href="/ayuda">{tr("Centro de ayuda")}</Link>
          <Link href="/comunidad">{tr("Comunidad")}</Link>
        </div>
        <div>
          <span>{tr("CÓDIGO ABIERTO")}</span>
          <a href="https://github.com/TFLivesStudio/TFLClient">
            <PlatformIcon name="GitHub" /> Launcher <ArrowUpRight size={14} />
          </a>
          <a href="https://discord.gg/tflives">{tr("Discord de TFLives")}</a>
        </div>
        <div>
          <span>LEGAL</span>
          <Link href="/legal/aviso-legal">{tr("Aviso legal")}</Link>
          <Link href="/privacidad">{tr("Privacidad")}</Link>
          <Link href="/legal/terminos">{tr("Términos de Servicio")}</Link>
        </div>
      </div>
      <div className="footer-bottom">
        <span>© {new Date().getFullYear()} TFLives · TFL Client</span>
        <span>
          {tr(
            "No es un producto oficial de Minecraft. Sin afiliación con Mojang o Microsoft.",
          )}
        </span>
        <MotionPreferenceControl />
        <span className="made">{tr("ES / ESPAÑOL")}</span>
      </div>
    </footer>
  );
}
