import MaterialIcon from "../../islands/MaterialIcon.tsx";
import { IconButtonStandard } from "../../components/IconButtonStandard.tsx";
import AppBar from "../../components/AppBar.tsx";
import FormularioLogin from "../../islands/auth/FormularioLogin.tsx";
import { Head } from "$fresh/runtime.ts";

export default function Login() {
  return (
    <>
      <Head>
        <title>Iniciar Sesión - TrotaWeb</title>
        <meta name="description" content="Inicia sesión en tu cuenta de TrotaWeb para acceder a hosting, almacenamiento y recursos web." />
        <meta name="robots" content="noindex, nofollow" />
      </Head>
      <div class="page-content">
        <AppBar
          leading={
            <a href="/" tabIndex={-1} aria-label="Volver a la página principal">
              <IconButtonStandard>
                <MaterialIcon name="arrow_back" />
              </IconButtonStandard>
            </a>
          }
          titulo="Iniciar sesión"
        />
        { /* Contenido */ }
        <main class="layout-login">
          <section class="panel" aria-labelledby="login-heading">
            <div class="text-center content-center">
              <img
                src="/logo.png"
                alt="TrotaWeb logo: un bioma de mesa con formación de rocas naranjas y un cielo azul"
                width="128"
                height="128"
                loading="eager"
                style="width:128px; height:128px;"
              />
              <h3 class="headline-small">TrotaWeb</h3>
              <p class="body-large">
                Accede a tu plataforma
              </p>
            </div>

            <div class="content-center">
              <FormularioLogin />
            </div>
          </section>
        </main>
      </div>
    </>
  );
}
