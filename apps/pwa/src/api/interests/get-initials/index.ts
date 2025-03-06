import { InterestEntity } from "@/entities/interests";
import { fetcherClient } from "@/api/fetcher-client";

export namespace GetInitialInterests {
    export type TInput = null;
    export type TOutput = InterestEntity[];

    export const queryKey = ["interests/initials"];
}

export const getInitialInterests = fetcherClient<GetInitialInterests.TInput, GetInitialInterests.TOutput>({
    fetcherFunc: (fetcher, input) => {
        return fetcher.get("/interests/initials", {
            ...input,
            cache: "force-cache",
            next: {
                tags: GetInitialInterests.queryKey,
                revalidate: false,
            },
        });
    },
});