export type ReleaseAsset = { name: string; url: string; size: number };
export type Release = {
  name: string;
  tag: string;
  url: string;
  date: string;
  updatedAt?: string;
  assets: ReleaseAsset[];
  body: string;
  prerelease: boolean;
  channel: "stable" | "beta";
  inconsistent: boolean;
};
export function platformAssets(assets: ReleaseAsset[], platform: string) {
  const p: Record<string, RegExp> = {
    Windows: /\.(exe|msi)$/i,
    macOS: /\.(dmg|pkg)$/i,
    Linux: /\.(AppImage|deb|rpm)$/i,
  };
  return assets.filter((a) => p[platform]?.test(a.name));
}
export function assetDetails(name: string) {
  const arch = /aarch64|arm64/i.test(name)
    ? "ARM64"
    : /amd64|x86_64|x64/i.test(name)
      ? "x64"
      : /i686|ia32/i.test(name)
        ? "x86"
        : "Arquitectura no indicada en el nombre";
  return `${arch} · ${name.split(".").at(-1)}`;
}
export const releasePath = (tag: string) =>
  `/novedades/${encodeURIComponent(tag)}`;
