"use server";

import { cookies } from "next/headers";
import { AuthJwtTokens } from "@/config/auth.config";

export async function getAccessToken() {
    const cookieStore = await cookies();
    return cookieStore.get(AuthJwtTokens.AccessToken)?.value;
}