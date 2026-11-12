import { test } from "node:test";
import assert from "node:assert/strict";
import { renderToStaticMarkup } from "react-dom/server";
import { Markdown, safeMarkdownUrl } from "../src/components/markdown";
test("Markdown blocks executable HTML and unsafe links while retaining notes", () => {
  const html = renderToStaticMarkup(
    <Markdown
      body={
        "# Changes\n\n<script>alert(1)</script>\n\n[evil](javascript:alert%281%29)\n\n**Fixed** [source](https://github.com/TFLivesStudio/TFLClient)\n\n![remote](https://evil.test/tracker.png)"
      }
    />,
  );
  assert.ok(!html.includes("<script"));
  assert.ok(!html.includes('href="javascript:'));
  assert.ok(!html.includes("<img"));
  assert.ok(html.includes("<strong>Fixed</strong>"));
  assert.equal(safeMarkdownUrl("data:text/html,bad"), "");
});
