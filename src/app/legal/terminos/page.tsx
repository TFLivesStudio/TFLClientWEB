import { LegalDocument } from "@/components/legal-document";
import { getTranslator } from "@/i18n/server";
import { legalDocuments } from "@/lib/legal-content";
import { seo } from "@/lib/seo";
export async function generateMetadata() {
  const tr = await getTranslator();
  return seo(
    legalDocuments.terms.title[tr.locale],
    legalDocuments.terms.description[tr.locale],
    "/legal/terminos",
    tr.locale,
  );
}
export default function Terms() {
  return <LegalDocument kind="terms" />;
}
