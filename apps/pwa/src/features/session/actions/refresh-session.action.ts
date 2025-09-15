"use server";

import { cookies } from "next/headers";
import { refreshTokens } from "@/api/auth/refresh";
import { ActionResponse } from "@/lib/action";

export async function refreshSessionAction() {
    const cookieStore = await cookies();
    const refreshToken = cookieStore.get("refresh_token");

    try {
        if(!refreshToken?.value) {
            throw new Error("No refresh token");
        }

        const tokensResponse = await refreshTokens({
            authorization: {
                method: "Bearer",
                token: refreshToken.value,
            },
        });

        if(!tokensResponse.ok || !tokensResponse.data) {
            throw new Error("Failed to refresh token");
        }

        cookieStore.set("access_token", tokensResponse.data.accessToken, {
            httpOnly: true,
            path: "/",
            secure: true,
            sameSite: "strict",
        });
        cookieStore.set("refresh_token", tokensResponse.data.refreshToken, {
            httpOnly: true,
            path: "/",
            secure: true,
            sameSite: "strict",
        });

        return ActionResponse.Success();
    } catch(error: any) {
        console.log("Refresh token verification failed: ", error.message);

        cookieStore.delete("access_token");
        cookieStore.delete("refresh_token");

        return ActionResponse.Error();
    }
}