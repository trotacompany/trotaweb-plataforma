// api.ts
import type { ApiResponse } from "./types.ts";
export const GRAPHQL_RESPONSE = true;
export async function safeFetch<T>(
  input: RequestInfo | URL,
  init?: RequestInit,
  isGraphQL: boolean = false,
): Promise<ApiResponse<T>> {
  try {
    const controller = new AbortController();
    setTimeout(() => controller.abort(), 120000);
    const response = await fetch(input, {
      ...init,
      credentials: "include",
      signal: controller.signal,
    });

    const statusCode = response.status;

    // deno-lint-ignore no-explicit-any
    let responseData: any;
    try {
      responseData = await response.json();
    } catch (_jsonError) {
      if (statusCode === 401 || statusCode === 403) {
        return {
          success: false,
          message: "Unauthorized",
          data: null as T,
          code: statusCode,
        };
      }
      throw new Error(`Invalid JSON response. Status: ${statusCode}`);
    }

    // Manejo especial para GraphQL
    if (isGraphQL) {
      if (responseData.errors) {
        return {
          success: false,
          message: responseData.errors[0]?.message || "GraphQL error",
          data: null as T,
          code: statusCode,
        };
      }
      return {
        success: true,
        message: "Success",
        data: responseData.data as T,
        code: statusCode,
      };
    }

    // Manejo estándar para APIs REST
    if (!responseData.success) {
      return {
        success: false,
        message: responseData.message || "Request failed",
        data: null as T,
        code: responseData.code || statusCode,
      };
    }

    return {
      ...responseData,
      code: responseData.code || statusCode,
    };
  } catch (error) {
    return {
      success: false,
      message: error instanceof Error ? error.message : "Unknown error",
      data: null as T,
      code: (error instanceof Error && error.message.includes("401"))
        ? 401
        : 500,
    };
  }
}
