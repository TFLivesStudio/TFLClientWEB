# AGENTS.md — TFL Client Web

> Documento principal de dirección del producto, arquitectura y normas para **Codex, OpenCode** y cualquier agente que trabaje en este repositorio.
>
> **Organización:** TFLivesStudio  
> **Proyecto:** TFL Client Web  
> **Repositorio:** https://github.com/TFLivesStudio/TFLClientWEB  
> **Fecha de consolidación:** 9 de noviembre de 2026  
> **Idioma de trabajo:** español  
> **Etapa:** planificación y definición; **NO se ha autorizado todavía desarrollar la aplicación.**

## 0. Instrucciones prioritarias para agentes

1. **Leer este archivo completo antes de actuar** y revisar el estado real del repositorio y la tarea solicitada.
2. La especificación distingue **CONFIRMADO**, **BASE PROPUESTA**, **PENDIENTE** y **FUTURO**. No convertir una propuesta en decisión cerrada sin permiso.
3. **No iniciar Next.js, instalar dependencias, construir páginas, configurar Vercel, activar CMS ni desplegar por iniciativa propia**. El propietario decidió documentar primero y programar después de cerrar la definición.
4. Trabajar solo en el alcance solicitado. No modificar TFL Client, TFL Selection o TFL Core por tareas de la web sin permiso explícito.
5. Nunca atribuir al launcher funciones que pertenezcan a TFL Core o a TFL Selection.
6. No inventar prestaciones, compatibilidad, estadísticas, FPS, usuarios, changelogs, lanzamientos, reseñas ni citas.
7. No incluir secretos, tokens, contraseñas, claves privadas, cookies ni datos personales en un repositorio público.
8. No realizar cambios destructivos ni reescribir el historial Git: no `git reset --hard`, `git clean -fd`, `push --force` u operaciones similares sin autorización y justificación.
9. No introducir servicios de pago, bases de datos, NestJS ni sistemas de cuentas sin necesidad y aprobación.
10. Diseñar usando la identidad acordada, no una plantilla genérica. Priorizar accesibilidad, rendimiento, claridad, seguridad y mantenimiento.
11. Usar las fuentes oficiales y verificar el estado actual de versiones, APIs, licencias y planes antes de actuar.
12. Comunicar qué se hizo, qué se probó, qué no se pudo verificar y qué queda pendiente. No afirmar que algo funciona sin haberlo probado.
13. Mantener este archivo actualizado cuando cambien decisiones arquitectónicas o de producto. Instrucciones posteriores explícitas del propietario prevalecen.

**Jerarquía:** solicitud reciente del propietario > decisiones confirmadas de este documento > contratos técnicos verificables de repositorios oficiales > bases propuestas. Nunca interpretar una idea como implementación autorizada.

## 1. Visión del producto [CONFIRMADO]

**TFL Client Web** será la página oficial del launcher de Minecraft **TFL Client**, de la comunidad/organización **TFLives**. Se eligió una **web oficial completa** (opción B), no una landing mínima ni una plataforma de cuentas desde el primer día.

Objetivos:

- Explicar claramente qué es el launcher y permitir descargarlo.
- Presentar sus características reales y su apariencia auténtica.
- Tener una página dedicada a **TFL Selection** dentro del mismo sitio.
- Ofrecer noticias, actualizaciones, changelogs, FAQ y centro de ayuda.
- Dar visibilidad a la comunidad y los proyectos oficiales de TFLives.
- Permitir que miembros autorizados publiquen contenido sin programar.
- Integrar fuentes confiables de versiones, releases y packs sin duplicar sistemas.
- Preparar el crecimiento futuro sin introducir complejidad innecesaria hoy.

La web debe parecer un **producto tecnológico/gaming premium, moderno, propio y pulido**, no una típica página de servidores Minecraft ni una copia de Lunar Client/Badlion.

### Identidades separadas

| Nombre | Rol | Repositorio |
| --- | --- | --- |
| **TFL Client** | Launcher y gestor de instalaciones de Minecraft; login Microsoft dentro de la app | https://github.com/TFLivesStudio/TFLClient |
| **TFL Selection** | Selecciones oficiales de mods/versiones gestionadas por TFL Client | https://github.com/TFLivesStudio/TFLClientSelection |
| **TFL Core** | Mod central y módulos in-game, distinto del launcher | https://github.com/TFLivesStudio/TFLClientMOD |
| **TFL Client Web** | Marketing, información, descargas del launcher, novedades y soporte | https://github.com/TFLivesStudio/TFLClientWEB |
| **TFLives** | Organización, comunidad y ecosistema de proyectos | Marca madre |

Nunca confundir sus funciones o responsabilidades en el contenido editorial.

## 2. Registro de decisiones

