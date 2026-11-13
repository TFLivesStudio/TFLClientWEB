# TFL Client Web

Web oficial de TFL Client en Next.js App Router, React y TypeScript. Actualización aprobada por el propietario para integrarse en `main` y desplegarse mediante la integración Git de Vercel. Dominio: https://launcher.tflives.com.

## Nombres del ecosistema

**TFL Client** es el launcher. **TFL Selection** es la biblioteca donde TFLives
publica sus clientes modificados. **TFLClient** es el cliente que se instala y se
utiliza dentro de Minecraft; **TFL Core** impulsa sus funciones.

Consulta [los nombres y términos](docs/PRODUCT_NAMES.md) para mantener esta
distinción en todo el proyecto.

## Desarrollo y validación

Node.js 24 y npm. No se necesita base de datos ni claves para consultar las fuentes públicas.

```sh
npm ci
npm run dev
npm run lint
npm run typecheck
npm test
npm run build
npx playwright install chromium
npm run test:e2e
```

En esta máquina cloud, activar `NODE_USE_ENV_PROXY=1` antes de arrancar Node para usar el proxy heredado. Para el Chromium del entorno:

```sh
NODE_USE_ENV_PROXY=1 npm run build
CI=1 NODE_USE_ENV_PROXY=1 PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH=/usr/bin/chromium npm run test:e2e
```

Esto no cambia la configuración de red de Vercel. No desactivar TLS para resolver conexiones.

## Datos y páginas

- `/`: producto, carrusel automático de cuatro capturas, pausa al ampliar y controles manuales, instalaciones, comparativa HTML de memoria, Selection, última estable y FAQ.
- `/caracteristicas`: capacidades verificadas contra el código del launcher, organizadas por responsabilidad.
- `/selection`: presentación de clientes oficiales para distintas formas de jugar, canales publicados y guía de instalación. La validación de datos se realiza en el servidor; la UI no expone arquitectura, manifiestos ni repositorios de Selection/Core.
- `/novedades`: historial completo paginado desde GitHub Releases, filtros estable/beta y páginas `/novedades/[tag]` con notas originales. Excluye drafts, preserva tags, señala inconsistencias y no convierte tags sueltos en entradas.
- `/descargas`: estable recomendada y beta opcional, selector OS, archivos/arquitectura/tamaño publicados y notas.
- `/ayuda`: búsqueda local sobre artículos, categorías y rutas `/ayuda/[slug]`.
- `/comunidad`: repositorio del launcher y Discord https://discord.gg/tflives. Es el único repositorio GitHub enlazado por la web.
- `/privacidad`, 404, sitemap y robots.

### Idiomas

Español primario en `/`, inglés en `/en` mediante `src/proxy.ts`, contexto compartido y diccionario `src/i18n/en.json`. Incluye guías, etiquetas accesibles, metadatos, canonical y hreflang. Las notas de releases conservan el idioma del autor, con aviso. Los enlaces internos mantienen el idioma y el selector ES/EN conserva la ruta.

### Releases y caché

`src/lib/releases.ts` consulta `/releases?per_page=20&page=N` hasta agotar la API (no solo diez publicaciones). Se usan páginas de 20 porque la respuesta de 100 superaba los 2 MB admitidos por la caché de Next. Revalidación: 15 minutos; timeout por petición: 8 s. Límite defensivo: 200 páginas; si se alcanza o falla una página, se informa error sin presentar un historial parcial como completo. No se reintentan 403/429 automáticamente para no amplificar límites. Las notas se renderizan con react-markdown/GFM sin HTML crudo; las imágenes externas se muestran como enlaces. Solo se permiten enlaces HTTP(S).

Las versiones alpha/beta/rc/preview/dev se agrupan como pruebas aun cuando GitHub no marque prerelease; se señala esa inconsistencia. El tag nunca se reescribe. Las páginas nuevas aparecen por datos y routing dinámico, sin editar artículos. Para comprobar un release particular se usa el historial cacheado.

### Selection

Trust anchor: `EfZhA1AVSumBvuI40hQ2o54C5zFGK8jRV/a05PCf/kg=`, idéntico al incluido por TFL Client en `src-tauri/src/services/selection/signatures.rs` (commit `4590afe229067265dc9cc20c94a2fa8459536a1f`). Es una clave pública fijada en código, no un secreto. Una rotación exige revisión y actualización explícita.

