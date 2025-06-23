import { DataSource } from "typeorm";
import { Injectable } from "@nestjs/common";
import { Repository } from "@/modules/repository";
import { ProfileLocationsEntity } from "@/modules/profile/entities/profile-location.entity";

@Injectable()
export class ProfileLocationRepository extends Repository<ProfileLocationsEntity> {
    constructor(dataSource: DataSource) {
        super(dataSource, ProfileLocationsEntity);
    }
}