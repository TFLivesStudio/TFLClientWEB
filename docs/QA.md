# TFL Client Web — validación de la actualización

Revisión del 13 de noviembre de 2026 (America/Bogota). El propietario autorizó integrar el trabajo en `main`. El inglés continúa en `/en`; se descartó expresamente la propuesta de subdominios. No hay cambios de DNS.

## Comportamiento entregado

| Área                | Resultado                                                                                                                                                                                                                                                                                                                                      |
| ------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Fondo               | Solo Pattern Waves como renderer visible. Se eliminó SilkFallback/Canvas 2D y la sonda WebGL adicional. Azul del token del tema, interacción del cursor e introducción original. Sin decoración provisional antes del primer frame.                                                                                                            |
| Calidad gráfica     | DPR máximo 0.85 para navegadores que anuncian hasta cuatro hilos; 1.25 en los demás. Mismo shader y distribución visual. Animación continua con DPR reducido, sin ocultarla por potencia o preferencias del sistema. La reducción explícita de la web dibuja un frame estático; se pausa al ocultarse. Sin WebGL no hay renderer de reemplazo. |
| Carrusel            | Cuatro vistas oficiales precargadas, cada una con captura oscura y clara real. Cambio cada 6000 ms, sin botón de pausa. Se detiene al ampliar, con pestaña oculta o movimiento reducido y reanuda al cerrar. Flechas e índices manuales.                                                                                                       |
| Ampliación          | Portal, contenedor fijo centrado, transición compartida de Motion, título y descripción accesibles. Escape, flechas, foco atrapado y restauración del foco.                                                                                                                                                                                    |
| Temas               | Oscuro predeterminado; claro completo. next-themes guarda la preferencia antes de hidratar; opción del sistema y transición circular basada en Magic UI. Alternativa DOM/SVG con círculo cuando falta View Transitions. Solo la reducción explícita de la web produce cambio inmediato.                                                        |
| Portada y scroll    | Hero de una pantalla completa, con altura de barra descontada; galería inmediatamente debajo y ancla de exploración. Lenis suaviza rueda y anclas, conserva entrada táctil/teclado/scrollbar nativa y se detiene con el bloqueo de Radix. Scrollbar azul adaptada al tema.                                                                     |
| Navegación e idioma | Indicadores animados de ruta y ES/EN. Menú móvil animado con Escape y cierre exterior. Conservación de página, query y fragmento al cambiar idioma.                                                                                                                                                                                            |
| Filtros             | Tabs animadas con Radix/Motion para historial, canales, sistemas y categorías. Flechas, Home/End y estado seleccionado accesibles.                                                                                                                                                                                                             |
| Ayuda y lectura     | Resultados animados sin tarjetas salientes que puedan recibir clics obsoletos. Acordeones de FAQ/documentación, progreso en guías y changelogs, copia de enlace con toast y skeleton de rutas.                                                                                                                                                 |
| Comparativa         | Tabla HTML adaptable con las cinco cifras aportadas por TFLives y marcas reales. TFL usa el icono oficial del launcher/favicon, Prism el SVG oficial CC BY-SA 4.0, CM el rayo rojo original, Laby el lobo azul oficial y Lunar el favicon de su web con marco morado.                                                                          |
| Selection           | Explicación de clientes oficiales por estilo de juego y miniguía, sin arquitectura ni repositorios internos en la UI. Datos verificados en servidor. Core solo como impulsor. Canales en bloques con 22×24 px de padding, cabecera flexible y separación propia para badge, versión y descripción.                                             |
| Datos y enlaces     | API paginada de releases, notas originales con Markdown seguro, estable verde y beta naranja rust, descargas reales y Discord `discord.gg/tflives`. Único repositorio enlazado por la interfaz: launcher.                                                                                                                                      |

## Validación ejecutada

