"use server";

import { getAccessToken } from "@/api/server";

import * as GetGoogleOAuthLink from "./get-google-oauth-link";
import * as Logout from "./logout";

export async function getGoogleOAuthLink() {
    const response = await GetGoogleOAuthLink.getGoogleOAuthLink({});
    return response.data?.link;
}

export async function logout() {
    const accessToken = await getAccessToken();

    const response = await Logout.logout({
        authorization: {
            method: "Bearer",
            token: accessToken,
        },
    });

    return response.data;
}