import { InterestEntity } from "@/entities/interests";
import { fetcherClient } from "@/api/fetcher-client";

export namespace SearchInterests {
    export type TInput = {
        s?: string;
    };
    export type TOutput = InterestEntity[];

    export const queryKey = ["interests/search?s="];
}

export const searchInterests = fetcherClient<SearchInterests.TInput, SearchInterests.TOutput>({
    fetcherFunc: (fetcher, input) => {
        return fetcher.get("/interests/search", {
            params: input?.params,
            cache: "no-store",
            next: {
                tags: SearchInterests.queryKey,
                revalidate: false,
            },
        });
    },
});
