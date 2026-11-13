const t = (es: string, en: string) => ({ es, en });
export const legalContact = "contact@tflives.com";
export const communityContact = "tflives@outlook.com";
export const legalUpdated = "2026-11-13";
export const legalDocuments = {
  notice: {
    title: t("Aviso legal", "Legal notice"),
    description: t(
      "Identificación de TFLives y del proyecto TFL Client.",
      "Information about TFLives and the TFL Client project.",
    ),
    sections: [
      {
        id: "proyecto",
        title: t(
          "El proyecto y su responsable",
          "The project and its operator",
        ),
        paragraphs: [
          t(
            "TFLives es una comunidad de Discord que desarrolla y distribuye TFL Client, un launcher de Minecraft Java. TFLives se identifica aquí como comunidad: no se presenta como una sociedad constituida ni como TFLives LLC.",
            "TFLives is a Discord community developing and distributing TFL Client, a Minecraft Java launcher. TFLives is identified here as a community, not as an incorporated company or TFLives LLC.",
          ),
          t(
            "La posible constitución de una empresa en el futuro no cambia la identidad actual del proyecto. Si se constituye una entidad y asume la operación, se actualizarán su identificación, los datos de contacto y estos documentos.",
            "A possible future incorporation does not change the project’s current identity. If a legal entity is formed and takes over operations, its identity, contact details and these documents will be updated.",
          ),
        ],
      },
      {
        id: "contacto",
        title: t("Contacto", "Contact"),
        paragraphs: [
          t(
            "Para cuestiones legales y de privacidad: contact@tflives.com. Contacto adicional de la comunidad: tflives@outlook.com. El soporte comunitario también está disponible en discord.gg/tflives. No envíes contraseñas, tokens de sesión ni documentos personales a canales públicos.",
            "For legal and privacy matters: contact@tflives.com. Additional community contact: tflives@outlook.com. Community support is also available at discord.gg/tflives. Do not send passwords, session tokens or personal documents to public channels.",
          ),
        ],
      },
      {
        id: "alcance",
        title: t("Qué ofrece TFL Client", "What TFL Client provides"),
        paragraphs: [
          t(
            "El launcher organiza instalaciones, versiones, contenido y configuraciones locales de Minecraft. Algunas funciones requieren servicios de terceros, una cuenta válida o archivos compatibles. La web informa del proyecto, presenta sus funciones y enlaza a los instaladores publicados.",
            "The launcher organizes local Minecraft installations, versions, content and settings. Some features require third-party services, a valid account or compatible files. The website describes the project and its features and links to published installers.",
          ),
        ],
      },
      {
        id: "licencias",
        title: t("Código abierto y recursos", "Open-source code and assets"),
        paragraphs: [
          t(
            "El repositorio del launcher contiene una licencia GPL-3.0. Las bibliotecas y recursos conservan sus propias licencias; algunas dependencias utilizan AGPL-3.0-or-later. La licencia incluida con cada componente determina los derechos de uso, modificación y distribución de ese componente. Estos textos no sustituyen ni reducen esos derechos.",
            "The launcher repository includes a GPL-3.0 license. Libraries and assets retain their own licenses; some dependencies use AGPL-3.0-or-later. Each component’s included license governs its use, modification and distribution. These documents do not replace or reduce those rights.",
          ),
          t(
            "Las marcas, capturas, tipografías y otros recursos pueden tener condiciones distintas de las del código. Conserva sus avisos de autoría y comprueba las licencias que acompañan a la versión que distribuyas.",
            "Trademarks, screenshots, fonts and other assets may have different terms from the code. Preserve their attribution notices and check the licenses included with any version you distribute.",
          ),
        ],
      },
      {
        id: "minecraft",
        title: t("Relación con Minecraft", "Relationship with Minecraft"),
        paragraphs: [
          t(
            "TFL Client no es un producto oficial de Minecraft y no está aprobado por ni asociado con Mojang o Microsoft. Minecraft y sus marcas pertenecen a sus titulares. Usar el launcher no concede una licencia de Minecraft ni derechos sobre contenido de terceros.",
            "TFL Client is not an official Minecraft product and is not approved by or affiliated with Mojang or Microsoft. Minecraft and its trademarks belong to their respective owners. Using the launcher does not grant a Minecraft license or rights to third-party content.",
          ),
        ],
      },
      {
        id: "informacion",
        title: t(
          "Información de versiones y seguridad",
          "Version and security information",
        ),
        paragraphs: [
          t(
            "La disponibilidad de archivos y funciones depende de las versiones publicadas. Las betas y candidatas se identifican como versiones de prueba. Los resultados de antivirus corresponden al archivo y fecha de su informe: no son una certificación de todas las versiones ni una garantía absoluta de seguridad.",
            "File and feature availability depends on published versions. Betas and candidates are identified as test versions. Antivirus results apply to the file and date in the report; they do not certify every version or guarantee absolute safety.",
          ),
        ],
      },
    ],
  },
  privacy: {
    title: t("Privacidad", "Privacy"),
    description: t(
      "Cómo trata los datos el launcher, sus integraciones opcionales y esta web.",
      "How the launcher, its optional integrations and this website handle data.",
    ),
    sections: [
      {
        id: "responsable",
        title: t("Ámbito y contacto", "Scope and contact"),
        paragraphs: [
          t(
            "Esta información cubre TFL Client y su web. TFLives es actualmente una comunidad, no una LLC constituida. Puedes consultar o solicitar información sobre datos que hayas compartido con la comunidad en contact@tflives.com o tflives@outlook.com.",
            "This information covers TFL Client and its website. TFLives is currently a community, not an incorporated LLC. For questions or requests about data you have shared with the community, contact contact@tflives.com or tflives@outlook.com.",
          ),
          t(
            "Se basa en las funciones del código revisado. Una instalación con mods, proveedores de autenticación o servicios añadidos puede tratar datos de forma distinta. Esos componentes y servicios tienen sus propias condiciones.",
            "It is based on the reviewed code’s features. An installation with added mods, authentication providers or services may handle data differently. Those components and services have their own terms.",
          ),
        ],
      },
      {
        id: "datos-locales",
        title: t(
          "Datos que permanecen en tu equipo",
          "Data stored on your device",
        ),
        paragraphs: [
          t(
            "El launcher guarda preferencias, nombres y configuración de instalaciones, versiones, contenido descargado, rutas de Java, servidores favoritos y actividad reciente. Las instalaciones pueden contener mundos, capturas, mapas, registros y copias de seguridad. El directorio principal suele ser .tflclient dentro de tu carpeta de usuario; puede variar en perfiles portables o de prueba.",
            "The launcher stores preferences, installation names and settings, versions, downloaded content, Java paths, favorite servers and recent activity. Installations may contain worlds, screenshots, maps, logs and backups. The main directory is usually .tflclient under your user folder; portable or test profiles may differ.",
          ),
          t(
            "La actividad reciente conserva hasta 20 sesiones que hayan durado al menos 30 segundos. Otros archivos locales se conservan mientras mantengas sus datos; las copias de seguridad pueden estar sujetas a límites de retención. Desinstalar la aplicación no implica necesariamente borrar las instalaciones o los datos guardados por separado.",
            "Recent activity retains up to 20 sessions lasting at least 30 seconds. Other local files remain while you keep their data; backups may have retention limits. Uninstalling the app does not necessarily remove separately stored installations or data.",
          ),
        ],
      },
      {
        id: "cuentas",
        title: t("Cuentas y credenciales", "Accounts and credentials"),
        paragraphs: [
          t(
            "El acceso Microsoft se completa mediante sus servicios de autenticación y los de Xbox/Minecraft. El launcher utiliza el nombre y UUID del perfil y tokens de acceso o renovación para gestionar la sesión. No necesitas introducir tu contraseña de Microsoft en esta web.",
            "Microsoft sign-in uses Microsoft authentication and Xbox/Minecraft services. The launcher uses your profile name and UUID and access or refresh tokens to manage the session. You do not need to enter your Microsoft password on this website.",
          ),
          t(
            "Los tokens se excluyen de la configuración general y la biblioteca de autenticación los guarda en archivos locales cifrados separados, en claunch-rs/secrets dentro del directorio de datos del sistema. No se afirma que se utilice el llavero del sistema ni que ese almacenamiento proteja frente a software con acceso a tu usuario. Al quitar una cuenta, el launcher solicita borrar sus tokens guardados.",
            "Tokens are excluded from general settings and the authentication library stores them in separate encrypted local files, under claunch-rs/secrets in the system data directory. This is not a claim of OS keychain use or protection against software with access to your user account. Removing an account requests deletion of its saved tokens.",
          ),
          t(
            "Si añades un proveedor Yggdrasil, las credenciales y solicitudes necesarias se envían al servidor que tú configures. Un perfil sin conexión no concede una licencia de Minecraft ni acceso a los servicios de autenticación de Microsoft.",
            "If you add a Yggdrasil provider, required credentials and requests are sent to the server you configure. An offline profile does not grant a Minecraft license or access to Microsoft authentication services.",
          ),
        ],
      },
      {
        id: "conexiones",
        title: t(
          "Servicios externos y conexiones",
          "External services and connections",
        ),
        paragraphs: [
          t(
            "Al consultar o descargar versiones, actualizaciones y contenido, pueden realizarse peticiones a Microsoft/Mojang, GitHub y sus redes de distribución, Modrinth, proveedores de loaders y Java como Azul o Adoptium, y proveedores de servidores como Paper o Purpur. Estos servicios reciben al menos la información técnica necesaria para la conexión, incluida la IP y las solicitudes de archivos o catálogos.",
            "Browsing or downloading versions, updates and content may send requests to Microsoft/Mojang, GitHub and its delivery networks, Modrinth, loader and Java providers such as Azul or Adoptium, and server providers such as Paper or Purpur. These services receive at least the technical connection information, including IP addresses and file or catalog requests.",
          ),
          t(
            "Las herramientas de servidor pueden consultar la IP pública mediante ipify y, si vinculas y utilizas playit.gg, comunicarse con ese proveedor para gestionar un túnel. Compartir una dirección o abrir acceso a una partida permite conexiones de otras personas. Revisa la configuración antes de compartirla.",
            "Server tools may query your public IP through ipify and, if you link and use playit.gg, communicate with that provider to manage a tunnel. Sharing an address or opening access to a game allows other people to connect. Review the settings before sharing.",
          ),
          t(
            "Abrir enlaces de Discord, repositorios, soporte o VirusTotal te lleva a servicios con sus propias políticas. Las peticiones a estos proveedores pueden procesarse en otros países según sus infraestructuras; no se garantiza que permanezcan en un país concreto.",
            "Opening Discord, repository, support or VirusTotal links takes you to services with their own policies. Providers may process requests in other countries according to their infrastructure; processing is not guaranteed to remain in a particular country.",
          ),
        ],
      },
      {
        id: "mcp",
        title: t("Integración opcional MCP", "Optional MCP integration"),
        paragraphs: [
          t(
            "MCP permite que un asistente local compatible solicite las operaciones que autorices. Requiere habilitación, aprobación por sesión y permisos. Algunas acciones críticas requieren una confirmación adicional. El launcher conserva un registro local acotado de decisiones y permite revocar sesiones y limpiar ese registro.",
            "MCP lets a compatible local assistant request operations you authorize. It requires enabling the integration, session approval and permissions. Some critical actions require additional confirmation. The launcher keeps a bounded local decision log and lets you revoke sessions and clear that log.",
          ),
          t(
            "Los datos que un asistente reciba —por ejemplo, nombres de instalaciones o fragmentos de diagnóstico— pueden ser tratados por el proveedor de ese asistente conforme a su configuración y política. Revisa los permisos y los datos compartidos. La integración local no equivale a una conexión remota con ChatGPT en la nube.",
            "Data received by an assistant, such as installation names or diagnostic excerpts, may be processed by its provider under that assistant’s configuration and policy. Review permissions and shared data. The local integration is not a remote connection to cloud ChatGPT.",
          ),
        ],
      },
      {
        id: "diagnosticos",
        title: t("Diagnóstico y soporte", "Diagnostics and support"),
        paragraphs: [
          t(
            "Los registros pueden incluir nombres de usuario, rutas, direcciones de servidores, errores y detalles de mods. En el código revisado no se ha identificado un SDK de analítica ni un envío automático de informes de error a TFLives. Esto no describe el comportamiento de todos los mods ni de los proveedores externos.",
            "Logs may contain usernames, paths, server addresses, errors and mod details. No analytics SDK or automatic error-report submission to TFLives was identified in the reviewed code. This does not describe every mod or external provider’s behavior.",
          ),
          t(
            "Si envías un registro, captura, correo o mensaje de soporte, compartes voluntariamente ese contenido con la comunidad y con el servicio utilizado para enviarlo. Elimina datos que no sean necesarios y nunca compartas tokens, contraseñas o enlaces privados. La retención de mensajes en Discord o correo también depende de esos servicios y de sus destinatarios.",
            "Sending a log, screenshot, email or support message voluntarily shares that content with the community and the service used to send it. Remove unnecessary data and never share tokens, passwords or private links. Message retention in Discord or email also depends on those services and recipients.",
          ),
        ],
      },
      {
        id: "web",
        title: t(
          "Esta web y tus preferencias",
          "This website and your preferences",
        ),
        paragraphs: [
          t(
            "La web no incorpora cuentas de Minecraft, formularios ni bibliotecas de analítica en su código. Vercel aloja el sitio y puede procesar IP, solicitudes, registros técnicos y datos de seguridad para servirlo. Su política de privacidad describe ese tratamiento.",
            "The website’s code does not include Minecraft accounts, forms or analytics libraries. Vercel hosts the site and may process IP addresses, requests, technical logs and security data to serve it. Its privacy policy describes that processing.",
          ),
          t(
            "El tema se guarda localmente en tu navegador con tfl-theme y la reducción de animaciones con tfl-motion. Puedes cambiar ambas preferencias en la interfaz o borrarlas desde los datos del sitio de tu navegador. El servidor puede consultar un informe público de VirusTotal por su hash, sin subir tus archivos.",
            "Your browser stores the theme locally under tfl-theme and animation reduction under tfl-motion. You can change these preferences in the interface or remove them in your browser’s site data settings. The server may retrieve a public VirusTotal report by its hash without uploading your files.",
          ),
        ],
      },
      {
        id: "gestion",
        title: t("Gestionar datos y solicitudes", "Managing data and requests"),
        paragraphs: [
          t(
            "Puedes quitar cuentas desde el launcher, borrar instalaciones o datos locales y revocar integraciones. Haz copia de tus mundos antes de eliminar archivos; borrar una cuenta no equivale a borrar todas sus instalaciones. Para cerrar o revocar una sesión Microsoft también puedes utilizar los controles de tu cuenta Microsoft.",
            "You can remove launcher accounts, delete installations or local data and revoke integrations. Back up worlds before deleting files; removing an account is not the same as deleting all its installations. Microsoft account controls can also be used to close or revoke a Microsoft session.",
          ),
          t(
            "Para consultar, corregir o solicitar la eliminación de datos que hayas entregado a TFLives, escribe al contacto de privacidad e indica qué datos o conversación están implicados. La respuesta y los derechos aplicables dependen de la legislación que corresponda. No podemos borrar desde aquí tus archivos locales ni controlar los registros independientes de terceros.",
            "To ask about, correct or request deletion of data you gave TFLives, contact the privacy address and identify the data or conversation involved. Applicable rights and responses depend on the relevant law. We cannot remotely delete your local files or control independent third-party records.",
          ),
        ],
      },
    ],
  },
  terms: {
    title: t("Términos de Servicio", "Terms of Service"),
    description: t(
      "Condiciones de uso del launcher TFL Client y sus funciones conectadas.",
      "Terms for using the TFL Client launcher and its connected features.",
    ),
    sections: [
      {
        id: "alcance",
        title: t("Alcance", "Scope"),
        paragraphs: [
          t(
            "Estos términos describen el uso de TFL Client, distribuido por la comunidad TFLives, y de la información y soporte asociados. No sustituyen las licencias de código abierto ni los términos de Minecraft, Microsoft o los servicios externos. Antes de utilizar una función conectada, revisa las condiciones del proveedor que la presta.",
            "These terms describe use of TFL Client, distributed by the TFLives community, and associated information and support. They do not replace open-source licenses or the terms of Minecraft, Microsoft or external services. Review a provider’s terms before using its connected features.",
          ),
        ],
      },
      {
        id: "cuentas",
        title: t(
          "Minecraft, cuentas y contenido",
          "Minecraft, accounts and content",
        ),
        paragraphs: [
          t(
            "Debes disponer de los derechos y autorizaciones necesarios para usar Minecraft y el contenido que instales. No utilices cuentas ajenas ni compartas credenciales. Los perfiles sin conexión no conceden derechos sobre el juego ni permiten eludir las condiciones de acceso de Microsoft, Mojang o los servidores.",
            "You must have the rights and permissions needed to use Minecraft and the content you install. Do not use other people’s accounts or share credentials. Offline profiles do not grant rights to the game or bypass Microsoft, Mojang or server access terms.",
          ),
          t(
            "Si eres menor de edad, utiliza el launcher y los servicios conectados con la autorización o supervisión que exija la legislación aplicable y las condiciones de esos servicios.",
            "If you are a minor, use the launcher and connected services with the authorization or supervision required by applicable law and those services’ terms.",
          ),
        ],
      },
      {
        id: "instalaciones",
        title: t(
          "Instalaciones y copias de seguridad",
          "Installations and backups",
        ),
        paragraphs: [
          t(
            "El launcher descarga y ejecuta Java, Minecraft y el contenido elegido en tu equipo. La compatibilidad de mods, loaders y versiones no es universal. Conserva copias de tus mundos, configuraciones y archivos antes de cambiar versiones, restaurar backups o probar una beta.",
            "The launcher downloads and runs Java, Minecraft and selected content on your device. Mods, loaders and versions are not universally compatible. Back up worlds, settings and files before changing versions, restoring backups or testing a beta.",
          ),
          t(
            "Las herramientas de borrado, restauración, servidores e integraciones pueden modificar o eliminar datos. Revisa la instalación y la acción seleccionadas antes de confirmar. Un backup del launcher no sustituye una copia externa de tus datos importantes.",
            "Deletion, restoration, server and integration tools may modify or remove data. Review the selected installation and action before confirming. A launcher backup does not replace an external copy of important data.",
          ),
        ],
      },
      {
        id: "mcp",
        title: t(
          "Asistentes y automatización MCP",
          "MCP assistants and automation",
        ),
        paragraphs: [
          t(
            "MCP es opcional y requiere un cliente local compatible y el launcher abierto. Autoriza únicamente sesiones que hayas iniciado, revisa sus permisos y limita el acceso a las instalaciones necesarias. Las decisiones de un modelo pueden ser incorrectas: revisa las acciones antes de aprobarlas y revoca la sesión cuando ya no la necesites.",
            "MCP is optional and requires a compatible local client and the running launcher. Approve only sessions you initiated, review permissions and restrict access to necessary installations. Model decisions may be wrong: review actions before approving and revoke sessions when no longer needed.",
          ),
          t(
            "Los proveedores de asistentes tienen sus propias condiciones de uso y tratamiento de datos. No se promete compatibilidad con todas sus versiones ni una integración remota certificada con servicios en la nube.",
            "Assistant providers have their own usage and data terms. Compatibility with every version or a certified remote cloud integration is not promised.",
          ),
        ],
      },
      {
        id: "selection",
        title: t("Selection y módulos", "Selection and modules"),
        paragraphs: [
          t(
            "Los clientes de Selection, sus módulos y las candidatas de TFL Core tienen disponibilidad y compatibilidad propias. Que una función figure en el catálogo no significa que esté incluida o habilitada en todas las versiones publicadas. Respeta las reglas de cada servidor y revisa sus restricciones antes de activar módulos.",
            "Selection clients, their modules and TFL Core candidates have their own availability and compatibility. A feature appearing in the catalog does not mean it is included or enabled in every published version. Respect each server’s rules and check its restrictions before enabling modules.",
          ),
        ],
      },
      {
        id: "terceros",
        title: t("Servicios de terceros", "Third-party services"),
        paragraphs: [
          t(
            "Los servicios de autenticación, descargas, repositorios, contenido, túneles y soporte dependen de terceros. Sus cambios, límites o interrupciones pueden afectar al launcher. Vincular un servicio o compartir acceso a un servidor no implica que TFLives controle su infraestructura o sus condiciones.",
            "Authentication, downloads, repositories, content, tunnels and support depend on third parties. Their changes, limits or outages may affect the launcher. Linking a service or sharing server access does not mean TFLives controls its infrastructure or terms.",
          ),
        ],
      },
      {
        id: "licencias",
        title: t("Derechos sobre el software", "Software rights"),
        paragraphs: [
          t(
            "El código del launcher y sus dependencias se rigen por las licencias que los acompañan. Estas condiciones no prohíben estudiar, modificar o redistribuir el software cuando su licencia lo permita. Mantén los avisos y obligaciones correspondientes; los derechos sobre marcas y recursos pueden ser distintos.",
            "Launcher code and dependencies are governed by their included licenses. These terms do not prohibit studying, modifying or redistributing software where its license permits it. Preserve applicable notices and obligations; trademarks and assets may have different rights.",
          ),
        ],
      },
      {
        id: "garantias",
        title: t(
          "Versiones de prueba y límites",
          "Test versions and limitations",
        ),
        paragraphs: [
          t(
            "El software puede contener errores y las betas o candidatas pueden cambiar o retirarse. No se garantiza una tasa de FPS, un consumo de memoria idéntico en todos los equipos, la disponibilidad continua de servicios externos ni la ausencia absoluta de vulnerabilidades o malware. Un informe de antivirus se limita a su archivo y fecha.",
            "Software may contain errors and betas or candidates may change or be withdrawn. No fixed FPS, identical memory use across devices, continuous third-party availability or absolute absence of vulnerabilities or malware is guaranteed. Antivirus reports are limited to their file and date.",
          ),
          t(
            "Las garantías y límites de responsabilidad de las licencias se aplican en la medida permitida por la ley. Nada de lo indicado elimina derechos obligatorios de consumidores o usuarios ni excluye responsabilidades que no puedan limitarse legalmente. No se establece aquí un fuero exclusivo ni una renuncia general a tus derechos.",
            "License warranties and liability limitations apply to the extent permitted by law. Nothing here removes mandatory consumer or user rights or excludes liability that cannot legally be limited. No exclusive jurisdiction or blanket waiver of rights is imposed here.",
          ),
        ],
      },
      {
        id: "cambios",
        title: t("Cambios y contacto", "Changes and contact"),
        paragraphs: [
          t(
            "Las funciones y estos documentos podrán actualizarse para reflejar cambios del proyecto. La fecha de revisión se muestra en cada documento. Si una futura entidad asume la operación, se actualizará la información del responsable. Puedes dejar de utilizar el launcher conservando los derechos que te concedan sus licencias y gestionar por separado tus datos locales.",
            "Features and these documents may be updated to reflect project changes. Each document shows its revision date. If a future legal entity takes over operations, operator information will be updated. You may stop using the launcher while retaining your license rights and managing local data separately.",
          ),
          t(
            "Para consultas sobre estas condiciones utiliza contact@tflives.com; también puedes contactar con la comunidad en tflives@outlook.com.",
            "For questions about these terms, use contact@tflives.com; you can also reach the community at tflives@outlook.com.",
          ),
        ],
      },
    ],
  },
} as const;
