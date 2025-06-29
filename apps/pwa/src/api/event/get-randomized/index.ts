import { fetcherClient } from "@/api/fetcher-client";
import { EventEntity } from "@/entities/event";
import { GetNearbyEvents } from "@/api/event";

export namespace GetRandomizedEvents {
    export type TInput = GetNearbyEvents.TInput;
    export type TOutput = EventEntity[];
    export const queryKey = ["events/collections/randomized"];
}

export const getRandomizedEvents = fetcherClient.fetch<GetRandomizedEvents.TInput, GetRandomizedEvents.TOutput>({
    fetcherFunc: (fetcher, input) => {
        return fetcher.post("/events/collections/randomized", input);
    },
});