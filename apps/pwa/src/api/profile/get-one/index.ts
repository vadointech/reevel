import { UserProfileEntity } from "@/entities/profile";
import { fetcherClient } from "@/api/fetcher-client";

export namespace GetUserProfile {
    export type TInput = null;
    export type TOutput = UserProfileEntity;
}

export const getUserProfile = fetcherClient<GetUserProfile.TInput, GetUserProfile.TOutput>({
    fetcherFunc: (fetcher, input) => {
        return fetcher.get("/profile", input);
    },
});