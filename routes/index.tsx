import NavRail from "../components/NavRail.tsx";
import MaterialIcon from "../islands/MaterialIcon.tsx";
import { IconButtonStandard } from "../components/IconButtonStandard.tsx";
import AppBarMedium from "../components/AppBarMedium.tsx";
import NavRailItem from "../components/NavRailItem.tsx";

export default function Home() {
  return (
    <>
      {/* Navigation rail - Menu lateral */}
      <NavRail
        items={
          <>
            <a href="/auth/login" tabIndex={-1}>
              <NavRailItem icon="login">
                Login
              </NavRailItem>
            </a>
          </>
        }
      />
      {/* Contenido web */}
      <div class="page-content">
        <AppBarMedium
          leading={
            <a tabIndex={-1} href="/" aria-label="Inicio">
              <IconButtonStandard
                style={`background-size:cover; background-position:center; background-image: url('/logo.png')`}
                aria-label="Logo de TrotaWeb"
              >
                <MaterialIcon name="" />
              </IconButtonStandard>
            </a>
          }
          title="TrotaWeb"
        />
        <main>
          <section class="mt-5">
            <h1 class="headline-medium">Bienvenido a Trota!</h1>
            <p>
              Ofrecemos recursos web como hosting, almacenamiento, conjunto de
              datos y sitios web.
            </p>
          </section>
          <section class="mt-8">
            <div class="panel">
              <h4 class="title-medium">Importante</h4>

              Esta es la versión Beta de TrotaWeb, seguimos mejorando el sistema
              y toda la interfaz es susceptible a cambios, pero su aplicación se
              mantendrá con su visión.
            </div>
          </section>

          <section class="mt-8">
            <h4 class="title-medium">Seguro por defecto</h4>
            <p>
              Todos nuestros paquetes funcionan bajo la seguridad de Chainguard con Wolfie
            </p>
            <ul class="mt-2">
              <li>
                - Parches de seguridad en horas (no días)
              </li>
              <li>
                - SBOM automático sin costo extra
              </li>
              <li>
                - Supply chain security
              </li>
              <li>
                - PROXIMAMENTE: Monitoreo de vulnerabilidades
              </li>
            </ul>
          </section>
          <section class="mt-8">
            <h4 class="title-medium">Precios</h4>
            <p>
              No usamos suscripciones, puedes recargar créditos cuando quieras y
              cuánto quieras.
              <br />
              <br />
              Estos son nuestros packs de creditos, más adelante podrás comprar
              desde tu cuenta:
            </p>

            <div class="mt-4">
              <img
                src="https://assets.trotacompany.com/pack_creditos_1000.png"
                alt="Pack de creditos Trota, con valor 1.000"
                style="width:64px; height:64px;"
              />
              <img
                src="https://assets.trotacompany.com/pack_creditos_5000.png"
                alt="Pack de creditos Trota, con valor 5.000"
                style="width:64px; height:64px;"
              />
              <img
                src="https://assets.trotacompany.com/pack_creditos_10000.png"
                alt="Pack de creditos Trota, con valor 10.000"
                style="width:64px; height:64px;"
              />
              <img
                src="https://assets.trotacompany.com/pack_creditos_25000.png"
                alt="Pack de creditos Trota, con valor 25.000"
                style="width:64px; height:64px;"
              />
              <img
                src="https://assets.trotacompany.com/pack_creditos_50000.png"
                alt="Pack de creditos Trota, con valor 50.000"
                style="width:64px; height:64px;"
              />
            </div>
          </section>

          <section class="mt-8">
            <h4 class="title-medium">¡Desarrolladores!</h4>
            <p>
              Si deciden optar por nosotros como solución de hosting, muchas
              gracias ;)
            </p>
            <ul class="mt-2">
              <li>
                - Pueden desplegar su aplicación Frontend o Backend directamente
                desde la plataforma, en un futuro proporcionaremos una API
                oficial funcionalidades DevOps
              </li>
            </ul>
          </section>
        </main>
      </div>
    </>
  );
}
