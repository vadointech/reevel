import { fetcherClient } from "@/api/client";
import { InterestEntity } from "@/entities/interests";

export namespace GetInterestsByTitle {
    export type TInput = null;
    export type TParams = {
        title_en?: string;
        title_uk?: string;
    };
    export type TOutput = InterestEntity[];
    export const queryKey = ["interests/search"];
}

export const getInterestsByTitle = fetcherClient.fetch<GetInterestsByTitle.TInput, GetInterestsByTitle.TOutput, GetInterestsByTitle.TParams>({
    fetcherFunc: (fetcher, input) => {
        return fetcher.get("/interests", input);
    },
});