import { NextRequest, NextResponse } from "next/server";

import { authCookiesParams, AuthJwtTokens, IAuthJwtTokens, REFRESH_TOKEN_URL } from "@/config/auth.config";

/**
 * A list of headers that are specific to a single client-server connection (hop-by-hop)
 * We must exclude these headers when proxying a request.
 */
const HEADERS_TO_EXCLUDE = [
    "host",
    "connection",
    "content-encoding",
    "transfer-encoding",
    "content-length",
];

export async function apiRequest(url: string, request: NextRequest, token?: string) {
    const headers = new Headers(request.headers);
    HEADERS_TO_EXCLUDE.forEach(header => headers.delete(header));

    if(token) {
        headers.set("Authorization", `Bearer ${token}`);
    }

    const requestInit: RequestInit = {
        method: request.method,
        headers,
        cache: "no-store",
    };

    if(request.method !== "GET" && request.method !== "HEAD") {
        requestInit.body = request.body;
        /**
         * This option is required by the Node.js `fetch` implementation when the
         * request `body` is a `ReadableStream` (which `request.body` is).
         *
         * It specifies 'half-duplex' mode, which means the request body must be
         * fully sent before the client can start reading the response. This is the
         * standard behavior for most HTTP requests and prevents potential connection
         * issues when streaming data.
         */
        requestInit["duplex"] = "half";
    }

    return fetch(url, requestInit);
}

export function apiResponse(response: Response | null, init: Partial<ResponseInit> = {}) {
    if(!response) {
        return new NextResponse(null, init);
    }

    const headers = new Headers(response.headers);
    HEADERS_TO_EXCLUDE.forEach(header => headers.delete(header));

    return new NextResponse(response.body, {
        status: response.status,
        statusText: response.statusText,
        headers: headers,
    });
}

export async function refreshTokens(refreshToken: string): Promise<IAuthJwtTokens | null> {
    try {
        const response = await fetch(REFRESH_TOKEN_URL, {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${refreshToken}`,
                "Content-Type": "application/json",
            },
            cache: "no-store",
        });

        if (!response.ok) {
            // console.error("Token refresh failed:", response.status);
            return null;
        }

        return response.json();
    } catch {
        // console.error("Error refreshing tokens:", error);
        return null;
    }
}

export function setAuthJwtTokens(response: NextResponse, tokens: IAuthJwtTokens) {
    response.cookies.set(AuthJwtTokens.AccessToken, tokens.accessToken, authCookiesParams);
    response.cookies.set(AuthJwtTokens.RefreshToken, tokens.refreshToken, authCookiesParams);
}

export function deleteAuthJwtTokens(response: NextResponse) {
    response.cookies.delete({ name: AuthJwtTokens.AccessToken, ...authCookiesParams });
    response.cookies.delete({ name: AuthJwtTokens.RefreshToken, ...authCookiesParams });
}