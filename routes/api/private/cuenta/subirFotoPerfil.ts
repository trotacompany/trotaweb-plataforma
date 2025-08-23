import { Handlers } from "$fresh/server.ts";
import { TROTA_ENVIROMENT } from "../../../../lib/env.ts";
import { getCookies } from "$std/http/cookie.ts";

export const handler: Handlers = {
    async POST(req) {
        const clientCookies = getCookies(req.headers);
        const accessToken = clientCookies["access_token"];
        
        const headersToSend = new Headers();
        headersToSend.set("Cookie", `access_token=${accessToken}`);
        
        const formData = await req.formData();
        
        const backendResponse = await fetch(
            `${TROTA_ENVIROMENT}/usuario/foto_perfil`,
            {
                method: "POST",
                headers: headersToSend,
                credentials: "include",
                body: formData, 
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