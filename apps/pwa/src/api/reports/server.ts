"use server";

import { getAccessToken } from "@/api/server";

import * as ReportEventRequest from "@/api/reports/report-event";

export async function reportEvent(input: ReportEventRequest.ReportEvent.TInput) {
    const accessToken = await getAccessToken();

    const response = await ReportEventRequest.reportEvent({
        body: input,
        authorization: {
            method: "Bearer",
            token: accessToken,
        },
    });

    return response.data;
}