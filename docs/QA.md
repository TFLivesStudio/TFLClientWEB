# TFL Client Web — validación de la actualización

Revisión del 12 de noviembre de 2026 (America/Bogota). El propietario autorizó integrar el trabajo en `main`. El inglés continúa en `/en`; se descartó expresamente la propuesta de subdominios. No hay cambios de DNS.

## Comportamiento entregado

| Área                | Resultado                                                                                                                                                                                                                                                             |
| ------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Fondo               | Solo Pattern Waves como renderer visible. Se eliminó SilkFallback/Canvas 2D y la sonda WebGL adicional. Azul del token del tema, sin interacción del cursor.                                                                                                          |
| Calidad gráfica     | DPR máximo 0.85 para navegadores que anuncian hasta cuatro hilos; 1.25 en los demás. Mismo shader y distribución visual. Con movimiento reducido dibuja un frame estático y se pausa al ocultarse. Sin WebGL queda decoración CSS estática.                           |
| Carrusel            | Cuatro vistas oficiales precargadas. Cambio cada 6000 ms, sin botón de pausa. Se detiene al ampliar, con pestaña oculta o movimiento reducido y reanuda al cerrar. Flechas e índices manuales.                                                                        |
| Ampliación          | Portal, contenedor fijo centrado, transición compartida de Motion, título y descripción accesibles. Escape, flechas, foco atrapado y restauración del foco.                                                                                                           |
| Temas               | Oscuro predeterminado; claro completo. next-themes guarda la preferencia antes de hidratar; opción del sistema y transición circular basada en Magic UI. Cambio inmediato si la API no existe o hay movimiento reducido.                                              |
| Navegación e idioma | Indicadores animados de ruta y ES/EN. Menú móvil animado con Escape y cierre exterior. Conservación de página, query y fragmento al cambiar idioma.                                                                                                                   |
| Filtros             | Tabs animadas con Radix/Motion para historial, canales, sistemas y categorías. Flechas, Home/End y estado seleccionado accesibles.                                                                                                                                    |
| Ayuda y lectura     | Resultados animados sin tarjetas salientes que puedan recibir clics obsoletos. Acordeones de FAQ/documentación, progreso en guías y changelogs, copia de enlace con toast y skeleton de rutas.                                                                        |
| Comparativa         | Tabla HTML adaptable con las cinco cifras aportadas por TFLives y marcas reales. TFL usa el icono oficial del launcher/favicon, Prism el SVG oficial CC BY-SA 4.0, CM el rayo rojo original, Laby el lobo azul oficial y Lunar el favicon de su web con marco morado. |
| Selection           | Explicación de clientes oficiales por estilo de juego y miniguía, sin arquitectura ni repositorios internos en la UI. Datos verificados en servidor. Core solo como impulsor.                                                                                         |
| Datos y enlaces     | API paginada de releases, notas originales con Markdown seguro, estable verde y beta naranja rust, descargas reales y Discord `discord.gg/tflives`. Único repositorio enlazado por la interfaz: launcher.                                                             |

## Validación ejecutada

- Build de producción, TypeScript, ESLint y `git diff --check`: correctos.
- Unitarias: **10**, sobre clasificación de versiones, paginación, fallos de API, URLs, Markdown, validación de catálogos, cobertura de traducciones de ayuda y conservación de contexto al cambiar idioma.
- Playwright: **13 correctas**. Cobertura: navegación, galería, avance cada seis segundos, pausa al ampliar y reanudación, centrado móvil/escritorio, foco/Escape, tabs con teclado, temas persistidos/sistema, i18n y conservación de URL, búsqueda, copia/toast, progreso, resolución reducida y ausencia de Canvas 2D.
- Axe: 10 rutas españolas en oscuro, siete inglesas móviles y 10 españolas en claro. No equivale a certificación ni a una prueba con lector de pantalla físico.
- Se corrigió un nombre accesible perdido al compactar el enlace de descarga en móvil. También se corrigió una carrera de interacción: al buscar, el resultado anterior permanecía brevemente clicable durante su salida; ahora se sustituye de inmediato y se anima la entrada del nuevo resultado.
- Captura reproducible de diez rutas × dos idiomas × dos temas × dos tamaños: **80 estados**, más cuatro capturas de interacción. El script espera fuentes e imágenes, usa movimiento reducido para estabilizar la evidencia y comprueba fondo, estado HTTP, overflow y errores JavaScript.
- La transición circular con movimiento normal también se ejecutó en Chromium: el tema ya era claro dentro del callback y al resolver ready, con keyframes clip-path de círculo activos y sin errores JavaScript; evidencia `theme-transition.png`.

