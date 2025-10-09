import { fetcherClient } from "@/api/client";

export namespace ReportEvent {
    export type TInput = {
        eventId: string;
        type: string;
        description?: string;
    };

    export type TOutput = null;
}

export const reportEvent = fetcherClient.fetch<ReportEvent.TInput, ReportEvent.TOutput>({
    fetcherFunc: (fetcher, { body, ...input }) => {
        const { eventId, ...rest } = body;
        return fetcher.post(`/reports/event/${eventId}`, {
            ...input,
            body: rest,
        });
    },
});