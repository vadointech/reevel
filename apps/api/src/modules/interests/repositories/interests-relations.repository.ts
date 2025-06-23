import { DataSource } from "typeorm";
import { Injectable } from "@nestjs/common";
import { Repository } from "@/modules/repository";
import { InterestRelationsEntity } from "@/modules/interests/entities/interest-relations.entity";

@Injectable()
export class InterestsRelationsRepository extends Repository<InterestRelationsEntity> {
    constructor(dataSource: DataSource) {
        super(dataSource, InterestRelationsEntity);
    }
}