- Build de producción, TypeScript, ESLint y `git diff --check`: correctos.
- Unitarias: **18**, sobre clasificación de versiones, paginación, fallos de API, URLs, Markdown, validación de catálogos, cobertura de traducciones de ayuda y conservación de contexto al cambiar idioma.
- Playwright: **26 correctas**. Cobertura: navegación, galería, avance cada seis segundos, pausa al ampliar y reanudación, centrado móvil/escritorio, foco/Escape, tabs con teclado, temas persistidos/sistema, i18n y conservación de URL, búsqueda, copia/toast, progreso, resolución reducida y ausencia de Canvas 2D. Se añadieron pruebas del movimiento continuo después de la introducción con cuatro hilos y preferencia de sistema reducida, círculo sin View Transitions, capturas claras con preferencias guardadas e interacción de cursor sin EXT_color_buffer_float.
- Axe: 10 rutas españolas en oscuro, siete inglesas móviles y 10 españolas en claro. No equivale a certificación ni a una prueba con lector de pantalla físico.
- Se corrigió un nombre accesible perdido al compactar el enlace de descarga en móvil. También se corrigió una carrera de interacción: al buscar, el resultado anterior permanecía brevemente clicable durante su salida; ahora se sustituye de inmediato y se anima la entrada del nuevo resultado.
- Captura reproducible de trece rutas × dos idiomas × dos temas × dos tamaños: **104 estados**, más ocho capturas de interacción. El script espera fuentes e imágenes y activa explícitamente el control propio de reducción para estabilizar la evidencia y comprueba fondo, estado HTTP, overflow y errores JavaScript.
- La transición circular con movimiento normal también se ejecutó en Chromium: el tema ya era claro dentro del callback y al resolver ready, con keyframes clip-path de círculo activos y sin errores JavaScript; evidencia `theme-transition.png`. También se fuerza la ausencia de la API para comprobar y capturar la revelación SVG en `theme-transition-compatible.png`.

- Se corrigió una discrepancia de hidratación: al arrancar con tema claro guardado, el contexto de next-themes se resolvía correctamente pero algunos atributos conservaban la versión de servidor. La selección de capturas y el nombre del control de tema se actualizan después del montaje; CSS selecciona la imagen correcta incluso antes de hidratar.
- La paleta oscura usa negro profundo `rgb(4, 5, 6)`, superficies azuladas y acentos más intensos. Navegación con elevación, subrayado y color al pasar el cursor. Las animaciones están activas por defecto; el control accesible «Reducir animaciones» persiste en `tfl-motion`, documentado también en Privacidad.

## Corrección del highlight y SEO

- Se reprodujo el fallo leyendo uniforms reales del shader: antes, el ciclo oscuro→claro→oscuro producía `uInk = 0→0→1`. El efecto dependiente de `resolvedTheme` se adelantaba al efecto que aplicaba la clase del tema. Ahora se observa la clase aplicada en el DOM y la secuencia es `0→1→0`; `uColor` y `uAccent` finales coinciden exactamente con los de arranque, sin recarga ni renderer nuevo.
- Pruebas nuevas: ese ciclo completo de tema; hero en escritorio 1440×1000 y móvil 390×844, navegación de ancla/rueda y bloqueo en diálogo; padding/wrapping de Selection; previews y datos estructurados accesibles por HTTP sin JavaScript. Unitarias nuevas para metadatos localizados, JSON-LD resistente al cierre de script y conservación de `updated_at`.
- El marcador de captura activa se añade al montar en cliente, dejando a CSS la selección visual anterior a la hidratación; se comprueba la imagen visible para evitar ambigüedad con variantes ocultas en el arranque. PageDown también avanzó el documento en una comprobación manual de Chromium; no se afirma una prueba táctil física.
- El suavizado usa el scroll-padding de CSS, sin sumar un segundo offset. Un primer ensayo detectó un espacio superior duplicado en las anclas; se corrigió antes de publicar.
- Tarjetas sociales propias de **1200×630**, PNG locales, español e inglés, con logo/fuentes/captura reales. Generación reproducible con `npx tsx scripts/generate-social-images.tsx`. Open Graph y Twitter incluyen imágenes absolutas, alt, dimensiones y metadatos del idioma. Color de marca para embeds: azul TFL.
- JSON-LD: Organization, WebSite, SoftwareApplication, WebPage/TechArticle, Article para releases y BreadcrumbList. Canonical/hreflang por ruta y ES/EN/x-default. Las notas exponen fechas originales de publicación y actualización, sin inventar reviews ni valoraciones.
- Sitemap comprobado con **206 URLs únicas**, ambas versiones idiomáticas, **618 enlaces alternativos** y **174 fechas reales** de releases o listados alimentados por ellas. No se asigna una fecha ficticia a cada página estática. Revalida cada 900 s; estos totales cambian con las publicaciones de GitHub.
- Producción permite indexación y previews grandes de Google. Desarrollo/previews siguen con noindex y robots disallow. No se garantizan posiciones en buscadores ni se controlan las cachés de Discord.

