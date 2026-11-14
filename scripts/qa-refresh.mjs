/* Reproducible visual evidence. Run after npm run build + npm run start. */
import { chromium } from 'playwright';
import fs from 'node:fs';
import path from 'node:path';
const base = process.env.QA_BASE_URL || 'http://127.0.0.1:3000';
const dir = path.resolve('docs/qa/refresh');
const routes = ['/', '/caracteristicas', '/selection', '/descargas', '/novedades', '/ayuda', '/comunidad', '/privacidad', '/legal/aviso-legal', '/legal/terminos', '/ayuda/mcp', '/novedades/v0.15.2'];

(async () => {
  fs.mkdirSync(dir, {recursive:true});
  const browser = await chromium.launch();
  const results = [];
  for (const theme of ['dark', 'light']) {
    const context = await browser.newContext();
    await context.addInitScript(theme => {
      localStorage.setItem('tfl-theme', theme);
      localStorage.setItem('tfl-motion', 'reduced');
    }, theme);
    const page = await context.newPage();
    const errors = [];
    page.on('pageerror', e => errors.push(e.message));
    for (const width of [1440, 1024, 820, 768, 390, 320]) {
      await page.setViewportSize({width, height:900});
      for (const route of width === 1440 || width === 390 ? routes : ['/']) {
        const response = await page.goto(base + route);
        await page.evaluate(() => document.fonts.ready);
        await page.waitForTimeout(150);
        const name = route === '/' ? 'inicio' : route.slice(1).replaceAll('/', '-');
        await page.screenshot({path:path.join(dir, `${name}-${width}-${theme}.jpg`), quality:78, fullPage:width===1440 || width===390});
        const data = await page.evaluate(() => ({
          height:document.body.scrollHeight,
          overflow:document.documentElement.scrollWidth > innerWidth,
          h1:document.querySelectorAll('main h1').length,
          headerTargets:[...document.querySelectorAll('.header-tools a, .header-tools button')]
            .filter(e=>e.getBoundingClientRect().width>0)
            .map(e=>({label:e.getAttribute('aria-label') || e.textContent.trim(), width:e.getBoundingClientRect().width, height:e.getBoundingClientRect().height})),
        }));
        results.push({route, width, theme, status:response.status(), ...data});
        if (data.overflow || data.h1 !== 1 || response.status() !== 200) throw Error(JSON.stringify(results.at(-1)));
      }
    }
    if(errors.length) throw Error(errors.join('\n'));
    await context.close();
  }
  await browser.close();
  fs.writeFileSync(path.join(dir, 'responsive.json'), JSON.stringify({base, results}, null, 2)+'\n');
  console.log(`${results.length} route/width/theme checks passed; screenshots saved to ${dir}`);
})();
