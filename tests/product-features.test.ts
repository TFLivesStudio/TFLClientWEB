import test from "node:test";
import assert from "node:assert/strict";
import { getScan, parseScan } from "../src/lib/virustotal";
import { scanHash } from "../src/lib/scan-model";
import modules from "../src/lib/core-modules.json";
import { legalDocuments } from "../src/lib/legal-content";
import {
  historyState,
  historyQuery,
  summarizeRelease,
} from "../src/lib/history-model";
import type { Release } from "../src/lib/release-model";
const sample = {
  data: {
    id: scanHash,
    attributes: {
      sha256: scanHash,
      meaningful_name: "launcher.exe",
      last_analysis_date: Math.floor(Date.now() / 1000) - 60,
      last_analysis_stats: {
        malicious: 1,
        suspicious: 0,
        undetected: 70,
        harmless: 0,
      },
    },
  },
};
test("VirusTotal preserves detections, checks hash and rejects impossible reports", () => {
  const report = parseScan(sample);
  assert.equal(report.flagged, 1);
  assert.equal(report.total, 71);
  assert.throws(() =>
    parseScan({ ...sample, data: { ...sample.data, id: "a".repeat(64) } }),
  );
  assert.throws(() =>
    parseScan({
      ...sample,
      data: {
        ...sample.data,
        attributes: {
          ...sample.data.attributes,
          last_analysis_stats: {
            malicious: -1,
            suspicious: 0,
            undetected: 71,
            harmless: 0,
          },
        },
      },
    }),
  );
  assert.throws(() =>
    parseScan({
      ...sample,
      data: {
        ...sample.data,
        attributes: {
          ...sample.data.attributes,
          last_analysis_date: Math.floor(Date.now() / 1000) + 3600,
        },
      },
    }),
  );
});
test("VirusTotal needs a server key and fails without fabricating zero detections", async () => {
  let called = false;
  const fetcher: typeof fetch = async () => {
    called = true;
    return new Response(JSON.stringify(sample));
  };
  assert.equal((await getScan(fetcher, "")).status, "unconfigured");
  assert.equal(called, false);
  const response = await getScan(fetcher, "test-only-key");
  assert.equal(response.status, "ok");
  assert.ok(!JSON.stringify(response).includes("test-only-key"));
  assert.equal(
    (await getScan(async () => new Response("", { status: 429 }), "test"))
      .status,
    "unavailable",
  );
});
test("the 82-module candidate catalog is unique, bilingual and honest about unavailable services", () => {
  assert.equal(modules.length, 82);
  assert.equal(new Set(modules.map((m) => m.id)).size, 82);
  for (const m of modules)
    for (const locale of ["es", "en"] as const) {
      assert.ok(m.name[locale].length > 1);
      assert.ok(m.description[locale].length > 12);
      assert.ok(
        !/github|vendor\/|\.java|schema|manifest|signature/i.test(
          m.description[locale],
        ),
      );
    }
  for (const id of ["trsOnline", "social", "clips"])
    assert.equal(modules.find((m) => m.id === id)?.availability, "unavailable");
  assert.match(
    modules.find((m) => m.id === "reach")!.description.en,
    /without increasing reach/,
  );
});
test("legal documents cover the launcher, community contacts and actual privacy boundaries in both languages", () => {
  for (const doc of Object.values(legalDocuments))
    for (const locale of ["es", "en"] as const) {
      const text = doc.sections
        .flatMap((s) => [
          s.title[locale],
          ...s.paragraphs.map((p) => p[locale]),
        ])
        .join(" ");
      assert.ok(text.includes("contact@tflives.com"));
      assert.ok(text.includes("tflives@outlook.com"));
      assert.ok(doc.sections.length >= 5);
    }
  const text = legalDocuments.privacy.sections
    .flatMap((s) => s.paragraphs.map((p) => p.es))
    .join(" ");
  assert.match(text, /claunch-rs\/secrets/);
  assert.match(text, /MCP/);
  assert.match(text, /playit.gg/);
  assert.match(text, /Vercel/);
});
test("release summaries omit full notes/assets and URL state clamps malformed or excessive pages", () => {
  const release = {
    name: "Release",
    tag: "v1",
    date: "2026-11-01T00:00:00Z",
    body: "a".repeat(10000),
    assets: [{ name: "huge.exe", url: "https://github.com/asset", size: 500 }],
    channel: "stable",
    inconsistent: false,
    prerelease: false,
    url: "https://github.com/TFLivesStudio/TFLClient/releases/tag/v1",
  } satisfies Release;
  const summary = summarizeRelease(release);
  assert.equal(summary.excerpt.length, 261);
  assert.ok(!("body" in summary));
  assert.ok(!("assets" in summary));
  const rows = Array.from({ length: 30 }, (_, i) => ({
    ...summary,
    tag: `v${i}`,
    channel: i < 15 ? ("stable" as const) : ("beta" as const),
  }));
  assert.equal(
    historyState(new URLSearchParams("channel=beta&page=99"), rows).page,
    2,
  );
  assert.equal(
    historyState(new URLSearchParams("page=-1&channel=unknown"), rows).filter,
    "all",
  );
  assert.equal(historyState(new URLSearchParams("page=2.5"), rows).page, 1);
  assert.equal(
    historyQuery(new URLSearchParams("page=7&utm_source=discord"), "beta", 1),
    "utm_source=discord&channel=beta",
  );
});
