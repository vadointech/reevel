import { InterestEntity } from "@/entities/interests";

export type UserProfileEntity = {
    id: string;
    userId: string;
    fullName?: string;
    bio?: string;
    picture?: string;
    completed: number;
    location?: ProfileLocationsEntity;
    interests?: ProfileInterestsEntity[];
};

export type ProfileInterestsEntity = {
    profileId: string;
    interestId: string;
    interest: InterestEntity;
};

export type ProfileLocationsEntity = {
    id: string;
    profileId: string;
    center: {
        type: "Point";
        coordinates: [number, number];
    }
    bbox: {
        type: "Polygon";
        coordinates: number[][][]
    }
};