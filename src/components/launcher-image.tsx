"use client";
import Image from "next/image";
import { useTheme } from "next-themes";
import { useSyncExternalStore, type ComponentProps } from "react";
const subscribe = () => () => {};
/** Both real screenshots are present before hydration, so a persisted light theme never flashes a dark capture. */
export function LauncherImage({
  src,
  alt,
  className = "",
  markActive = false,
  ...props
}: Omit<ComponentProps<typeof Image>, "src"> & {
  src: string;
  markActive?: boolean;
}) {
  const { resolvedTheme } = useTheme();
  const mounted = useSyncExternalStore(
    subscribe,
    () => true,
    () => false,
  );
  const selectedTheme = mounted ? resolvedTheme || "dark" : "dark";
  return (
    <>
      {(["dark", "light"] as const).map((theme) => (
        <Image
          {...props}
          alt={alt}
          key={theme}
          src={theme === "light" ? src.replace(/(\.[^/.]+)$/, "-light$1") : src}
          className={`${className} launcher-theme-image theme-${theme}${markActive && mounted && selectedTheme === theme ? " product-shot" : ""}`}
        />
      ))}
    </>
  );
}
