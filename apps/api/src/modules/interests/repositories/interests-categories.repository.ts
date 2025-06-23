import { DataSource } from "typeorm";
import { Injectable } from "@nestjs/common";
import { Repository } from "@/modules/repository";
import { InterestCategoriesEntity } from "@/modules/interests/entities/interest-category.entity";

@Injectable()
export class InterestsCategoriesRepository extends Repository<InterestCategoriesEntity> {
    constructor(dataSource: DataSource) {
        super(dataSource, InterestCategoriesEntity);
    }
}