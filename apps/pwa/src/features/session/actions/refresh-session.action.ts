"use server";

import { cookies } from "next/headers";
import { getRefreshToken } from "@/api/server";
import { refreshTokens } from "@/api/auth";
import { authCookiesParams, AuthJwtTokens } from "@/config/auth.config";
import { ActionResponse } from "@/lib/action";

export async function refreshSessionAction() {
    const cookieStore = await cookies();
    const refreshToken = await getRefreshToken();

    try {
        if(!refreshToken) {
            throw new Error("No refresh token");
        }

        const tokensResponse = await refreshTokens({
            authorization: {
                method: "Bearer",
                token: refreshToken,
            },
        });

        if(!tokensResponse.ok || !tokensResponse.data) {
            throw new Error("Failed to refresh token");
        }


        cookieStore.set(AuthJwtTokens.AccessToken, tokensResponse.data.accessToken, authCookiesParams);
        cookieStore.set(AuthJwtTokens.RefreshToken, tokensResponse.data.refreshToken, authCookiesParams);

        return ActionResponse.Success();
    } catch(error: any) {
        console.log("Refresh token verification failed: ", error.message);

        cookieStore.delete({
            name: AuthJwtTokens.AccessToken,
            ...authCookiesParams,
        });
        cookieStore.delete({
            name: AuthJwtTokens.RefreshToken,
            ...authCookiesParams,
        });

        return ActionResponse.Error();
    }
}