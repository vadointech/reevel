import { EventEntity } from "@/entities/event";
import { fetcherClient } from "@/api/client";

export namespace GetNearbyEvents {
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

    export const queryKey = ["events/nearby"];
}

export const getNearbyEvents = fetcherClient.fetch<GetNearbyEvents.TInput, GetNearbyEvents.TOutput>({
    fetcherFunc: (fetcher, input) => {
        return fetcher.post("/events/nearby", input);
    },
});