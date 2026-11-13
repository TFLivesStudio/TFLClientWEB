# Auditoría de contenido del launcher y Selection

13 de noviembre de 2026. Fuentes locales obtenidas de los repositorios oficiales; las referencias internas de este documento no se muestran en la interfaz pública.

## Versiones revisadas

- Launcher: `TFLClient`, `4590afe229067265dc9cc20c94a2fa8459536a1f`. Revalidado contra el archivo actual de main: el comentario del archivo tar confirma esa revisión.
- Core: `TFLClientMOD`, candidata `feat/tfl-visual-overhaul`, `4aced6a36b89aa90096028b38cd3f7a807a5370f`. `distribution/modules.json` contiene **82** entradas únicas. Contraste con los constructores del registro común y sus módulos auxiliares.
- La rama main de Core (`caadad2c…`) contiene una alpha anterior con cuatro módulos y 19 widgets: no representa el menú de más de 70 módulos que usa el propietario. Los documentos de auditoría históricos que dicen 80 tampoco sustituyen el inventario actual de 82.

## Funciones y límites públicos

| Área                | Evidencia y decisión de contenido                                                                                                                                                                                                                                                                                                                                                                       |
| ------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Rust                | `src-tauri/Cargo.toml`, servicios de instalaciones/Java/procesos y bibliotecas Rust. La interfaz es Svelte. Se anuncia núcleo nativo Rust; no «todo escrito desde cero» ni una garantía universal de consumo/FPS.                                                                                                                                                                                       |
| MCP                 | `docs/mcp/CLIENTS.md`, `SECURITY.md`, interfaz IntegrationsSettings, servicios y catálogo de herramientas. Local, habilitación opcional, auxiliar incluido, launcher abierto, aprobaciones por sesión, permisos/alcance y confirmación de acciones críticas. Configuraciones de clientes no equivalen a certificación de todos sus modelos/versiones. No hay integración remota con ChatGPT en la nube. |
| Capturas MCP        | Frontend oficial con puente Tauri simulado, sin cuenta ni asistentes conectados. Estado habilitado de demostración; no se ejecutaron operaciones MCP reales. Archivos propios dark/light, sin recolorear.                                                                                                                                                                                               |
| Módulos             | Nombres y descripciones de usuario basados en inventario y constructores. La web no muestra clases, rutas, repositorios, dependencias, firmas o arquitectura de Selection. Los estados del catálogo no certifican 82 funciones completas en partida.                                                                                                                                                    |
| Servicios inactivos | `trsOnline` tiene disponibilidad falsa; la capa de producto no habilita servicios online. `social` depende de esos servicios y `clips` de la integración heredada no habilitada. La web marca estas entradas como no disponibles; no promete chat remoto o grabación a través de ese módulo.                                                                                                            |
| Condicionales       | Optimizaciones integradas dependen de las dependencias presentes; Halloween depende de su condición de disponibilidad. La web distingue esas entradas.                                                                                                                                                                                                                                                  |
| PvP                 | Reach y hitboxes son indicadores visuales: no se describe aumento de alcance ni tamaño real. Los usuarios deben revisar las reglas de los servidores.                                                                                                                                                                                                                                                   |

## Tratamiento de datos constatado

- `PathManager`: `.tflclient` bajo el usuario o raíz portable/de prueba, con instalaciones, recursos compartidos, ajustes, temas y skins.
- `activity_log.rs`: hasta 20 sesiones de al menos 30 segundos. No se presenta como telemetría remitida a un servidor.
- `MinecraftUser`: nombre, UUID y tipo de cuenta; tokens excluidos de la configuración serializada. `SecureStorage`: archivos separados AES-GCM en `claunch-rs/secrets`, con clave derivada en la biblioteca, **no llavero del sistema**. No afirmar protección frente a otro software con acceso al usuario. Quitar una cuenta invoca `delete_tokens`.
- Autenticación: Microsoft, Xbox/Minecraft y proveedores Yggdrasil configurados por el usuario. No se solicitan contraseñas de Microsoft en la web.
- Red: GitHub y CDN, Microsoft/Mojang, Modrinth, proveedores de loaders, Azul/Adoptium para Java, Paper/Purpur para servidores. Herramientas de servidor pueden consultar ipify y vincular playit.gg. No se promete una ubicación geográfica única de procesamiento.
- MCP: datos permitidos al asistente, sesiones revocables y auditoría local acotada. La política del proveedor del asistente también cuenta; la redacción de logs no garantiza eliminar todo dato sensible.
- Se buscó analítica/telemetría y envío de diagnósticos en el código revisado, sin identificar un SDK o envío automático de errores a TFLives. Esto no certifica el comportamiento de mods u otros proveedores. Existe una preferencia `discord_presence`, pero no se inventa un flujo activo de envío solo por existir ese campo.
- Web: preferencias locales `tfl-theme` y `tfl-motion`; alojamiento Vercel y solicitudes técnicas del proveedor. Sin nuevas cuentas, formularios o analítica en esta actualización.

## Legal

El titular proporcionó **TFLives**, **contact@tflives.com** y **tflives@outlook.com** y aclaró que es una comunidad de Discord, todavía no una LLC. No proporcionó país, domicilio, persona jurídica o registro; no se inventan. Los documentos describen la comunidad actual y preservan derechos imperativos y licencias, sin imponer una jurisdicción ajena copiada de LabyMod.

Launcher: licencia GPL-3.0 en el repositorio. Algunas dependencias, como launchwerk, conservan AGPL-3.0-or-later. Los términos no prohíben estudiar/modificar/redistribuir cuando la licencia lo permite. Estos documentos no certifican cumplimiento de una jurisdicción no identificada; la identificación legal deberá revisarse si una futura entidad asume la operación.

## VirusTotal

Archivo indicado por el titular: `ba6f60217974abd5822c0c350c4da5521d8ef7ec309047d9f2cb7a6e8e44de9a`. La página GUI devolvió 403 desde el entorno; no hay API key configurada. El titular eligió explícitamente **mostrar el informe sin puntuación por ahora**.

La web enlaza el informe exacto y muestra su SHA-256; no inventa 0/71 ni declara detecciones como falsos positivos. La integración opcional lee el informe existente mediante la API oficial y una clave privada del servidor, revalida cada hora, comprueba hash/fecha/estadísticas y conserva detecciones. No sube archivos ni solicita rescans. Se prueba con fixtures, incluida una detección entre 71 resultados; un resultado sin detecciones tampoco se presenta como garantía de ausencia de malware.
