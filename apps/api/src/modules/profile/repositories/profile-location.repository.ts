import { Repository } from "@/modules/repository";
import { ProfileLocationsEntity } from "@/modules/profile/entities/profile-location.entity";
import { DataSource } from "typeorm";

export class ProfileLocationRepository extends Repository<ProfileLocationsEntity> {
    constructor(dataSource: DataSource) {
        super(dataSource, ProfileLocationsEntity);
    }
}