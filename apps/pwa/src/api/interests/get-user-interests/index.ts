import { InterestEntity, UserInterests } from "@/entities/interests";
import { fetcherClient } from "@/api/fetcher-client";
import { GetSession } from "@/api/auth/get-session";

export namespace GetUserInterests {
    export type TInput = null;

    export type TOutput = InterestEntity[];

    export const queryKey = ["profile/interests", ...GetSession.queryKey];
}
export const getUserInterests = fetcherClient<GetUserInterests.TInput, GetUserInterests.TOutput>({
    fetcherFunc: (fetcher, input) => {
        return fetcher.get(`/profile/interests`, {
            ...input,
            cache: "force-cache",
            next: {
                tags: GetUserInterests.queryKey,
                revalidate: false,
            },
        });
    },
});