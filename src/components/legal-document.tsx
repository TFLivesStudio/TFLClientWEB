import { getTranslator } from "@/i18n/server";
import {
  legalDocuments,
  legalUpdated,
  legalContact,
  communityContact,
} from "@/lib/legal-content";
import { PageTitle } from "./ui";
import { ScrollProgress, CopyLink } from "./animated-ui";
import Link from "./locale-link";
import type { ReactNode } from "react";
export async function LegalDocument({
  kind,
  children,
}: {
  kind: keyof typeof legalDocuments;
  children?: ReactNode;
}) {
  const tr = await getTranslator(),
    doc = legalDocuments[kind];
  return (
    <>
      <ScrollProgress />
      <PageTitle
        label="LEGAL · TFL CLIENT"
        title={doc.title[tr.locale]}
        description={doc.description[tr.locale]}
      />
      <div className="shell legal-layout section">
        <aside className="legal-toc">
          <nav aria-label={tr("Índice del documento")}>
            {doc.sections.map((s) => (
              <a href={`#${s.id}`} key={s.id}>
                {s.title[tr.locale]}
              </a>
            ))}
          </nav>
          <div className="legal-links">
            <Link href="/legal/aviso-legal">{tr("Aviso legal")}</Link>
            <Link href="/privacidad">{tr("Privacidad")}</Link>
            <Link href="/legal/terminos">{tr("Términos de Servicio")}</Link>
          </div>
        </aside>
        <article className="prose legal-copy">
          <div className="legal-revision">
            <span>
              {tr("Última revisión")}:{" "}
              <time dateTime={legalUpdated}>
                {new Date(`${legalUpdated}T12:00:00Z`).toLocaleDateString(
                  tr.locale === "es" ? "es-ES" : "en-US",
                  { timeZone: "UTC" },
                )}
              </time>
            </span>
            <CopyLink />
          </div>
          {doc.sections.map((s) => (
            <section id={s.id} key={s.id}>
              <h2>{s.title[tr.locale]}</h2>
              {s.paragraphs.map((p, i) => (
                <p key={i}>{p[tr.locale]}</p>
              ))}
            </section>
          ))}
          <div className="legal-contact">
            <a href={`mailto:${legalContact}`}>{legalContact}</a>
            <a href={`mailto:${communityContact}`}>{communityContact}</a>
            <a href="https://discord.gg/tflives">Discord · TFLives</a>
          </div>
          {children}
        </article>
      </div>
    </>
  );
}
