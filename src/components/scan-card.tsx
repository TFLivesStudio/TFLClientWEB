"use client";
import { motion } from "motion/react";
import {
  ShieldCheck,
  ShieldAlert,
  ExternalLink,
  FileCheck2,
} from "lucide-react";
import { useT } from "@/i18n/provider";
import { useMotionPreference } from "./motion-preference";
import { scanHash, scanUrl } from "@/lib/scan-model";
import type { ScanResult } from "@/lib/virustotal";
export function ScanCard({ result }: { result: ScanResult }) {
  const tr = useT();
  const { reduced } = useMotionPreference();
  const report = result.status === "ok" ? result.report : null;
  const flagged = !!report?.flagged;
  const Icon = !report ? FileCheck2 : flagged ? ShieldAlert : ShieldCheck;
  return (
    <motion.article
      className={`scan-card ${report ? (flagged ? "scan-review" : "scan-clear") : "scan-neutral"}`}
      initial={reduced ? false : { y: 12 }}
      whileInView={{ y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
    >
      <div className="scan-emblem" aria-hidden="true">
        <svg viewBox="0 0 100 100">
          <circle cx="50" cy="50" r="44" className="scan-track" />
          <motion.circle
            cx="50"
            cy="50"
            r="44"
            className="scan-ring"
            initial={{ pathLength: reduced ? 1 : 0 }}
            whileInView={{ pathLength: 1 }}
            viewport={{ once: true }}
            transition={{ duration: reduced ? 0 : 1.2, ease: "easeOut" }}
          />
        </svg>
        <Icon size={34} />
      </div>
      <div className="scan-content">
        <span className="eyebrow">VIRUSTOTAL · SHA-256</span>
        <h2>
          {report ? (
            <>
              <span className="scan-score">
                {report.flagged}
                <span> / {report.total}</span>
              </span>{" "}
              <span className="scan-title">
                {tr("motores con detecciones")}
              </span>
            </>
          ) : (
            tr("Comprueba el archivo que instalas")
          )}
        </h2>
        {report ? (
          <p>
            {report.fileName && <strong>{report.fileName} · </strong>}
            {tr("Análisis del")}{" "}
            <time dateTime={report.analyzedAt}>
              {new Date(report.analyzedAt).toLocaleDateString(
                tr.locale === "es" ? "es-ES" : "en-US",
                { timeZone: "UTC" },
              )}
            </time>
            {flagged
              ? tr(
                  ". Hay resultados que requieren revisión; no los clasificamos como falsos positivos sin comprobarlos.",
                )
              : tr(
                  ". Sin detecciones en ese análisis; no es una garantía de ausencia de malware.",
                )}
          </p>
        ) : (
          <p>
            {tr(
              "Consulta el análisis en VirusTotal y compara su SHA-256 con el archivo que descargaste.",
            )}
          </p>
        )}
        <code className="scan-hash">{scanHash}</code>
        <p className="scan-scope">
          {tr(
            "Este informe corresponde a un solo archivo, no a todas las versiones ni plataformas de TFL Client.",
          )}
        </p>
      </div>
      <a
        className="button secondary"
        href={scanUrl}
        target="_blank"
        rel="noopener noreferrer"
      >
        {tr("Ver informe")}
        <ExternalLink size={16} />
      </a>
    </motion.article>
  );
}
