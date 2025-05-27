import { DataSource } from "typeorm";
import { Injectable } from "@nestjs/common";
import { Repository } from "@/modules/repository";
import { InterestsEntity } from "@/modules/interests/entities/interests.entity";

@Injectable()
export class InterestsRepository extends Repository<InterestsEntity> {
    constructor(dataSource: DataSource) {
        super(dataSource, InterestsEntity);
    }
}