import { UserEntity } from "@/entities/user";

export type UserSessionEntity = {
    id: string;
    userAgent?: string;
    ipAddress?: string;
    expiresAt: Date;
    createdAt: Date;
    updatedAt: Date;
    userId: string;
    user: UserEntity;
};