import { UserProfileEntity } from "@/entities/profile";
import { fetcherClient } from "@/api/client";

export namespace UpdateProfile {
    export type TInput = Partial<{
        bio: string;
        fullName: string;
        picture: string;
        completed: number;
        locationCenter: number[],
        locationBbox?: number[],
        interests: string[];
    }>;
    export type TOutput = UserProfileEntity | null;
}

export const updateProfile = fetcherClient.fetch<UpdateProfile.TInput, UpdateProfile.TOutput>({
    fetcherFunc: (fetcher, input) => {
        return fetcher.patch("/profile", input);
    },
});