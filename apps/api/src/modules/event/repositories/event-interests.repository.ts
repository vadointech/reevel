import { Injectable } from "@nestjs/common";
import { Repository } from "@/modules/repository";
import { EventInterestsEntity } from "../entities/event-interests.entity";
import { DataSource, EntityManager } from "typeorm";

@Injectable()
export class EventInterestsRepository extends Repository<EventInterestsEntity> {
    constructor(dataSource: DataSource) {
        super(dataSource, EventInterestsEntity);
    }

    async createInterests(eventId: string, input: string[], entityManager?: EntityManager): Promise<EventInterestsEntity[]> {
        return this.createAndSaveMany(
            input.map(interestId => ({ eventId, interestId })),
            entityManager,
        );
    }

    async updateInterests(eventId: string, input: string[], entityManager?: EntityManager): Promise<EventInterestsEntity[]> {
        await this.delete({ eventId }, entityManager);
        return await this.createInterests(eventId, input, entityManager);
    }
}