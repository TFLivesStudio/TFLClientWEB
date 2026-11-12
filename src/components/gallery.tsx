"use client";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { Expand, X, ArrowLeft, ArrowRight } from "lucide-react";
const shots = [
  {
    src: "/images/launcher-welcome.webp",
    label: "Bienvenido a tu próximo mundo",
    tag: "EL LAUNCHER",
    alt: "Interfaz oficial del launcher TFL Client, pantalla de bienvenida",
  },
  {
    src: "/images/launcher-settings.webp",
    label: "Tu espacio, a tu manera",
    tag: "PERSONALIZACIÓN",
    alt: "Panel de apariencia de la interfaz oficial de TFL Client",
  },
];
export function Gallery() {
  const [index, setIndex] = useState(0);
  const dialog = useRef<HTMLDialogElement>(null);
  const shot = shots[index];
  useEffect(() => {
    const d = dialog.current;
    const close = () => document.body.style.removeProperty("overflow");
    d?.addEventListener("close", close);
    return () => {
      d?.removeEventListener("close", close);
      document.body.style.removeProperty("overflow");
    };
  }, []);
  return (
    <div className="gallery">
      <div className="product-frame">
        <div className="frame-bar">
          <div className="window-dots">
            <i />
            <i />
            <i />
          </div>
          <span>TFL CLIENT / {shot.tag}</span>
          <button
            className="icon-button"
            aria-label="Ampliar captura"
            onClick={() => {
              dialog.current?.showModal();
              document.body.style.overflow = "hidden";
            }}
          >
            <Expand size={15} />
          </button>
        </div>
        <Image
          src={shot.src}
          alt={shot.alt}
          width={1440}
          height={900}
          priority
          className="product-shot"
        />
      </div>
      <div className="gallery-bottom">
        <div className="gallery-caption">
          <span className="live-dot" />
          {shot.label}
          <small>Vista de la interfaz oficial · sin sesión iniciada</small>
        </div>
        <div className="gallery-controls">
          {shots.map((s, i) => (
            <button
              key={s.src}
              aria-label={`Ver captura ${i + 1}: ${s.tag}`}
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
            aria-label="Captura anterior"
            onClick={() => setIndex((index + shots.length - 1) % shots.length)}
          >
            <ArrowLeft size={17} />
          </button>
          <button
            className="icon-button"
            aria-label="Siguiente captura"
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
          aria-label="Cerrar captura"
          onClick={() => dialog.current?.close()}
        >
          <X />
        </button>
        <Image src={shot.src} alt={shot.alt} width={1440} height={900} />
        <p>{shot.label}</p>
      </dialog>
    </div>
  );
}
