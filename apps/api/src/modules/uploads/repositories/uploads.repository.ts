import { DataSource } from "typeorm";
import { Injectable } from "@nestjs/common";
import { Repository } from "@/modules/repository";
import { UserUploadsEntity } from "@/modules/uploads/entities/uploads.entity";

@Injectable()
export class UploadsRepository extends Repository<UserUploadsEntity> {
    constructor(dataSource: DataSource) {
        super(dataSource, UserUploadsEntity);
    }
}