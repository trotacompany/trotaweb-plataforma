import { Handlers } from "$fresh/server.ts";
import { TROTA_ENVIROMENT } from "../../../lib/env.ts";

export const handler: Handlers = {
    async POST(_req) {
        const backendResponse = await fetch(
            `${TROTA_ENVIROMENT}/auth/logout`,
            {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                credentials: "include",
            },
        );
        return new Response(backendResponse.body, {
            status: backendResponse.status,
            headers: backendResponse.headers,
        });
    },
};
