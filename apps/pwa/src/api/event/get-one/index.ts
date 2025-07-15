import { fetcherClient } from "@/api/fetcher-client";
import { EventEntity } from "@/entities/event";

export namespace GetEvent {
    export type TInput = {
        eventId: string;
    };
    export type TOutput = EventEntity;
    export const queryKey = ["events"];
}

export const getEvent = fetcherClient.fetch<GetEvent.TInput, GetEvent.TOutput>({
    fetcherFunc: (fetcher, { body, ...input }) => {
        return fetcher.get(`/events/${body?.eventId}`, input);
    },
});