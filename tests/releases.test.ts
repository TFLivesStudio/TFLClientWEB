import { test } from "node:test";
import assert from "node:assert/strict";
import {
  parseRelease,
  platformAssets,
  getReleases,
  releasePath,
  official,
} from "../src/lib/releases";
const fixture = {
  draft: false,
  prerelease: false,
  name: "Release",
  tag_name: "v1.0.0",
  html_url: "https://github.com/TFLivesStudio/TFLClient/releases/tag/v1.0.0",
  published_at: "2026-11-10T00:00:00Z",
  body: "Original",
  assets: [
    {
      name: "setup.exe",
      size: 100,
      browser_download_url:
        "https://github.com/TFLivesStudio/TFLClient/releases/download/v1/setup.exe",
    },
  ],
};
test("stable, beta, alpha, rc and inconsistent tags retain original identity", () => {
  assert.equal(parseRelease(fixture)?.channel, "stable");
  for (const tag of ["v1.2.0-beta.4", "v1-alpha.1", "v1.2.0-rc.1"]) {
    const r = parseRelease({ ...fixture, tag_name: tag });
    assert.equal(r?.channel, "beta");
    assert.equal(r?.tag, tag);
    assert.equal(r?.inconsistent, true);
  }
  assert.equal(parseRelease({ ...fixture, prerelease: true })?.channel, "beta");
  assert.equal(parseRelease({ ...fixture, draft: true }), null);
});
test("rejects unsafe metadata and asset URLs", () => {
  for (const value of [
    null,
    {},
    { ...fixture, tag_name: "../x" },
    { ...fixture, published_at: "bad" },
    {
      ...fixture,
      html_url:
        "https://github.com.evil.test/TFLivesStudio/TFLClient/releases/v1",
    },
  ])
    assert.equal(parseRelease(value), null);
  assert.equal(official("javascript:alert(1)"), false);
  assert.equal(
    parseRelease({
      ...fixture,
      assets: [
        {
          ...fixture.assets[0],
          browser_download_url: "https://evil.test/f.exe",
        },
      ],
    })?.assets.length,
    0,
  );
  assert.equal(
    platformAssets(parseRelease(fixture)!.assets, "Windows").length,
    1,
  );
  assert.equal(releasePath("v1+test"), "/novedades/v1%2Btest");
});
test("fetches multiple API pages, excludes drafts, sorts and deduplicates", async () => {
  const urls: string[] = [];
  const fetcher = (async (url) => {
    urls.push(String(url));
    return Response.json(
      urls.length === 1
        ? Array.from({ length: 20 }, (_, i) => ({
            ...fixture,
            tag_name: `v${i}`,
            published_at: "2026-01-01T00:00:00Z",
          }))
        : [
            { ...fixture, tag_name: "v-new" },
            { ...fixture, draft: true },
          ],
    );
  }) as typeof fetch;
  const r = await getReleases(fetcher);
  assert.equal(urls.length, 2);
  assert.match(urls[1], /page=2/);
  assert.equal(r.releases.length, 21);
  assert.equal(r.releases[0].tag, "v-new");
});
test("distinguishes empty history, rate limits and failures, without partial history", async () => {
  assert.equal(
    (await getReleases((async () => Response.json([])) as typeof fetch)).status,
    "empty",
  );
  for (const status of [403, 429])
    assert.equal(
      (
        await getReleases(
          (async () => new Response("", { status })) as typeof fetch,
        )
      ).status,
      "rate-limit",
    );
  assert.equal(
    (
      await getReleases(
        (async () => new Response("", { status: 500 })) as typeof fetch,
      )
    ).status,
    "unavailable",
  );
  assert.equal(
    (
      await getReleases((async () => {
        throw Error("offline");
      }) as typeof fetch)
    ).status,
    "unavailable",
  );
  let i = 0;
  const r = await getReleases((async () =>
    ++i === 1
      ? Response.json(Array(20).fill(fixture))
      : new Response("", { status: 429 })) as typeof fetch);
  assert.equal(r.releases.length, 0);
});
