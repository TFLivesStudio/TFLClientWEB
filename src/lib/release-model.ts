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
  const arch = assetArchitecture(name) ?? "Arquitectura no indicada en el nombre";
  return `${arch} · ${name.split(".").at(-1)}`;
}
export function assetArchitecture(name: string) {
  return /(?:^|[_.-])(?:aarch64|arm64)(?=[_.-]|$)/i.test(name)
    ? "ARM64"
    : /(?:^|[_.-])(?:amd64|x86_64|x64)(?=[_.-]|$)/i.test(name)
      ? "x64"
      : /(?:^|[_.-])(?:i686|ia32|x86)(?=[_.-]|$)/i.test(name)
        ? "x86"
        : null;
}
const downloadFormats = [
  "EXE", "MSI", "DMG", "PKG", "DEB", "RPM", "AppImage",
] as const;
export type DownloadFormat = (typeof downloadFormats)[number];
export function groupedPlatformAssets(assets: ReleaseAsset[], platform: string) {
  const available = platformAssets(assets, platform);
  return downloadFormats.flatMap((format) => {
    const files = available
      .filter((asset) =>
        asset.name.toLowerCase().endsWith(`.${format.toLowerCase()}`),
      )
      .sort((a, b) =>
        Number(!assetArchitecture(a.name)) - Number(!assetArchitecture(b.name)),
      );
    return files.length ? [{ format, assets: files }] : [];
  });
}
export const releasePath = (tag: string) =>
  `/novedades/${encodeURIComponent(tag)}`;
