import { fetcherClient } from "@/api/client";
import { InterestEntity } from "@/entities/interests";

export namespace GetEventInterestCollectionsFeed {
    export type TInput = null;
    export type TOutput = InterestEntity[];
}

export const getEventCollectionsFeed = fetcherClient.fetch<GetEventInterestCollectionsFeed.TInput, GetEventInterestCollectionsFeed.TOutput>({
    fetcherFunc: (fetcher, input) => {
        return fetcher.get("/events/collections/interest/feed", input);
    },
});