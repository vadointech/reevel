import { Injectable } from "@nestjs/common";
import { BaseRepository } from "@/modules/repository";
import { DataSource, DeepPartial, EntityManager } from "typeorm";
import { EventTicketsEntity } from "@/modules/event/entities/event-tickets.entity";

interface ITicketRepository {
    create(
        input: DeepPartial<EventTicketsEntity>,
        entityManager?: EntityManager
    ): Promise<EventTicketsEntity>;

    deleteByID(ticketId: string, entityManager?: EntityManager): Promise<boolean>;
    getOneByUserID(userId: string, eventId: string): Promise<EventTicketsEntity | null>;
    getOneByInvoiceID(invoiceId: string): Promise<EventTicketsEntity | null>;

    getByEventID(eventId: string): Promise<EventTicketsEntity[]>;
    countAvailable(eventId: string): Promise<number>;
}

@Injectable()
export class EventTicketsRepository extends BaseRepository implements ITicketRepository {
    constructor(dataSource: DataSource) {
        super(dataSource);
    }

    create(input: DeepPartial<EventTicketsEntity>, entityManager?: EntityManager): Promise<EventTicketsEntity> {
        return this.queryRunner.create(EventTicketsEntity, input, entityManager);
    }

    deleteByID(ticketId: string, entityManager?: EntityManager): Promise<boolean> {
        return this.queryRunner.delete(EventTicketsEntity, { id: ticketId }, entityManager);
    }

    getOneByUserID(userId: string, eventId: string, entityManager?: EntityManager): Promise<EventTicketsEntity | null> {
        return this.query(EventTicketsEntity, (repository) => {
            return repository.findOneBy({ userId, eventId });
        }, entityManager);
    }

    getOneByInvoiceID(invoiceId: string): Promise<EventTicketsEntity | null> {
        return this.queryRunner.getOne(EventTicketsEntity, {
            where: {
                payment: {
                    invoiceId,
                },
            },
            relations: {
                payment: true,
            },
        });
    }

    getByEventID(eventId: string, entityManager?: EntityManager): Promise<EventTicketsEntity[]> {
        return this.query(EventTicketsEntity, (repository) => {
            return repository.find({
                where: { eventId },
                relations: {
                    payment: true,
                    user: true,
                },
            });
        }, entityManager);
    }

    countAvailable(eventId: string, entityManager?: EntityManager): Promise<number> {
        return this.query(EventTicketsEntity, (repository) => {
            return repository.countBy({ eventId });
        }, entityManager);
    }
}