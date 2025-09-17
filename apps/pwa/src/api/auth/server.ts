"use server";

import { getAccessToken } from "@/api/server";

import * as Logout from "./logout";

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