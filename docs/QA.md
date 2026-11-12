# Production Refresh — revisión del 12 de noviembre de 2026

## Alcance entregado

| Página | Cambio |
| --- | --- |
| Inicio | TFL Client como nombre principal; funciones concretas, biblioteca, personalización, comparación con Selection y última estable de la API. |
| Características | Explicación por capacidades, galería y guías relacionadas; separación launcher/mod. |
| Selection | Catálogo v2 verificado, canales dinámicos, manifiesto firmado y requisitos; Core separado con su estado experimental documentado. |
| Novedades | Historial completo, filtros, 12 entradas por página visual y rutas individuales con Markdown seguro y archivos. |
| Descargas | Estable recomendada, beta opcional, plataformas con marcas reconocibles y listado real de archivos/arquitecturas/tamaños. |
| Ayuda | Ocho artículos, categorías, búsqueda local normalizada y navegación de guías. |
| Comunidad | Proyectos oficiales, incidencias y propuestas; sin canales sociales inventados. |
| Privacidad/auxiliares | Alcance real del código, proveedor externo, atribuciones, 404, metadata por ruta, canonical, Open Graph, sitemap y robots. |

CSS: una fuente Slate/HSL con tokens semánticos y puente Tailwind 4; se eliminó premium.css y su cascada de overrides. Etiquetas mínimas de 12 px, texto habitual de 16 px, foco y contrastes comprobados. El fondo tiene alternativa Canvas 2D y conserva una imagen estática al pedir movimiento reducido.

## Datos reales comprobados

- GitHub Releases: 84 publicaciones públicas durante la revisión, última estable `v0.15.2`, última beta `v0.15.3-beta.6`. No son valores fijados en la UI.
- Se comprobó el historial desde la API y el catálogo desde sus bytes originales. Las 84 rutas individuales respondieron HTTP 200 con contenido de release; evidencia en `qa/release-routes.json`. La clave coincide con la que el launcher distribuye como confiable.
- Selection: catálogo firmado generación 1. 1.8.9/Ornithe Gen2, beta `0.1.0-preview.1`; target 26.3/Fabric sin canal publicado. La web deriva este estado dinámicamente.
- Manifiesto beta: hash, Ed25519 y esquema válidos; Java 25, loader 0.20.1 y launcher mínimo 0.1.0.
- Core: README del commit señalado en README.md, alpha 0.3.0-alpha.1 sin validación en partida según su propia documentación. No se presenta como release estable de Selection.
- Sitio de producción actual: dominio HTTPS respondió y tenía `index, follow`. No se cambió DNS ni se ejecutó un deploy de producción.

## Verificaciones ejecutadas

- Build de producción y TypeScript: correctos.
- ESLint: sin errores ni warnings.
- Unitarias: **8 correctas**, clasificación estable/beta e inconsistencias, URLs, paginación múltiple y fallos/límites sin resultado parcial; Markdown inseguro, catálogo real y rechazo de alteraciones/esquemas firmados inválidos.
- Playwright: **7 correctas** sobre el build. Galería y Escape, teclado/skip link, FAQ, filtros/paginación/notas individuales, canales/OS/URLs de instaladores, catálogo real, búsqueda de ayuda, 404, navegación móvil y alternativa animada sin WebGL.
- Axe WCAG 2 A/AA y 2.1 AA: **cero infracciones detectadas** en las ocho rutas principales, una guía y una release. No equivale a certificación de accesibilidad ni a prueba con lector de pantalla real.
- Canonical por ruta, sitemap con releases y robots de desarrollo bloqueando indexación: comprobados en Playwright. La indexación de producción depende de `VERCEL_ENV=production`, como antes.
- Capturas: 20 imágenes, diez rutas en 1440×1000 y 390×844. El script espera fuentes, comprueba el fondo Slate real y carga imágenes antes de capturar. `measurements.json` conserva estados HTTP, overflow, errores JS y tiempos de navegación de esta máquina local.
- Se detectaron durante QA y corrigieron el overflow de los pasos en móvil, contrastes del footer/descargas y una declaración CSS que impedía resolver los tokens. La prueba exige explícitamente Slate e Inter para evitar un falso positivo funcional sin tema.
- Notas largas y ayuda, enlaces de navegación, encabezados, formularios de búsqueda, iconos de plataformas, diálogos y footer revisados en las capturas. Se retiraron eslóganes y bloques de noticias vacíos.

