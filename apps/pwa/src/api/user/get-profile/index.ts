import { UserProfileEntity } from "@/entities/profile";
import { fetcherClient } from "@/api/fetcher-client";

export namespace GetCurrentUserProfile {
    export type TInput = null;
    export type TOutput = UserProfileEntity;

    export const queryKey = ["user/profile"];
}

export const getCurrentUserProfile = fetcherClient.fetch<GetCurrentUserProfile.TInput, GetCurrentUserProfile.TOutput>({
    fetcherFunc: (fetcher, input) => {
        return fetcher.get("/users/me/profile", input);
    },
});