import { Injectable } from "@nestjs/common";
import { SubscriptionEntity } from "./entities/subscription.entity";
import { DataSource } from "typeorm";
import { Repository } from "@/modules/repository";

@Injectable()
export class SubscriptionRepository extends Repository<SubscriptionEntity> {
    constructor(dataSource: DataSource) {
        super(dataSource, SubscriptionEntity);
    }
}