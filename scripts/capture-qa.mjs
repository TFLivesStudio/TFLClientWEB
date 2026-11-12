import { chromium } from "playwright";
import { mkdir, writeFile, readFile } from "node:fs/promises";
const browser = await chromium.launch({
  executablePath: process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH || undefined,
  args: ["--no-sandbox"],
});
const base = process.env.QA_BASE_URL || "http://127.0.0.1:3003";
await mkdir("docs/qa", { recursive: true });
const measurements = [];
for (const [device, width, height] of [
  ["desktop", 1440, 1000],
  ["mobile", 390, 844],
]) {
  const context = await browser.newContext({ viewport: { width, height } });
  const page = await context.newPage();
  for (const [name, path] of [
    ["inicio", "/"],
    ["caracteristicas", "/caracteristicas"],
    ["selection", "/selection"],
    ["novedades", "/novedades"],
    ["descargas", "/descargas"],
    ["ayuda", "/ayuda"],
    ["comunidad", "/comunidad"],
    ["privacidad", "/privacidad"],
    ["release", "/novedades/v0.15.3-beta.6"],
    ["guia", "/ayuda/reportar"],
  ]) {
    if (process.env.QA_PAGES && !process.env.QA_PAGES.split(",").includes(name))
      continue;
    const errors = [];
    const onError = (e) => errors.push(e.message);
    page.on("pageerror", onError);
    const response = await page.goto(base + path);
    await page.evaluate(() => document.fonts.ready);
    if (
      (await page
        .locator("body")
        .evaluate((e) => getComputedStyle(e).backgroundColor)) !==
      "rgb(14, 16, 22)"
    )
      throw new Error("Slate theme did not load");
    for (
      let y = 0;
      y < (await page.evaluate(() => document.body.scrollHeight));
      y += height
    ) {
      await page.evaluate((y) => scrollTo(0, y), y);
      await page.waitForTimeout(80);
    }
    await page.evaluate(() => scrollTo(0, 0));
    await page.waitForTimeout(250);
    await page.screenshot({
      path: `docs/qa/${name}-${device}.png`,
      fullPage: true,
    });
    measurements.push({
      device,
      path,
      status: response.status(),
      overflow: await page.evaluate(
        () => document.documentElement.scrollWidth > innerWidth,
      ),
      navigationMs: await page.evaluate(() =>
        Math.round(performance.getEntriesByType("navigation")[0].duration),
      ),
      errors,
    });
    page.off("pageerror", onError);
  }
  await context.close();
}
await browser.close();
const combined=process.env.QA_PAGES ? [...JSON.parse(await readFile("docs/qa/measurements.json","utf8")).filter(old=>!measurements.some(m=>m.device===old.device&&m.path===old.path)),...measurements] : measurements;
await writeFile(
  "docs/qa/measurements.json",
  JSON.stringify(combined, null, 2) + "\n",
);
console.log(JSON.stringify(measurements));
