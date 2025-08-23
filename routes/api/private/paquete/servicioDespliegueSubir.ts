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
        
        // Obtener id_paquete del formData en lugar del JSON
        const id_paquete = formData.get("id_paquete");
        
        if (!id_paquete) {
            return new Response(
                JSON.stringify({ error: "id_paquete requerido" }),
                { status: 400, headers: { "Content-Type": "application/json" } }
            );
        }
        
        const newFormData = new FormData();
        const file = formData.get("file");
        if (file) {
            newFormData.append("file", file);
        }

        const backendResponse = await fetch(
            `${TROTA_ENVIROMENT}/tenant/paquete/recurso/servicio_despliegue/${id_paquete}`,
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