import { fetcherClient } from "@/api/fetcher-client";
import { InterestEntity } from "@/entities/interests";

export namespace GetEventCollections {
    export type TInput = null;
    export type TOutput = InterestEntity[];
}

export const getEventCollections = fetcherClient.fetch<GetEventCollections.TInput, GetEventCollections.TOutput>({
    fetcherFunc: (fetcher, input) => {
        return fetcher.get("/events/collections", input);
    },
});