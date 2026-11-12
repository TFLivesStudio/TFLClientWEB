import { z } from "zod";
import type { Release } from "./release-model";
export { platformAssets, assetDetails, releasePath } from "./release-model";
export type { Release, ReleaseAsset } from "./release-model";
const root = "https://api.github.com/repos/TFLivesStudio/TFLClient/releases";
export function official(value: unknown) {
  if (typeof value !== "string") return false;
  try {
    const u = new URL(value);
    return (
      u.protocol === "https:" &&
      u.hostname === "github.com" &&
      !u.port &&
      !u.username &&
      !u.password &&
      u.pathname.startsWith("/TFLivesStudio/TFLClient/releases/")
    );
  } catch {
    return false;
  }
}
const schema = z.object({
  draft: z.boolean(),
  prerelease: z.boolean(),
  tag_name: z
    .string()
    .min(1)
    .max(180)
    .refine((t) => !/[\/\\\u0000-\u001f]/.test(t) && t !== "." && t !== ".."),
  name: z.string().nullable(),
  html_url: z.string().refine(official),
  published_at: z.string().refine((t) => Number.isFinite(Date.parse(t))),
  body: z.string().nullable().optional(),
  assets: z.array(
    z.object({
      name: z.string(),
      browser_download_url: z.string(),
      size: z.number().nonnegative(),
    }),
  ),
});
export function parseRelease(data: unknown): Release | null {
  const p = schema.safeParse(data);
  if (!p.success || p.data.draft) return null;
  const d = p.data;
  const tagged = /[-.](alpha|beta|rc|preview|dev)([.\d-]|$)/i.test(d.tag_name);
  return {
    name: d.name || d.tag_name,
    tag: d.tag_name,
    url: d.html_url,
    date: d.published_at,
    assets: d.assets
      .filter((a) => official(a.browser_download_url) && a.size > 0)
      .map((a) => ({
        name: a.name,
        url: a.browser_download_url,
        size: a.size,
      })),
    body: d.body || "",
    prerelease: d.prerelease,
    channel: d.prerelease || tagged ? "beta" : "stable",
    inconsistent: tagged && !d.prerelease,
  };
}
export type ReleaseResult = {
  releases: Release[];
  status: "ok" | "empty" | "unavailable" | "rate-limit";
};
export async function getReleases(
  fetcher: typeof fetch = fetch,
): Promise<ReleaseResult> {
  try {
    const releases: Release[] = [];
    for (let page = 1; page <= 200; page++) {
      const response = await fetcher(`${root}?per_page=20&page=${page}`, {
        headers: { Accept: "application/vnd.github+json" },
        next: { revalidate: 900 },
        signal: AbortSignal.timeout(8000),
      });
      if (response.status === 429 || response.status === 403)
        return { releases: [], status: "rate-limit" };
      if (!response.ok) throw Error("GitHub unavailable");
      const rows: unknown = await response.json();
      if (!Array.isArray(rows)) throw Error("Invalid response");
      for (const row of rows) {
        if (
          row &&
          typeof row === "object" &&
          "draft" in row &&
          row.draft === true
        )
          continue;
        const r = parseRelease(row);
        if (!r) throw Error("Invalid release");
        releases.push(r);
      }
      if (
        rows.length < 20 &&
        !response.headers.get("link")?.includes('rel="next"')
      )
        return {
          releases: [...new Map(releases.map((r) => [r.tag, r])).values()].sort(
            (a, b) => Date.parse(b.date) - Date.parse(a.date),
          ),
          status: releases.length ? "ok" : "empty",
        };
    }
    throw Error("Pagination limit");
  } catch {
    return { releases: [], status: "unavailable" };
  }
}
export async function getRelease() {
  const r = await getReleases();
  return {
    release: r.releases.find((x) => x.channel === "stable") || null,
    status: r.status,
  };
}