## Evidencia

| Vista               | Oscuro                          | Claro                                 |
| ------------------- | ------------------------------- | ------------------------------------- |
| Inicio escritorio   | [PNG](qa/inicio-desktop.png)    | [PNG](qa/inicio-light-desktop.png)    |
| Inicio móvil        | [PNG](qa/inicio-mobile.png)     | [PNG](qa/inicio-light-mobile.png)     |
| Inicio inglés       | [PNG](qa/inicio-en-desktop.png) | [PNG](qa/inicio-en-light-desktop.png) |
| Descargas           | [PNG](qa/descargas-desktop.png) | [PNG](qa/descargas-light-desktop.png) |
| Selection           | [PNG](qa/selection-desktop.png) | [PNG](qa/selection-light-desktop.png) |
| Ayuda inglesa móvil | [PNG](qa/ayuda-en-mobile.png)   | [PNG](qa/ayuda-en-light-mobile.png)   |
| Guía                | [PNG](qa/guia-desktop.png)      | [PNG](qa/guia-light-desktop.png)      |
| Historial           | [PNG](qa/novedades-desktop.png) | [PNG](qa/novedades-light-desktop.png) |

Interacciones: [diálogo escritorio](qa/dialog-desktop.png), [diálogo móvil](qa/dialog-mobile.png), [menú inglés claro](qa/menu-en-light-mobile.png), [transición de tema](qa/theme-transition.png). Resto de páginas y mediciones en `docs/qa/measurements.json`.

## Fuentes y licencias

Se consultaron las fuentes oficiales de Magic UI (AnimatedThemeToggler y ScrollProgress), Motion Primitives (MorphingDialog) y Animate UI (Radix tabs, accordion y tooltip). Se adaptaron individualmente a los tokens de TFL y a la gestión de temas/foco de este proyecto; no se instaló una biblioteca completa de esas colecciones.

Magic UI y Motion Primitives: MIT; Animate UI: MIT + Commons Clause, permite integrarlos en una aplicación y prohíbe vender/redistribuir los componentes como paquete independiente. Avisos completos en `public/licenses`. Prism: branding CC BY-SA 4.0, SVG sin modificar y atribución conservada. Las demás marcas no se presentan como open source. Procedencia exacta de cada archivo en `public/licenses/launcher-marks.txt` y enlaces de licencia en Privacidad.

## Límites de la evidencia

- No se probó físicamente el AMD/Thorium del propietario. HardwareConcurrency=4 y pérdida/ausencia de WebGL son simulaciones de navegador; no se garantiza compatibilidad con todos los drivers ni igualdad píxel a píxel.
- Las capturas de consola e instancia proceden del frontend oficial con puente nativo simulado y datos de demostración identificados. No se ejecutó Minecraft ni el launcher nativo en Windows/macOS/Linux.
- Las cifras 9/100/150/880/940 MB fueron aportadas por TFLives para AMD A10 PRO 8750B/Windows 10, sin método o estado de aplicación especificado; no se verificaron independientemente ni predicen memoria de una partida/FPS.
- La API pública de GitHub tiene límites. Caché 900 s, páginas de 20, timeouts y errores explícitos; no hay una copia persistente de último resultado válido ni contador anti-replay compartido para Selection.
- Las notas de releases conservan el idioma del autor. No se inspeccionaron opciones privadas de métricas/logs de Vercel.

## Reproducir

```sh
npm ci
NODE_USE_ENV_PROXY=1 npm run build
npm run typecheck
npm run lint
npm test
CI=1 NODE_USE_ENV_PROXY=1 PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH=/usr/bin/chromium npm run test:e2e
NODE_USE_ENV_PROXY=1 npm run start -- --port 3010
QA_BASE_URL=http://127.0.0.1:3010 QA_THEME=light QA_LOCALE=en PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH=/usr/bin/chromium node scripts/capture-qa.mjs
PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH=/usr/bin/chromium node scripts/capture-interactions.mjs
```

La variable de proxy corresponde solo a esta máquina cloud. Vercel publica mediante su integración Git al integrar `main`; no se realiza despliegue manual.
