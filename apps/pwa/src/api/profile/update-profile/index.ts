"use server";

import { serverFetcher } from "@/api/server";
import { headers } from "next/headers";
import { UserProfileEntity } from "@/entities/profile";

export namespace UpdateProfile {
    export type TInput = Partial<{
        bio: string;
        fullName: string;
        picture: string;
        completed: string;
        location: string; // Format "lng,lat"
        interests: string; // Format: "interest,interest,..."
    }>;
    export type TOutput = Partial<{
        bio: string;
        fullName: string;
        picture: string;
        location: UserProfileEntity["location"];
        interests: string[];
    }>;
}

export async function updateProfile({ interests, location, ...input }: UpdateProfile.TInput) {
    type Body = Omit<UpdateProfile.TInput, "interests" | "location"> & {
        interests?: string[];
        location?: string[];
    };

    const body: Body = input;

    if(interests && interests.length > 0) {
        body.interests = interests.split(",");
    }

    if(location && location.length > 0) {
        body.location = location.split(",");
    }

    return await serverFetcher(await headers()).patch<any, UpdateProfile.TOutput>("/profile", { body });
}