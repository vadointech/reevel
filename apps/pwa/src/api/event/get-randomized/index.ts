import { fetcherClient } from "@/api/client";
import { EventEntity } from "@/entities/event";

export namespace GetRandomizedEvents {
    export type TInput = {
        circle: {
            center: {
                longitude: number;
                latitude: number;
            };
            radius: number;
        }
        take?: number;
        interests?: string[]
    };
    export type TOutput = EventEntity[];
}

export const getRandomizedEvents = fetcherClient.fetch<GetRandomizedEvents.TInput, GetRandomizedEvents.TOutput>({
    fetcherFunc: (fetcher, input) => {
        return fetcher.post("/events/collections/randomized", input);
    },
});