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

    const backendResponse = await fetch(
      `${TROTA_ENVIROMENT}/tenant/paquete/recurso/despliegue/action`,
      {
        method: "POST",
        headers: headersToSend,
        credentials: "include",
        body: await req.text(),
      },
    );

    return new Response(backendResponse.body, {
      status: backendResponse.status,
      headers: {
        "Content-Type": "application/json",
      },
    });
  },
};
