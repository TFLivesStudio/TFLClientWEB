import { z } from "zod";
import { scanHash } from "./scan-model";
const count = z.number().int().min(0).max(2000);
const schema = z.object({
  data: z.object({
    id: z.literal(scanHash),
    attributes: z.object({
      sha256: z.literal(scanHash),
      meaningful_name: z.string().max(300).optional(),
      last_analysis_date: z.number().int().positive(),
      last_analysis_stats: z.object({
        malicious: count,
        suspicious: count,
        undetected: count,
        harmless: count,
        timeout: count.optional(),
        "confirmed-timeout": count.optional(),
        failure: count.optional(),
        "type-unsupported": count.optional(),
      }),
    }),
  }),
});
export type ScanReport = {
  hash: string;
  fileName?: string;
  flagged: number;
  total: number;
  malicious: number;
  suspicious: number;
  analyzedAt: string;
  checkedAt: string;
};
export type ScanResult =
  | { status: "ok"; report: ScanReport }
  | { status: "unconfigured" | "unavailable" };
export function parseScan(data: unknown, now = Date.now()): ScanReport {
  const { attributes: a } = schema.parse(data).data;
  const s = a.last_analysis_stats;
  const total = s.malicious + s.suspicious + s.undetected + s.harmless;
  if (!total || total > 2000 || a.last_analysis_date * 1000 > now + 300000)
    throw Error("Invalid analysis");
  return {
    hash: a.sha256,
    fileName: a.meaningful_name,
    flagged: s.malicious + s.suspicious,
    total,
    malicious: s.malicious,
    suspicious: s.suspicious,
    analyzedAt: new Date(a.last_analysis_date * 1000).toISOString(),
    checkedAt: new Date(now).toISOString(),
  };
}
/** Read an existing report only: no uploads, rescans, browser keys or user files. */
export async function getScan(
  fetcher: typeof fetch = fetch,
  key = process.env.VIRUSTOTAL_API_KEY,
): Promise<ScanResult> {
  if (!key) return { status: "unconfigured" };
  try {
    const response = await fetcher(
      `https://www.virustotal.com/api/v3/files/${scanHash}`,
      {
        headers: { "x-apikey": key },
        next: { revalidate: 3600 },
        signal: AbortSignal.timeout(8000),
      },
    );
    if (!response.ok) return { status: "unavailable" };
    return { status: "ok", report: parseScan(await response.json()) };
  } catch {
    return { status: "unavailable" };
  }
}