| Asunto | Decisión | Estado |
| --- | --- | --- |
| Alcance | Web oficial completa | **CONFIRMADO** |
| Diseño | Híbrido: minimalismo premium + gaming inmersivo | **CONFIRMADO** |
| Paleta | Azul Obsidiana exacta (sección 3) | **CONFIRMADO** |
| Tipografía | Manrope (títulos) + Inter (interfaz/textos) | **CONFIRMADO** |
| Animaciones | Equilibradas y fluidas | **CONFIRMADO** |
| Hero inicio | Centrado, amplio, captura real del launcher debajo | **CONFIRMADO** |
| TFL Selection | Página dedicada dentro de la web | **CONFIRMADO** |
| Administración | CMS visual conectado a GitHub | **CONFIRMADO** |
| Framework | **Next.js** | **CONFIRMADO** |
| Hosting | **Vercel** | **CONFIRMADO** como objetivo, no desplegado |
| Repositorio web | `TFLivesStudio/TFLClientWEB`, público | **CONFIRMADO** |
| Trabajo local | Windows, ruta del apartado 4; Codex y OpenCode | **CONFIRMADO** |
| Stack complementario | TypeScript, Tailwind, Radix, Motion, Lucide, Zod, next-intl, pnpm | **BASE PROPUESTA** |
| CMS concreto | Pages CMS | **BASE PROPUESTA**; revisar permisos/capacidades |
| Idiomas | Español e inglés desde lanzamiento | **BASE PROPUESTA**; traducciones/rutas pendientes |
| Backend | Route Handlers de Next.js, sin NestJS ni DB inicial | **BASE PROPUESTA** |
| Dominio | `client.tflives.com` es candidato | **PENDIENTE** |
| Plan Vercel | Evaluar Hobby/Pro según términos y uso | **PENDIENTE** |
| Diseño/copy/recursos finales | Requieren capturas y aprobación | **PENDIENTE** |
| Autorización para programar | **No concedida todavía** | **PENDIENTE** |

Actualizar esta tabla cuando el propietario tome nuevas decisiones. No presentar como implementado lo que solo está diseñado.

## 3. Sistema visual obligatorio

### 3.1 Concepto [CONFIRMADO]

Estética híbrida **premium minimalista + gaming inmersivo**, con predominancia de azul oscuro, espacios amplios, buena jerarquía, gran presentación del launcher y efectos cuidadosamente dosificados. Inspirarse en el nivel de calidad de clientes líderes, **nunca copiar sus interfaces, logotipos o imágenes**.

### 3.2 Tokens de color inamovibles [CONFIRMADO]

| Token semántico | Hex | Uso |
| --- | --- | --- |
| Background | **`#090E1A`** | Fondo principal |
| Surface | **`#141D2C`** | Paneles, tarjetas, superficies |
| Primary | **`#4589FF`** | Botones destacados, links y estados activos |
| Accent | **`#62C7FF`** | Luces, detalles y acentos visuales |
| Foreground | **`#F0F5FF`** | Texto principal |

Definir después tokens secundarios para bordes, overlays, texto secundario, éxito, error, warning, focus y superficies elevadas con contraste suficiente, **sin modificar la paleta aprobada**.

Centralizar colores mediante CSS custom properties/Tailwind; no dispersar hex repetidos en toda la base de código. Tema oscuro como base. Un tema claro no está solicitado inicialmente.

### 3.3 Tipografías [CONFIRMADO]

- **Manrope:** títulos, secciones, H1/H2 y mensajes destacados.
- **Inter:** textos, botones, navegación, FAQ, formularios y documentación.
- Cargar de forma optimizada, preferentemente con `next/font`.
- Mantener una escala tipográfica consistente, suficiente interlineado y contraste.
- La fuente Nunito usada en otras interfaces TFL no sustituye esta elección.

### 3.4 Formas y componentes

- Botones primarios con `#4589FF`, secundarios discretos, estados hover, focus-visible y disabled.
- Tarjetas `#141D2C`, bordes sutiles, radios orientativos de **12–20 px**.
- Header fijo/sticky, con superficie translúcida moderada cuando hay desplazamiento.
- Bento grids asimétricas para características, sin saturación visual.
- Halos azules y degradados suaves en hero/bloques destacados.
- Iconografía consistente (Lucide React propuesto).
- Espaciado coherente basado en una escala de 8 px; ancho de contenido orientativo **1200–1280 px**.
- Logotipo final oficial de TFL Client/TFLives: no crear una versión ficticia como identidad definitiva.
- Imágenes reales de launcher/Selection: los mockups son **referencias**, no capturas finales.

### 3.5 Animaciones [CONFIRMADO: equilibradas]

- Hover de tarjetas: leve elevación o cambio de borde.
- Botones: transiciones indicativas de **150–220 ms**.
- Secciones: aparición discreta al desplazarse.
- Hero: iluminación ambiental y profundidad, sin autoplay de vídeos pesados.
- Preferir CSS para microinteracciones; Motion para transiciones donde aporte valor.
- Respetar `prefers-reduced-motion`, rendimiento móvil y accesibilidad.
- No usar WebGL/canvas intensivo por defecto, neones excesivos, scroll bloqueado ni movimientos constantes.

### 3.6 Responsive y accesibilidad

La versión móvil debe **reorganizar** el contenido, no reducirlo a escala. Header compacto y accesible, captura del hero legible, CTA visible, tarjetas apiladas, sin overflow horizontal. Probar teclado, lector de pantalla, foco visible, contraste, zoom, tamaños táctiles y comportamiento con movimiento reducido.

## 4. Repositorio y trabajo local [CONFIRMADO]

