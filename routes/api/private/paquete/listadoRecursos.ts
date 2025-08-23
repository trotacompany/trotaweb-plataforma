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

    const graphql_request =
      `query {\r\n    recursos{\r\n        id \r\n        nombre\r\n        descripcion\r\n        costoBase\r\n        unidadMedida\r\n        urlLogo\r\n        urlImagen\r\n        nonce \r\n        parametrosPorDefecto\r\n    }\r\n}`;
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
