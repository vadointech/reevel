"use server";

import { cookies } from "next/headers";
import { authCookiesParams, AuthJwtTokens } from "@/config/auth.config";

export async function getAccessToken() {
    const cookieStore = await cookies();
    return cookieStore.get(AuthJwtTokens.AccessToken)?.value;
}
export async function deleteAccessToken() {
    const cookieStore = await cookies();
    cookieStore.delete({
        name: AuthJwtTokens.AccessToken,
        ...authCookiesParams,
    });
}

export async function getRefreshToken() {
    const cookieStore = await cookies();
    return cookieStore.get(AuthJwtTokens.RefreshToken)?.value;
}
export async function deleteRefreshToken() {
    const cookieStore = await cookies();
    cookieStore.delete({
        name: AuthJwtTokens.RefreshToken,
        ...authCookiesParams,
    });
}