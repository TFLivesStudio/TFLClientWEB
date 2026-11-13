import { createPublicKey, verify, createHash } from "node:crypto";
import addFormats from "ajv-formats";
import Ajv2020 from "ajv/dist/2020";
import catalogSchema from "./schemas/catalog.json";
import manifestSchema from "./schemas/manifest.json";
// Trust anchor shipped by TFL Client, not downloaded alongside the catalog.
export const trustedKey = "EfZhA1AVSumBvuI40hQ2o54C5zFGK8jRV/a05PCf/kg=";
const ajv = new Ajv2020({ strict: false });
addFormats(ajv);
const catalogValid = ajv.compile<Catalog>(catalogSchema);
const manifestValid = ajv.compile<{
  targetId: string;
  release: string;
  status: string;
  minecraft: {
    version: string;
    loader: string;
    javaMajor: number;
    loaderVersion: string;
  };
  minimumLauncherVersion: string;
}>(manifestSchema);
export type Catalog = {
  generation: number;
  targets: {
    targetId: string;
    minecraftVersion: string;
    loader: string;
    displayName?: string;
    summary?: string;
    sortOrder?: number;
    channels: Partial<
      Record<
        "stable" | "beta" | "dev",
        { release: string; tag: string; manifestSha256: string }
      >
    >;
  }[];
};
export function verifyCatalog(
  bytes: Buffer,
  signature: string,
  key = trustedKey,
): Catalog {
  if (
    bytes.length > 1024 * 1024 ||
    !/^([A-Za-z0-9+/]{86}==)$/.test(signature.trim())
  )
    throw Error("Invalid signature encoding");
  const pub = createPublicKey({
    key: Buffer.concat([
      Buffer.from("302a300506032b6570032100", "hex"),
      Buffer.from(key, "base64"),
    ]),
    format: "der",
    type: "spki",
  });
  if (!verify(null, bytes, pub, Buffer.from(signature.trim(), "base64")))
    throw Error("Signature invalid");
  const data = JSON.parse(bytes.toString());
  if (
    !catalogValid(data) ||
    data.generation < 1 ||
    new Set(data.targets.map((t: { targetId: string }) => t.targetId)).size !==
      data.targets.length
  )
    throw Error("Schema invalid");
  return data as Catalog;
}
async function bytes(url: string, max = 1024 * 1024) {
  const r = await fetch(url, {
    next: { revalidate: 900 },
    signal: AbortSignal.timeout(8000),
  });
  if (!r.ok || Number(r.headers.get("content-length")) > max)
    throw Error("Unavailable");
  const reader = r.body?.getReader();
  if (!reader) throw Error("Empty");
  let total = 0;
  const chunks: Uint8Array[] = [];
  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    total += value.length;
    if (total > max) {
      await reader.cancel();
      throw Error("Too large");
    }
    chunks.push(value);
  }
  return Buffer.concat(chunks);
}
export async function getCatalog(): Promise<{
  catalog: Catalog | null;
  status: string;
}> {
  try {
    const base =
      "https://raw.githubusercontent.com/TFLivesStudio/TFLClientSelection/main/catalog/current.json";
    const [raw, sig] = await Promise.all([
      bytes(base),
      bytes(`${base}.sig`, 1024),
    ]);
    return { catalog: verifyCatalog(raw, sig.toString()), status: "verified" };
  } catch {
    return { catalog: null, status: "unavailable" };
  }
}
export async function getManifest(
  target: Catalog["targets"][number],
  channel: NonNullable<Catalog["targets"][number]["channels"]["beta"]>,
) {
  try {
    const base = `https://github.com/TFLivesStudio/TFLClientSelection/releases/download/${encodeURIComponent(channel.tag)}/manifest.json`;
    const [raw, sig] = await Promise.all([
      bytes(base),
      bytes(base + ".sig", 1024),
    ]);
    const key = createPublicKey({
      key: Buffer.concat([
        Buffer.from("302a300506032b6570032100", "hex"),
        Buffer.from(trustedKey, "base64"),
      ]),
      format: "der",
      type: "spki",
    });
    if (
      createHash("sha256").update(raw).digest("hex") !==
        channel.manifestSha256 ||
      !verify(null, raw, key, Buffer.from(sig.toString().trim(), "base64"))
    )
      throw Error("Integrity");
    const m = JSON.parse(raw.toString());
    if (
      !manifestValid(m) ||
      m.targetId !== target.targetId ||
      m.release !== channel.release ||
      m.minecraft.version !== target.minecraftVersion ||
      m.minecraft.loader !== target.loader ||
      m.status !== "published"
    )
      throw Error("Mismatch");
    return {
      java: m.minecraft.javaMajor as number,
      loader: m.minecraft.loaderVersion as string,
      minimum: m.minimumLauncherVersion as string,
    };
  } catch {
    return null;
  }
}
