import { AppProps, State } from "../../lib/types.ts";
import { Handlers, PageProps } from "$fresh/server.ts";
import CabeceraPlataforma from "../../islands/CabeceraPlataforma.tsx";
import NavRailPrincipal from "../../islands/NavRailPrincipal.tsx";
import { Head } from "$fresh/runtime.ts";

export const handler: Handlers<AppProps, State> = {
  GET(_req, ctx) {
    if (!ctx.state.datosPerfil || !ctx.state.datosPerfil.id) {
      const headers = new Headers();
      headers.set("Location", "/auth/login");
      return new Response(null, {
        status: 302,
        headers,
      });
    }

    const datosPerfil = ctx.state.datosPerfil;

    return ctx.render({
      datosPerfil,
    });
  },
};

export default function Inicio(props: PageProps<AppProps>) {
  const currentUrl = props.url.pathname;
  const { datosPerfil } = props.data;
  return (
    <>
      <Head>
        <title>Inicio - TrotaWeb</title>
        <meta name="description" content="Panel principal de TrotaWeb - Gestiona tus recursos de hosting y almacenamiento" />
        <meta name="robots" content="noindex, nofollow" />
      </Head>

      <NavRailPrincipal url={currentUrl} />
      <div class="page-content">
        <CabeceraPlataforma
          titulo="Inicio"
          subtitulo={`${datosPerfil.nombre}`}
          nombre_usuario={datosPerfil.nombre}
          foto_perfil={datosPerfil.url_foto_perfil}
        />

        
        <main class="p-4">
          {/* Contenido seguro del dashboard */}
          <section class="mb-6">
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {/* Tarjetas de información segura */}
              <div class="panel p-4">
                <h3 class="title-small mb-2">Miembro desde</h3>
                <p class="body-medium">
                  {datosPerfil.fecha_creacion 
                    ? new Date(datosPerfil.fecha_creacion).toLocaleDateString('es-ES')
                    : "Fecha no disponible"
                  }
                </p>
              </div>
            </div>
          </section>

          {/* Información de seguridad */}
          <section class="mt-8">
            <h3 class="title-small mb-2">Seguridad</h3>
            <p class="body-small text-warning">
              Esta es una versión alpha. Recuerda mantener tu información segura y 
              no compartir datos sensibles durante esta fase de pruebas.
            </p>
          </section>
        </main>
      </div>
    </>
  );
}
