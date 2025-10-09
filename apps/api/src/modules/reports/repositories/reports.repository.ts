import { DataSource } from "typeorm";
import { Injectable } from "@nestjs/common";
import { Repository } from "@/modules/repository";
import { ReportsEntity } from "@/modules/reports/entities/reports.entity";

@Injectable()
export class ReportsRepository extends Repository<ReportsEntity> {
    constructor(dataSource: DataSource) {
        super(dataSource, ReportsEntity);
    }
}