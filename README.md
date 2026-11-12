# TFL Client Web

Web oficial de TFL Client en Next.js App Router, React y TypeScript. El Production Refresh se revisa en una rama antes de integrarlo en producción. Dominio: https://launcher.tflives.com.

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

- `/`: producto, capturas, instalaciones, personalización, comparación Selection, release estable real y FAQ.
- `/caracteristicas`: capacidades verificadas contra el código del launcher, organizadas por responsabilidad.
- `/selection`: catálogo Ed25519 v2 dinámico; solo canales publicados. Requisitos obtenidos de manifiestos con SHA-256, firma y esquema válidos.
- `/novedades`: historial completo paginado desde GitHub Releases, filtros estable/beta y páginas `/novedades/[tag]` con notas originales. Excluye drafts, preserva tags, señala inconsistencias y no convierte tags sueltos en entradas.
- `/descargas`: estable recomendada y beta opcional, selector OS, archivos/arquitectura/tamaño publicados y notas.
- `/ayuda`: búsqueda local sobre artículos, categorías y rutas `/ayuda/[slug]`.
- `/comunidad`: proyectos oficiales y participación por GitHub.
- `/privacidad`, 404, sitemap y robots.

### Releases y caché

`src/lib/releases.ts` consulta `/releases?per_page=20&page=N` hasta agotar la API (no solo diez publicaciones). Se usan páginas de 20 porque la respuesta de 100 superaba los 2 MB admitidos por la caché de Next. Revalidación: 15 minutos; timeout por petición: 8 s. Límite defensivo: 200 páginas; si se alcanza o falla una página, se informa error sin presentar un historial parcial como completo. No se reintentan 403/429 automáticamente para no amplificar límites. Las notas se renderizan con react-markdown/GFM sin HTML crudo; las imágenes externas se muestran como enlaces. Solo se permiten enlaces HTTP(S).

Las versiones alpha/beta/rc/preview/dev se agrupan como pruebas aun cuando GitHub no marque prerelease; se señala esa inconsistencia. El tag nunca se reescribe. Las páginas nuevas aparecen por datos y routing dinámico, sin editar artículos. Para comprobar un release particular se usa el historial cacheado.

### Selection

Trust anchor: `EfZhA1AVSumBvuI40hQ2o54C5zFGK8jRV/a05PCf/kg=`, idéntico al incluido por TFL Client en `src-tauri/src/services/selection/signatures.rs` (commit `4590afe229067265dc9cc20c94a2fa8459536a1f`). Es una clave pública fijada en código, no un secreto. Una rotación exige revisión y actualización explícita.

Esquemas copiados de TFLClientSelection `8b6891092574fd13b7b8a9af54ef31525bf87e95`, con AJV 2020 y formatos. Se verifican bytes originales, tamaños, firma Ed25519 y generación positiva. Los requisitos se extraen de un manifiesto firmado cuyo hash coincide con el catálogo y cuyo target/release coinciden. Sin base de datos compartida no hay registro monotónico de generaciones entre despliegues: la firma autentica el contenido pero no garantiza por sí sola ausencia de replay de un catálogo firmado anterior. La web no instala archivos.

### Sistema visual

Una única hoja `src/app/globals.css`, escala Slate HSL y tokens semánticos. Se consumen mediante `hsl(var(--token))`, alpha opcional, y `@theme inline` de Tailwind 4. No existe una segunda capa premium.css. Manrope e Inter locales. Fondo Pattern Waves con alternativa Canvas 2D a 24 FPS y versión estática con movimiento reducido; se pausa al ocultar pestaña/componente. No promete identidad exacta entre motores.

### Fuentes, imágenes y licencias

- TFL Client: código/README en `4590afe229067265dc9cc20c94a2fa8459536a1f` y API de releases en vivo.
- Core: README `caadad2c9681364b811edc61ff39d5c237429262`: 0.3.0-alpha.1 experimental, sin validación en partida; no confundir con Selection publicada.
- Capturas disponibles: frontend oficial TFL Client del mismo commit, renderizado con puente Tauri simulado, colecciones vacías y sin cuenta; no verifican el ejecutable ni el juego. No se encontraron capturas in-game oficiales de Core. Sustituirlas por capturas nativas representativas cuando el equipo las facilite, sin inventarlas.
- Pattern Waves TS-TW: React Bits, David Haz, MIT + Commons Clause en `public/licenses`. Adaptado con notificaciones de frame/contexto para la alternativa gráfica.
- Marcas: Simple Icons, CC0. GitHub, Apple y Linux proceden de 11.15.0; Windows 11 de 9.21.0. Identifican plataformas, sin patrocinio. Las marcas conservan sus derechos y directrices: https://simpleicons.org/disclaimer y https://www.microsoft.com/legal/intellectualproperty/trademarks. Logos monocromáticos sin alteración de trazado; no son iconos Lucide inventados.
- Lucide (acciones), Inter y Manrope conservan sus licencias en `public/licenses`.

## Revisión y despliegue

No se ha desplegado producción ni cambiado DNS en esta actualización. Revisar `docs/QA.md`, las capturas y la rama; aprobar merge antes de publicar. Importación Vercel existente: raíz `./`, Next.js, Node 24, instalación `npm ci`, build `npm run build`. GitHub API pública puede limitar consultas anónimas; el sitio conserva estados explícitos y enlaces a la fuente. Si el proyecto exige una cuota mayor, diseñar una integración autenticada solo de servidor antes de añadir secretos.

Canonical y sitemap usan `launcher.tflives.com`. La web actual respondió con `index, follow` durante la auditoría; la nueva versión conserva indexación solo con `VERCEL_ENV=production`. Previews y desarrollo tienen noindex y robots disallow. No se inspeccionaron las opciones privadas de métricas del proyecto Vercel: no se afirma ausencia de registros o cookies de servicios externos.
