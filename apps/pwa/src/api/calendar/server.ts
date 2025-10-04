"use server";

import * as GetUserCalendarEventsRequest from "./get-events";
import { getAccessToken } from "@/api/server";

export async function getUserCalendarEvents(input: GetUserCalendarEventsRequest.GetUserCalendarEvents.TParams = {}) {
    const accessToken = await getAccessToken();

    const response = await GetUserCalendarEventsRequest.getUserCalendarEvents({
        authorization: {
            method: "Bearer",
            token: accessToken,
        },
        params: input,
        fallback: {
            events: [],
            pagination: {
                currentPage: 1,
                totalPages: 0,
                totalItems: 0,
                limit: 10,
            },
        },
    });

    return response.data;
}