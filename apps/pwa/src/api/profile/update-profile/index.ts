import { UserProfileEntity } from "@/entities/profile";
import { fetcherClient } from "@/api/fetcher-client";

export namespace UpdateProfile {
    export type TInput = Partial<{
        bio: string;
        fullName: string;
        picture: string;
        completed: string;
        location: [number, number];
        interests: string[];
    }>;
    export type TOutput = Partial<{
        bio: string;
        fullName: string;
        picture: string;
        location: UserProfileEntity["location"];
        interests: string[];
    }>;
}

export const updateProfile = fetcherClient<UpdateProfile.TInput, UpdateProfile.TOutput>({
    fetcherFunc: (fetcher, input) => {
        return fetcher.patch("/profile", input);
    },
});