Los tiempos de `measurements.json` son navegación local con caché, no Lighthouse, Core Web Vitals reales ni mediciones en el AMD/Thorium del propietario. No se afirma una puntuación o garantía de FPS.

## Capturas para revisión

| Vista | Escritorio | Móvil |
| --- | --- | --- |
| Inicio | [PNG](qa/inicio-desktop.png) | [PNG](qa/inicio-mobile.png) |
| Características | [PNG](qa/caracteristicas-desktop.png) | [PNG](qa/caracteristicas-mobile.png) |
| Selection | [PNG](qa/selection-desktop.png) | [PNG](qa/selection-mobile.png) |
| Historial | [PNG](qa/novedades-desktop.png) | [PNG](qa/novedades-mobile.png) |
| Descargas | [PNG](qa/descargas-desktop.png) | [PNG](qa/descargas-mobile.png) |
| Ayuda | [PNG](qa/ayuda-desktop.png) | [PNG](qa/ayuda-mobile.png) |
| Comunidad | [PNG](qa/comunidad-desktop.png) | [PNG](qa/comunidad-mobile.png) |
| Privacidad | [PNG](qa/privacidad-desktop.png) | [PNG](qa/privacidad-mobile.png) |
| Release | [PNG](qa/release-desktop.png) | [PNG](qa/release-mobile.png) |
| Guía | [PNG](qa/guia-desktop.png) | [PNG](qa/guia-mobile.png) |

## Límites antes de aprobar producción

1. Las imágenes disponibles son vistas del frontend oficial con puente nativo simulado, no capturas de una partida real. No se inventaron cuentas, instalaciones ni imágenes de Core. Para una galería nativa más representativa se necesitan capturas del producto en uso del equipo.
2. No se ejecutó Minecraft, el launcher de escritorio ni instaladores en Windows/macOS/Linux. Los enlaces se obtienen de assets publicados; esto no certifica esos binarios ni su compatibilidad.
3. No hay prueba física en el PC AMD/Thorium. Se probaron fallback y preferencias en Chromium automatizado, no todos los drivers ni dispositivos.
4. GitHub público tiene límites. La caché de 15 minutos y páginas de 20 reducen consultas, y los errores se muestran sin inventar datos. No hay un snapshot persistido del último historial válido.
5. La web valida firmas de Selection, pero no mantiene un contador monotónico compartido entre instancias serverless. Una protección anti-replay persistente requeriría una decisión de infraestructura; no se atribuye esa garantía a la firma.
6. La configuración privada de logs/métricas de Vercel no se inspeccionó. No se prometen políticas de datos que no se hayan comprobado.
7. Revisar Preview Deployment antes del merge. Esta entrega no es una verificación posterior a producción ni una aprobación del lanzamiento.

## Reproducir y aprobar

```sh
git fetch origin
git switch feat/production-refresh
npm ci
npm run dev
```

En cloud usar el proxy indicado en README.md. Para QA de producción local: `npm run build`, `npm run start -- --port 3003` y `PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH=/usr/bin/chromium node scripts/capture-qa.mjs` (o Chromium instalado por Playwright sin esa variable).

Revisar el PR, las capturas y los límites anteriores; aprobar después el merge. Si Vercel tiene integración Git de previews, comprobar su URL desde el PR. No se requiere cambiar dominios ni publicar manualmente desde esta tarea.
