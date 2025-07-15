import { fetcherClient } from "@/api/fetcher-client";
import { EventEntity } from "@/entities/event";
import { GetNearbyEvents } from "@/api/event";

export namespace GetEventCityHighlightsCollection {
    export type TInput = GetNearbyEvents.TInput;
    export type TOutput = EventEntity[];
    export const queryKey = ["events/collections/highlights"];
}

export const getEventCityHighlightsCollection = fetcherClient.fetch<GetEventCityHighlightsCollection.TInput, GetEventCityHighlightsCollection.TOutput>({
    fetcherFunc: (fetcher, input) => {
        return fetcher.post("/events/collections/highlights", input);
    },
});