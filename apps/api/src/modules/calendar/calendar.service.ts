import { Injectable } from "@nestjs/common";
import {
    GetUserCalendarParamsDto,
    GetUserCalendarResponseDto,
    ParticipationType,
} from "@/modules/calendar/dto/calendar.dto";
import { Brackets } from "typeorm";
import { EventRepository } from "@/modules/event/repositories/event.repository";
import { ServerSession } from "@/types";
import { seedEventUsers } from "@/utils/users";

@Injectable()
export class CalendarService {
    constructor(
        private readonly eventRepository: EventRepository,
    ) {}

    async getUserCalendar(session: ServerSession, queryDto: GetUserCalendarParamsDto): Promise<GetUserCalendarResponseDto> {
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

        // Створюємо базовий запит з усіма фільтрами
        const qb = this.eventRepository
            .queryBuilder("event")
            .leftJoin("event.hosts", "hostRelation")
            .leftJoin("event.tickets", "ticketRelation");

        // Основний фільтр: події, де користувач є організатором АБО має квиток
        qb.where(
            new Brackets((subQuery) => {
                subQuery.where("hostRelation.userId = :userId", { userId }).orWhere("ticketRelation.userId = :userId", { userId });
            }),
        );

        // Фільтрація за типом участі
        if(participationType === ParticipationType.HOSTING) {
            qb.andWhere("hostRelation.userId = :userId", { userId });
        }
        if(participationType === ParticipationType.ATTENDING) {
            qb.andWhere("ticketRelation.userId = :userId", { userId });
        }

        // Фільтрація за датою
        if(startDate) {
            qb.andWhere("COALESCE(event.endDate, event.startDate) >= :startDate", { startDate });
        }
        if(endDate) {
            const endOfDay = new Date(endDate);
            endOfDay.setHours(23, 59, 59, 999);
            qb.andWhere("event.startDate <= :endOfDay", { endOfDay });
        }

        // Пошук за назвою
        if(search) {
            qb.andWhere("event.title ILIKE :search", { search: `%${search}%` });
        }

        // Отримуємо загальну кількість унікальних подій (до пагінації)
        const totalItems = await qb.getCount();

        // Тепер вибираємо тільки унікальні ID з сортуванням та пагінацією
        qb.select(["event.id", "event.startDate"])
            .distinct(true)
            .orderBy("event.startDate", "ASC")
            .offset(skip)
            .limit(limit);

        const rawResults = await qb.getRawMany();
        const eventIds = rawResults.map((result) => result.event_id);

        if(eventIds.length === 0) {
            return new GetUserCalendarResponseDto();
        }

        // --- ЕТАП 2: Отримуємо повні дані для знайдених ID ---
        const data = await this.eventRepository
            .queryBuilder("event")
            .leftJoinAndSelect("event.hosts", "hostRelation")
            .leftJoinAndSelect("hostRelation.user", "hostUser")
            .leftJoinAndSelect("event.tickets", "ticketRelation")
            .leftJoinAndSelect("ticketRelation.user", "ticketUser")
            .where("event.id IN (:...eventIds)", { eventIds })
            .orderBy("event.startDate", "ASC") // Важливо зберегти те ж сортування
            .getMany();


        const events = seedEventUsers(data);

        return new GetUserCalendarResponseDto({
            events,
            pagination: {
                currentPage: page,
                totalPages: limit ? Math.ceil(totalItems / limit) : undefined,
                totalItems,
                limit,
            },
        });
    }

}