import { ProfileInterestsEntity } from "@/entities/profile";
import { fetcherClient } from "@/api/fetcher-client";

export namespace GetCurrentUserInterests {
    export type TInput = null;
    export type TOutput = ProfileInterestsEntity[];

    export const queryKey = ["user/interests"];
}

export const getCurrentUserInterests = fetcherClient.fetch<GetCurrentUserInterests.TInput, GetCurrentUserInterests.TOutput>({
    fetcherFunc: (fetcher, input) => {
        return fetcher.get("/users/me/interests", {
            ...input,
            cache: "no-store",
        });
    },
});