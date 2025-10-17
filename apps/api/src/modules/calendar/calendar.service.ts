import { Injectable } from "@nestjs/common";
import { Brackets } from "typeorm";
import { EventRepository } from "@/modules/event/repositories/event.repository";
import { ServerSession } from "@/types";
import { seedEventAttendees } from "@/utils/users";
import { EventParticipationType, EventsEntity } from "@/modules/event/entities/events.entity";
import {
    GetUserCalendarParamsDto,
    GetUserCalendarResponseEventsDto,
} from "@/modules/calendar/dto";
import { ResponseWithPaginationDto } from "@/dtos";

@Injectable()
export class CalendarService {
    constructor(
        private readonly eventRepository: EventRepository,
    ) {}

    async getUserCalendar(session: ServerSession, queryDto: GetUserCalendarParamsDto): Promise<ResponseWithPaginationDto<EventsEntity[]>> {
        const {
            id: userId,
        } = session.user;

        const {
            page,
            limit,
            startDate,
            endDate,
            participationType,
            search,
        } = queryDto;

        let skip = 0;

        if(page && limit) {
            skip = (page - 1) * limit;
        }

        const qb = this.eventRepository
            .queryBuilder("event")
            .leftJoin("event.hosts", "hostRelation")
            .leftJoin("event.tickets", "ticketRelation");

        qb.where(
            new Brackets((subQuery) => {
                subQuery.where("hostRelation.userId = :userId", { userId }).orWhere("ticketRelation.userId = :userId", { userId });
            }),
        );

        if(participationType === EventParticipationType.HOSTING) {
            qb.andWhere("hostRelation.userId = :userId", { userId });
        }
        if(participationType === EventParticipationType.ATTENDING) {
            qb.andWhere("ticketRelation.userId = :userId", { userId });
        }

        if(startDate) {
            qb.andWhere("COALESCE(event.endDate, event.startDate) >= :startDate", { startDate });
        }
        if(endDate) {
            const endOfDay = new Date(endDate);
            endOfDay.setHours(23, 59, 59, 999);
            qb.andWhere("event.startDate <= :endOfDay", { endOfDay });
        }

        if(search) {
            qb.andWhere("event.title ILIKE :search", { search: `%${search}%` });
        }

        qb.select(["event.id", "event.startDate"])
            .distinct(true)
            .orderBy("event.startDate", "ASC")
            .offset(skip)
            .limit(limit);

        const rawResults = await qb.getRawMany();
        const eventIds = rawResults.map((result) => result.event_id);

        if(eventIds.length === 0) {
            return new ResponseWithPaginationDto([]);
        }

        const [events, total] = await this.eventRepository
            .queryBuilder("event")
            .leftJoinAndSelect("event.hosts", "hostRelation")
            .leftJoinAndSelect("hostRelation.user", "hostUser")
            .leftJoinAndSelect("event.tickets", "ticketRelation")
            .leftJoinAndSelect("ticketRelation.user", "ticketUser")
            .where("event.id IN (:...eventIds)", { eventIds })
            .orderBy("event.startDate", "ASC")
            .getManyAndCount();

        const eventsWithAttendees = seedEventAttendees(events);

        const transformedEvents: GetUserCalendarResponseEventsDto[] = eventsWithAttendees.map((event) => {
            const isHost = event.hosts.some(host => host.userId === userId);
            const isAttendee = event.tickets.some(ticket => ticket.userId === userId);

            let participationType: EventParticipationType | null = null;

            if(isHost) {
                participationType = EventParticipationType.HOSTING;
            } else if(isAttendee) {
                participationType = EventParticipationType.ATTENDING;
            }

            return {
                ...event,
                participationType,
            };
        });

        return new ResponseWithPaginationDto(transformedEvents, { page, limit, total });
    }

}