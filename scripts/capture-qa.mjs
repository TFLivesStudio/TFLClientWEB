import { chromium } from "playwright";
import { mkdir, writeFile, readFile } from "node:fs/promises";
const browser = await chromium.launch({
  executablePath: process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH || undefined,
  args: ["--no-sandbox"],
});
const base = process.env.QA_BASE_URL || "http://127.0.0.1:3003";
await mkdir("docs/qa", { recursive: true });
const measurements = [];
const english = process.env.QA_LOCALE === "en";
const theme = process.env.QA_THEME === "light" ? "light" : "dark";
for (const [device, width, height] of [
  ["desktop", 1440, 1000],
  ["mobile", 390, 844],
]) {
  const context = await browser.newContext({
    viewport: { width, height },
    reducedMotion: "reduce",
  });
  await context.addInitScript((theme) => {
    localStorage.setItem("tfl-theme", theme);
    localStorage.setItem("tfl-motion", "reduced");
  }, theme);
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
    const route = english ? "/en" + (path === "/" ? "" : path) : path;
    const response = await page.goto(base + route);
    await page.evaluate(() => document.fonts.ready);

    if (
      (await page
        .locator("body")
        .evaluate((e) => getComputedStyle(e).backgroundColor)) !==
      (theme === "light" ? "rgb(242, 245, 248)" : "rgb(4, 5, 6)")
    )
      throw new Error("Slate theme did not load");
    for (
      let y = 0;
      y < (await page.evaluate(() => document.body.scrollHeight));
      y += height
    ) {
      await page.evaluate((y) => scrollTo({ top: y, behavior: "instant" }), y);
      await page.waitForTimeout(80);
    }
    await page.evaluate(() => scrollTo({ top: 0, behavior: "instant" }));
    await page.evaluate(async () => {
      await Promise.all(
        Array.from(document.images)
          .filter((img) => !img.closest("dialog:not([open])"))
          .map(async (img) => {
            img.loading = "eager";
            await img.decode();
          }),
      );
    });
    await page.waitForTimeout(400);
    await page.screenshot({
      path: `docs/qa/${name}${english ? "-en" : ""}${theme === "light" ? "-light" : ""}-${device}.png`,
      fullPage: true,
    });
    measurements.push({
      device,
      theme,
      path: route,
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
const combined =
  process.env.QA_PAGES || english || theme === "light"
    ? [
        ...JSON.parse(
          await readFile("docs/qa/measurements.json", "utf8"),
        ).filter(
          (old) =>
            !measurements.some(
              (m) =>
                m.device === old.device &&
                m.path === old.path &&
                (m.theme || "dark") === (old.theme || "dark"),
            ),
        ),
        ...measurements,
      ]
    : measurements;
await writeFile(
  "docs/qa/measurements.json",
  JSON.stringify(combined, null, 2) + "\n",
);
console.log(JSON.stringify(measurements));