## Ampliación de producto, catálogo y legal

- Secciones Rust/MCP en inicio y características. Dos capturas nuevas del panel oficial de Integraciones (dark/light), con puente simulado y sin asistentes conectados; ampliación centrada y guía MCP bilingüe.
- Catálogo de **82 módulos** verificado en la candidata reciente, en lugar de la alpha antigua de main. Buscador con normalización de acentos, siete categorías y desplazamiento Lenis anidado; prueba real de rueda dentro del panel confirma que la posición de la página no cambia. Buscar/filtrar detiene la inercia y reinicia solo la lista. Servicios inactivos y condiciones de disponibilidad diferenciados.
- Novedades conserva su diseño y extractos. Resúmenes sin notas/assets completos, caché por petición y estado URL inicializado en servidor; filtros/paginación y Atrás/Adelante comprobados, incluido el enlace de cambio de idioma tras filtrar.
- Aviso legal, privacidad y términos orientados al launcher/comunidad, con índice, progreso, copia de enlace, correos aportados por el titular, licencias y límites reales de cuentas, almacenamiento, servicios y MCP. No se inventan LLC, domicilio o país. Las seis rutas legales ES/EN pasan axe.
- VirusTotal según la decisión del titular: enlace y SHA-256, **sin puntuación**. La API opcional solo se consulta con clave privada. Unitarias comprueban detecciones, hash, estadísticas inválidas, fecha futura, ausencia de clave y límites de API; no se certifica un falso positivo ni se anuncia ausencia total de virus.
- La validación encontró contraste insuficiente durante el fade inicial del listado: se conservó la transición de posición y se eliminó la opacidad inicial para mantener texto legible. Se corrigió también la sincronización de la query con el render; popstate y un evento propio actualizan el historial y el selector de idioma.
- Procedencia, revisión de código y límites específicos documentados en [CONTENT_AUDIT.md](CONTENT_AUDIT.md).

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

Tarjetas sociales: [español](../public/images/social/tfl-client-es.png), [inglés](../public/images/social/tfl-client-en.png).

Interacciones: [diálogo escritorio](qa/dialog-desktop.png), [diálogo móvil](qa/dialog-mobile.png), [menú inglés claro](qa/menu-en-light-mobile.png), [transición de tema](qa/theme-transition.png), [círculo sin View Transitions](qa/theme-transition-compatible.png). MCP: [oscuro](qa/mcp-dialog-dark.png), [claro](qa/mcp-dialog-light.png); [búsqueda de módulos](qa/modules-search.png). Resto de páginas y mediciones en `docs/qa/measurements.json`.

## Fuentes y licencias

Se consultaron las fuentes oficiales de Magic UI (AnimatedThemeToggler y ScrollProgress), Motion Primitives (MorphingDialog) y Animate UI (Radix tabs, accordion y tooltip). Se adaptaron individualmente a los tokens de TFL y a la gestión de temas/foco de este proyecto; no se instaló una biblioteca completa de esas colecciones.

