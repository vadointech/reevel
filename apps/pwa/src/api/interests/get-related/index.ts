import { InterestEntity } from "@/entities/interests";
import { fetcherClient } from "@/api/fetcher-client";

export namespace GetRelatedInterests {
    export type TInput = {
        slug: string;
    };

    export type TOutput = InterestEntity[];

    export const queryKey = ["/interests/related"];
}
export const getRelatedInterests = fetcherClient.fetch<GetRelatedInterests.TInput, GetRelatedInterests.TOutput>({
    fetcherFunc: (fetcher, { body, ...input }) => {
        return fetcher.get(`/interests/related/${body?.slug}`, input);
    },
});