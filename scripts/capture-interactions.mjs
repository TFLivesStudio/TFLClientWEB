import { chromium } from "playwright";
const browser = await chromium.launch({
  executablePath: process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH || undefined,
  args: ["--no-sandbox"],
});
const base = process.env.QA_BASE_URL || "http://127.0.0.1:3010";
for (const [device, width, height] of [
  ["desktop", 1440, 1000],
  ["mobile", 390, 844],
]) {
  const context = await browser.newContext({
    viewport: { width, height },
    reducedMotion: "reduce",
  });
  await context.addInitScript(() =>
    localStorage.setItem("tfl-motion", "reduced"),
  );
  const page = await context.newPage();
  await page.goto(base);
  await page.getByRole("button", { name: "Ampliar captura" }).click();
  await page.getByRole("dialog").waitFor();
  await page.evaluate(() => document.fonts.ready);
  await page.screenshot({ path: `docs/qa/dialog-${device}.png` });
  await context.close();
}
const context = await browser.newContext({
  viewport: { width: 390, height: 844 },
  reducedMotion: "reduce",
});
await context.addInitScript(() => {
  localStorage.setItem("tfl-theme", "light");
  localStorage.setItem("tfl-motion", "reduced");
});
const page = await context.newPage();
await page.goto(base + "/en/ayuda");
await page.getByRole("button", { name: "Open menu" }).click();
await page.getByRole("navigation", { name: "Mobile navigation" }).waitFor();
await page.waitForTimeout(350);
await page.screenshot({ path: "docs/qa/menu-en-light-mobile.png" });
await context.close();
const animated = await browser.newContext({
  viewport: { width: 1440, height: 1000 },
});
const screen = await animated.newPage();
const errors = [];
screen.on("pageerror", (error) => errors.push(error.message));
await screen.goto(base + "/descargas");
await screen.evaluate(() => document.fonts.ready);
await screen
  .getByRole("button", { name: "Activar tema claro", exact: true })
  .click();
await screen.waitForFunction(() =>
  document
    .getAnimations()
    .some((animation) =>
      animation.effect
        ?.getKeyframes()
        .some((frame) => String(frame.clipPath || "").startsWith("circle(")),
    ),
);
await screen.waitForTimeout(100);
await screen.screenshot({ path: "docs/qa/theme-transition.png" });
await screen.waitForTimeout(600);
if (
  !(await screen
    .locator("html")
    .evaluate((el) => el.classList.contains("light")))
)
  throw new Error("Animated theme change did not finish in light mode");
if (errors.length) throw new Error(JSON.stringify(errors));
const compatible = await browser.newContext({
  viewport: { width: 1440, height: 1000 },
  reducedMotion: "reduce",
});
await compatible.addInitScript(() => {
  Object.defineProperty(document, "startViewTransition", { value: undefined });
});
const fallback = await compatible.newPage();
fallback.on("pageerror", (error) => errors.push(error.message));
await fallback.goto(base + "/descargas");
await fallback.evaluate(() => document.fonts.ready);
await fallback
  .getByRole("button", { name: "Activar tema claro", exact: true })
  .click();
await fallback
  .locator('[data-theme-transition="fallback"]')
  .waitFor({ state: "attached" });
await fallback.waitForTimeout(180);
await fallback.screenshot({ path: "docs/qa/theme-transition-compatible.png" });
await fallback
  .locator('[data-theme-transition="fallback"]')
  .waitFor({ state: "detached" });
if (errors.length) throw new Error(JSON.stringify(errors));
await compatible.close();
for (const theme of ["dark", "light"]) {
  const ctx = await browser.newContext({
    viewport: { width: 1440, height: 1000 },
  });
  await ctx.addInitScript((theme) => {
    localStorage.setItem("tfl-theme", theme);
    localStorage.setItem("tfl-motion", "reduced");
  }, theme);
  const page = await ctx.newPage();
  await page.goto(base);
  await page
    .getByRole("button", { name: "Abrir imagen de MCP", exact: true })
    .click();
  await page.getByRole("dialog").waitFor();
  await page.evaluate(() => document.fonts.ready);
  await page
    .getByRole("dialog")
    .locator(`img.theme-${theme}`)
    .evaluate((img) => img.decode());
  await page.screenshot({ path: `docs/qa/mcp-dialog-${theme}.png` });
  await ctx.close();
}
const modulePage = await browser.newPage({
  viewport: { width: 1440, height: 1000 },
});
await modulePage.addInitScript(() =>
  localStorage.setItem("tfl-motion", "reduced"),
);
await modulePage.goto(base + "/selection");
await modulePage
  .getByRole("searchbox", { name: "Buscar módulos de TFL Core" })
  .fill("zoom");
await modulePage.locator(".module-explorer").scrollIntoViewIfNeeded();
await modulePage.screenshot({ path: "docs/qa/modules-search.png" });
await modulePage.close();
console.log(
  "Centered dialogs, English mobile menu and animated theme transition captured without JS errors",
);
await browser.close();
