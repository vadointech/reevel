"use server";

import { getAccessToken } from "@/api/server";

import * as GetSession from "./session";

export async function getSession() {
    const accessToken = await getAccessToken();

    const response = await GetSession.getSession({
        authorization: {
            method: "Bearer",
            token: accessToken,
        },
    });

    return response.data;
}