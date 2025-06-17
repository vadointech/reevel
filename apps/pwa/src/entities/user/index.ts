import { UserProfileEntity } from "@/entities/profile";
import { UserSessionEntity } from "@/entities/session";

export type UserEntity = {
    id: string;
    email: string;
    profile: UserProfileEntity;
    sessions: UserSessionEntity[]
};