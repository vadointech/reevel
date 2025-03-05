import { InterestEntity } from "@/entities/interests";

export type UserProfileEntity = {
    id: string;
    userId: string;
    fullName?: string;
    bio?: string;
    picture?: string;
    location?: {
        type: "Point";
        coordinates: [number, number];
    };
    interests?: Array<{
        profileId: string;
        interestId: string;
        interest: InterestEntity;
    }>
};