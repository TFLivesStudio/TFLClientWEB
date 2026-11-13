# TFL Client Web — instrucciones vigentes

Idioma de trabajo: español. Repositorio: `TFLivesStudio/TFLClientWEB`. Dominio canónico: `https://launcher.tflives.com`.

## Alcance y publicación

El Production Refresh del propietario sustituye las instrucciones anteriores sobre colores, copy, páginas y movimiento. Está autorizada la implementación completa. La actualización del 12 de noviembre de 2026 tiene aprobación explícita del propietario para integrarse en `main` y activar el despliegue Git de Vercel. No cambiar DNS ni ejecutar despliegues manuales sin necesidad. Para futuras actualizaciones, seguir el alcance autorizado en la conversación. El entorno ya está aislado: usar el checkout existente, no crear worktrees salvo petición explícita. Preservar cambios del usuario.

## Identidad y contenido

- Fuente única de estilo: `src/app/globals.css`. Escala Slate HSL y tokens semánticos consumidos como `hsl(var(--token))`, con Tailwind 4 mediante `@theme inline`.
- No reintroducir `premium.css`, raíces duplicadas, colores hex dispersos ni overrides por página del tema.
- Slate domina; azul TFL es acento. Oscuro predeterminado y tema claro completo con los mismos tokens Slate; next-themes persiste la elección y permite modo del sistema. Negro profundo de fondo y superficies azuladas, con azules eléctricos y cian como acentos. Manrope en títulos e Inter en texto, servidas localmente.
- Copy descriptivo, preciso y humano. Cada título identifica su contenido y cada párrafo aporta información. No eslóganes genéricos, cifras inventadas, promesas de FPS, testimonios ficticios ni funcionalidades futuras presentadas como actuales.
- Nombre protagonista: TFL Client. Título del inicio: `TFL Client | Launcher de Minecraft Java`.
- En la web pública, TFL Selection es la biblioteca; TFLClient es el cliente modificado y TFL Client es el launcher. Explicar sus funciones y la instalación con una guía breve. No exponer su arquitectura, firmas, loaders, manifiestos ni repositorios. Core solo como impulsor de la experiencia; no enlazar su GitHub. El único repositorio GitHub enlazado en la web es TFLivesStudio/TFLClient (launcher).
- Español primario en `/`; inglés completo en `/en`. Mantener diccionario, metadatos, ayudas, etiquetas accesibles y enlaces locales en ambos idiomas. Notas de releases conservan su idioma original con aviso.
- Discord oficial: https://discord.gg/tflives. Estables en verde y betas en naranja rust; siempre añadir texto además del color.
- Comparativa de RAM: cifras aportadas por TFLives en AMD A10 PRO 8750B/Windows 10, sin método ni estado de las aplicaciones proporcionados. Identificar su procedencia y límites; no convertirlas en promesa universal. El núcleo nativo es Rust y la interfaz es Svelte: no afirmar que toda la aplicación es Rust.
- Marcas: iconos oficiales reconocibles de GitHub, Windows, Apple y Linux; Lucide para acciones. Mantener licencias y atribución. No inventar logos. Está autorizado usar los iconos reales de los launchers en la tabla, incluido el lobo azul de LabyMod. Mantener procedencia y licencias en public/licenses/launcher-marks.txt. El logotipo TFL debe ser el icono oficial del launcher, igual al favicon, nunca el hexágono provisional.
- Las capturas disponibles proceden del frontend oficial con puente nativo simulado, sin cuenta; consola e instancia usan datos explícitos de demostración. No presentarlas como prueba de ejecución del juego. No inventar capturas de Core.

## Arquitectura y datos

Next.js App Router, React, TypeScript estricto, npm y `package-lock.json`. Sin backend separado ni base de datos. Server Components para datos; Client Components para filtros, búsqueda, galería y selección de descargas. Integraciones en `src/lib`.