**Repositorio:** https://github.com/TFLivesStudio/TFLClientWEB  
**Rama principal prevista:** `main`  
**Visibilidad:** pública.  
**Carpeta local del propietario:**

```text
C:\Users\Administrator\Desktop\TFL-Development\TFLClientWEB
```

El propietario clonó correctamente el repositorio con:

```powershell
cd "C:\Users\Administrator\Desktop\TFL-Development\TFLClientWEB"
git clone https://github.com/TFLivesStudio/TFLClientWEB.git .
git remote -v
git status
```

La clonación original estaba vacía y no tenía commits; este documento inicia la documentación remota. **Los cambios hechos mediante GitHub no se descargan solos a Windows**. Para sincronizarlos, con el árbol de trabajo local limpio:

```powershell
cd "C:\Users\Administrator\Desktop\TFL-Development\TFLClientWEB"
git status
git pull origin main
```

Si existen cambios locales, inspeccionar antes; no hacer reset/clean ni sobrescribir trabajo.

### Reglas para Codex y OpenCode Desktop

- Abrir **la misma carpeta raíz**, no crear `TFLClientWEB/TFLClientWEB`.
- Leer `AGENTS.md`, comprobar branch y `git status` al comenzar.
- Evitar que dos agentes escriban los mismos archivos simultáneamente.
- Usar ramas y commits enfocados cuando corresponda: `docs/`, `feat/`, `fix/`, `chore/`.
- No forzar push ni modificar configuraciones globales de Git/Windows innecesariamente.
- No mezclar trabajo de este sitio con cambios de los repositorios de launcher/mods.
- Reportar rutas, commit/PR y pruebas reales al terminar.
- **Fase actual:** documentar y definir; no crear proyecto Next.js sin autorización posterior explícita.

## 5. Stack y arquitectura de aplicación

### 5.1 Decisiones principales

- **Next.js** [CONFIRMADO], preferentemente App Router.
- **Vercel** [CONFIRMADO como plataforma objetivo].
- **React** como UI de Next.js.
- **No NestJS** en la primera versión. No es alternativa de interfaz; sería un backend independiente para necesidades futuras.
- **No base de datos** para el sitio editorial en la primera versión: contenido Git y consultas oficiales con caché.
- **No cuentas web ni OAuth Minecraft**. El inicio de sesión Microsoft pertenece al launcher.

### 5.2 Complementos recomendados [BASE PROPUESTA]

| Capacidad | Herramienta | Nota |
| --- | --- | --- |
| Código | TypeScript estricto | Evitar `any` injustificado |
| CSS | Tailwind CSS v4 + tokens CSS | Sistema visual propio |
| UI accesible | Radix UI cuando sea útil | No imponer apariencia de un kit |
| Animaciones | Motion for React + CSS | No sobreutilizar |
| Iconos | Lucide React | Peso y consistencia |
| Fuente | `next/font` con Manrope e Inter | Optimizar CLS |
| i18n | `next-intl` | Español e inglés propuestos |
| Edición | Pages CMS | Validar configuración Git y permisos |
| Validaciones | Zod | Datos externos y contenido |
| Unit tests | Vitest | Servicios/validaciones |
| E2E | Playwright | Navegación/funciones/responsive |
| Paquetes | pnpm | Lockfile reproducible |
| API interna | Next.js Route Handlers | Evitar backend NestJS prematuro |

Las versiones **no están fijadas**. Cuando se autorice el bootstrap, consultar documentación oficial, versiones estables compatibles de Next.js/React/Node/Vercel y fijar versiones en el lockfile. No escoger canary/beta por defecto.

### 5.3 Reglas arquitectónicas

- Server Components por defecto; Client Components solo para interacción real.
- Generación estática para inicio, características, comunidad y contenido editorial cuando sea posible.
- Caché/revalidación para datos de releases del launcher y catálogo Selection.
- Lógica externa aislada de la UI y ejecutada del lado del servidor cuando corresponda.
- No llamadas a GitHub en cada render del hero.
- Componentes reutilizables tipados y estilos mediante design tokens.
- Evitar sobreingeniería: no Redux/GraphQL/tRPC/Prisma/Redis/colas sin necesidad.
- No instalar paquetes porque resulten populares sin justificar su uso y mantenimiento.

## 6. Mapa del sitio y estructura pública

Áreas principales **confirmadas conceptualmente**:

| Página | Función |
| --- | --- |
| **Inicio** | Producto, hero, capturas, características, Selection, pasos, noticias, FAQ y comunidad |
| **Características** | Funciones reales del launcher y explicación clara de los productos asociados |
| **TFL Selection** | Página propia para versiones/targets oficialmente publicados |
| **Descargas** | Instaladores, sistemas, requisitos, versiones, notas de release |
| **Novedades** | Artículos editoriales y changelogs, sin mezclarlos |
| **Ayuda** | Buscador, guías, FAQ, solución de errores |
| **Comunidad** | TFLives, proyectos y enlaces verificados |

Subpáginas individuales para noticias y guías, además de privacidad, términos/avisos, licencias y 404. El contenido legal exacto está pendiente.

### URLs propuestas, no bloqueadas

```text
/es/
/en/
/es/caracteristicas
/es/selection
/es/descargas
/es/novedades
/es/novedades/[slug]
/es/ayuda
/es/ayuda/[slug]
/es/comunidad
/en/... (equivalentes localizados)
```

