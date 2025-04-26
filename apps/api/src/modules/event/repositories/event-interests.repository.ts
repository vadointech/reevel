import { Repository } from "@/modules/repository";
import { EventInterestsEntity } from "../entities/event-interests.entity";
import { DataSource, EntityManager } from "typeorm";

interface IEventInterestsRepository {
    createInterests(
        eventId: string,
        input: string[],
        entityManager?: EntityManager
    ): Promise<EventInterestsEntity[]>;
    updateInterests(
        eventId: string,
        input: string[],
        entityManager?: EntityManager
    ): Promise<EventInterestsEntity[]>
}

export class EventInterestsRepository extends Repository<EventInterestsEntity> implements IEventInterestsRepository {
    constructor(dataSource: DataSource) {
        super(dataSource, EventInterestsEntity);
    }

    async createInterests(eventId: string, input: string[], entityManager?: EntityManager): Promise<EventInterestsEntity[]> {
        return this.createMany(
            input.map(interestId => ({ eventId, interestId })),
            entityManager,
        );
    }

    async updateInterests(eventId: string, input: string[], entityManager?: EntityManager): Promise<EventInterestsEntity[]> {
        await this.delete({ eventId }, entityManager);
        return await this.createInterests(eventId, input, entityManager);
    }
}