import { test } from "node:test";
import assert from "node:assert/strict";
import { parseRelease, platformAssets, getRelease } from "../src/lib/releases";
const asset = (
  name: string,
  url = `https://github.com/TFLivesStudio/TFLClient/releases/download/v1/${name}`,
) => ({ name, browser_download_url: url, size: 1024 });
const fixture = {
  draft: false,
  prerelease: false,
  name: "Release 1",
  tag_name: "v1",
  html_url: "https://github.com/TFLivesStudio/TFLClient/releases/tag/v1",
  published_at: "2026-11-10T00:00:00Z",
  assets: [asset("setup.exe"), asset("client.dmg"), asset("client.AppImage")],
};
test("accepts a published stable release and maps only matching platform files", () => {
  const r = parseRelease(fixture);
  assert.ok(r);
  assert.equal(platformAssets(r.assets, "Windows")[0].name, "setup.exe");
  assert.equal(platformAssets(r.assets, "macOS")[0].name, "client.dmg");
  assert.equal(platformAssets(r.assets, "Linux")[0].name, "client.AppImage");
  assert.deepEqual(platformAssets(r.assets, "Android"), []);
});
test("rejects draft, prerelease, malformed payload and untrusted release URL", () => {
  for (const payload of [
    null,
    [],
    {},
    { ...fixture, draft: true },
    { ...fixture, prerelease: true },
    { ...fixture, published_at: "invalid" },
    {
      ...fixture,
      html_url:
        "https://github.com.evil.test/TFLivesStudio/TFLClient/releases/v1",
    },
  ])
    assert.equal(parseRelease(payload), null);
});
test("drops untrusted assets and invalid sizes", () => {
  const r = parseRelease({
    ...fixture,
    assets: [
      asset("setup.exe", "https://evil.test/setup.exe"),
      { ...asset("empty.exe"), size: 0 },
      asset("valid.exe"),
    ],
  });
  assert.equal(r?.assets.length, 1);
  assert.equal(r?.assets[0].name, "valid.exe");
});
test("distinguishes missing release, forbidden request and network failure", async () => {
  const original = globalThis.fetch;
  try {
    globalThis.fetch = async () => new Response("", { status: 404 });
    assert.equal((await getRelease()).status, "empty");
    globalThis.fetch = async () => new Response("", { status: 403 });
    assert.equal((await getRelease()).status, "unavailable");
    globalThis.fetch = async () => {
      throw new Error("offline");
    };
    assert.equal((await getRelease()).status, "unavailable");
  } finally {
    globalThis.fetch = original;
  }
});