Los slugs ingleses, idioma del `/`, redirects, canonical y URLs definitivas **requieren decisión/validación adicional**. No hardcodear rutas definitivas solo por este ejemplo.

### Header global

Logo a la izquierda, enlaces de navegación, CTA descarga destacado; sticky y elegante; móvil con menú accesible. No poner enlaces rotos o páginas inexistentes.

### Footer global

Navegación, descarga, comunidad, ayuda, repos oficiales, políticas y licencias pertinentes; no inventar datos legales, sociales o estadísticas.

## 7. Inicio: orden y diseño [CONFIRMADO conceptualmente]

1. **Header:** logo, navegación, descarga.
2. **Hero:** **centrado y amplio**; H1 grande, subtítulo, CTA **Descargar TFL Client**, CTA **Explorar características**, gran **captura real del launcher debajo**, brillo/profundidad azul sutil.
3. **Conoce el launcher:** galería de capturas auténticas, gestión de instalaciones/versiones y experiencia de uso.
4. **Características:** bento grid visual, beneficios implementados y explicados sin exageraciones.
5. **TFL Selection:** bloque protagonista con imágenes reales, explicación y enlace a página propia.
6. **Cómo empezar:** descargar → iniciar sesión con Microsoft dentro del launcher → elegir instalación.
7. **Últimas novedades:** máximo ~3 noticias reales recientes y enlace al archivo.
8. **FAQ:** acordeones accesibles con dudas comunes.
9. **Comunidad + footer:** conexión TFLives y enlaces oficiales.

El ejemplo «Minecraft, a tu manera» es **copy conceptual, NO eslogan definitivo**. No crear contenido de relleno para hacer la landing más larga. Hero y visual móvil requieren prototipo y aprobación.

### Capturas

Usar siempre imágenes del launcher real y versiones del juego autorizadas. No presentar una simulación de UI, una imagen generada ni una captura de otro programa como producto funcional definitivo.

## 8. Páginas interiores: especificación detallada

### 8.1 Características

Hero interior conciso, sección de características organizadas visualmente, tarjetas bento y capturas donde ayuden. Diferenciar:
- Funcionalidad del **launcher**: instalaciones, versiones, actualización, gestión, etc.
- Funcionalidad de **TFL Selection**: experiencia/modpack curado.
- Funciones **dentro del juego**: TFL Core y mods.

No afirmar FPS específicos, compatibilidad universal o funcionalidades que aún estén en desarrollo.

### 8.2 Descargas

- Detectar OS de forma orientativa, **siempre** ofrecer selector manual Windows/macOS/Linux.
- Mostrar exclusivamente la última release **estable publicada y verificada** del launcher.
- Historial de versiones y changelogs reales.
- Mostrar versión, tamaño, fecha y requisitos solo si se obtienen y verifican.
- Estados claros cuando falte asset, una plataforma no esté soportada o GitHub esté caído.
- Descarga iniciada solo mediante acción del visitante.
- Esta página descarga el **launcher**, no distribuye un zip de Selection separado.

### 8.3 Novedades

Separar:
- **Noticias editoriales:** título, resumen, portada, categoría, fecha, slug, autor/equipo si es real, contenido.
- **Notas de versión:** obtenidas de GitHub Releases, distintas de noticias editoriales.

Lista, artículo destacado, tarjetas, filtros/categorías solo si son útiles, páginas individuales y metadata para compartir. No crear noticia automáticamente por cada commit o draft.

### 8.4 Ayuda

Centro de documentación accesible con búsqueda, categorías (instalación, cuentas, errores, configuración), FAQ y guías paso a paso. Explicar autenticación Microsoft del launcher sin pedir contraseñas en web. Enlace a soporte solo cuando se confirme el canal oficial.

### 8.5 Comunidad

Contexto de TFLives, proyectos relacionados, redes/enlaces oficiales y soporte. No duplicar innecesariamente la web general de TFLives ni colocar contadores ficticios.

### 8.6 TFL Selection [CONFIRMADO: página propia]

Presentar Selection como experiencia oficial vinculada al launcher. Mostrar versiones/targets **solo si están publicados**, con loader, Minecraft version, canal, descripción y compatibilidad verificables. Capturas y beneficios atribuidos correctamente. CTA principal dirigido a TFL Client; **no instalar directamente desde la web**. Selection es una distribución locked: mods definidos por TFLives, no una selección editable de mods individuales.

## 9. GitHub Releases: distribución del launcher

### Fuente oficial

https://github.com/TFLivesStudio/TFLClient

El README del launcher menciona instaladores con nombres como:

```text
TFLClient-Windows-Setup.exe
TFLClient-macOS.dmg
TFLClient-Linux.AppImage
```

Son **ejemplos de nombres referenciados**, no prueba de que todos estén disponibles ahora. Verificar releases/assets reales antes de mostrarlos.

### Reglas de integración

