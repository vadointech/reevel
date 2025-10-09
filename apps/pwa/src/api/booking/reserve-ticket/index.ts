import { fetcherClient } from "@/api/client";

export namespace ReserveTicket {
    export type TInput = {
        eventId: string;
    };
    export type TOutput = null;
}

export const reserveTicket = fetcherClient.fetch<ReserveTicket.TInput, ReserveTicket.TOutput>({
    fetcherFunc: (fetcher, { body, ...input }) => {
        return fetcher.post(`/events/booking/reserve/${body.eventId}`, input);
    },
});