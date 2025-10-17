import { ProfileInterestsEntity } from "@/entities/profile";
import { fetcherClient } from "@/api/client";

export namespace GetCurrentUserInterests {
    export type TInput = null;
    export type TOutput = ProfileInterestsEntity[];
}

export const getCurrentUserInterests = fetcherClient.fetch<GetCurrentUserInterests.TInput, GetCurrentUserInterests.TOutput>({
    fetcherFunc: (fetcher, input) => {
        return fetcher.get("/users/me/interests", input);
    },
});