1. Obtener releases de fuente oficial, excluir drafts y prereleases del canal estable.
2. Validar respuesta, tags, assets, URL y campos con esquema estricto (por ejemplo Zod).
3. Mostrar versión/fecha/tamaño/OS solo si existen y son fiables.
4. Usar funciones de servidor/caché y revalidación definida, sin fetch por cada visita.
5. Respetar timeouts, límites de petición, retries y backoff.
6. No exponer tokens GitHub de servidor al navegador.
7. Si falla GitHub, mostrar snapshot último válido **marcado como desactualizado** o un mensaje honesto.
8. No inventar enlaces de descarga ni usar URL generada de un asset supuesto.
9. Permitir que una nueva release estable aparezca mediante consulta/cache sin editar manualmente la página.
10. No modificar releases del launcher en el proyecto web.

Implementar y probar antes de anunciar «descargas autoactualizadas» como función operativa.

## 10. TFL Selection: integración con catálogo firmado

### Autoridad y documentos obligatorios

Repositorio oficial: https://github.com/TFLivesStudio/TFLClientSelection

Leer antes de implementar:
- `docs/LAUNCHER_CONTRACT.md`
- `docs/AUTOMATIC_CATALOG_AND_UPDATES.md`
- `docs/RELEASE_PROCESS.md`
- `docs/SECURITY_AND_LICENSING.md`
- Esquemas reales del catálogo/manifiestos.

El contrato previsto establece **`catalog/current.json`** y firma separada **`catalog/current.json.sig`** con Ed25519; targets dinámicos, canales stable/beta/dev, generación monotónica y referencias inmutables a manifiestos y assets.

### Reglas obligatorias

- **Nunca** utilizar borradores, plantillas, documentación aspiracional o commits como si fueran releases públicas.
- Verificar la **firma Ed25519 sobre los bytes originales** del catálogo (sin reserializar JSON) con claves públicas previamente confiables.
- Validar esquema, identificadores, generación, canales, punteros y URLs antes de mostrar información.
- No incluir claves privadas de firma en la web o el repositorio.
- No hardcodear «1.8.9» o «26.3» como versiones siempre instalables; descubrir targets publicados.
- No usar `/releases/latest` para elegir Selection; no usar `.mrpack`, Modrinth ni búsquedas de packs comunitarios.
- No asumir que un asset upstream mutable representa una release firmada; Selection utiliza referencias precisas e integridad SHA-256.
- Si firma o esquema fallan, **fallar cerrado**, no anunciar versiones como verificadas.
- En caída de red, solo un snapshot firmado y validado puede mostrarse como cached/stale, si dicho caché se implementa correctamente.
- Mostrar restricciones de compatibilidad del launcher si el catálogo las declara.
- La web solo informa. **Instalación, actualización, reparación y rollback corresponden al launcher.**
- No ofrecer gestión libre de mods dentro de perfiles locked.
- Respetar licencias/procedencia de los assets. La web no debe espejar binarios sin autorización.

**Estado importante:** durante la planificación, documentación del repositorio de Selection describía el catálogo firmado/publicación e integración con launcher como **trabajo aún no completado**. Volver a inspeccionar el estado real antes de afirmar públicamente que una versión está disponible.

## 11. CMS visual Git-based

**Modelo elegido [CONFIRMADO]:** editor visual conectado a GitHub.  
**Candidato [BASE PROPUESTA]:** **Pages CMS**, con `.pages.yml`.

No construir `/admin` propio ni un sistema de usuarios desde cero inicialmente.

### Contenido administrable

- Noticias: título, slug, resumen, portada, categoría, fecha, estado, idioma, contenido, links relacionados.
- Guías: título, slug, categoría, orden, cuerpo, fecha de revisión, idioma.
- FAQ: pregunta, respuesta, categoría, orden, visible/publicada, idioma.
- Algunos textos e imágenes de páginas: campos controlados sin permitir alterar estructura de UI arbitrariamente.

### Flujo editorial propuesto

1. Editor autorizado accede mediante integración GitHub/CMS.
2. Edita contenido desde interfaz visual.
3. Guarda en repositorio/branch editorial según soporte real.
4. Se revisan contenido, imágenes, traducciones, links y seguridad.
5. Cambios aprobados llegan a `main`.
6. Vercel crea preview y publica la versión aprobada.

No prometer programación editorial, permisos muy granulares, borradores avanzados o revisiones dentro del propio CMS sin verificar que Pages CMS lo soporte o sin crear el flujo complementario.

Revisar permisos de GitHub App/OAuth; limitar al repositorio web y no otorgar acceso a toda TFLivesStudio si no se necesita. El repo es público, pero **escritura/publicación sigue siendo restringida**.

No confiar en Markdown/MDX como código seguro: sanitizar, impedir ejecución arbitraria, validar enlaces e imágenes y controlar colisiones de slugs.

## 12. Idiomas y traducciones [BASE PROPUESTA]

- Español como idioma principal.
- Inglés como idioma secundario desde lanzamiento.
- `next-intl` como herramienta recomendada.
- URLs localizadas propuestas (`/es/...` y `/en/...`).
- Selector de idioma visible; autodetección no debe anular la elección explícita.
- HTML `lang`, canonical, Open Graph, sitemap y `hreflang` por idioma.
- Textos UI en mensajes separados; contenidos editoriales traducibles y versionados.
- No generar automáticamente traducciones finales sin revisión.
- Evitar enlaces a traducciones inexistentes y layout roto por variaciones de longitud.

