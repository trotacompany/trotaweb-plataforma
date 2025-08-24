import { FreshContext } from "$fresh/server.ts";
import { State } from "../../lib/types.ts";
import { getCookies } from "$std/http/cookie.ts";
import { verify } from "https://deno.land/x/djwt@v2.8/mod.ts";
import { JWT_SECRET } from "../../lib/env.ts";

let cryptoKey: CryptoKey | null = null;

async function getCryptoKey(): Promise<CryptoKey> {
  if (!cryptoKey) {
    cryptoKey = await crypto.subtle.importKey(
      "raw",
      new TextEncoder().encode(JWT_SECRET),
      { name: "HMAC", hash: "SHA-512" },
      false,
      ["verify"],
    );
  }
  return cryptoKey;
}

const tokenBlacklist = new Set<string>();

export async function handler(
  req: Request,
  ctx: FreshContext<State>,
) {
  const cookies = getCookies(req.headers);
  const token = cookies.access_token;

  if (!token) {
    return redirectToLogin();
  }
  if (tokenBlacklist.has(token)) {
    return redirectToLogin("Token revocado");
  }

  try {
    const key = await getCryptoKey();
    const payload = await verify(token, key);

    // Validaciones adicionales del payload
    if (!payload || typeof payload !== "object") {
      throw new Error("Payload inválido");
    }
    if (!payload.sub || !payload.nombre || !payload.correo) {
      throw new Error("Payload incompleto");
    }

    // Verificar expiración backup
    if (payload.exp && typeof payload.exp === "number") {
      const now = Math.floor(Date.now() / 1000);
      if (now > payload.exp) {
        throw new Error("Token expirado");
      }
    }

    // Verificar timestamp de emisión
    if (payload.iat && typeof payload.iat === "number") {
      const now = Math.floor(Date.now() / 1000);
      if (payload.iat > now + 60 || payload.iat < now - (365 * 24 * 60 * 60)) {
        throw new Error("Timestamp de emisión inválido");
      }
    }

    ctx.state.datosPerfil = {
      id: payload.sub as string,
      nombre: payload.nombre as string,
      correo: payload.correo as string,
      url_foto_perfil: payload.url_foto_perfil as string,
      licencia: "",
      licencia_version: "",
      fecha_creacion: payload.fecha_creacion as string,
      estatus: payload.status as string,
      creditos: "0",
    };
    const response = await ctx.next();

    const securityHeaders = new Headers(response.headers);
    securityHeaders.set("X-Content-Type-Options", "nosniff");
    securityHeaders.set("X-Frame-Options", "DENY");
    securityHeaders.set("X-XSS-Protection", "1; mode=block");
    securityHeaders.set("Referrer-Policy", "strict-origin-when-cross-origin");

    return new Response(response.body, {
      status: response.status,
      headers: securityHeaders,
    });
  } catch (error) {
    console.error("Error de autenticación:", error);

    // Añadir a lista negra temporalmente para alpha ;)
    tokenBlacklist.add(token);

    return redirectToLogin(`Error de autenticación`);
  }

  function redirectToLogin(reason?: string): Response {
    if (reason) {
      console.warn("Redirigiendo a login:", reason);
    }

    const headers = new Headers();
    headers.set("Location", "/auth/login");
    headers.set(
      "Set-Cookie",
      "access_token=; Path=/; Expires=Thu, 01 Jan 1970 00:00:00 GMT; HttpOnly; Secure; SameSite=Strict",
    );

    return new Response("", {
      status: 307,
      headers,
    });
  }
}
