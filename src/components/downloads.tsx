"use client";
import { useState, useSyncExternalStore } from "react";
import {
  Download,
  Monitor,
  Apple,
  Terminal,
  ArrowUpRight,
  CircleAlert,
} from "lucide-react";
import { platformAssets, type Release } from "@/lib/releases";
const subscribe = () => () => {};
const detectPlatform = () => {
  const ua = navigator.userAgent;
  return /Macintosh|Mac OS X/.test(ua)
    ? "macOS"
    : /Linux/.test(ua) && !/Android/.test(ua)
      ? "Linux"
      : "Windows";
};
const systems = [
  { name: "Windows", Icon: Monitor },
  { name: "macOS", Icon: Apple },
  { name: "Linux", Icon: Terminal },
];
export function Downloads({
  release,
  status,
}: {
  release: Release | null;
  status: string;
}) {
  const [chosen, setPlatform] = useState<string | null>(null);
  const detected = useSyncExternalStore(
    subscribe,
    detectPlatform,
    () => "Windows",
  );
  const platform = chosen ?? detected;
  const assets = platformAssets(release?.assets ?? [], platform);
  return (
    <div className="download-panel">
      <div
        className="system-tabs"
        role="group"
        aria-label="Elige tu sistema operativo"
      >
        {systems.map(({ name, Icon }) => (
          <button
            key={name}
            onClick={() => setPlatform(name)}
            aria-pressed={platform === name}
          >
            <Icon size={22} />
            {name}
          </button>
        ))}
      </div>
      <div className="download-body">
        <span className="eyebrow">
          TFL CLIENT PARA {platform.toUpperCase()}
        </span>
        <h2>Nos vemos en el launcher.</h2>
        {release ? (
          <p>
            {release.name} · Publicada el{" "}
            {new Intl.DateTimeFormat("es", {
              dateStyle: "medium",
              timeZone: "UTC",
            }).format(new Date(release.date))}
          </p>
        ) : (
          <p>
            <CircleAlert size={17} />
            {status === "empty"
              ? "No hay una versión estable publicada disponible."
              : "No pudimos consultar la versión estable en este momento."}
          </p>
        )}
        {assets.length ? (
          assets.map((a) => (
            <a className="button" key={a.url} href={a.url}>
              <Download size={18} />
              {a.name}
              <small>{(a.size / 1024 / 1024).toFixed(1)} MB</small>
            </a>
          ))
        ) : (
          <div className="notice">
            {release
              ? `Esta versión no incluye instalador para ${platform}.`
              : "Puedes revisar las publicaciones oficiales y sus requisitos directamente en GitHub."}
          </div>
        )}
        <a
          href="https://github.com/TFLivesStudio/TFLClient/releases"
          className="text-link"
        >
          Ver todas las publicaciones
          <ArrowUpRight size={16} />
        </a>
        <small>
          Comprueba la arquitectura y los requisitos indicados en cada
          publicación. Microsoft y Minecraft son marcas de sus respectivos
          propietarios.
        </small>
      </div>
    </div>
  );
}