Los slugs traducidos y la redirección de `/` permanecen pendientes de diseño final.

## 13. Hosting y despliegue Vercel

### Configuración propuesta (NO aplicada)

| Campo | Propuesta |
| --- | --- |
| Project name | `tfl-client-web` |
| Repository | `TFLivesStudio/TFLClientWEB` |
| Framework Preset | Next.js |
| Root Directory | `./` |
| Package Manager | pnpm |
| Build | Predeterminado de Next.js o `pnpm build` |
| Output | Detección automática de Next.js |
| Production Branch | `main` |
| Preview | Pull requests y ramas |
| Domain | Pendiente |

Entornos: `Development` (local), `Preview` (revisión protegida), `Production` (sitio oficial aprobado). No divulgar secretos a PRs no confiables. No desplegar producción sin aprobación.

### Plan y coste: comprobar antes de activar

El repositorio web es **público**. Eso elimina el problema técnico específico de Git integration con repos privados de organizaciones en ciertos planes, pero **NO significa que Vercel Hobby admita automáticamente un uso comercial/organizacional**. Consultar los términos actuales y decidir si el proyecto califica o necesita Pro. **No** usar despliegues por CLI/CI como un método para evadir las condiciones del servicio.

Nunca comprar planes, registrar dominios ni crear recursos facturables sin autorización.

### Dominio [PENDIENTE]

Candidato recomendado: **`client.tflives.com`**. Alternativas discutidas: `launcher.tflives.com`, dominio independiente, URL temporal. No se ha aprobado ningún dominio de producción ni modificación DNS. No tocar VPS, panel o DNS existentes por iniciativa propia.

### Releases y preview

- GitHub Actions para pruebas y Vercel para preview/prod, una vez aprobada configuración.
- PR/preview antes de publicar cambios importantes.
- Comprobar build, rutas, QA y variables.
- Tener posibilidad documentada de rollback.
- No tratar un commit de documentación como permiso para publicar web.

## 14. Privacidad y seguridad

- **Nunca pedir login Microsoft/Minecraft desde la web**. Los usuarios inician sesión en TFL Client.
- No guardar credenciales de jugadores ni gestionar tokens Minecraft en la web.
- Secrets en gestor de Vercel/CI, server-only y mínimos; no `NEXT_PUBLIC_` para secretos.
- Validar datos externos y URLs; evitar redirecciones abiertas y `dangerouslySetInnerHTML` sin sanitización.
- Definir Content Security Policy, headers apropiados, límites de API, timeout y caché.
- No incluir analítica intrusiva, píxeles de seguimiento, cookies no esenciales o formularios de recopilación sin especificación y política.
- No subir secretos al repo, ni siquiera temporalmente: el historial público puede conservarlos.
- Revisar supply chain, dependencias y acciones CI; PR externo no obtiene credenciales.
- El código en repositorio público no concede por sí mismo licencia para reutilizar capturas, logos, marcas y assets. **Licencia final pendiente**.
- Avisos de privacidad, términos, Minecraft/Microsoft/Mojang y licencias basados en hechos y derechos reales, no texto legal inventado.

## 15. SEO, rendimiento y accesibilidad

### SEO

- Metadata individual, title/description/OG por página y por idioma.
- URL canónica, sitemap solo para publicaciones reales, `robots.txt`, `hreflang`, 404.
- Contenido semántico sin duplicar páginas de idiomas.
- Previews/staging excluidos de indexación, con protección adicional apropiada.
- Datos estructurados solo para contenido verificable.

### Rendimiento

Objetivos aspiracionales (NO mediciones actuales):

- Core Web Vitals saludables: LCP <= 2.5 s, INP <= 200 ms, CLS <= 0.1 bajo medición adecuada.
- Rendimiento móvil prioritario; verificar Lighthouse, no inventar puntuaciones.
- Optimizar imágenes (WebP/AVIF, responsive, lazy donde corresponda), preload solo de críticos.
- Evitar vídeos automáticos pesados, fondos de partículas, JavaScript masivo y dependencias excesivas.
- Fuentes optimizadas, SSR/SSG cuando corresponda, Server Components como base.
- Animaciones respetan `prefers-reduced-motion`.

### Accesibilidad

- Teclado completo, `focus-visible`, roles/landmarks/headers, colores con contraste adecuado.
- Menú móvil y acordeones accesibles.
- Touch targets razonables, zoom y tamaños de texto correctos.
- Errores y estados explicativos; no depender solo de color o hover.

## 16. Estados de error y calidad de la información

- Sin release del launcher: explicar la ausencia, no inventar descarga.
- OS no reconocido: permitir elección manual.
- GitHub caído: caché válido identificable o mensaje honesto, no falsa «lista vacía».
- Catálogo Selection no firmado o inválido: **no afirmar disponibilidad**.
- CMS vacío: diseños de estado vacío, no noticias ficticias.
- Imagen ausente: fallback con dimensiones reservadas.
- Ruta inválida: 404 útil.
- Acciones de botones reales, no elementos meramente decorativos.
- Sin datos fiables: no mostrar cifras, gráficos, reviews, «usuarios online» o testimonios.

## 17. Estructura de carpetas prevista (NO creada)

