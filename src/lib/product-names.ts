/** Presentation alias for older signed catalog labels; never rewrites catalog bytes. */
export function clientDisplayName(
  name: string | undefined,
  minecraftVersion: string,
) {
  const value = name?.trim();
  return value
    ? value.replace(/^TFL Selection(?=\s|$)/i, "TFLClient")
    : `TFLClient ${minecraftVersion}`;
}
