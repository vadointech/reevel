import { Injectable } from "@nestjs/common";
import { DataSource, EntityManager } from "typeorm";
import { Repository } from "@/modules/repository";
import { EventHostsEntity } from "../entities/event-hosts.entity";

interface IEventHostsRepository {
    createHosts(
        eventId: string,
        input: string[],
        entityManager?: EntityManager
    ): Promise<EventHostsEntity[]>
    countMonthlyHosted(
        userId: string,
        entityManager?: EntityManager
    ): Promise<number>;
}

@Injectable()
export class EventHostsRepository extends Repository<EventHostsEntity> implements IEventHostsRepository {
    constructor(dataSource: DataSource) {
        super(dataSource, EventHostsEntity);
    }

    async createHosts(eventId: string, input: string[], entityManager?: EntityManager): Promise<EventHostsEntity[]> {
        return this.createAndSaveMany(
            input.map(userId => ({ eventId, userId })),
            entityManager,
        );
    }

    async countMonthlyHosted(userId: string, entityManager?: EntityManager): Promise<number> {
        const userEvents = await this.findMany({
            where: { userId },
            relations: {
                event: true,
            },
            select: {
                event: {
                    createdAt: true,
                },
            },
        }, entityManager);

        const now = new Date();
        const monthAgo = new Date(now.getDate() - 30);

        return userEvents.filter(item => {
            return item.event.createdAt >= monthAgo && item.event.createdAt <= now;
        }).length;
    }
}