import { NextRequest, NextResponse } from "next/server";

import { authCookiesParams, AuthJwtTokens, IAuthJwtTokens, REFRESH_TOKEN_URL } from "@/config/auth.config";

export async function apiRequest(url: string, request: NextRequest, token?: string) {
    const headers = new Headers();

    request.headers.forEach((value, key) => {
        if(!["host", "connection", "content-length"].includes(key.toLowerCase())) {
            headers.set(key, value);
        }
    });

    if(token) {
        headers.set("Authorization", `Bearer ${token}`);
    }

    let body: BodyInit | null = null;
    if (request.method !== "GET" && request.method !== "HEAD") {
        try {
            body = request.body;
        } catch {
            body = null;
        }
    }

    return fetch(url, {
        method: request.method,
        headers,
        body: body || undefined,
        cache: "no-store",
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
            console.error("Token refresh failed:", response.status);
            return null;
        }

        return response.json();
    } catch (error) {
        console.error("Error refreshing tokens:", error);
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