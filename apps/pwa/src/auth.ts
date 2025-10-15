import { NextRequest, NextResponse } from "next/server";

import { authCookiesParams, AuthJwtTokens, IAuthJwtTokens, REFRESH_TOKEN_URL } from "@/config/auth.config";

export function apiRequest(url: string | URL, request: RequestInit, token?: string) {
    const headers = new Headers(request.headers);
    if(token) {
        headers.set("Authorization", `Bearer ${token}`);
    }

    return fetch(url, {
        ...request,
        body: request.method !== "GET" && request.method !== "HEAD" ? request.body : undefined,
        headers,
    });
}

export async function refreshTokens(request: NextRequest, refreshToken: string): Promise<IAuthJwtTokens | null> {
    try {
        const response = await apiRequest(REFRESH_TOKEN_URL, {
            ...request,
            method: "POST",
        }, refreshToken);

        if(!response.ok) {
            return null;
        }

        return response.json();
    } catch {
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