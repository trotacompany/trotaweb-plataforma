import { Handlers } from "$fresh/server.ts";
import { TROTA_ENVIROMENT } from "../../../../lib/env.ts";
import { getCookies } from "$std/http/cookie.ts";

export const handler: Handlers = {
  async POST(req) {
    const clientCookies = getCookies(req.headers);
    const accessToken = clientCookies["access_token"];
    const headersToSend: HeadersInit = {
      "Content-Type": "application/json",
    };
    if (accessToken) {
      headersToSend["Cookie"] = `access_token=${accessToken}`;
    }
    const body = await req.json();
    const { id_usuario } = body;

    const graphql_request =
      `query {\r\n    paquetes (id: \"${id_usuario}\"){\r\n        id\r\n        nombre\r\n        creditos\r\n        costoMensual\r\n        creadoPor\r\n        estatus\r\n        fechaCreacion\r\n        idUsuario\r\n        urlFotoPortada\r\n        urlLogo\r\n    }\r\n}`;
    const backendResponse = await fetch(
      `${TROTA_ENVIROMENT}/graphql`,
      {
        method: "POST",
        headers: headersToSend,
        credentials: "include",
        body: JSON.stringify({
          query: graphql_request,
          variables: {},
        }),
      },
    );

    return new Response(backendResponse.body, {
      status: backendResponse.status,
      headers: backendResponse.headers,
    });
  },
};
