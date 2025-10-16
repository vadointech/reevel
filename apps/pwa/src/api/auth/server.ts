"use server";

import { deleteAccessToken, deleteRefreshToken, getAccessToken } from "@/api/server";

import * as GetGoogleOAuthLink from "./get-google-oauth-link";
import * as Logout from "./logout";
import { API_URL } from "@/config/env.config";

export async function getGoogleOAuthLink() {
    const response = await GetGoogleOAuthLink.getGoogleOAuthLink({
        baseURL: API_URL,
    });
    return response.data?.link;
}

export async function logout() {
    const accessToken = await getAccessToken();

    await Promise.all([
        deleteAccessToken(),
        deleteRefreshToken(),
        Logout.logout({
            authorization: {
                method: "Bearer",
                token: accessToken,
            },
        }),
    ]);

    return true;
}