- Releases: API oficial `/repos/TFLivesStudio/TFLClient/releases`, paginada con 20 por página para respetar el límite de caché de Next. Revalidación 900 s, timeouts, exclusión de drafts, tags originales y orden por fecha. No usar `/latest` para el historial. Una respuesta incompleta por error no se presenta como historial completo.
- Clasificación: prerelease o tag alpha/beta/rc/preview/dev implica canal de prueba. Señalar inconsistencias de GitHub. La beta no sustituye a la estable recomendada.
- Notas: react-markdown + remark-gfm, sin HTML crudo. URLs solo HTTP(S), imágenes remotas convertidas en enlaces para no cargar rastreadores. No ejecutar MDX ni introducir `dangerouslySetInnerHTML` para notas.
- Descargas: solo archivos y URLs del repositorio oficial que figuran en releases. Nombre, tamaño, fecha y arquitectura si está indicada, sin deducir arquitecturas por sistema ni inventar instaladores.
- Selection: verificar Ed25519 sobre bytes originales, esquema JSON oficial v2 y generación publicada antes de mostrar canales. La clave se fija en código y coincide con el trust anchor del launcher; no descargar una clave junto al catálogo para confiar automáticamente en ella.
- Requisitos: manifiesto vinculado por SHA-256, firmado y validado contra esquema. Si falla, no anunciar esos requisitos como verificados. No instalar mods desde la web.
- Una firma válida no es prueba de rendimiento, compatibilidad in-game ni frescura absoluta. Sin persistencia compartida no se garantiza anti-replay monotónico entre instancias serverless; no afirmar lo contrario.
- Core: verificar documentación actual antes de cambiar su estado. No fabricar fechas ni publicar versiones futuras. El catálogo web de 82 módulos procede de la candidata de feat/tfl-visual-overhaul, revisión 4aced6a36b89aa90096028b38cd3f7a807a5370f; main conserva una alpha antigua. Mostrar nombres y funciones legibles, sin arquitectura/repositorios. Distinguir vista previa, disponibilidad condicional y servicios inactivos; nunca convertir el inventario en certificación de las 82 funciones ni en promesa de presencia en todas las versiones publicadas. El panel de módulos tiene búsqueda/categorías y Lenis anidado, con desplazamiento independiente y teclado nativo.
- Rust: presentar como núcleo nativo, con interfaz Svelte; no afirmar que todo se escribió desde cero ni prometer rendimiento universal. MCP es local y opcional, requiere auxiliar, launcher abierto y aprobación por sesión. No afirmar certificación de Codex/Claude/OpenCode ni acceso remoto desde ChatGPT en la nube.
- Novedades: conservar el diseño. Enviar al navegador solo resúmenes, no notas/archivos completos. Filtro/paginación en URL, inicializados en servidor; sincronizar con popstate y tfl-url-change para Atrás/Adelante e idioma. Mantener caché por petición y revalidación de GitHub, sin exponer credenciales.

## Accesibilidad y gráficos

Pattern Waves es el único renderer visible de canvas. El propietario pidió eliminar completamente el reemplazo Canvas 2D: no reintroducir SilkFallback ni sondas WebGL adicionales. Los canvas 2D internos de React Bits para interpretar colores o crear su atlas de textura no son un fondo visible y pueden mantenerse. Si WebGL no está disponible, conservar la página legible sin simular un renderer distinto ni mostrar un fondo provisional.

- Fondo azul del token --primary, con interacción del cursor e introducción de React Bits. No mostrar decoración CSS, imagen o segundo canvas antes del primer frame del componente. Calidad reducida mediante DPR 0.85 para navegadores que anuncian hasta cuatro hilos y máximo 1.25 en los demás; nunca ocultarlo por una estimación de potencia.
- Sincronizar el color del shader con la clase de tema ya aplicada al DOM mediante MutationObserver; no leer el token en un efecto dependiente de resolvedTheme, que puede adelantarse al cambio de clase y perder el highlight al volver a oscuro.
- Comprobar enlace de programas y pérdida real de contexto. No descartar WebGL por muestras oscuras durante la introducción. No prometer compatibilidad exacta de todos los drivers ni pruebas físicas que no se realizaron.
- La petición más reciente del propietario exige animaciones activadas por defecto, también cuando el sistema anuncia movimiento reducido. No ocultarlas por ese ajuste ni por una estimación de potencia. La reducción se elige explícitamente con el control «Reducir animaciones» y se persiste en tfl-motion; al activarla, MotionConfig=always, CSS reduce-motion y fondo estático. Seguir pausando el renderer fuera de pantalla o en pestaña oculta.
- Carrusel sin botón de pausa, intervalo de 6000 ms. Pausar cuando una imagen esté abierta, en pestaña oculta o con movimiento reducido; reanudar al cerrar. Mantener controles manuales. Precargar imágenes y centrar diálogos con portal y contenedor fijo, foco atrapado, Escape y restauración del foco.
- El cambio de tema debe conservar el círculo tipo Magic UI también sin document.startViewTransition: usar la alternativa DOM/SVG con captura visual inerte, sin duplicar controles accesibles y con limpieza completa. No convertir falta de API en cambio instantáneo, salvo reducción explícita.
- Capturas del launcher: diez archivos originales (cuatro vistas en oscuro/claro y la integración MCP en ambos temas). Cambiar por CSS según el tema antes de hidratar, incluyendo carrusel, ampliación y bloque de personalización. No recolorear imágenes.
- Selector ES/EN animado con Motion, rutas `/` y `/en`, conservando página, query y fragmento. El propietario descartó los subdominios: no configurar dominios nuevos.
- Primitivos individuales Radix + Motion para pestañas, navegación, diálogos, acordeones y tooltips. Magic UI y Motion Primitives son MIT; Animate UI añade Commons Clause. No instalar bibliotecas completas ni redistribuir estos componentes como producto separado. Conservar avisos de licencia.
- Mantener contraste en ambos temas, nombres accesibles de controles compactos, teclado, zoom y ausencia de overflow móvil. No ocultar texto de un botón sin conservar su nombre accesible.

