import { Injectable } from "@nestjs/common";
import { UserEntity } from "@/modules/user/entities/user.entity";
import { DataSource, DeepPartial, EntityManager } from "typeorm";
import { Repository } from "@/modules/repository";

interface IUserRepository {
    create(input: UserEntity, entityManager?: EntityManager): Promise<UserEntity>;
    getByID(id: string): Promise<UserEntity | null>;
    getByEmail(email: string): Promise<UserEntity | null>;
    getSession(userId: string): Promise<UserEntity | null>;
}

@Injectable()
export class UserRepository extends Repository implements IUserRepository {
    constructor(dataSource: DataSource) {
        super(dataSource);
    }

    create(input: DeepPartial<UserEntity>, entityManager?: EntityManager): Promise<UserEntity> {
        return this.query(UserEntity, (repository) => {
            return repository.save(
                repository.create(input),
            );
        }, entityManager);
    }

    getByID(id: string): Promise<UserEntity | null> {
        return this.repository(UserEntity).findOne({
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

    getByEmail(email: string): Promise<UserEntity | null> {
        return this.repository(UserEntity).findOne({
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
        return this.repository(UserEntity).findOne({
            where: { id: userId },
            relations: {
                profile: true,
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