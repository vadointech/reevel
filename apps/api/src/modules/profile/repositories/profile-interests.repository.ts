import { DataSource } from "typeorm";
import { Injectable } from "@nestjs/common";
import { Repository } from "@/modules/repository";
import { ProfileInterestsEntity } from "@/modules/profile/entities/profile-interests.entity";

@Injectable()
export class ProfileInterestsRepository extends Repository<ProfileInterestsEntity> {
    constructor(dataSource: DataSource) {
        super(dataSource, ProfileInterestsEntity);
    }

    getUserInterests(userId: string) {
        return this.findMany({
            where: { profile: { userId } },
        });
    }
}