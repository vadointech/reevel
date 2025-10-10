import { fetcherClient } from "@/api/client";
import { EventEntity } from "@/entities/event";

export namespace GetEventCityHighlightsCollection {
    export type TInput = null;
    export type TOutput = EventEntity[];
}

export const getEventCityHighlightsCollection = fetcherClient.fetch<GetEventCityHighlightsCollection.TInput, GetEventCityHighlightsCollection.TOutput>({
    fetcherFunc: (fetcher, input) => {
        return fetcher.get("/events/collections/highlights", input);
    },
});