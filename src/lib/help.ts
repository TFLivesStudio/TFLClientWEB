export const articles = [
  {
    slug: "glosario",
    category: "Primeros pasos",
    title: "Nombres y términos de TFL",
    summary:
      "Aprende la diferencia entre el launcher TFL Client, la biblioteca TFL Selection y el cliente TFLClient.",
    sections: [
      [
        "TFL Client",
        "Es el launcher de TFLives. Desde esta aplicación instalas, actualizas, organizas y abres tus instancias de Minecraft. Su nombre lleva un espacio entre TFL y Client.",
      ],
      [
        "TFL Selection",
        "Es la biblioteca donde TFLives publica sus propios clientes modificados de Minecraft. La abres desde el launcher para elegir qué cliente y versión instalar. Es el nombre de la biblioteca, no de un cliente ni de un modpack.",
      ],
      [
        "TFLClient",
        "Es el cliente modificado de Minecraft de TFLives, disponible en TFL Selection. Es la experiencia que utilizas dentro del juego. Su nombre se escribe junto, sin espacio.",
      ],
      [
        "TFL Core",
        "Impulsa las funciones de TFLClient dentro del juego. El cliente se llama TFLClient; TFL Core identifica el componente que proporciona esas funciones.",
      ],
      [
        "Launcher",
        "Aplicación que prepara los archivos y abre Minecraft. TFL Client es nuestro launcher; TFLClient es el cliente que puedes instalar con él.",
      ],
      [
        "Instancia",
        "Instalación de Minecraft con sus propios archivos, ajustes y mundos. Puedes tener varias instancias para separar versiones y formas de jugar.",
      ],
      [
        "Biblioteca",
        "Colección desde la que eliges contenido. TFL Selection es la biblioteca de clientes publicados por TFLives; la Biblioteca del launcher organiza las instancias que ya tienes.",
      ],
      [
        "Modpack",
        "Conjunto de mods y configuración distribuido como un paquete. TFL Selection no es el nombre de un modpack: es la biblioteca donde encuentras nuestros clientes modificados.",
      ],
      [
        "Módulo",
        "Función de TFLClient que puedes configurar o activar dentro del juego. Los módulos disponibles dependen de la versión del cliente.",
      ],
      [
        "HUD",
        "Información que aparece sobre la partida, como FPS, coordenadas o el estado de la armadura. Los módulos de HUD permiten personalizar esa información cuando están disponibles.",
      ],
      [
        "Canal de publicación",
        "Indica el tipo de versión: estable para uso habitual, beta para pruebas y desarrollo para trabajo en curso. El launcher y el cliente tienen versiones y canales independientes.",
      ],
      [
        "MCP",
        "Integración opcional del launcher con asistentes locales compatibles. Permite autorizar ciertas consultas y acciones desde el asistente; los permisos se controlan en TFL Client.",
      ],
    ],
  },
  {
    slug: "instalar",
    category: "Primeros pasos",
    title: "Descargar e instalar TFL Client",
    summary: "Sistema operativo, arquitectura y canal de publicación.",
    sections: [
      [
        "Antes de descargar",
        "Consulta Descargas y selecciona Windows, macOS o Linux. El canal estable es el recomendado. Si vas a probar una beta, lee sus notas y conserva una copia de tus instalaciones.",
      ],
      [
        "Elegir el archivo",
        "La página muestra los nombres y tamaños publicados en GitHub. En Windows se ofrecen instaladores EXE o MSI si la release los incluye; macOS usa DMG o PKG, y Linux puede ofrecer AppImage, DEB o RPM. Elige ARM64 o x64 solo cuando corresponda con tu equipo.",
      ],
      [
        "Instalación",
        "Abre el instalador publicado para tu sistema y sigue sus instrucciones. En Linux el formato debe corresponder a tu distribución. Si el sistema bloquea el archivo, comprueba su origen y las notas oficiales antes de cambiar configuraciones de seguridad.",
      ],
    ],
  },
  {
    slug: "cuenta-microsoft",
    category: "Primeros pasos",
    title: "Iniciar sesión con Microsoft",
    summary: "La cuenta se añade dentro del launcher, no en la web.",
    sections: [
      [
        "Cuenta y acceso al juego",
        "Usa una cuenta Microsoft con acceso a Minecraft Java Edition. Abre el flujo de inicio de sesión desde TFL Client y completa la autorización en Microsoft. Esta web no solicita contraseñas ni tokens.",
      ],
      [
        "Después de autorizar",
        "Regresa al launcher y comprueba que aparece tu perfil. Una actualización del sistema de autenticación puede requerir autorizar la cuenta otra vez; consulta las notas de la versión que instalaste.",
      ],
      [
        "Si falla",
        "Anota la versión del launcher y el mensaje de error. Comprueba primero las incidencias abiertas. No publiques códigos de inicio de sesión, tokens, cookies ni capturas con información de cuenta.",
      ],
    ],
  },
  {
    slug: "instalaciones",
    category: "Instalaciones",
    title: "Crear y organizar instalaciones",
    summary: "Separar versiones, contenido y ajustes.",
    sections: [
      [
        "Crear una instalación",
        "En el launcher utiliza Crear instancia. Elige las opciones de Minecraft y del loader que ofrece el asistente y revisa la configuración antes de iniciar. No todas las combinaciones de versión, loader y mods son compatibles.",
      ],
      [
        "Separar proyectos",
        "Cada instalación tiene su propio contenido y ajustes. Usa instalaciones distintas para jugar con combinaciones diferentes de mods o versiones, en vez de intercambiar archivos dentro de un mismo perfil.",
      ],
      [
        "Java y memoria",
        "El launcher incluye gestión de Java y configuración por instancia. Los requisitos del juego dependen de la versión y el contenido instalado. No hay una cantidad de memoria universal que garantice rendimiento en todos los equipos.",
      ],
    ],
  },
  {
    slug: "selection",
    category: "Instalaciones",
    title: "Instalar TFLClient desde TFL Selection",
    summary:
      "Distinguir el cliente, la biblioteca y el launcher para instalar la versión correcta.",
    sections: [
      [
        "Qué es TFL Selection",
        "TFL Selection es la biblioteca de clientes modificados de TFLives. El cliente se llama TFLClient y se instala desde TFL Client, el launcher. La biblioteca no es el nombre de un modpack ni de un cliente.",
      ],
      [
        "Instalación",
        "Abre el launcher TFL Client y entra en TFL Selection. Elige una versión de TFLClient, revisa su descripción y confirma la instalación. Después abre la instancia instalada para jugar.",
      ],
      [
        "Si no aparece una versión",
        "Comprueba que usas un launcher actualizado. No todos los clientes o versiones están disponibles a la vez. Consulta TFL Selection dentro de la aplicación o pregunta al equipo en Discord.",
      ],
    ],
  },
  {
    slug: "canales",
    category: "Versiones",
    title: "Diferencias entre estable y beta",
    summary:
      "Elegir el canal del launcher y distinguirlo del canal del cliente.",
    sections: [
      [
        "Estable",
        "Es la publicación recomendada en Descargas. La última beta no reemplaza automáticamente a la estable. Cada actualización conserva su tag original y sus notas.",
      ],
      [
        "Beta y otras pruebas",
        "Las versiones beta, alpha, rc o preview pueden incluir cambios pendientes de validación. La web las agrupa como pruebas y mantiene visible el tag para distinguirlas. Lee los problemas conocidos antes de actualizar.",
      ],
      [
        "Dos canales diferentes",
        "TFL Client tiene su propio canal de actualización como launcher. Las versiones de TFLClient publicadas en la biblioteca TFL Selection tienen sus propios canales. Instalar una beta del launcher no cambia por sí solo la versión del cliente.",
      ],
    ],
  },
  {
    slug: "mods-recursos",
    category: "Instalaciones",
    title: "Gestionar mods, shaders y recursos",
    summary: "Contenido por instalación y límites de los clientes oficiales.",
    sections: [
      [
        "Instalaciones normales",
        "Abre la instalación y su pestaña de contenido. El launcher tiene espacios para mods, shaders y paquetes de recursos. El contenido instalado debe coincidir con la versión de Minecraft y el loader.",
      ],
      [
        "Evitar conflictos",
        "Antes de añadir contenido, lee sus dependencias y compatibilidad. Si un fallo aparece tras un cambio, conserva el log y registra qué archivos cambiaste. No todos los errores se resuelven aumentando memoria.",
      ],
      [
        "TFLClient",
        "TFLives gestiona los mods de TFLClient distribuido en TFL Selection. Para experimentar con otros mods, utiliza una instalación normal separada.",
      ],
    ],
  },
  {
    slug: "reportar",
    category: "Solución de problemas",
    title: "Logs e incidencias sin exponer datos",
    summary: "Información útil para reproducir un error.",
    sections: [
      [
        "Qué incluir",
        "Indica la versión exacta de TFL Client, sistema operativo, arquitectura, versión de Minecraft y loader. Describe los pasos, el resultado esperado y lo que ocurrió. Comprueba si existe una incidencia equivalente antes de abrir otra.",
      ],
      [
        "Obtener información",
        "El launcher ofrece consola, logs de instancia y herramientas de diagnóstico. Conserva el registro relacionado con el fallo; el log de una partida anterior puede no explicar el error actual. No necesitas publicar toda tu carpeta de usuario.",
      ],
      [
        "Revisar antes de compartir",
        "Elimina tokens, correos, códigos de autorización, direcciones privadas y datos personales. Las incidencias de GitHub son públicas. Adjunta solo el fragmento necesario y evita enlaces de descarga con credenciales.",
      ],
    ],
  },
  {
    slug: "compatibilidad",
    category: "Solución de problemas",
    title: "Requisitos y compatibilidad",
    summary: "Distinguir requisitos del launcher, Minecraft y TFLClient.",
    sections: [
      [
        "Plataformas",
        "La disponibilidad para Windows, macOS y Linux se obtiene de los archivos de cada release. Si un instalador no está publicado para tu plataforma, no se genera un enlace supuesto.",
      ],
      [
        "Minecraft y TFLClient",
        "Los requisitos de TFLClient dependen de la versión de Minecraft y del contenido incluido. Revisa sus indicaciones en la biblioteca TFL Selection del launcher TFL Client.",
      ],
      [
        "Limitaciones conocidas",
        "El README del launcher señala problemas de vista previa 3D de skin y capa en macOS. Consulta las notas de la versión que uses antes de instalar o reportar un problema.",
      ],
    ],
  },
  {
    slug: "mcp",
    category: "Integraciones",
    title: "Conectar un asistente local mediante MCP",
    summary: "Habilitación, permisos y control de sesiones desde el launcher.",
    sections: [
      [
        "Preparar la conexión",
        "Instala una versión de TFL Client que incluya el auxiliar MCP. Abre Ajustes → Integraciones y activa MCP. El launcher debe permanecer abierto; una aplicación en la nube no puede acceder directamente a esta conexión local.",
      ],
      [
        "Configurar el asistente",
        "Elige el cliente local en Integraciones y copia la configuración que muestra el launcher. Utiliza la ruta real de tu instalación. Las configuraciones de Codex, Claude Code y OpenCode dependen de la versión de cada cliente; no se presenta una certificación universal.",
      ],
      [
        "Aprobar y limitar permisos",
        "Inicia la conexión desde tu asistente y aprueba la nueva sesión en TFL Client. Empieza con lectura y limita las instalaciones que puede consultar. Para operaciones adicionales, revisa los permisos; las acciones críticas requieren una confirmación local específica.",
      ],
      [
        "Revocar una sesión",
        "Revoca el cliente o desactiva MCP desde Integraciones cuando termines. El registro local permite consultar decisiones. Una reconexión puede requerir una nueva aprobación; no compartas tokens, rutas privadas ni registros innecesarios con asistentes.",
      ],
    ],
  },
];
