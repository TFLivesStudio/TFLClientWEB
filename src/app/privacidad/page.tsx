import { PageTitle } from "@/components/ui";
import { seo } from "@/lib/seo";
export const metadata = seo(
  "Privacidad y créditos",
  "Información de la web, servicios externos, recursos y marcas.",
  "/privacidad",
);
export default function Privacy() {
  return (
    <>
      <PageTitle
        label="INFORMACIÓN DEL SITIO"
        title="Privacidad y créditos."
        description="Información sobre esta web, sus recursos y los proyectos que presenta."
      />
      <article className="shell prose section">
        <h2>Una web informativa</h2>
        <p>
          El código de esta web no incorpora cuentas de usuarios, formularios ni
          bibliotecas de analítica. El sitio se aloja en Vercel, cuyo
          tratamiento de datos técnicos se describe en su política de
          privacidad. La autenticación de Minecraft se realiza dentro del
          launcher. El proveedor de alojamiento puede procesar datos técnicos de
          las solicitudes para servir y proteger el sitio.
        </p>
        <p>
          <a href="https://vercel.com/legal/privacy-policy">
            Política de privacidad de Vercel
          </a>
        </p>
        <h2>Enlaces externos</h2>
        <p>
          Las descargas, repositorios y soporte enlazan a GitHub. Al visitarlos
          se aplican las políticas del servicio correspondiente.
        </p>
        <h2>Recursos y atribución</h2>
        <p>
          El logotipo, las vistas de la interfaz y el arte ambiental proceden
          del repositorio oficial de TFL Client. Las capturas muestran la
          interfaz web del launcher con el puente nativo simulado, sin cuenta,
          instalaciones ni partida real. No son una prueba de ejecución del
          juego.
        </p>
        <p>
          El fondo Pattern Waves es de David Haz / React Bits, bajo MIT +
          Commons Clause.{" "}
          <a href="/licenses/react-bits.txt">Consultar licencia</a>. Los iconos
          generales son de Lucide; las marcas de plataformas proceden de Simple
          Icons (CC0, sujetos a las directrices de cada marca; no implica
          patrocinio).{" "}
          <a href="/licenses/simple-icons.txt">
            Licencia de los iconos de marca
          </a>
          . Las tipografías Manrope e Inter se sirven localmente.
        </p>
        <h2>Marcas</h2>
        <p>
          TFL Client no es un producto oficial de Minecraft. No está aprobado
          por ni asociado con Mojang o Microsoft. Los recursos se usan para
          presentar el proyecto de TFLives.
        </p>
      </article>
    </>
  );
}
