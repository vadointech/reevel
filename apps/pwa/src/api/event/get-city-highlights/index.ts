import { fetcherClient } from "@/api/client";
import { EventEntity } from "@/entities/event";

export namespace GetEventCityHighlightsCollection {
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

export const getEventCityHighlightsCollection = fetcherClient.fetch<GetEventCityHighlightsCollection.TInput, GetEventCityHighlightsCollection.TOutput>({
    fetcherFunc: (fetcher, input) => {
        return fetcher.post("/events/collections/highlights", input);
    },
});