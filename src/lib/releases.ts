export type ReleaseAsset = { name: string; url: string; size: number };
export type Release = {
  name: string;
  tag: string;
  url: string;
  date: string;
  assets: ReleaseAsset[];
};
const official = (value: unknown) =>
  typeof value === "string" &&
  /^https:\/\/github\.com\/TFLivesStudio\/TFLClient\/releases\//.test(value);
export function parseRelease(data: unknown): Release | null {
  if (!data || typeof data !== "object") return null;
  const d = data as Record<string, unknown>;
  if (
    d.draft !== false ||
    d.prerelease !== false ||
    !official(d.html_url) ||
    typeof d.tag_name !== "string" ||
    typeof d.published_at !== "string" ||
    !Number.isFinite(Date.parse(d.published_at)) ||
    !Array.isArray(d.assets)
  )
    return null;
  const assets: ReleaseAsset[] = d.assets.flatMap((a: unknown) => {
    if (!a || typeof a !== "object") return [];
    const x = a as Record<string, unknown>;
    return typeof x.name === "string" &&
      official(x.browser_download_url) &&
      typeof x.size === "number" &&
      x.size > 0
      ? [{ name: x.name, url: x.browser_download_url as string, size: x.size }]
      : [];
  });
  return {
    name: typeof d.name === "string" && d.name ? d.name : d.tag_name,
    tag: d.tag_name,
    url: d.html_url as string,
    date: d.published_at,
    assets,
  };
}
export async function getRelease(): Promise<{
  release: Release | null;
  status: "ok" | "unavailable" | "empty";
}> {
  try {
    const res = await fetch(
      "https://api.github.com/repos/TFLivesStudio/TFLClient/releases/latest",
      {
        headers: { Accept: "application/vnd.github+json" },
        next: { revalidate: 900 },
        signal: AbortSignal.timeout(6000),
      },
    );
    if (res.status === 404) return { release: null, status: "empty" };
    if (!res.ok) return { release: null, status: "unavailable" };
    const release = parseRelease(await res.json());
    return { release, status: release ? "ok" : "unavailable" };
  } catch {
    return { release: null, status: "unavailable" };
  }
}
export function platformAssets(assets: ReleaseAsset[], platform: string) {
  const patterns: Record<string, RegExp> = {
    Windows: /\.(exe|msi)$/i,
    macOS: /\.(dmg|pkg)$/i,
    Linux: /\.(AppImage|deb|rpm)$/i,
  };
  return assets.filter((a) => patterns[platform]?.test(a.name));
}
