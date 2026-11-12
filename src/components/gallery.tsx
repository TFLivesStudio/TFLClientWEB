"use client";
import { useT } from "@/i18n/provider";
import Image from "next/image";
import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { Expand, X, ArrowLeft, ArrowRight, Pause, Play } from "lucide-react";
const subscribeMotion = (fn: () => void) => {
  const q = matchMedia("(prefers-reduced-motion: reduce)");
  q.addEventListener("change", fn);
  return () => q.removeEventListener("change", fn);
};
const subscribeVisibility = (fn: () => void) => {
  document.addEventListener("visibilitychange", fn);
  return () => document.removeEventListener("visibilitychange", fn);
};
const shots = [
  {
    src: "/images/launcher-console.webp",
    label: "Consola y monitoreo · datos de demostración",
    tag: "CONSOLA",
    alt: "Vista previa de consola del launcher con datos de demostración",
  },
  {
    src: "/images/launcher-instance.webp",
    label: "Edición de instancia · perfil de demostración",
    tag: "INSTANCIAS",
    alt: "Configuración de una instancia de demostración en el frontend oficial",
  },
  {
    src: "/images/launcher-welcome.webp",
    label: "Inicio del launcher · instalación sin perfiles",
    tag: "EL LAUNCHER",
    alt: "Interfaz oficial del launcher TFL Client, pantalla de bienvenida",
  },
  {
    src: "/images/launcher-settings.webp",
    label: "Panel de apariencia y configuración",
    tag: "PERSONALIZACIÓN",
    alt: "Panel de apariencia de la interfaz oficial de TFL Client",
  },
];
export function Gallery() {
  const tr = useT();
  const [index, setIndex] = useState(0);
  const dialog = useRef<HTMLDialogElement>(null);
  const [playing, setPlaying] = useState(true);
  const [hovered, setHovered] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const reduced = useSyncExternalStore(
    subscribeMotion,
    () => matchMedia("(prefers-reduced-motion: reduce)").matches,
    () => true,
  );
  const hidden = useSyncExternalStore(
    subscribeVisibility,
    () => document.hidden,
    () => true,
  );
  useEffect(() => {
    if (!playing || hovered || expanded || reduced || hidden) return;
    const id = setInterval(() => setIndex((i) => (i + 1) % shots.length), 6500);
    return () => clearInterval(id);
  }, [playing, hovered, expanded, reduced, hidden, index]);
  const shot = shots[index];
  useEffect(() => {
    const d = dialog.current;
    const close = () => {
      document.body.style.removeProperty("overflow");
      setExpanded(false);
    };
    d?.addEventListener("close", close);
    return () => {
      d?.removeEventListener("close", close);
      document.body.style.removeProperty("overflow");
    };
  }, []);
  return (
    <div
      className="gallery"
      role="region"
      aria-label={tr("Capturas del launcher")}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onFocusCapture={() => setHovered(true)}
      onBlurCapture={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget)) setHovered(false);
      }}
    >
      <div className="product-frame">
        <div className="frame-bar">
          <div className="window-dots">
            <i />
            <i />
            <i />
          </div>
          <span>TFL CLIENT / {tr(shot.tag)}</span>
          <button
            className="icon-button"
            aria-label={tr("Ampliar captura")}
            onClick={() => {
              setExpanded(true);
              dialog.current?.showModal();
              document.body.style.overflow = "hidden";
            }}
          >
            <Expand size={15} />
          </button>
        </div>
        <Image
          key={shot.src}
          src={shot.src}
          alt={tr(shot.alt)}
          width={1440}
          height={900}
          priority
          className="product-shot"
        />
      </div>
      <div className="gallery-bottom">
        <div className="gallery-caption">
          <span className="live-dot" />
          {tr(shot.label)}
          <small>{tr("Frontend oficial · vistas de demostración")}</small>
        </div>
        <div className="gallery-controls">
          <button
            className="icon-button carousel-pause"
            aria-label={
              playing ? tr("Pausar carrusel") : tr("Reanudar carrusel")
            }
            onClick={() => setPlaying(!playing)}
          >
            {playing ? <Pause size={16} /> : <Play size={16} />}
          </button>
          {shots.map((s, i) => (
            <button
              key={s.src}
              aria-label={`${tr("Ver captura")} ${i + 1}: ${tr(s.tag)}`}
              aria-pressed={index === i}
              onClick={() => setIndex(i)}
              className={i === index ? "active" : ""}
            >
              0{i + 1}
            </button>
          ))}
          <span className="control-line" />
          <button
            className="icon-button"
            aria-label={tr("Captura anterior")}
            onClick={() => setIndex((index + shots.length - 1) % shots.length)}
          >
            <ArrowLeft size={17} />
          </button>
          <button
            className="icon-button"
            aria-label={tr("Siguiente captura")}
            onClick={() => setIndex((index + 1) % shots.length)}
          >
            <ArrowRight size={17} />
          </button>
        </div>
      </div>
      <dialog
        ref={dialog}
        className="image-dialog"
        onClick={(e) => {
          if (e.target === e.currentTarget) dialog.current?.close();
        }}
      >
        <button
          className="icon-button close-dialog"
          aria-label={tr("Cerrar captura")}
          onClick={() => dialog.current?.close()}
        >
          <X />
        </button>
        <Image src={shot.src} alt={tr(shot.alt)} width={1440} height={900} />
        <p>{tr(shot.label)}</p>
      </dialog>
    </div>
  );
}
