import { EventPointEntity } from "@/entities/event";
import { fetcherClient } from "@/api/client";

export namespace GetNearbyEvents {
    export type TInput = null;
    export type TParams = {
        tileId: string;
        zoom: number;
        filter?: string;
    };
    export type TOutput = EventPointEntity[];
}

export const getNearbyEvents = fetcherClient.fetch<GetNearbyEvents.TInput, GetNearbyEvents.TOutput, GetNearbyEvents.TParams>({
    fetcherFunc: (fetcher, input) => {
        return fetcher.get("/events/nearby", input);
    },
});