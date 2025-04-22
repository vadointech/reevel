import { Injectable } from "@nestjs/common";
import { Repository } from "@/modules/repository";
import { DataSource, DeepPartial, EntityManager } from "typeorm";
import { EventsEntity } from "@/modules/event/entities/events.entity";
import { EventInterestsEntity } from "@/modules/event/entities/event-interests.entity";

interface IEventRepository {
    create(input: DeepPartial<EventsEntity>, entityManager?: EntityManager): Promise<EventsEntity>;
    delete(id: string, entityManager?: EntityManager): Promise<boolean>;

    createInterests(input: DeepPartial<EventInterestsEntity[]>, entityManager?: EntityManager): Promise<EventInterestsEntity[]>;
    deleteInterests(id: string, entityManager?: EntityManager): Promise<boolean>;

    getByID(id: string, entityManager?: EntityManager): Promise<EventsEntity | null>;
}

@Injectable()
export class EventRepository extends Repository implements IEventRepository {
    constructor(dataSource: DataSource) {
        super(dataSource);
    }

    create(input: DeepPartial<EventsEntity>, entityManager?: EntityManager): Promise<EventsEntity> {
        return this.query(EventsEntity, (repository) => {
            return repository.save(
                repository.create(input),
            );
        }, entityManager);
    }

    async delete(id: string, entityManager?: EntityManager): Promise<boolean> {
        await this.query(EventsEntity, (repository) => {
            return repository.delete({ id });
        }, entityManager);
        return true;
    }

    async deleteInterests(eventId: string, entityManager?: EntityManager): Promise<boolean> {
        await this.query(EventInterestsEntity, (repository) => {
            return repository.delete({ eventId });
        }, entityManager);
        return true;
    }

    createInterests(input: DeepPartial<EventInterestsEntity[]>, entityManager?: EntityManager): Promise<EventInterestsEntity[]> {
        return this.query(EventInterestsEntity, (repository) => {
            return repository.save(
                repository.create(input),
            );
        }, entityManager);
    }

    getByID(id: string, entityManager?: EntityManager): Promise<EventsEntity | null> {
        return this.query(EventsEntity, (repository) => {
            return repository.findOne({
                where: { id },
            });
        }, entityManager);
    }
}