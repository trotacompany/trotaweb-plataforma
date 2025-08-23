import { Handlers } from "$fresh/server.ts";
import { TROTA_ENVIROMENT } from "../../../lib/env.ts";

export const handler: Handlers = {
    async POST(req) {
        const backendResponse = await fetch(
            `${TROTA_ENVIROMENT}/auth/login`,
            {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                credentials: "include",
                body: await req.text(),
            },
        );

        return new Response(backendResponse.body, {
            status: backendResponse.status,
            headers: backendResponse.headers,
        });
    },
};