```text
TFLClientWEB/
├── .github/
│   └── workflows/
│       └── ci.yml
├── content/
│   ├── news/
│   │   ├── es/
│   │   └── en/
│   ├── docs/
│   │   ├── es/
│   │   └── en/
│   ├── faq/
│   └── pages/
├── public/
│   ├── images/
│   ├── uploads/
│   └── icons/
├── src/
│   ├── app/
│   │   ├── [locale]/
│   │   │   ├── layout.tsx
│   │   │   ├── page.tsx
│   │   │   ├── features/
│   │   │   ├── selection/
│   │   │   ├── downloads/
│   │   │   ├── news/
│   │   │   ├── help/
│   │   │   └── community/
│   │   ├── api/
│   │   │   ├── launcher/
│   │   │   └── selection/
│   │   ├── sitemap.ts
│   │   └── robots.ts
│   ├── components/
│   │   ├── ui/
│   │   ├── layout/
│   │   └── sections/
│   ├── config/
│   ├── i18n/
│   ├── lib/
│   │   ├── github/
│   │   ├── content/
│   │   └── selection/
│   └── styles/
├── tests/
│   ├── unit/
│   └── e2e/
├── docs/
│   └── architecture/
├── .pages.yml
├── AGENTS.md
├── next.config.ts
├── package.json
├── pnpm-lock.yaml
└── tsconfig.json
```

Es un esquema orientativo; ajustar a Next.js y `next-intl` reales y no generar carpetas vacías por inercia. No confundir rutas lógicas de navegación con nombres de carpetas obligatorios.

## 18. Estándares de calidad cuando se autorice implementar

### Código

- Typescript strict, componentes pequeños y tipados, límites claros entre UI/servicios.
- Hooks y Client Components donde realmente se usen.
- CSS/tokens centralizados; no hardcode de colores visuales.
- Formularios e interacciones que ejecutan acciones reales.
- Validaciones Zod para GitHub, CMS y datos de configuración.
- No duplicar lógica; no introducir abstracciones sin propósito.

### Pruebas

- Unitarias: validación de releases, mapeo OS/assets, manejo de errores, i18n, lógica de firmas/esquemas Selection.
- E2E: navegación, CTAs, hero, FAQ, documentación, noticias, idiomas, móvil y descargas.
- Seguridad: jamás aceptar catálogo Selection con firma inválida; URLs externas verificadas.
- Integración: fallbacks ante GitHub lento/caído, ningún draft visible, estados de caché.
- SEO: sitemap, metadata, canonical, noindex de previews.
- Accesibilidad y rendimiento: evaluar con herramientas y dispositivos reales.
- Tests reproducibles con fixtures/mocks; evitar depender de GitHub en vivo en todo CI.
- Pasar lint, typecheck, tests y build antes de proponer merge, cuando esos scripts existan.

### Git/CI

- Commits atómicos y mensajes claros.
- No subir `.next`, `node_modules`, `.vercel`, `.env`, build artifacts ni logs sensibles.
- Conservar `pnpm-lock.yaml` y usar instalaciones reproducibles.
- No permitir workflow de PR no confiable con secrets de publicación.
- Evitar deployments automáticos irreversibles sin controles.

## 19. Pruebas de aceptación del producto

| Área | Condición de aceptación |
| --- | --- |
| Identidad | Cinco colores exactos + Manrope/Inter + estilo híbrido aprobado |
| Hero | Centrado; CTA descarga y explorar; captura real destacada debajo |
| Responsive | Desktop/tablet/móvil sin overflow, menú usable |
| Descargas | Releases estables y assets verificados, selector OS, errores honestos |
| Actualización | Nueva release del launcher detectada con caché/revalidación sin editar UI |
| Selection | Solo versiones publicadas, firma válida y esquema verificado |
| CMS | Edición autorizada, guardado Git y publicación/revisión definida |
| Noticias | Separación editorial/changelog, fechas reales, drafts invisibles |
| Ayuda | Guías, búsqueda/FAQ funcional, sin pedir login Minecraft web |
| Idiomas | ES/EN cuando alcance final se confirme; rutas y metadata correctas |
| Accesibilidad | Foco, teclado, semántica y movimiento reducido |
| Seguridad | Secretos fuera de repo/cliente; validaciones y límites |
| SEO | Sitemap, canonical, OG, hreflang y previews no indexadas |
| Hosting | Build y preview comprobados; producción solo autorizada |

Estos son criterios **futuros**; ninguno equivale a implementación actual.

## 20. Roadmap oficial y orden de trabajo

### Fase 0 — Definición y documentación [ACTUAL]

- [x] Propósito y alcance B — web completa.
- [x] Estilo híbrido premium/gaming.
- [x] Paleta Azul Obsidiana, Manrope + Inter, animaciones equilibradas.
- [x] Hero B, centrado y amplio.
- [x] Orden conceptual de secciones del inicio.
- [x] Páginas interiores y Selection dedicada.
- [x] CMS visual Git-based.
- [x] Next.js + Vercel.
- [x] Repositorio web público, clonado localmente.
- [x] Especificación de agentes en `AGENTS.md`.
- [ ] Dominio definitivo.
- [ ] Elegibilidad/plan de Vercel según términos reales.
- [ ] Confirmar Pages CMS y su flujo preciso de permisos/revisión.
- [ ] Cerrar i18n, slugs y contenido traducido.
- [ ] Recopilar logo y capturas oficiales.
- [ ] Verificar función por función el launcher y la publicación real de Selection.
- [ ] Copy final de páginas, legales, privacidad y canales de soporte.

