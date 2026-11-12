# TFL Client Web

Web de TFL Client en Next.js App Router y TypeScript. Dirección visual oscura en negro y plata, con azul TFL como acento, Manrope/Inter locales, iconos Lucide y fondo Pattern Waves de React Bits. Interfaz en español, responsive y sin reducción de movimiento por preferencias del sistema.

## Desarrollo

Requiere Node.js 22 o superior (validado con Node 24).

```sh
npm ci
npm run dev
```

## Validación

```sh
npm run lint
npm run typecheck
npm test
npm run build
npx playwright install chromium
npm run test:e2e
```

Las pruebas E2E arrancan el servidor de producción, por lo que necesitan el build. Si ya existe Chromium instalado, se puede usar `PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH=/usr/bin/chromium npm run test:e2e`.

## Vercel

Importar `TFLivesStudio/TFLClientWEB` y seleccionar Next.js con la raíz del repositorio. Instalación: `npm ci`; build: `npm run build`. Usar Node.js 24.x. No se necesitan claves ni base de datos. Revisar primero un Preview Deployment antes de asignar el dominio de producción. Esta tarea no ha desplegado el sitio ni cambiado DNS.

Las rutas de descargas y novedades consultan la última release estable pública de `TFLivesStudio/TFLClient` mediante GitHub REST, con revalidación cada 15 minutos y timeout de 6 segundos. Se rechazan drafts, prereleases y enlaces fuera del repositorio oficial. La ausencia de release, de un instalador o de acceso a la API tiene estados explícitos. La consulta a la API pública de GitHub respondió HTTP 200 en la revisión del 12 de noviembre de 2026. Los casos de fallo y de éxito también se prueban con fixtures; esto no verifica la ejecución de los instaladores. Vercel necesita salida HTTPS a `api.github.com` para actualizar esos datos. Ante límites de GitHub sin autenticación, se mantiene el enlace a las publicaciones oficiales.

## Rutas

`/`, `/caracteristicas`, `/selection`, `/descargas`, `/novedades`, `/ayuda`, `/comunidad`, `/privacidad` y 404. Los entornos de preview y desarrollo usan `noindex`; el entorno de producción de Vercel permite indexación. Dominio, canonical e idiomas adicionales quedan para una iteración con sus valores definitivos.

## Imágenes y fidelidad

- Logotipo oficial y arte ambiental: `TFLivesStudio/TFLClient`, commit `4590afe229067265dc9cc20c94a2fa8459536a1f`.
- Capturas: frontend Svelte oficial del mismo commit, renderizado en Chromium a 1440×900 con un puente Tauri de pruebas que entrega ajustes y colecciones vacías. Sin cuentas ni instalaciones ficticias. No validan el ejecutable, autenticación ni lanzamiento de Minecraft. La configuración azul es una preferencia del frontend.
- No había capturas oficiales in-game de TFL Core en el repositorio inspeccionado. Se evita reemplazarlas por imágenes inventadas. Se pueden añadir capturas reales a la galería cuando estén disponibles.
- TFL Core: documentación de `TFLivesStudio/TFLClientMOD`, commit `caadad2c9681364b811edc61ff39d5c237429262`; se presenta explícitamente como alpha experimental sin validación en partida.
- El fondo React Bits conserva su licencia en `public/licenses/react-bits.txt`; la variante TS-TW se importa exactamente desde el registro oficial. La comprobación de soporte WebGL está en el contenedor Ambient, y la fuente se adapta para no consultar preferencias de movimiento. Si el dispositivo no lo soporta, está fuera de la sección visible  no se fuerza la animación. También se desmonta al ocultar la pestaña.

Los recursos oficiales se usan con la autorización del propietario para este sitio. Deben conservarse las licencias de sus fuentes al distribuirlos. Las tipografías de Fontsource conservan sus licencias OFL en sus paquetes; Lucide usa ISC. No hay imágenes de LabyMod ni copias de su interfaz.

## Alcance de esta entrega

Sitio funcional inicial. No incluye CMS, artículos inventados, catálogo Selection firmado, autenticación web ni analítica. El catálogo y las actualizaciones de Selection siguen siendo responsabilidad del launcher; no se listan versiones no verificadas. No hay integración Vercel/GitHub App activada ni publicación realizada.

## Rediseño oscuro

La fuente de `src/components/PatternWaves.tsx` se basa en `https://reactbits.dev/r/PatternWaves-TS-TW.json` consultado el 12 de noviembre de 2026, con los controles de movimiento reducido eliminados por instrucción del propietario. Dependencia declarada: `ogl@^1.0.11`, instalada como 1.0.11. Tailwind se compila mediante `@tailwindcss/postcss`. Configuración: silk, blanco sobre negro, fade edges, interactive, cursorSize 50 y cursorStrength 0.6. El contenedor tiene 600 px de alto; la opacidad de la capa decorativa preserva la legibilidad.

`premium.css` contiene la dirección visual oscura compartida. Inicio usa una composición editorial, el símbolo oficial y una galería con la vista de personalización como primera imagen. No se ha implementado modo claro.
