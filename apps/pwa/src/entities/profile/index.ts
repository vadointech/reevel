import { InterestEntity } from "@/entities/interests";

export type UserProfileEntity = {
    id: string;
    userId: string;
    fullName?: string;
    bio?: string;
    picture?: string;
    completed: "true" | "false" | string;
    location?: {
        type: "Point";
        coordinates: [number, number];
    };
    interests?: ProfileInterestsEntity[];
};

export type ProfileInterestsEntity = {
    profileId: string;
    interestId: string;
    interest: InterestEntity;
};