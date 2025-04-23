import { BaseRepository } from "@/modules/repository";
import { EventInterestsEntity } from "../entities/event-interests.entity";
import { DataSource, DeleteResult, EntityManager } from "typeorm";

interface IEventInterestsRepository {
    create(eventId: string, input: string[], entityManager: EntityManager): Promise<EventInterestsEntity[]>;
    deleteAll(eventId: string, entityManager: EntityManager): Promise<DeleteResult>;
}

export class EventInterestsRepository extends BaseRepository implements IEventInterestsRepository {
    constructor(dataSource: DataSource) {
        super(dataSource);
    }

    create(eventId: string, input: string[], entityManager?: EntityManager): Promise<EventInterestsEntity[]> {
        return this.query(EventInterestsEntity, (repository) => {
            return repository.save(
                repository.create(
                    input.map(interestId => ({ eventId, interestId })),
                ),
            );
        }, entityManager);
    }

    deleteAll(eventId: string, entityManager: EntityManager): Promise<DeleteResult> {
        return this.query(EventInterestsEntity, async(repository) => {
            return repository.delete({ eventId });
        }, entityManager);
    }
}