Lenis: MIT, aviso en public/licenses/Lenis-MIT.txt. Magic UI y Motion Primitives: MIT; Animate UI: MIT + Commons Clause, permite integrarlos en una aplicación y prohíbe vender/redistribuir los componentes como paquete independiente. Avisos completos en `public/licenses`. Prism: branding CC BY-SA 4.0, SVG sin modificar y atribución conservada. Las demás marcas no se presentan como open source. Procedencia exacta de cada archivo en `public/licenses/launcher-marks.txt` y enlaces de licencia en Privacidad.

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

## Notas de publicación — 13 de noviembre de 2026

Se revisaron y publicaron las 85 descripciones de TFL Client en GitHub. La fuente
editorial y su registro de evidencia están en
[TFLClient/docs/releases](https://github.com/TFLivesStudio/TFLClient/tree/main/docs/releases).
La web sigue utilizando esa API; no se añadió una copia local de los textos.

Las tarjetas de Novedades utilizan el primer párrafo como resumen, con un máximo
de 260 caracteres. El canal, los apartados y las instrucciones permanecen en el
artículo completo. Las pruebas unitarias cubren párrafos separados, saltos de
línea Windows y notas largas, conservando el envío de resúmenes sin cuerpos ni
assets completos al navegador.

Validación: `npm test` (18 pruebas), TypeScript, ESLint, build de producción y la
suite completa de Playwright (26 pruebas) correctos. El build local se ejecutó
con `NODE_USE_ENV_PROXY=1` para que el sitemap incluyera las releases de GitHub.
Los selectores de navegador usan los elementos accesibles y esperan el layout
real, evitando confundir la captura inerte del cambio de tema con la página.

Se comprobaron los resúmenes contra los textos publicados, los apartados del
artículo, los enlaces de archivos y la ausencia de errores de página y overflow
horizontal en cuatro vistas:

- [Historial, escritorio oscuro](qa/release-notes/history-desktop-dark.png).
- [Artículo, escritorio oscuro](qa/release-notes/release-desktop-dark.png).
- [Historial, móvil claro en inglés](qa/release-notes/history-mobile-light.png).
- [Artículo histórico, móvil claro en inglés](qa/release-notes/release-mobile-light.png).

[Registro de las cuatro comprobaciones](qa/release-notes/verification.json).

## Nombres del ecosistema — 13 de noviembre de 2026

TFL Client identifica el launcher; TFL Selection, la biblioteca de clientes
modificados; TFLClient, el cliente final. Se corrigieron páginas, ayuda, FAQ,
traducciones, metadatos y etiquetas del catálogo. El nuevo glosario bilingüe
explica también instancia, modpack, módulo, HUD, canal y MCP.

Las etiquetas antiguas del catálogo se normalizan solo para su presentación,
después de la verificación existente. No se modificaron los bytes firmados ni
las referencias de las versiones publicadas. Las pruebas nuevas cubren alias,
fallbacks, nombres personalizados y objetos originales inmutables.

Validación: 19 pruebas unitarias, 27 pruebas Playwright, TypeScript, ESLint y build
de producción correctos. Se comprobaron definición de los tres productos, títulos
del catálogo, navegación ES/EN, accesibilidad y ausencia de overflow.

Revisión visual adicional:

- [Selection, escritorio oscuro](qa/product-names/selection-desktop-dark.png).
- [Selection, móvil claro](qa/product-names/selection-mobile-light.png).
- [Glosario, escritorio claro en inglés](qa/product-names/glossary-desktop-light-en.png).
- [Glosario, móvil oscuro en inglés](qa/product-names/glossary-mobile-dark-en.png).

[Registro de las cuatro comprobaciones](qa/product-names/verification.json).
La terminología que deben conservar próximas actualizaciones está documentada en
[PRODUCT_NAMES.md](PRODUCT_NAMES.md) y AGENTS.md.

## Refinamiento tras auditoría — 14 de noviembre de 2026

La auditoría adjunta se contrastó con el código y la web publicada en
`becb319deb1dc8a1750227d6e8c936913ad8da52`. Sus propuestas de diseño se usaron
como evidencia; las decisiones vigentes de identidad y producto se conservaron.

Cambios: recorrido principal antes de Rust/MCP/memoria, composición lateral de
MCP con ampliación, contexto metodológico junto a la tabla de RAM, secuencia
Instalar → Elegir → Jugar con nombres oficiales, primera captura de bienvenida,
resumen legible de la estable, cierre con descarga/ayuda y CTA apilados a 320 px.
Los controles compactos tienen superficies de 44 px; a 320 px la descarga de la
cabecera se ofrece dentro del menú para conservar espacio. Características
presenta producto e introducción juntos, Ayuda destaca la búsqueda y Descargas
agrupa formatos con orientación conservando todos los archivos oficiales.

Optimización: importaciones estáticas con hash de las diez capturas originales
y de los iconos, `sizes` por contexto, precarga de todas las diapositivas y temas
al acercarse a cada galería (1200 px de margen), sin prioridad global para MCP.
Las imágenes siguen presentes antes de hidratar para respetar el tema persistido.
El diccionario inglés sale del bundle cliente: el servidor envía `{}` en ES y
el catálogo en EN, con traducciones inmediatas en SSR e hidratación. Se comprobó
la ausencia de frases exclusivas del diccionario en `.next/static/chunks`.
No se recodificaron los originales ni se cambiaron DPR, FPS, shader o transición
circular. O06/O07 permanecen como hipótesis que requieren perfilado independiente.

Verificación final en Windows, Node 24.11.1, Next.js 16.4.6/Turbopack y Chromium:

| Comprobación | Resultado |
|---|---|
| `npm run build` normal | PASS |
| `npm run typecheck` | PASS |
| `npm run lint` | PASS |
| `npm test` | PASS · 23/23 |
| Playwright | PASS · 27/27 |
| Axe en rutas y temas de la suite | Sin infracciones en las comprobaciones ejecutadas |
| Matriz visual | 56 combinaciones de ruta/ancho/tema, HTTP 200, un H1, sin overflow |
| Revisión independiente | Corregidos extractos con identificadores y niveles de encabezado; sin bloqueos restantes |

La matriz cubre Inicio a 1440, 1024, 820, 768, 390 y 320 px en ambos temas, y
otras once rutas a 1440/390 px en ambos temas. Las capturas utilizan reducción
explícita para hacer reproducible la inspección; la suite también comprueba
animaciones activadas, seis segundos del carrusel, WebGL, fallback circular,
teclado, foco, Escape, bloqueo de scroll y tema persistido. Se corrigieron
selectores de pruebas que dependían de nombres de archivo sin hash o de contenido
oculto, y la espera del ancla. La comprobación de precarga se acota a la galería
principal: MCP ya no debe descargarse antes de acercarse a su sección.

Los fixtures firmados conservan exactamente los blobs originales. `.gitattributes`
evita que Git transforme sus saltos de línea en Windows; no cambia la clave ni
la verificación. No se midieron Lighthouse, FPS sostenidos, móviles físicos ni
Safari/Firefox. No se atribuye una mejora porcentual de rendimiento a la revisión.

Evidencia y reproducción:

- [Resultados de la matriz](qa/refresh/responsive.json).
- [Playwright](qa/refresh/playwright.log), [build](qa/refresh/build.log),
  [TypeScript](qa/refresh/typecheck.log), [ESLint](qa/refresh/lint.log),
  [unitarias](qa/refresh/test.log).
- [Inicio oscuro](qa/refresh/inicio-1440-dark.jpg),
  [inicio a 320 px](qa/refresh/inicio-320-dark.jpg),
  [Selection claro](qa/refresh/selection-1440-light.jpg),
  [Características](qa/refresh/caracteristicas-1440-dark.jpg),
  [Descargas móvil](qa/refresh/descargas-390-light.jpg).
- Tras iniciar el build: `node scripts/qa-refresh.mjs`.

Publicación: integración Git en `main`; la verificación del SHA y del estado de
producción en Vercel se registra en la entrega de esta actualización.
