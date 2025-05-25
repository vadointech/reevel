import { Injectable } from "@nestjs/common";
import { UserEntity } from "@/modules/user/entities/user.entity";
import { DataSource } from "typeorm";
import { Repository } from "@/modules/repository";

interface IUserRepository {
    getByID(id: string): Promise<UserEntity | null>;
    getByEmail(email: string): Promise<UserEntity | null>;
    getSession(userId: string): Promise<UserEntity | null>;
}

@Injectable()
export class UserRepository extends Repository<UserEntity> implements IUserRepository {
    constructor(dataSource: DataSource) {
        super(dataSource, UserEntity);
    }

    async getByID(id: string): Promise<UserEntity | null> {
        return this.findOne({
            where: { id },
            relations: {
                profile: true,
                subscription: true,
            },
            select: {
                profile: {
                    completed: true,
                },
                subscription: {
                    type: true,
                },
            },
        });
    }

    async getByEmail(email: string): Promise<UserEntity | null> {
        return this.findOne({
            where: { email },
            relations: {
                profile: true,
                subscription: true,
            },
            select: {
                profile: {
                    completed: true,
                },
                subscription: {
                    type: true,
                },
            },
        });
    }

    getSession(userId: string): Promise<UserEntity | null> {
        return this.findOne({
            where: { id: userId },
            relations: {
                profile: {
                    location: true,
                },
                subscription: true,
            },
            select: {
                id: true,
                email: true,
                profile: {
                    picture: true,
                    fullName: true,
                    bio: true,
                    completed: true,
                },
                subscription: {
                    type: true,
                },
            },
        });
    }
}