### Fase 1 — Diseño detallado [PENDIENTE]

- [ ] Wireframes desktop/móvil.
- [ ] Prototipos visuales del hero y páginas interiores.
- [ ] Estados loading/error/empty y transiciones.
- [ ] Sistema de componentes y diseño revisado.
- [ ] Aprobación expresa del propietario.

### Fase 2 — Bootstrap [NO AUTORIZADO]

- [ ] Inicializar Next.js, TypeScript, pnpm y Tailwind.
- [ ] Implementar tokens, fonts, rutas base, i18n.
- [ ] Añadir tests, lint, CI y previews cuando proceda.

### Fase 3 — Implementación [NO AUTORIZADA]

- [ ] Construir Home, interiores, responsive, CMS.
- [ ] Integrar Releases del launcher.
- [ ] Verificar e integrar catálogo Selection.
- [ ] Añadir contenido real, traducciones y documentación.

### Fase 4 — QA y lanzamiento [NO AUTORIZADO]

- [ ] Seguridad, accesibilidad, performance, SEO.
- [ ] Revisar licencias, legal, soporte y enlaces externos.
- [ ] Configurar Vercel, DNS/dominio, monitoreo y recuperación.
- [ ] Despliegue aprobado y verificación end-to-end.

**Prohibido saltar etapas solo porque el proyecto tenga una especificación extensa.**

## 21. Qué queda fuera de la primera versión

- NestJS / backend propio independiente.
- Base de datos personalizada y panel admin custom.
- Cuentas web TFLives y login Minecraft/Microsoft web.
- Tienda, pagos o suscripciones.
- Estadísticas ficticias de jugadores/descargas.
- Instalación independiente de TFL Selection desde la web.
- Edición libre del conjunto locked de mods.
- Analítica invasiva, anuncios externos o trackers por defecto.
- Sistema de comentarios/foro si no se pide expresamente.
- Temas, animaciones o tecnologías no aprobados.
- Planes de pago/hosting comprados sin consentimiento.
- Producción desplegada antes de QA/autorización.

Estas funciones podrían reevaluarse en el futuro, pero no justifican complejidad inicial.

## 22. Cómo informar resultados y mantener decisiones

Antes de trabajar:
1. Leer tarea e instrucciones, inspeccionar git status/branch/archivos.
2. Confirmar alcance, fuentes y riesgos.
3. No hacer preguntas repetidas cuando la decisión ya consta en este documento.

Al finalizar:
1. Indicar archivos cambiados y propósito.
2. Dar commit SHA, rama y PR/URL si los hay.
3. Describir pruebas realmente ejecutadas (o explicar por qué no hubo pruebas).
4. Separar **propuesta**, **prototipo**, **implementación** y **producción verificada**.
5. Precisar qué queda pendiente y si el propietario debe actuar.

Cuando se tome una nueva decisión, actualizar este documento y los documentos específicos correspondientes. No borrar una decisión anterior sin explicar su sustitución.

## 23. Fuentes técnicas de referencia

### Repositorios TFLives

- https://github.com/TFLivesStudio/TFLClientWEB
- https://github.com/TFLivesStudio/TFLClient
- https://github.com/TFLivesStudio/TFLClientSelection
- https://github.com/TFLivesStudio/TFLClientMOD

### Documentación oficial

- Next.js: https://nextjs.org/docs
- React: https://react.dev
- TypeScript: https://www.typescriptlang.org/docs
- Vercel: https://vercel.com/docs
- Tailwind: https://tailwindcss.com/docs
- Radix: https://www.radix-ui.com
- Motion: https://motion.dev
- Lucide: https://lucide.dev
- next-intl: https://next-intl.dev
- Pages CMS: https://pagescms.org
- GitHub REST Releases: https://docs.github.com/en/rest/releases
- GitHub Actions: https://docs.github.com/en/actions
- Vitest: https://vitest.dev
- Playwright: https://playwright.dev

Los repos y docs cambian. Revisar contratos, licencias, versiones y estados **actuales** antes de afirmar que una funcionalidad está lista.

## 24. Historial de este documento

**2026-11-09 — Inicial:** consolidación de visión, decisiones, identidad, páginas, arquitectura Next.js/Vercel, CMS, fuentes oficiales del launcher y Selection, seguridad, desarrollo local con agentes, pruebas, estado y roadmap. Este commit debe contener **solo documentación**.

---

**Resumen para agentes:** TFL Client Web es un sitio oficial completo, público y premium, diseñado en Azul Obsidiana con Manrope + Inter, animaciones equilibradas y hero centrado. Se construirá con Next.js y se alojará en Vercel; tendrá contenido administrable por CMS visual Git-based, integración segura con GitHub Releases y presentación de TFL Selection solo desde publicaciones verificadas y firmadas. **Ahora mismo no se autoriza programar: continuar definición y diseño hasta instrucción expresa del propietario.**
