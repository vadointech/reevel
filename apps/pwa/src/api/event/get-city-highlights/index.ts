import { fetcherClient } from "@/api/fetcher-client";
import { EventEntity } from "@/entities/event";

export namespace GetCityHighlights {
    export type TInput = null;
    export type TOutput = EventEntity[];
    export type TParams = {
        city: string;
        limit?: number;
    };

    export const queryKey = ["events/highlights"];
}

export const getCityHighlights = fetcherClient.fetch<GetCityHighlights.TInput, GetCityHighlights.TOutput, GetCityHighlights.TParams>({
    fetcherFunc: (fetcher, input) => {
        return fetcher.get("/events/highlights", input);
    },
});