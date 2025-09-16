"use server";

import { getAccessToken } from "@/api/server";

import * as GetSession from "./session";
import * as GetCurrentUserProfile from "./profile";
import * as GetCurrentUserInterests from "./interests";

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

export async function getCurrentUserProfile() {
    const accessToken = await getAccessToken();

    const response = await GetCurrentUserProfile.getCurrentUserProfile({
        authorization: {
            method: "Bearer",
            token: accessToken,
        },
    });

    return response.data;
}

export async function getCurrentUserInterests() {
    const accessToken = await getAccessToken();

    const response = await GetCurrentUserInterests.getCurrentUserInterests({
        authorization: {
            method: "Bearer",
            token: accessToken,
        },
        fallback: [],
    });

    return response.data.map(item => item.interest);
}