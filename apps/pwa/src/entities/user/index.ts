import { UserProfileEntity } from "@/entities/profile";

export type UserEntity = {
    id: string;
    email: string;
    profile: UserProfileEntity;
    // sessions: UserSessionEntity[]
};