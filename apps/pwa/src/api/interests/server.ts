"use server";

import { getAccessToken } from "@/api/server";

import * as GetInitialInterests from "./get-initials";
import * as GetRelatedInterests from "./get-related";

export async function getInitialInterests() {
    const accessToken = await getAccessToken();

    const response = await GetInitialInterests.getInitialInterests({
        authorization: {
            method: "Bearer",
            token: accessToken,
        },
        fallback: [],
    });

    return response.data;
}

export async function getRelatedInterests(input: GetRelatedInterests.GetRelatedInterests.TInput) {
    const accessToken = await getAccessToken();

    const response = await GetRelatedInterests.getRelatedInterests({
        authorization: {
            method: "Bearer",
            token: accessToken,
        },
        body: input,
        fallback: [],
    });

    return response.data;
}