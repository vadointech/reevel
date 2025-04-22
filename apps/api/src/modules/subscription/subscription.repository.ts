import { Injectable } from "@nestjs/common";
import { SubscriptionEntity } from "./entities/subscription.entity";
import { DataSource, DeepPartial, EntityManager } from "typeorm";
import { Repository } from "@/modules/repository";

export interface ISubscriptionRepository {
    create(input: SubscriptionEntity, entityManager?: EntityManager): Promise<SubscriptionEntity>
}

@Injectable()
export class SubscriptionRepository extends Repository implements ISubscriptionRepository {
    constructor(dataSource: DataSource) {
        super(dataSource);
    }

    create(input: DeepPartial<SubscriptionEntity>, entityManager?: EntityManager): Promise<SubscriptionEntity> {
        return this.query(SubscriptionEntity, (repository) => {
            return repository.save(
                repository.create(input),
            );
        }, entityManager);
    }
}