import { InterestEntity } from "@/entities/interests";
import { fetcherClient } from "@/api/fetcher-client";

export namespace GetRelatedInterests {
    export type TInput = {
        slug: string;
    };

    export type TOutput = InterestEntity[];
}
export const getRelatedInterests = fetcherClient<GetRelatedInterests.TInput, GetRelatedInterests.TOutput>({
    fetcherFunc: (fetcher, input) => {
        return fetcher.get(`/interests/related/${input?.body?.slug}`);
    },
});