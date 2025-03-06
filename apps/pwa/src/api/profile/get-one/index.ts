import { UserProfileEntity } from "@/entities/profile";
import { fetcherClient } from "@/api/fetcher-client";
import { GetSession } from "@/api/auth/get-session";

export namespace GetUserProfile {
    export type TInput = null;
    export type TOutput = UserProfileEntity;

    export const queryKey = ["profile", ...GetSession.queryKey];
}

export const getUserProfile = fetcherClient<GetUserProfile.TInput, GetUserProfile.TOutput>({
    fetcherFunc: (fetcher, input) => {
        return fetcher.get("/profile", {
            ...input,
            cache: "force-cache",
            next: {
                tags: GetUserProfile.queryKey,
                revalidate: false,
            },
        });
    },
});