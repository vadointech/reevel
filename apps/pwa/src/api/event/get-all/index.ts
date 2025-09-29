import { fetcherClient } from "@/api/client";
import { EventEntity } from "@/entities/event";

export namespace GetAllEvents {
    export type TInput = null;
    export type TOutput = EventEntity[];
    export const queryKey = ["events"];
}

export const getAllEvents = fetcherClient.fetch<GetAllEvents.TInput, GetAllEvents.TOutput>({
    fetcherFunc: (fetcher, input) => {
        return fetcher.get("/events", input);
    },
});