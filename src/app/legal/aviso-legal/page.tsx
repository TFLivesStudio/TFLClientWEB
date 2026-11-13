import { LegalDocument } from "@/components/legal-document";
import { getTranslator } from "@/i18n/server";
import { legalDocuments } from "@/lib/legal-content";
import { seo } from "@/lib/seo";
export async function generateMetadata() {
  const tr = await getTranslator();
  return seo(
    legalDocuments.notice.title[tr.locale],
    legalDocuments.notice.description[tr.locale],
    "/legal/aviso-legal",
    tr.locale,
  );
}
export default function LegalNotice() {
  return <LegalDocument kind="notice" />;
}
