import { getTranslator } from "@/i18n/server";
import { PageTitle } from "@/components/ui";
import { seo } from "@/lib/seo";
export async function generateMetadata() {
  const tr = await getTranslator();
  return seo(
    tr("Privacidad y créditos"),
    tr("Información de la web, servicios externos, recursos y marcas."),
    "/privacidad",
    tr.locale,
  );
}
export default async function Privacy() {
  const tr = await getTranslator();
  return (
    <>
      <PageTitle
        label={tr("INFORMACIÓN DEL SITIO")}
        title={tr("Privacidad y créditos.")}
        description={tr(
          "Información sobre esta web, sus recursos y los proyectos que presenta.",
        )}
      />
      <article className="shell prose section">
        <h2>{tr("Una web informativa")}</h2>
        <p>
          {tr(
            "El código de esta web no incorpora cuentas de usuarios, formularios ni bibliotecas de analítica. El sitio se aloja en Vercel, cuyo tratamiento de datos técnicos se describe en su política de privacidad. La autenticación de Minecraft se realiza dentro del launcher. El proveedor de alojamiento puede procesar datos técnicos de las solicitudes para servir y proteger el sitio.",
          )}
        </p>
        <p>
          <a href="https://vercel.com/legal/privacy-policy">
            {tr("Política de privacidad de Vercel")}
          </a>
        </p>
        <h2>{tr("Enlaces externos")}</h2>
        <p>
          {tr(
            "Las descargas, repositorios y soporte enlazan a GitHub. Al visitarlos se aplican las políticas del servicio correspondiente.",
          )}
        </p>
        <h2>{tr("Recursos y atribución")}</h2>
        <p>
          {tr(
            "El logotipo y las capturas proceden del frontend oficial de TFL Client con un puente nativo simulado. La consola y el perfil usan datos de demostración; no acreditan una partida real.",
          )}
        </p>
        <p>
          {tr(
            "El fondo Pattern Waves es de David Haz / React Bits, bajo MIT + Commons Clause.",
          )}{" "}
          <a href="/licenses/react-bits.txt">{tr("Consultar licencia")}</a>
          {tr(
            ". Los iconos generales son de Lucide; las marcas de plataformas proceden de Simple Icons (CC0, sujetos a las directrices de cada marca; no implica patrocinio).",
          )}{" "}
          <a href="/licenses/simple-icons.txt">
            {tr("Licencia de los iconos de marca")}
          </a>
          {tr(". Las tipografías Manrope e Inter se sirven localmente.")}
        </p>
        <h2>{tr("Marcas")}</h2>
        <p>
          {tr(
            "TFL Client no es un producto oficial de Minecraft. No está aprobado por ni asociado con Mojang o Microsoft. Los recursos se usan para presentar el proyecto de TFLives.",
          )}
        </p>
      </article>
    </>
  );
}
