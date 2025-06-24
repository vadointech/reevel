import { EventEntity } from "@/entities/event";
import { fetcherClient } from "@/api/fetcher-client";

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
    };
    export type TOutput = EventEntity[];

    export const queryKey = ["events/nearby"];
}

export const getNearbyEvents = fetcherClient.fetch<GetNearbyEvents.TInput, GetNearbyEvents.TOutput>({
    fetcherFunc: (fetcher, input) => {
        return fetcher.post("/events/nearby", input);
    },
});