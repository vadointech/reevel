import { NextRequest, NextResponse } from "next/server";

import { authCookiesParams, AuthJwtTokens, IAuthJwtTokens, REFRESH_TOKEN_URL } from "@/config/auth.config";

export async function refreshTokens(request: NextRequest, refreshToken: string): Promise<IAuthJwtTokens | null> {
    const headers = new Headers(request.headers);
    headers.set("Authorization", `Bearer ${refreshToken}`);

    try {
        const response = await fetch(REFRESH_TOKEN_URL, {
            method: "POST",
        });

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