Esquemas copiados de TFLClientSelection `8b6891092574fd13b7b8a9af54ef31525bf87e95`, con AJV 2020 y formatos. Se verifican bytes originales, tamaños, firma Ed25519 y generación positiva. Los requisitos se extraen de un manifiesto firmado cuyo hash coincide con el catálogo y cuyo target/release coinciden. Sin base de datos compartida no hay registro monotónico de generaciones entre despliegues: la firma autentica el contenido pero no garantiza por sí sola ausencia de replay de un catálogo firmado anterior. La web no instala archivos.

### Sistema visual

Una única hoja `src/app/globals.css`, escala Slate HSL y tokens semánticos. Se consumen mediante `hsl(var(--token))`, alpha opcional, y `@theme inline` de Tailwind 4. No existe una segunda capa premium.css. Manrope e Inter locales. Fondo Pattern Waves con DPR reducido (0.85) si el navegador anuncia hasta cuatro hilos y máximo 1.25 en el resto. No hay renderer de reemplazo Canvas 2D. El propio componente dibuja una imagen estática cuando se elige reducir animaciones en la web y se pausa al ocultar pestaña/componente; si WebGL falla, la página sigue legible sin un renderer sustituto. Usa el acento azul del token `--primary`, con interacción del cursor e introducción de React Bits. No se muestra un fondo provisional antes del shader. La disponibilidad de WebGL se comprueba por enlace de programas/contexto, sin descartar frames legítimamente oscuros de la introducción. No promete identidad exacta entre motores.

La portada ocupa la primera pantalla (`100svh` menos la navegación), con el carrusel a continuación y un ancla de exploración. Lenis (MIT) suaviza la rueda y las anclas, conserva táctil/teclado/scrollbar nativos y se detiene al ampliar capturas. La reducción explícita desactiva el suavizado. El color del shader observa la clase de tema aplicada al DOM para conservar su highlight tras un ciclo claro/oscuro.

### Temas y componentes interactivos

Oscuro profundo por defecto. Tema claro completo en tokens semánticos de `globals.css`; `next-themes` aplica la preferencia guardada antes de hidratar, sin flash, y ofrece modo del sistema. El cambio usa la transición circular de Magic UI mediante View Transitions, con alternativa DOM/SVG equivalente en navegadores sin View Transitions. Solo la reducción elegida en la propia web produce un cambio inmediato.

Motion anima el selector de idioma, la navegación activa, el menú móvil, el diálogo de capturas y los resultados de búsqueda. Pestañas, tooltips, acordeones y diálogos usan paquetes Radix individuales. Changelogs y guías incorporan progreso de lectura y copia de enlace con notificación Sonner; las rutas tienen skeletons de carga. Se conservan las licencias de Magic UI, Motion Primitives y Animate UI en `public/licenses`.

Las cuatro vistas del launcher tienen capturas reales de su frontend en oscuro y claro, elegidas por CSS antes de hidratar. Se reproducen con `scripts/capture-launcher-views.mjs`. El carrusel cambia cada seis segundos, sin botón de pausa. Al ampliar se detiene; al cerrar vuelve a avanzar. Las animaciones están activadas por defecto y no se desactivan por la preferencia del sistema; el control «Reducir animaciones» de la web guarda la elección en `tfl-motion`. El carrusel se pausa con esa elección o con pestaña oculta. El diálogo usa portal, centrado fijo, Escape, flechas y gestión de foco de Radix.

### Comparación de memoria

Tabla HTML accesible: TFL Client 9 MB, Prism 100 MB, CMClient 150 MB, LabyMod 880 MB y Lunar 940 MB. Iconos reales y atribuciones: `public/licenses/launcher-marks.txt`, con licencia completa CC BY-SA 4.0 de Prism. Datos aportados por TFLives en AMD A10 PRO 8750B/Windows 10, sin método o estado de aplicación especificados, no verificados independientemente. No son requisitos ni predicen FPS. Núcleo nativo Rust, interfaz Svelte.

### Fuentes, imágenes y licencias

- TFL Client: código/README en `4590afe229067265dc9cc20c94a2fa8459536a1f` y API de releases en vivo.
- Core: README `caadad2c9681364b811edc61ff39d5c237429262`: 0.3.0-alpha.1 experimental, sin validación en partida; no confundir con Selection publicada.
- Capturas disponibles: frontend oficial TFL Client del mismo commit, renderizado con puente Tauri simulado, sin cuenta, con datos de demostración para consola e instancia; no verifican el ejecutable ni el juego. No se encontraron capturas in-game oficiales de Core. Sustituirlas por capturas nativas representativas cuando el equipo las facilite, sin inventarlas.
- Pattern Waves TS-TW: React Bits, David Haz, MIT + Commons Clause en `public/licenses`. Adaptado con notificaciones de programas/contexto y control de DPR.
- Marcas: Simple Icons, CC0. GitHub, Apple y Linux proceden de 11.15.0; Windows 11 de 9.21.0. Identifican plataformas, sin patrocinio. Las marcas conservan sus derechos y directrices: https://simpleicons.org/disclaimer y https://www.microsoft.com/legal/intellectualproperty/trademarks. Logos monocromáticos sin alteración de trazado; no son iconos Lucide inventados.
- Lucide (acciones), Inter y Manrope conservan sus licencias en `public/licenses`.

