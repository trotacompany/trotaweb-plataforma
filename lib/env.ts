import "https://deno.land/std@0.192.0/dotenv/load.ts";

export function getEnv(key: string, fallback?: string): string {
    const value = Deno.env.get(key) ?? fallback;
    if (!value) throw new Error(`Falta la variable de entorno: ${key}`);
    return value;
}
export const TROTA_ENVIROMENT = getEnv("TROTA_ENVIROMENT");
export const JWT_SECRET = getEnv("JWT_SECRET");