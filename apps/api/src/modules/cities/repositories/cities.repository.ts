import { DataSource } from "typeorm";
import { Injectable } from "@nestjs/common";
import { Repository } from "@/modules/repository";
import { CitiesEntity } from "../entities/cities.entity";

@Injectable()
export class CitiesRepository extends Repository<CitiesEntity> {
    constructor(dataSource: DataSource) {
        super(dataSource, CitiesEntity);
    }
}