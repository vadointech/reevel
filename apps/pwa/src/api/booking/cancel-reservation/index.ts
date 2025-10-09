import { fetcherClient } from "@/api/client";

export namespace CancelTicketReservation {
    export type TInput = {
        eventId: string;
    };
    export type TOutput = null;
}

export const cancelTicketReservation = fetcherClient.fetch<CancelTicketReservation.TInput, CancelTicketReservation.TOutput>({
    fetcherFunc: (fetcher, { body, ...input }) => {
        return fetcher.delete(`/events/booking/cancel/${body.eventId}`, input);
    },
});