import { Injectable } from "@nestjs/common";
import { Repository } from "@/modules/repository";
import { ProfileEntity } from "@/modules/profile/entities/profile.entity";
import { DataSource } from "typeorm";

@Injectable()
export class ProfileRepository extends Repository<ProfileEntity> {
    constructor(dataSource: DataSource) {
        super(dataSource, ProfileEntity);
    }
}