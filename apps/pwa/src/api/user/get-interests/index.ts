import { ProfileInterestsEntity } from "@/entities/profile";
import { fetcherClient } from "@/api/fetcher-client";
import { GetSession } from "@/api/auth/get-session";

export namespace GetCurrentUserInterests {
    export type TInput = null;
    export type TOutput = ProfileInterestsEntity[];

    export const queryKey = ["user/interests", ...GetSession.queryKey];
}

export const getCurrentUserInterests = fetcherClient<GetCurrentUserInterests.TInput, GetCurrentUserInterests.TOutput>({
    fetcherFunc: (fetcher, input) => {
        return fetcher.get("/users/me/interests", {
            ...input,
            cache: "force-cache",
            next: {
                tags: GetCurrentUserInterests.queryKey,
                revalidate: false,
            },
        });
    },
});