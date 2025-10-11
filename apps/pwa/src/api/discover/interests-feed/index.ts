import { InterestEntity } from "@/entities/interests";
import { fetcherClient } from "@/api/client";

export namespace GetInterestsFeed {
    export type TInput = null;
    export type TOutput = InterestEntity[];
}

export const getInterestsFeed = fetcherClient.fetch<GetInterestsFeed.TInput, GetInterestsFeed.TOutput>({
    fetcherFunc: (fetcher, input) => {
        return fetcher.get("/discover/interests", input);
    },
});