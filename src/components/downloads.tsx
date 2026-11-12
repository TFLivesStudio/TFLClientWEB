"use client";
import { useT } from "@/i18n/provider";
import { useState, useSyncExternalStore } from "react";
import { Download, ArrowUpRight, CircleAlert } from "lucide-react";
import {
  assetDetails,
  platformAssets,
  type Release,
} from "@/lib/release-model";
const subscribe = () => () => {};
const detectPlatform = () => {
  const ua = navigator.userAgent;
  return /Macintosh|Mac OS X/.test(ua)
    ? "macOS"
    : /Linux/.test(ua) && !/Android/.test(ua)
      ? "Linux"
      : "Windows";
};
import { PlatformIcon } from "./platform-icon";
import Link from "@/components/locale-link";
import { releasePath } from "@/lib/release-model";
const systems = [{ name: "Windows" }, { name: "macOS" }, { name: "Linux" }];
export function Downloads({
  release,
  status,
  beta,
}: {
  release: Release | null;
  status: string;
  beta?: Release | null;
}) {
  const tr = useT();
  const [channel, setChannel] = useState("stable");
  const selected = channel === "beta" ? beta : release;
  const [chosen, setPlatform] = useState<string | null>(null);
  const detected = useSyncExternalStore(
    subscribe,
    detectPlatform,
    () => "Windows",
  );
  const platform = chosen ?? detected;
  const assets = platformAssets(selected?.assets ?? [], platform);
  return (
    <div className={`download-panel channel-${channel}`}>
      <div
        className="filter-bar"
        role="group"
        aria-label={tr("Canal de descarga")}
      >
        <button
          aria-pressed={channel === "stable"}
          onClick={() => setChannel("stable")}
        >
          {tr("Estable · recomendada")}
        </button>
        <button
          aria-pressed={channel === "beta"}
          onClick={() => setChannel("beta")}
        >
          {tr("Beta · pruebas")}
        </button>
      </div>
      <div
        className="system-tabs"
        role="group"
        aria-label={tr("Elige tu sistema operativo")}
      >
        {systems.map(({ name }) => (
          <button
            key={name}
            onClick={() => setPlatform(name)}
            aria-pressed={platform === name}
          >
            <PlatformIcon name={name as "Windows" | "macOS" | "Linux"} />
            {name}
          </button>
        ))}
      </div>
      <div className="download-body">
        <span className="eyebrow">
          {tr("TFL CLIENT PARA")} {platform.toUpperCase()}
        </span>
        <h2>
          {tr("Descarga para")} {platform}
        </h2>
        {selected ? (
          <p>
            {selected.tag} {tr("· Publicada el")}{" "}
            {new Intl.DateTimeFormat(tr("es"), {
              dateStyle: "medium",
              timeZone: "UTC",
            }).format(new Date(selected.date))}
          </p>
        ) : (
          <p>
            <CircleAlert size={17} />
            {status === "empty" || status === "ok"
              ? tr("No hay una publicación disponible en este canal.")
              : tr("No pudimos consultar las publicaciones en este momento.")}
          </p>
        )}
        {assets.length ? (
          assets.map((a) => (
            <a className="download-file" key={a.url} href={a.url}>
              <Download size={18} />
              <span>
                {a.name}
                <small>
                  {assetDetails(a.name).replace(
                    "Arquitectura no indicada en el nombre",
                    tr("Arquitectura no indicada en el nombre"),
                  )}{" "}
                  · {(a.size / 1024 / 1024).toFixed(1)} MB
                </small>
              </span>
            </a>
          ))
        ) : (
          <div className="notice">
            {selected
              ? `${tr("Esta versión no incluye instalador para")} ${platform}.`
              : tr(
                  "Puedes revisar las publicaciones oficiales y sus requisitos directamente en GitHub.",
                )}
          </div>
        )}
        {selected && (
          <Link className="text-link" href={releasePath(selected.tag)}>
            {tr("Leer notas de")} {selected.tag} →
          </Link>
        )}
        {channel === "beta" && (
          <p className="notice">
            {tr(
              "Una beta puede incluir funciones aún en revisión. Haz una copia de tus instalaciones antes de probarla.",
            )}
          </p>
        )}
        <a
          href="https://github.com/TFLivesStudio/TFLClient/releases"
          className="text-link"
        >
          {tr("Ver todas las publicaciones")}
          <ArrowUpRight size={16} />
        </a>
        <small>
          {tr(
            "Comprueba la arquitectura y los requisitos indicados en cada publicación. Microsoft y Minecraft son marcas de sus respectivos propietarios.",
          )}
        </small>
      </div>
    </div>
  );
}