## Revisión y despliegue

El propietario aprobó integrar esta actualización en `main`. La integración Git de Vercel publica ese cambio; no se cambian DNS ni se necesita un deploy manual. Evidencia de revisión y límites en `docs/QA.md`. Importación Vercel existente: raíz `./`, Next.js, Node 24, instalación `npm ci`, build `npm run build`. GitHub API pública puede limitar consultas anónimas; el sitio conserva estados explícitos y enlaces a la fuente. Si el proyecto exige una cuota mayor, diseñar una integración autenticada solo de servidor antes de añadir secretos.

Canonical y sitemap usan `launcher.tflives.com`. La web actual respondió con `index, follow` durante la auditoría; la nueva versión conserva indexación solo con `VERCEL_ENV=production`. Previews y desarrollo tienen noindex y robots disallow. No se inspeccionaron las opciones privadas de métricas del proyecto Vercel: no se afirma ausencia de registros o cookies de servicios externos.

### SEO y tarjetas para compartir

Open Graph y Twitter usan PNG locales de 1200×630, uno por idioma, con logo, captura oficial y fuentes locales. Reproducir con `npx tsx scripts/generate-social-images.tsx`. No hay generación remota en cada petición ni dependencias nuevas para producirlos (Next/og y Sharp ya estaban instalados).

Datos estructurados JSON-LD: Organization, WebSite, SoftwareApplication, WebPage/TechArticle, Article para notas y BreadcrumbList para páginas interiores. La serialización escapa contenido capaz de cerrar un script. Los metadatos y canonical conservan `/en`. Sitemap con URLs únicas de ambos idiomas, alternates ES/EN/x-default, prioridades y frecuencias orientativas, guías y releases, fechas de actualización reales y revalidación de 900 s. No se asignan fechas ficticias a páginas estáticas. Previews siguen fuera de indexación; producción permite previsualizaciones grandes de Google. Estas mejoras técnicas no garantizan posición en buscadores ni controlan la caché de Discord.

### Rust, MCP, módulos y textos legales

Secciones de núcleo nativo Rust e integración MCP local en Inicio y Características, con dos capturas adicionales de Integraciones en oscuro/claro. Las capturas son del frontend oficial con puente simulado, sin asistentes reales conectados. Guía `/ayuda/mcp`. El catálogo de Selection utiliza 82 módulos de la candidata `feat/tfl-visual-overhaul`, revisión `4aced6a36b89aa90096028b38cd3f7a807a5370f`, en lugar de inferirlos de la alpha histórica de main. Nombres/descripciones bilingües revisados para no exponer arquitectura. Se separan los servicios inactivos y las disponibilidades condicionales; el inventario no certifica cada función en partida. Panel de altura acotada con Lenis independiente, búsqueda y categorías.

Novedades conserva su diseño. `summarizeRelease` evita enviar notas y assets completos al cliente; la paginación/filtro se reflejan en URL y restauran su estado al recargar o navegar con Atrás/Adelante. El estado inicial se renderiza desde la query del servidor. `getReleases` comparte el resultado por petición mediante React cache y conserva la caché de red de 15 minutos.

Aviso legal en `/legal/aviso-legal`, privacidad en `/privacidad` y términos en `/legal/terminos`, también en `/en`. Textos propios sobre el comportamiento real del launcher, sin copiar cláusulas de LabyMod. TFLives figura como comunidad, sin inventar LLC, domicilio o jurisdicción. Contactos aportados por el titular. Estos documentos no certifican cumplimiento de una jurisdicción que no se ha identificado; deberán actualizarse si una entidad asume la operación.

### Informe de VirusTotal

Enlace al informe y SHA-256 exacto elegido por el titular, sin puntuación por su decisión actual. Integración dinámica opcional en servidor con `VIRUSTOTAL_API_KEY` (ver `.env.example`), revalidación de una hora, timeout y validación de hash/estadísticas/fecha. No hay uploads ni rescans. La clave nunca se envía al cliente. Sin clave/error no se presenta una puntuación; las detecciones no se convierten en falsos positivos ni se promete ausencia de malware. El análisis de un archivo no representa todas las versiones/plataformas.
