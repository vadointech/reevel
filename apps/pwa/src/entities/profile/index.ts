import { InterestEntity } from "@/entities/interests";
import { CitiesEntity } from "@/entities/cities";

export type UserProfileEntity = {
    id: string;
    userId: string;
    fullName?: string;
    bio?: string;
    picture?: string;
    completed: number;
    location?: CitiesEntity;
    interests?: ProfileInterestsEntity[];
};

export type ProfileInterestsEntity = {
    profileId: string;
    interestId: string;
    interest: InterestEntity;
};