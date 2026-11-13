import test from "node:test";
import assert from "node:assert/strict";
import { articles } from "../src/lib/help";
import english from "../src/i18n/en.json";
import { languageHref } from "../src/i18n/shared";
test("all help categories, titles, summaries and sections have explicit English translations", () => {
  for (const article of articles)
    for (const value of [
      article.category,
      article.title,
      article.summary,
      ...article.sections.flat(),
    ]) {
      assert.ok(
        Object.hasOwn(english, value),
        `Missing English translation: ${value}`,
      );
    }
});
test("switching language keeps the current page, query and hash without doubling /en", () => {
  const current =
    "https://launcher.tflives.com/en/ayuda/reportar?from=help#reading";
  assert.equal(
    languageHref("/en/ayuda/reportar", "es", current),
    "/ayuda/reportar?from=help#reading",
  );
  assert.equal(
    languageHref("/en/ayuda/reportar", "en", current),
    "/en/ayuda/reportar?from=help#reading",
  );
  assert.equal(languageHref("/", "en"), "/en");
  assert.equal(languageHref("/en", "es"), "/");
});
