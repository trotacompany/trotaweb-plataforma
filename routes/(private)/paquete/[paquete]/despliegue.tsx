import { PageProps } from "$fresh/src/server/types.ts";
import CabeceraPlataforma from "../../../../islands/CabeceraPlataforma.tsx";
import NavRailPrincipal from "../../../../islands/NavRailPrincipal.tsx";
import MenuDespliegueTemporal from "../../../../islands/recursos/menuDespliegueTemporal.tsx";
import { AppProps, State } from "../../../../lib/types.ts";
import { Handlers } from "$fresh/server.ts";
import { Head } from "$fresh/runtime.ts";

export interface ServicioDespliegueProps extends AppProps {
  id_paquete: string;
}

export const handler: Handlers<ServicioDespliegueProps, State> = {
  GET(_req, ctx) {
    if (!ctx.state.datosPerfil?.id) {
      const headers = new Headers();
      headers.set("Location", "/auth/login");
      return new Response(null, { status: 302, headers });
    }

    return ctx.render({
      datosPerfil: ctx.state.datosPerfil,
      id_paquete: ctx.params.paquete,
    });
  },
};

export default function Despliegue(props: PageProps<ServicioDespliegueProps>) {
  const { datosPerfil, id_paquete } = props.data;
  const currentUrl = props.url.pathname;
  return (
    <>
      <Head>
        <title>Desplegar APP - TrotaWeb</title>
        <meta name="robots" content="noindex, nofollow" />
      </Head>
      <NavRailPrincipal url={currentUrl} />

      <div class="page-content">
        <CabeceraPlataforma
          titulo="Desplegar APP"
          subtitulo="recursos > servicio de despliegue"
          nombre_usuario={datosPerfil.nombre}
          foto_perfil={datosPerfil.url_foto_perfil}
        />
        <div class="panel body-large mt-6">
          <b>Atención</b>, esta es una solución temporal. Este menú será quitado
          en las siguientes versiones.
        </div>
        <div class="mt-8">
          <MenuDespliegueTemporal id_paquete={id_paquete} />
        </div>
      </div>
    </>
  );
}
