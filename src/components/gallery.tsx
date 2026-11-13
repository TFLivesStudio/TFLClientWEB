"use client";
import { useT } from "@/i18n/provider";
import Image from "next/image";
import * as Dialog from "@radix-ui/react-dialog";
import {
  AnimatePresence,
  LayoutGroup,
  motion,
  useReducedMotion,
} from "motion/react";
import { Hint } from "./animated-ui";
import { useEffect, useId, useState, useSyncExternalStore } from "react";
import { Expand, X, ArrowLeft, ArrowRight } from "lucide-react";
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
  const id = useId();
  const reduce = useReducedMotion();
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
    if (expanded || reduced || hidden) return;
    const id = setInterval(() => setIndex((i) => (i + 1) % shots.length), 6000);
    return () => clearInterval(id);
  }, [expanded, reduced, hidden, index]);
  const shot = shots[index];
  return (
    <Dialog.Root open={expanded} onOpenChange={setExpanded}>
      <LayoutGroup id={id}>
        <div
          className="gallery"
          role="region"
          aria-label={tr("Capturas del launcher")}
        >
          <div className="product-frame">
            <div className="frame-bar">
              <div className="window-dots">
                <i />
                <i />
                <i />
              </div>
              <span>TFL CLIENT / {tr(shot.tag)}</span>
              <Hint label={tr("Ampliar captura")}>
                <Dialog.Trigger asChild>
                  <button
                    className="icon-button"
                    aria-label={tr("Ampliar captura")}
                  >
                    <Expand size={15} />
                  </button>
                </Dialog.Trigger>
              </Hint>
            </div>
            <motion.div
              className="product-viewport"
              layoutId="launcher-image"
              transition={{ duration: reduce ? 0 : 0.28 }}
            >
              {shots.map((s, i) => (
                <Image
                  key={s.src}
                  src={s.src}
                  alt={i === index ? tr(s.alt) : ""}
                  aria-hidden={i !== index}
                  width={1440}
                  height={900}
                  priority={i === 0}
                  loading={i === 0 ? undefined : "eager"}
                  className={`gallery-shot${i === index ? " product-shot is-active" : ""}`}
                />
              ))}
            </motion.div>
          </div>
          <div className="gallery-bottom">
            <div className="gallery-caption">
              <span className="live-dot" />
              {tr(shot.label)}
              <small>{tr("Frontend oficial · vistas de demostración")}</small>
            </div>
            <div className="gallery-controls">
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
                onClick={() =>
                  setIndex((index + shots.length - 1) % shots.length)
                }
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
          <AnimatePresence>
            {expanded && (
              <Dialog.Portal forceMount>
                <Dialog.Overlay asChild forceMount>
                  <motion.div
                    className="dialog-overlay"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  />
                </Dialog.Overlay>
                <div className="dialog-positioner">
                  <Dialog.Content
                    forceMount
                    asChild
                    onKeyDown={(e) => {
                      if (e.key === "ArrowRight")
                        setIndex((i) => (i + 1) % shots.length);
                      if (e.key === "ArrowLeft")
                        setIndex((i) => (i + shots.length - 1) % shots.length);
                    }}
                  >
                    <motion.div
                      className="image-dialog"
                      initial={{ opacity: 0, scale: reduce ? 1 : 0.97 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: reduce ? 1 : 0.97 }}
                    >
                      <Dialog.Close asChild>
                        <button
                          className="icon-button close-dialog"
                          aria-label={tr("Cerrar captura")}
                        >
                          <X />
                        </button>
                      </Dialog.Close>
                      <motion.div
                        layoutId="launcher-image"
                        className="dialog-image-stage"
                        transition={{ duration: reduce ? 0 : 0.28 }}
                      >
                        <Image
                          src={shot.src}
                          alt={tr(shot.alt)}
                          width={1440}
                          height={900}
                          priority
                        />
                      </motion.div>
                      <div className="dialog-caption">
                        <Dialog.Title>{tr(shot.label)}</Dialog.Title>
                        <div className="gallery-controls">
                          <button
                            className="icon-button"
                            aria-label={tr("Captura anterior")}
                            onClick={() =>
                              setIndex(
                                (index + shots.length - 1) % shots.length,
                              )
                            }
                          >
                            <ArrowLeft size={18} />
                          </button>
                          <span>
                            {index + 1} / {shots.length}
                          </span>
                          <button
                            className="icon-button"
                            aria-label={tr("Siguiente captura")}
                            onClick={() => setIndex((index + 1) % shots.length)}
                          >
                            <ArrowRight size={18} />
                          </button>
                        </div>
                      </div>
                      <Dialog.Description className="sr-only">
                        {tr(
                          "Usa las flechas para cambiar de captura y Escape para cerrar.",
                        )}
                      </Dialog.Description>
                    </motion.div>
                  </Dialog.Content>
                </div>
              </Dialog.Portal>
            )}
          </AnimatePresence>
        </div>
      </LayoutGroup>
    </Dialog.Root>
  );
}
