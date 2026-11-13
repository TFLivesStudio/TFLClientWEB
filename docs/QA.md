# TFL Client Web — validación de la actualización

Revisión del 13 de noviembre de 2026 (UTC). El propietario autorizó integrar el trabajo en `main`. El inglés continúa en `/en`; se descartó expresamente la propuesta de subdominios. No hay cambios de DNS.

## Comportamiento entregado

| Área                | Resultado                                                                                                                                                                                                                                                                                                                                      |
| ------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Fondo               | Solo Pattern Waves como renderer visible. Se eliminó SilkFallback/Canvas 2D y la sonda WebGL adicional. Azul del token del tema, interacción del cursor e introducción original. Sin decoración provisional antes del primer frame.                                                                                                            |
| Calidad gráfica     | DPR máximo 0.85 para navegadores que anuncian hasta cuatro hilos; 1.25 en los demás. Mismo shader y distribución visual. Animación continua con DPR reducido, sin ocultarla por potencia o preferencias del sistema. La reducción explícita de la web dibuja un frame estático; se pausa al ocultarse. Sin WebGL no hay renderer de reemplazo. |
| Carrusel            | Cuatro vistas oficiales precargadas, cada una con captura oscura y clara real. Cambio cada 6000 ms, sin botón de pausa. Se detiene al ampliar, con pestaña oculta o movimiento reducido y reanuda al cerrar. Flechas e índices manuales.                                                                                                       |
| Ampliación          | Portal, contenedor fijo centrado, transición compartida de Motion, título y descripción accesibles. Escape, flechas, foco atrapado y restauración del foco.                                                                                                                                                                                    |
| Temas               | Oscuro predeterminado; claro completo. next-themes guarda la preferencia antes de hidratar; opción del sistema y transición circular basada en Magic UI. Alternativa DOM/SVG con círculo cuando falta View Transitions. Solo la reducción explícita de la web produce cambio inmediato.                                                        |
| Navegación e idioma | Indicadores animados de ruta y ES/EN. Menú móvil animado con Escape y cierre exterior. Conservación de página, query y fragmento al cambiar idioma.                                                                                                                                                                                            |
| Filtros             | Tabs animadas con Radix/Motion para historial, canales, sistemas y categorías. Flechas, Home/End y estado seleccionado accesibles.                                                                                                                                                                                                             |
| Ayuda y lectura     | Resultados animados sin tarjetas salientes que puedan recibir clics obsoletos. Acordeones de FAQ/documentación, progreso en guías y changelogs, copia de enlace con toast y skeleton de rutas.                                                                                                                                                 |
| Comparativa         | Tabla HTML adaptable con las cinco cifras aportadas por TFLives y marcas reales. TFL usa el icono oficial del launcher/favicon, Prism el SVG oficial CC BY-SA 4.0, CM el rayo rojo original, Laby el lobo azul oficial y Lunar el favicon de su web con marco morado.                                                                          |
| Selection           | Explicación de clientes oficiales por estilo de juego y miniguía, sin arquitectura ni repositorios internos en la UI. Datos verificados en servidor. Core solo como impulsor.                                                                                                                                                                  |
| Datos y enlaces     | API paginada de releases, notas originales con Markdown seguro, estable verde y beta naranja rust, descargas reales y Discord `discord.gg/tflives`. Único repositorio enlazado por la interfaz: launcher.                                                                                                                                      |

## Validación ejecutada

