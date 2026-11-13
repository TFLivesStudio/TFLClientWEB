import test from "node:test";
import assert from "node:assert/strict";
import { seo, origin } from "../src/lib/seo";
import {
  serializeJsonLd,
  siteStructuredData,
} from "../src/lib/structured-data";
import { parseRelease } from "../src/lib/releases";

test("localized share metadata exposes PNG previews and canonical language pairs", () => {
  for (const locale of ["es", "en"] as const) {
    const metadata = seo("TFL Client", "Description", "/selection", locale);
    assert.equal(
      metadata.alternates?.canonical,
      `${origin}${locale === "en" ? "/en" : ""}/selection`,
    );
    assert.deepEqual(metadata.alternates?.languages, {
      es: `${origin}/selection`,
      en: `${origin}/en/selection`,
      "x-default": `${origin}/selection`,
    });
    const images = metadata.openGraph?.images as {
      url: string;
      width: number;
      height: number;
    }[];
    assert.equal(
      images[0].url,
      `${origin}/images/social/tfl-client-${locale}.png`,
    );
    assert.equal(images[0].width, 1200);
    assert.equal(images[0].height, 630);
    assert.deepEqual(metadata.twitter?.images, metadata.openGraph?.images);
  }
});
test("JSON-LD cannot close its script and breadcrumbs describe the actual localized guide", () => {
  const malicious = { name: '</script><script>alert("x")</script>\u2028' };
  const serialized = serializeJsonLd(malicious);
  assert.ok(!serialized.includes("<"));
  assert.deepEqual(JSON.parse(serialized), malicious);
  const data = siteStructuredData("en", "/ayuda/reportar");
  const article = data["@graph"].find(
    (node) => node["@type"] === "TechArticle",
  );
  assert.equal(article?.inLanguage, "en");
  const crumb = data["@graph"].find(
    (node) => node["@type"] === "BreadcrumbList",
  );
  assert.deepEqual(
    crumb?.itemListElement?.map((item) => item.item),
    [`${origin}/en`, `${origin}/en/ayuda`, `${origin}/en/ayuda/reportar`],
  );
});
test("release modification dates survive parsing without replacing publication order", () => {
  const release = parseRelease({
    draft: false,
    prerelease: false,
    tag_name: "v1.0.0",
    name: "v1.0.0",
    html_url: "https://github.com/TFLivesStudio/TFLClient/releases/tag/v1.0.0",
    published_at: "2026-11-01T12:00:00Z",
    updated_at: "2026-11-10T12:00:00Z",
    assets: [],
  });
  assert.equal(release?.date, "2026-11-01T12:00:00Z");
  assert.equal(release?.updatedAt, "2026-11-10T12:00:00Z");
});
