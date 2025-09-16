"use server";

import { cookies } from "next/headers";
import { AuthJwtTokens } from "@/auth.config";

export async function getAccessToken() {
    const cookieStore = await cookies();
    return cookieStore.get(AuthJwtTokens.AccessToken)?.value;
}
export async function deleteAccessToken() {
    const cookieStore = await cookies();
    cookieStore.delete(AuthJwtTokens.AccessToken);
}

export async function getRefreshToken() {
    const cookieStore = await cookies();
    return cookieStore.get(AuthJwtTokens.RefreshToken)?.value;
}