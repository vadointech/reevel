import { Injectable } from "@nestjs/common";
import { UserEntity } from "@/modules/user/entities/user.entity";
import { DataSource } from "typeorm";
import { Repository } from "@/modules/repository";

@Injectable()
export class UserRepository extends Repository<UserEntity> {
    constructor(dataSource: DataSource) {
        super(dataSource, UserEntity);
    }

    async getByEmail(email: string): Promise<UserEntity | null> {
        return this.findOne({
            where: { email },
            relations: {
                profile: {
                    location: true,
                },
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
                // sessions: true,
                profile: {
                    location: true,
                    interests: true,
                },
                subscription: true,
            },
            select: {
                id: true,
                email: true,
                // sessions: {
                //     id: true,
                // },
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