# Refinamiento de producto · noviembre 2026

Objetivo: aplicar los hallazgos verificados de la auditoría suministrada, conservando identidad, contenido, fuentes oficiales y capacidades. El documento adjunto se usa como evidencia y criterio de diseño, no como instrucciones operativas.

Se compararon tres enfoques: parches aislados (poco impacto editorial), reconstrucción completa (riesgo innecesario para una base consistente), y refinamiento del recorrido con componentes existentes. Se elige el tercero.

Tipo: gaming/software. Público: jugadores de Minecraft Java. Acción principal: descargar TFL Client.

Sistema: Slate, azul TFL, Manrope/Inter, tokens actuales, bordes discretos y superficies existentes. Mantener hero de pantalla completa, Pattern Waves, transición circular y carrusel de seis segundos con reducción explícita.

Recorrido de inicio: marca → capturas (inicio, instancia, apariencia, consola) → instalaciones y personalización → relación launcher/biblioteca/cliente → primeros pasos y estable → núcleo nativo/MCP → memoria y procedencia del archivo → FAQ → descarga/ayuda.

Composición: producto primero; detalles técnicos en una composición lateral compacta con ampliación disponible. Comparativa de memoria junto a sus límites, sin transformar observaciones en promesas. Selection presenta un recorrido numerado y Descargas agrupa por formato conservando cada archivo y arquitectura publicada. Ayuda prioriza búsqueda; Características muestra el producto junto a su introducción.

Aceptación: extractos sin Markdown literal ni palabras cortadas; botones legibles a 320 px; controles táctiles de aproximadamente 44 px; capturas originales en ambos temas, con tamaños responsivos y URLs versionadas; sin pérdidas al ampliar o cambiar tema. Mantener ES/EN, notas completas, fuentes y todos los archivos.

Validación: build normal, TypeScript, ESLint, unitarias, Playwright, axe y capturas de escritorio/móvil en ambos temas. Integrar en main mediante Git, esperar Vercel READY para el mismo commit y revisar producción. Perfilado especulativo del shader y fallback circular queda separado de cambios que puedan demostrarse sin alterar el efecto.
