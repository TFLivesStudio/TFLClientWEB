import Image from "next/image";
import Link from "next/link";
import {
  Code2,
  ArrowRight,
  ArrowUpRight,
  Boxes,
  SlidersHorizontal,
  ShieldCheck,
  Layers3,
  Sparkles,
  MousePointer2,
  Monitor,
} from "lucide-react";
import { Ambient } from "@/components/ambient";
import { Gallery } from "@/components/gallery";
import { DownloadCTA, SectionTitle, FAQ, EndCTA } from "@/components/ui";
export default function Home() {
  return (
    <>
      <section className="hero">
        <Ambient />
        <div className="hero-halo" />
        <div className="hero-content shell">
          <Link href="/selection" className="announcement">
            <span className="live-dot" />
            TFL CLIENT / MINECRAFT JAVA
            <span className="announcement-divider" />
            Por TFLives
            <ArrowUpRight size={14} />
          </Link>
          <h1>
            Tu Minecraft.
            <br />
            <span>Con carácter propio.</span>
          </h1>
          <p>
            Un launcher que se adapta a tu forma de jugar.
            <br className="desktop-break" /> Tus instalaciones. Tu estilo. Tu
            siguiente mundo.
          </p>
          <div className="hero-actions">
            <DownloadCTA />
            <Link href="/caracteristicas" className="button secondary">
              Descubre el launcher
              <ArrowRight size={17} />
            </Link>
          </div>
          <div className="platform-note">
            <Monitor size={13} /> Windows, macOS y Linux <span>·</span>{" "}
            Disponibilidad según versión
          </div>
          <div className="hero-gallery">
            <Gallery />
          </div>
        </div>
        <div className="hero-coordinate left">EST. TFLIVES / JAVA EDITION</div>
        <div className="hero-coordinate right">
          DESCUBRE LO QUE HAY DENTRO ↓
        </div>
      </section>
      <div className="principles shell">
        <span>
          <Boxes size={19} />
          Tus instalaciones, en orden
        </span>
        <span>
          <SlidersHorizontal size={19} />
          Una experiencia personal
        </span>
        <span>
          <Code2 size={19} />
          Código abierto
        </span>
        <span>
          <ShieldCheck size={19} />
          Autenticación Microsoft
        </span>
      </div>
      <section className="section shell" id="launcher">
        <div className="heading-row">
          <SectionTitle
            label="TODO EMPIEZA EN EL LAUNCHER"
            title="Menos vueltas. Más Minecraft."
            description="De la primera instalación al próximo mundo. Todo tiene su lugar."
          />
          <Link href="/caracteristicas" className="text-link">
            Explorar características
            <ArrowUpRight size={17} />
          </Link>
        </div>
        <div className="product-stories">
          {[
            {
              n: "01",
              icon: Boxes,
              title: "Un lugar para cada mundo.",
              text: "Instalaciones independientes, con sus propios mods, shaders y ajustes. Tu biblioteca de Minecraft, sin mezclarlo todo.",
              detail: "ORGANIZACIÓN",
            },
            {
              n: "02",
              icon: SlidersHorizontal,
              title: "Se nota que es tuyo.",
              text: "Dos estilos de interfaz. Superficies, tipografías y acentos. Decide cómo se ve tu launcher y cuánto movimiento quieres.",
              detail: "PERSONALIZACIÓN",
            },
            {
              n: "03",
              icon: ShieldCheck,
              title: "Entra. A tu manera.",
              text: "Inicia sesión con Microsoft dentro del launcher y prepara tu próxima instalación. La web nunca te pedirá tu contraseña.",
              detail: "TU CUENTA, EN LA APP",
            },
          ].map(({ n, icon: Icon, title, text, detail }) => (
            <article className="product-story" key={n}>
              <span className="story-number">{n}</span>
              <div>
                <span className="eyebrow">{detail}</span>
                <h3>{title}</h3>
                <p>{text}</p>
              </div>
              <Icon size={38} strokeWidth={1} />
            </article>
          ))}
        </div>
      </section>
      <section className="selection-section shell">
        <div className="selection-image">
          <Image
            src="/images/forest.webp"
            alt="Bosque nocturno, arte ambiental incluido en el launcher TFL Client"
            fill
            sizes="(max-width: 760px) 100vw, 55vw"
          />
          <span className="image-overline">
            <span className="live-dot" />
            EL UNIVERSO TFL
          </span>
          <div className="selection-wordmark">
            <Image src="/images/tfl.svg" alt="TFL" width={100} height={80} />
            <span>SELECTION</span>
          </div>
          <small>Arte ambiental del launcher</small>
        </div>
        <div className="selection-copy">
          <span className="eyebrow">
            <span />
            MÁS ALLÁ DEL LAUNCHER
          </span>
          <h2>
            Una selección.
            <br />
            Otra forma de jugar.
          </h2>
          <p>
            TFL Selection reúne la experiencia curada de TFLives. TFL Core lleva
            la personalización al interior del juego.
          </p>
          <ul>
            <li>
              <Sparkles size={17} />
              Una distribución definida por el equipo
            </li>
            <li>
              <MousePointer2 size={17} />
              HUD y herramientas de TFL Core
            </li>
            <li>
              <Layers3 size={17} />
              Proyectos que crecen contigo
            </li>
          </ul>
          <Link href="/selection" className="button secondary">
            Conoce Selection & Core
            <ArrowUpRight size={17} />
          </Link>
          <small>TFL Core está en alpha experimental.</small>
        </div>
      </section>
      <section className="section shell">
        <SectionTitle
          label="DEL ESCRITORIO A TU MUNDO"
          title="Tu próxima partida, en tres pasos."
        />
        <div className="steps">
          {[
            [
              "01",
              "Elige tu plataforma",
              "Consulta la versión publicada para tu sistema y descarga el launcher.",
            ],
            [
              "02",
              "Hazlo tuyo",
              "Inicia sesión dentro de TFL Client y prepara tu instalación de Minecraft.",
            ],
            [
              "03",
              "Entra en tu mundo",
              "Abre tu instalación desde el launcher. La siguiente aventura la eliges tú.",
            ],
          ].map(([n, t, d]) => (
            <article key={n}>
              <span className="step-number">{n}</span>
              <h3>{t}</h3>
              <p>{d}</p>
            </article>
          ))}
        </div>
      </section>
      <section className="faq-section section shell">
        <SectionTitle
          label="SIN QUEDARTE CON DUDAS"
          title="Antes de empezar."
          description="Las respuestas rápidas. El resto, en nuestro centro de ayuda."
        />
        <FAQ />
      </section>
      <EndCTA />
    </>
  );
}
