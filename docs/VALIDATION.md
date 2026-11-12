# Validación

Las pruebas unitarias validan releases estables, rechazo de borradores/prereleases, URLs ajenas, plataformas, tamaños inválidos y errores de red. Las pruebas Playwright ejercitan rutas, descarga por plataforma, FAQ, galería, diálogo, teclado, navegación móvil, ausencia de desbordamiento y animación visible incluso cuando el sistema solicita reducir movimiento.

Las capturas del launcher son vistas del frontend con un puente nativo de prueba, no pruebas de la aplicación de escritorio. No se ha ejecutado Minecraft ni capturado TFL Core en partida.

En la sesión original la API GitHub devolvía CONNECT 403. En la revisión del 12 de noviembre de 2026 la consulta a releases/latest respondió HTTP 200. Los casos de error y de éxito del adaptador se prueban además con fixtures. No se ha ejecutado ningún instalador.

Resultados en esta instancia: build de producción, ESLint, TypeScript y 4 pruebas unitarias correctos. Playwright final sobre un servidor de producción reiniciado: 5/5 pruebas correctas, incluida la prueba para equipos sin WebGL. Revisión visual manual mediante capturas a 1440 px y 390 px, sin desbordamiento horizontal. No se afirma puntuación Lighthouse ni validación con lector de pantalla.

Compatibilidad gráfica: verificadas animación Canvas 2D sin WebGL, alternativa en dispositivos con solo WebGL1 y conservación del fondo estático con movimiento reducido. Se prueba pérdida de contexto WebGL tras montar el componente. El informe Thorium/Radeon R7 del propietario muestra aceleración gráfica activa; no establece por sí solo la causa del fallo en la página. La comprobación final en ese PC sigue pendiente.
