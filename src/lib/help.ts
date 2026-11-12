export const articles = [
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
    title: "Instalar TFL Selection",
    summary: "Clientes oficiales disponibles en el launcher.",
    sections: [
      [
        "Qué es Selection",
        "TFL Selection reúne los clientes oficiales preparados por TFLives. Cada propuesta incluye mods y ajustes elegidos por el equipo. Para gestionar tu propio conjunto de mods, utiliza una instalación normal.",
      ],
      [
        "Instalación",
        "Abre TFL Selection en el launcher, elige un cliente publicado, lee su descripción y confirma la instalación. Espera a que termine y ábrelo desde la biblioteca.",
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
      "Elegir el canal del launcher y distinguirlo del canal de Selection.",
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
        "El canal de actualización de TFL Client corresponde al launcher. El canal de TFL Selection corresponde a su distribución de mods. Usar un launcher beta no significa que todos los targets de Selection estén publicados.",
      ],
    ],
  },
  {
    slug: "mods-recursos",
    category: "Instalaciones",
    title: "Gestionar mods, shaders y recursos",
    summary: "Contenido por instalación y límites de Selection.",
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
        "Selection",
        "La composición de mods de una instalación Selection la gestiona TFLives. Para experimentar con otros mods, utiliza una instalación normal separada.",
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
    summary: "Distinguir requisitos del launcher, Minecraft y Selection.",
    sections: [
      [
        "Plataformas",
        "La disponibilidad para Windows, macOS y Linux se obtiene de los archivos de cada release. Si un instalador no está publicado para tu plataforma, no se genera un enlace supuesto.",
      ],
      [
        "Minecraft y Selection",
        "Los requisitos cambian según la versión de Minecraft o el cliente. Lee las indicaciones que muestra TFL Client antes de instalar un cliente de Selection.",
      ],
      [
        "Limitaciones conocidas",
        "El README del launcher señala problemas de vista previa 3D de skin y capa en macOS. Consulta las notas de la versión que uses antes de instalar o reportar un problema.",
      ],
    ],
  },
];
