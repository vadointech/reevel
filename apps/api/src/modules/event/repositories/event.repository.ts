import { Injectable } from "@nestjs/common";
import { BaseRepository } from "@/modules/repository";
import { DataSource, DeepPartial, EntityManager } from "typeorm";
import { EventsEntity } from "@/modules/event/entities/events.entity";

interface IEventRepository {
    create(input: DeepPartial<EventsEntity>, entityManager: EntityManager): Promise<EventsEntity>;
    delete(id: string, entityManager?: EntityManager): Promise<boolean>;
    getByID(id: string, entityManager?: EntityManager): Promise<EventsEntity | null>;
}

@Injectable()
export class EventRepository extends BaseRepository implements IEventRepository {
    constructor(dataSource: DataSource) {
        super(dataSource);
    }

    async create(input: DeepPartial<EventsEntity>, entityManager?: EntityManager): Promise<EventsEntity> {
        return this.query(EventsEntity, (repository) => {
            return repository.save(
                repository.create(input),
            );
        }, entityManager);
    };

    async delete(id: string, entityManager?: EntityManager): Promise<boolean> {
        await this.query(EventsEntity, (repository) => {
            return repository.delete({ id });
        }, entityManager);
        return true;
    }

    getByID(id: string, entityManager?: EntityManager): Promise<EventsEntity | null> {
        return this.query(EventsEntity, (repository) => {
            return repository.findOne({
                where: { id },
            });
        }, entityManager);
    }
}