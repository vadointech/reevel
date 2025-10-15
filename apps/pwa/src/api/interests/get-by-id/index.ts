import { InterestEntity } from "@/entities/interests";
import { fetcherClient } from "@/api/client";

export namespace GetInterestById {
    export type TInput = string;
    export type TOutput = InterestEntity;
}

export const getInterestById = fetcherClient.fetch<GetInterestById.TInput, GetInterestById.TOutput>({
    fetcherFunc: (fetcher, { body, ...input }) => {
        return fetcher.get(`/interests/${body}`, input);
    },
});