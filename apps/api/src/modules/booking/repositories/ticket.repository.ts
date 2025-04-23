import { Injectable } from "@nestjs/common";
import { BaseRepository } from "@/modules/repository";
import { DataSource, DeepPartial, EntityManager } from "typeorm";
import { TicketsEntity } from "@/modules/booking/entities/tickets.entity";

interface ITicketRepository {
    create(input: TicketsEntity): Promise<TicketsEntity>;
    getByEventID(eventId: string): Promise<TicketsEntity[]>;
    getByUserID(userId: string, eventId: string): Promise<TicketsEntity | null>;
    countByEventID(eventId: string): Promise<number>;
}

@Injectable()
export class TicketRepository extends BaseRepository implements ITicketRepository {
    constructor(dataSource: DataSource) {
        super(dataSource);
    }

    create(input: DeepPartial<TicketsEntity>, entityManager?: EntityManager): Promise<TicketsEntity> {
        return this.query(TicketsEntity, (repository) => {
            return repository.save(
                repository.create(input),
            );
        }, entityManager);
    }

    getByEventID(eventId: string, entityManager?: EntityManager): Promise<TicketsEntity[]> {
        return this.query(TicketsEntity, (repository) => {
            return repository.find({
                where: { eventId },
                relations: {
                    payment: true,
                    user: true,
                },
            });
        }, entityManager);
    }

    getByUserID(userId: string, eventId: string, entityManager?: EntityManager): Promise<TicketsEntity | null> {
        return this.query(TicketsEntity, (repository) => {
            return repository.findOneBy({ userId, eventId });
        }, entityManager);
    }

    countByEventID(eventId: string, entityManager?: EntityManager): Promise<number> {
        return this.query(TicketsEntity, (repository) => {
            return repository.countBy({ eventId });
        }, entityManager);
    }
}