## SEO y privacidad

Hero de inicio de pantalla completa con `100svh` menos la barra; el carrusel sigue inmediatamente debajo, con enlace accesible de exploración. Lenis suaviza rueda y anclas; conservar desplazamiento táctil, teclado y scrollbar nativos. Detener su inercia mientras un diálogo bloquee el body y desactivarlo con la reducción explícita. Scrollbar con tokens del tema.

Canonical, Open Graph y sitemap usan el dominio confirmado. Tarjetas sociales PNG propias a 1200×630 en español e inglés, reproducibles con scripts/generate-social-images.tsx. Mantener og:image y twitter:image absolutos, dimensiones, alt y color de marca. Datos JSON-LD de organización, web, aplicación, páginas/guías y breadcrumbs; escapar `<` en la serialización. Fechas de releases basadas en published_at/updated_at de GitHub; no inventar fechas de modificación. Sitemap bilingüe con alternates ES/EN/x-default, URLs canónicas únicas y todas las guías/releases publicadas. Previews/desarrollo no se indexan; Vercel producción permite indexación. No inventar políticas legales ni afirmar ausencia de cookies o métricas del proveedor sin comprobar su configuración. No incorporar analítica, cuentas web de Minecraft ni formularios sin nuevo alcance. Nunca publicar tokens, cookies, credenciales ni datos personales.

TFLives se identifica como comunidad, no como una LLC constituida. Contactos públicos proporcionados por el titular: contact@tflives.com y tflives@outlook.com. Aviso legal, privacidad y términos cubren el launcher y la web según el código auditado; no inventar sociedad, domicilio, registro o país, ni copiar una jurisdicción de terceros. Preservar licencias GPL/AGPL y derechos obligatorios; no afirmar uso de llavero del sistema (tokens locales cifrados aparte de preferencias), ausencia total de conexiones ni comportamiento de todos los mods.

VirusTotal: el titular eligió mostrar enlace/SHA-256 sin puntuación por ahora. Informe fijo ba6f60217974abd5822c0c350c4da5521d8ef7ec309047d9f2cb7a6e8e44de9a. Integración opcional mediante VIRUSTOTAL_API_KEY privada, solo lectura de informe existente; no sube archivos ni dispara rescans. Validar hash, estadísticas y fecha. Si hay detecciones, mostrarlas; no llamarlas falsos positivos sin evidencia ni anunciar «libre de virus totalmente». Sin clave/error, no inventar 0/71 ni mostrar un estado verde de verificación.

## Verificación y entrega

Ejecutar `npm run build`, `npm run typecheck`, `npm run lint`, `npm test` y Playwright. Probar paginación, canales inconsistentes, errores/límites, Markdown inseguro y catálogo inválido. Revisar capturas de todas las páginas en móvil/escritorio, metadata, enlaces, filtros, búsqueda, teclado y axe. Conservar evidencia en `docs/QA.md` y `docs/qa/`. No declarar producción lista solo porque compile.

La máquina cloud necesita `NODE_USE_ENV_PROXY=1` al iniciar Node para respetar el proxy heredado. No desactivar TLS ni copiar credenciales en archivos. En Vercel no se requiere esta variable de infraestructura cloud.

Al entregar: rama/commit integrado, cambios, pruebas reales, capturas, límites y estado del despliegue. No mezclar cambios de otros repositorios ni reescribir historial.

## Nombres oficiales del ecosistema

TFL Client es el launcher; TFL Selection es la biblioteca de clientes modificados;
TFLClient es el cliente final (sin espacio). TFL Core impulsa sus funciones.
Usa [docs/PRODUCT_NAMES.md](docs/PRODUCT_NAMES.md) como referencia. Aplica estos
nombres a copy, traducciones y notas públicas. Conserva IDs, rutas, datos de
usuario y bytes firmados; la biblioteca no se presenta como cliente ni modpack.
