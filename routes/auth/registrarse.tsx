import MaterialIcon from "../../islands/MaterialIcon.tsx";
import { IconButtonStandard } from "../../components/IconButtonStandard.tsx";
import AppBar from "../../components/AppBar.tsx";
import FormularioRegistro from "../../islands/auth/FormularioRegistro.tsx";
import { Head } from "$fresh/runtime.ts";

export default function Registrarse() {
  return (
    <>
      <Head>
        <title>Registrarse - TrotaWeb</title>
        <meta name="description" content="Únete a TrotaWeb y disfruta de hosting, almacenamiento y recursos web sin suscripciones obligatorias. Comienza gratis y a tu ritmo." />
        <meta name="keywords" content="registro, cuenta, hosting, almacenamiento, web, gratis" />
      </Head>

      <div class="page-content">
        <AppBar
          leading={
            <a href="/auth/login" tabIndex={-1} aria-label="Volver al inicio de sesión">
              <IconButtonStandard aria-label="Botón volver atrás">
                <MaterialIcon name="arrow_back" />
              </IconButtonStandard>
            </a>
          }
          titulo="Crear cuenta"
        />
        <main class="flex flex-row gap-4 align-center justify-center">
          <div class="">
            <div class="text-center mb-6">
              <h2 class="headline-large">¡Bienvenido a Trota!</h2>
              <p class="body-large">Empieza completamente gratis y a tu ritmo.</p>
              <div class="panel mt-4">
                Precaución: TrotaWeb esta en un estado Alpha. Haremos lo mejor posible
                <br /> pero podrían haber interrupciones o sistemas no completos.
              </div>
            </div>
            <FormularioRegistro />
          </div>
        </main>
      </div>
    </>
  );
}
