"use client";
import { useMotionPreference } from "./motion-preference";
import { useT } from "@/i18n/provider";
import { LauncherImage } from "./launcher-image";
import * as Dialog from "@radix-ui/react-dialog";
import { AnimatePresence, LayoutGroup, motion } from "motion/react";
import { Hint } from "./animated-ui";
import { useEffect, useId, useRef, useState, useSyncExternalStore } from "react";
import { Expand, X, ArrowLeft, ArrowRight } from "lucide-react";
const subscribeVisibility = (fn: () => void) => {
  document.addEventListener("visibilitychange", fn);
  return () => document.removeEventListener("visibilitychange", fn);
};
const launcherShots = [
  {
    src: "/images/launcher-welcome.webp",
    label: "Inicio del launcher · instalación sin perfiles",
    tag: "EL LAUNCHER",
    alt: "Interfaz oficial del launcher TFL Client, pantalla de bienvenida",
  },
  {
    src: "/images/launcher-instance.webp",
    label: "Edición de instancia · perfil de demostración",
    tag: "INSTANCIAS",
    alt: "Configuración de una instancia de demostración en el frontend oficial",
  },
  {
    src: "/images/launcher-settings.webp",
    label: "Panel de apariencia y configuración",
    tag: "PERSONALIZACIÓN",
    alt: "Panel de apariencia de la interfaz oficial de TFL Client",
  },
  {
    src: "/images/launcher-console.webp",
    label: "Consola y monitoreo · datos de demostración",
    tag: "CONSOLA",
    alt: "Vista previa de consola del launcher con datos de demostración",
  },
];
const mcpShots = [
  {
    src: "/images/launcher-mcp.webp",
    label: "Integraciones MCP · demostración sin asistentes conectados",
    tag: "MCP",
    alt: "Panel oficial de integraciones MCP del launcher",
  },
];
export function Gallery({
  kind = "launcher",
}: { kind?: "launcher" | "mcp" } = {}) {
  const shots = kind === "mcp" ? mcpShots : launcherShots;
  const tr = useT();
  const [index, setIndex] = useState(0);
  const id = useId();
  const { reduced: reduce } = useMotionPreference();
  const [expanded, setExpanded] = useState(false);
  const gallery = useRef<HTMLDivElement>(null);
  const [near, setNear] = useState(false);
  useEffect(() => {
    const node = gallery.current;
    if (!node) return;
    // Prepare every slide in both themes before it is reached; manual controls
    // and the theme reveal must never depend on a newly mounted image.
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setNear(true);
        observer.disconnect();
      }
    }, { rootMargin: "1200px" });
    observer.observe(node);
    return () => observer.disconnect();
  }, []);
  const hidden = useSyncExternalStore(
    subscribeVisibility,
    () => document.hidden,
    () => true,
  );
  useEffect(() => {
    if (expanded || reduce || hidden || shots.length < 2) return;
    const id = setInterval(() => setIndex((i) => (i + 1) % shots.length), 6000);
    return () => clearInterval(id);
  }, [expanded, reduce, hidden, index, shots.length]);
  const shot = shots[index];
  return (
    <Dialog.Root open={expanded} onOpenChange={setExpanded}>
      <LayoutGroup id={id}>
        <div
          ref={gallery}
          className="gallery"
          role="region"
          aria-label={tr(
            kind === "mcp" ? "Captura de MCP" : "Capturas del launcher",
          )}
        >
          <div className="product-frame">
            <div className="frame-bar">
              <div className="window-dots">
                <i />
                <i />
                <i />
              </div>
              <span>TFL CLIENT / {tr(shot.tag)}</span>
              <Hint
                label={tr(
                  kind === "mcp" ? "Abrir imagen de MCP" : "Ampliar captura",
                )}
              >
                <Dialog.Trigger asChild>
                  <button
                    className="icon-button"
                    aria-label={tr(
                      kind === "mcp"
                        ? "Abrir imagen de MCP"
                        : "Ampliar captura",
                    )}
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
                <LauncherImage
                  key={s.src}
                  src={s.src}
                  alt={i === index ? tr(s.alt) : ""}
                  aria-hidden={i !== index}
                  width={1440}
                  height={900}
                  loading={near || expanded ? "eager" : "lazy"}
                  sizes={kind === "mcp"
                    ? "(max-width:900px) calc(100vw - 40px), (max-width:1280px) 55vw, 660px"
                    : "(max-width:760px) calc(100vw - 40px), (max-width:1200px) calc(100vw - 80px), 1120px"}
                  markActive={kind === "launcher" && i === index}
                  className={`gallery-shot${i === index ? " is-active" : ""}`}
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
            {shots.length > 1 && (
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
            )}
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
                        <LauncherImage
                          src={shot.src}
                          alt={tr(shot.alt)}
                          width={1440}
                          height={900}
                          priority
                          sizes="(max-width:1232px) calc(100vw - 56px), 1176px"
                        />
                      </motion.div>
                      <div className="dialog-caption">
                        <Dialog.Title>{tr(shot.label)}</Dialog.Title>
                        {shots.length > 1 && (
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
                              onClick={() =>
                                setIndex((index + 1) % shots.length)
                              }
                            >
                              <ArrowRight size={18} />
                            </button>
                          </div>
                        )}
                      </div>
                      <Dialog.Description className="sr-only">
                        {tr(
                          shots.length > 1
                            ? "Usa las flechas para cambiar de captura y Escape para cerrar."
                            : "Pulsa Escape para cerrar.",
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
