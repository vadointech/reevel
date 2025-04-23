import { Injectable } from "@nestjs/common";
import { BaseRepository } from "@/modules/repository";
import { ProfileEntity } from "@/modules/profile/entities/profile.entity";
import { DataSource, DeepPartial, EntityManager } from "typeorm";

interface IProfileRepository {
    create(input: DeepPartial<ProfileEntity>, entityManager?: EntityManager): Promise<ProfileEntity>;
}

@Injectable()
export class ProfileRepository extends BaseRepository implements IProfileRepository {
    constructor(dataSource: DataSource) {
        super(dataSource);
    }

    create(input: DeepPartial<ProfileEntity>, entityManager?: EntityManager): Promise<ProfileEntity> {
        return this.query(ProfileEntity, (repository) => {
            return repository.save(
                repository.create(input),
            );
        }, entityManager);
    }
}