- Build de producción, TypeScript, ESLint y `git diff --check`: correctos.
- Unitarias: **10**, sobre clasificación de versiones, paginación, fallos de API, URLs, Markdown, validación de catálogos, cobertura de traducciones de ayuda y conservación de contexto al cambiar idioma.
- Playwright: **17 correctas**. Cobertura: navegación, galería, avance cada seis segundos, pausa al ampliar y reanudación, centrado móvil/escritorio, foco/Escape, tabs con teclado, temas persistidos/sistema, i18n y conservación de URL, búsqueda, copia/toast, progreso, resolución reducida y ausencia de Canvas 2D. Se añadieron pruebas del movimiento continuo después de la introducción con cuatro hilos y preferencia de sistema reducida, círculo sin View Transitions, capturas claras con preferencias guardadas e interacción de cursor sin EXT_color_buffer_float.
- Axe: 10 rutas españolas en oscuro, siete inglesas móviles y 10 españolas en claro. No equivale a certificación ni a una prueba con lector de pantalla físico.
- Se corrigió un nombre accesible perdido al compactar el enlace de descarga en móvil. También se corrigió una carrera de interacción: al buscar, el resultado anterior permanecía brevemente clicable durante su salida; ahora se sustituye de inmediato y se anima la entrada del nuevo resultado.
- Captura reproducible de diez rutas × dos idiomas × dos temas × dos tamaños: **80 estados**, más cinco capturas de interacción. El script espera fuentes e imágenes y activa explícitamente el control propio de reducción para estabilizar la evidencia y comprueba fondo, estado HTTP, overflow y errores JavaScript.
- La transición circular con movimiento normal también se ejecutó en Chromium: el tema ya era claro dentro del callback y al resolver ready, con keyframes clip-path de círculo activos y sin errores JavaScript; evidencia `theme-transition.png`. También se fuerza la ausencia de la API para comprobar y capturar la revelación SVG en `theme-transition-compatible.png`.

- Se corrigió una discrepancia de hidratación: al arrancar con tema claro guardado, el contexto de next-themes se resolvía correctamente pero algunos atributos conservaban la versión de servidor. La selección de capturas y el nombre del control de tema se actualizan después del montaje; CSS selecciona la imagen correcta incluso antes de hidratar.
- La paleta oscura usa negro profundo `rgb(4, 5, 6)`, superficies azuladas y acentos más intensos. Navegación con elevación, subrayado y color al pasar el cursor. Las animaciones están activas por defecto; el control accesible «Reducir animaciones» persiste en `tfl-motion`, documentado también en Privacidad.

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

Interacciones: [diálogo escritorio](qa/dialog-desktop.png), [diálogo móvil](qa/dialog-mobile.png), [menú inglés claro](qa/menu-en-light-mobile.png), [transición de tema](qa/theme-transition.png), [círculo sin View Transitions](qa/theme-transition-compatible.png). Resto de páginas y mediciones en `docs/qa/measurements.json`.

## Fuentes y licencias

Se consultaron las fuentes oficiales de Magic UI (AnimatedThemeToggler y ScrollProgress), Motion Primitives (MorphingDialog) y Animate UI (Radix tabs, accordion y tooltip). Se adaptaron individualmente a los tokens de TFL y a la gestión de temas/foco de este proyecto; no se instaló una biblioteca completa de esas colecciones.

Magic UI y Motion Primitives: MIT; Animate UI: MIT + Commons Clause, permite integrarlos en una aplicación y prohíbe vender/redistribuir los componentes como paquete independiente. Avisos completos en `public/licenses`. Prism: branding CC BY-SA 4.0, SVG sin modificar y atribución conservada. Las demás marcas no se presentan como open source. Procedencia exacta de cada archivo en `public/licenses/launcher-marks.txt` y enlaces de licencia en Privacidad.

## Límites de la evidencia

- No se probó físicamente el AMD/Thorium del propietario. HardwareConcurrency=4, preferencia de sistema reducida, ausencia de View Transitions/EXT_color_buffer_float y pérdida/ausencia de WebGL son simulaciones de navegador; no se garantiza compatibilidad con todos los drivers ni igualdad píxel a píxel.
- Las capturas de consola e instancia proceden del frontend oficial con puente nativo simulado y datos de demostración identificados. No se ejecutó Minecraft ni el launcher nativo en Windows/macOS/Linux.
- Las cifras 9/100/150/880/940 MB fueron aportadas por TFLives para AMD A10 PRO 8750B/Windows 10, sin método o estado de aplicación especificado; no se verificaron independientemente ni predicen memoria de una partida/FPS.
- La API pública de GitHub tiene límites. Caché 900 s, páginas de 20, timeouts y errores explícitos; no hay una copia persistente de último resultado válido ni contador anti-replay compartido para Selection.
- Las notas de releases conservan el idioma del autor. No se inspeccionaron opciones privadas de métricas/logs de Vercel.

Las ocho capturas del launcher se reproducen con el frontend oficial arrancado en el puerto 4173:

```sh
LAUNCHER_THEME=light PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH=/usr/bin/chromium node scripts/capture-launcher-views.mjs
```

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
