import { Injectable } from "@nestjs/common";
import { DataSource, EntityManager, MoreThan } from "typeorm";
import { BaseRepository } from "@/modules/repository";
import { EventHostsEntity } from "../entities/event-hosts.entity";

interface IEventHostsRepository {
    create(eventId: string, input: string[], entityManager: EntityManager): Promise<EventHostsEntity[]>;
    countMonthly(userId: string, entityManager: EntityManager): Promise<number>;
}

@Injectable()
export class EventHostsRepository extends BaseRepository implements IEventHostsRepository {
    constructor(dataSource: DataSource) {
        super(dataSource);
    }

    create(eventId: string, input: string[], entityManager?: EntityManager): Promise<EventHostsEntity[]> {
        return this.query(EventHostsEntity, (repository) => {
            return repository.save(
                repository.create(
                    input.map(userId => ({ eventId, userId })),
                ),
            );
        }, entityManager);
    }

    countMonthly(userId: string, entityManager?: EntityManager): Promise<number> {
        return this.query(EventHostsEntity, async(repository) => {

            const userEvents = await repository.find({
                where: {
                    userId,
                },
                relations: {
                    event: true,
                },
                select: {
                    event: {
                        createdAt: true,
                    },
                },
            });


            const now = new Date();
            const monthAgo = new Date(now.getDate() - 30);

            return userEvents.filter(item => {
                return item.event.createdAt >= monthAgo && item.event.createdAt <= now;
            }).length;
        }, entityManager);
    }
}