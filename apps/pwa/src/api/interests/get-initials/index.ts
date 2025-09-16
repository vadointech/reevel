import { InterestEntity } from "@/entities/interests";
import { fetcherClient } from "@/api/client";

export namespace GetInitialInterests {
    export type TInput = null;
    export type TOutput = InterestEntity[];

    export const queryKey = ["interests/initials"];
}

export const getInitialInterests = fetcherClient.fetch<GetInitialInterests.TInput, GetInitialInterests.TOutput>({
    fetcherFunc: (fetcher, input) => {
        return fetcher.get("/interests/initials", input);
    },
});