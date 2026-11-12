import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  Boxes,
  SlidersHorizontal,
  ShieldCheck,
  Layers3,
  MoveUpRight,
  Sparkles,
  MousePointer2,
  Monitor,
  Code2,
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
            CONOCE EL ECOSISTEMA TFL
            <span className="announcement-divider" />
            Launcher. Selection. Core.
            <ArrowUpRight size={14} />
          </Link>
          <h1>
            Tu Minecraft.
            <br />
            <span>Tu universo.</span>
            <i className="hero-star">✦</i>
          </h1>
          <p>
            Más que abrir el juego. Un lugar para tus mundos,
            <br className="desktop-break" /> tus instalaciones y tu próxima gran
            aventura.
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
        <div className="hero-coordinate left">TFL / NEXT WORLD</div>
        <div className="hero-coordinate right">SCROLL TO EXPLORE ↓</div>
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
        <div className="feature-grid">
          <article className="feature-card feature-main">
            <span className="card-icon">
              <Boxes />
            </span>
            <h3>
              Cada mundo,
              <br />
              su propio espacio.
            </h3>
            <p>
              Organiza instalaciones independientes. Mantén tus mods, shaders y
              ajustes donde pertenecen.
            </p>
            <div className="instance-art" aria-hidden="true">
              <div>
                <span className="cube cube-blue" />
                <i>INSTALACIONES</i>
                <span className="art-line" />
                <Boxes size={18} />
              </div>
              <div>
                <span className="cube cube-green" />
                <i>MODS & SHADERS</i>
                <span className="art-line" />
                <Layers3 size={18} />
              </div>
              <div>
                <span className="cube cube-purple" />
                <i>TUS CONFIGURACIONES</i>
                <span className="art-line" />
                <SlidersHorizontal size={18} />
              </div>
            </div>
            <span className="card-foot">
              TU BIBLIOTECA, BIEN ORGANIZADA <MoveUpRight size={17} />
            </span>
          </article>
          <article className="feature-card">
            <span className="card-icon">
              <SlidersHorizontal />
            </span>
            <div className="palette-art" aria-hidden="true">
              <i />
              <i />
              <i />
              <i />
              <i />
            </div>
            <h3>Que se sienta tuyo.</h3>
            <p>
              Elige el estilo, la superficie y el color de acento. También
              puedes reducir el movimiento y los efectos.
            </p>
            <span className="card-foot">TU ESTILO. TUS REGLAS.</span>
          </article>
          <article className="feature-card">
            <span className="card-icon">
              <ShieldCheck />
            </span>
            <div className="auth-art" aria-hidden="true">
              <span />
              <span />
              <span />
              <span />
            </div>
            <h3>Tu cuenta, en el launcher.</h3>
            <p>
              Inicia sesión con Microsoft dentro de TFL Client. Aquí solo
              necesitas elegir por dónde empezar.
            </p>
            <span className="card-foot">SIN CONTRASEÑAS EN LA WEB</span>
          </article>
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
            TFL<span>SELECTION</span>
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
