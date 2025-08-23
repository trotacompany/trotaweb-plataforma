import { AppProps, State } from "../../lib/types.ts";
import { Handlers, PageProps } from "$fresh/server.ts";
import CabeceraPlataforma from "../../islands/CabeceraPlataforma.tsx";
import InformacionUsuario from "../../islands/cuenta/informacionUsuario.tsx";
import NavRailPrincipal from "../../islands/NavRailPrincipal.tsx";
import { Head } from "$fresh/runtime.ts";

export const handler: Handlers<AppProps, State> = {
  GET(_req, ctx) {
    if (!ctx.state.datosPerfil?.id) {
      const headers = new Headers();
      headers.set("Location", "/auth/login");
      return new Response(null, { status: 302, headers });
    }

    return ctx.render({ datosPerfil: ctx.state.datosPerfil });
  },
};

export default function Cuenta(props: PageProps<AppProps>) {
  const { datosPerfil } = props.data;
  const currentUrl = props.url.pathname;

  return (
    <>
      <Head>
        <title>Cuenta - TrotaWeb</title>
        <meta name="robots" content="noindex, nofollow" />
      </Head>

      <NavRailPrincipal url={currentUrl} />
      
      <div class="page-content">
        <CabeceraPlataforma
          titulo="Cuenta"
          subtitulo="Configuración"
          nombre_usuario={datosPerfil.nombre}
          foto_perfil={datosPerfil.url_foto_perfil}
        />
        
        <div class="flex mt-8">
          <div class="flex-1">
            <InformacionUsuario id_usuario={datosPerfil.id} />
          </div>
        </div>
      </div>
    </>
  );
}