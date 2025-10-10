import { Injectable, Logger } from "@nestjs/common";
import { EventRepository } from "@/modules/event/repositories/event.repository";
import { UserRepository } from "@/modules/user/repositories/user.repository";
import { InterestsRepository } from "@/modules/interests/repositories/interests.repository";
import { ServerSession } from "@/types";
import { polygonToWkt } from "./utils";
import { EventsEntity } from "@/modules/event/entities/events.entity";
import { InterestsEntity } from "@/modules/interests/entities/interests.entity";
import { GetNearbyEventsDto } from "@/modules/event/dto/get-nearby.dto";

@Injectable()
export class EventCollectionService {
    private logger = new Logger(EventCollectionService.name);

    constructor(
        private readonly eventRepository: EventRepository,
        private readonly userRepository: UserRepository,
        private readonly interestsRepository: InterestsRepository,
    ) {}

    async getEventCityHighlightsCollection(input: GetNearbyEventsDto): Promise<EventsEntity[]> {
        // const { center, radius } = input.circle;
        // const limit = input.take || 10;
        // const interestsFilter = input.interests;
        //
        // const today = new Date(); // Зараз: Субота, 28 червня 2025
        // const endOfWeek = new Date();
        // // Встановлюємо кінець дня неділі (29 червня)
        // endOfWeek.setDate(today.getDate() + (7 - today.getDay()) % 7);
        // endOfWeek.setHours(23, 59, 59, 999);
        //
        // // --- Крок 1: Отримати ID відранжованих подій ---
        // const rankedEventsQuery = this.eventRepository.queryBuilder("event")
        //     .select("event.id", "id") // Явно вказуємо псевдонім
        // // ЗМІНЕНО: Основна умова тепер ST_DWithin, а не ST_Intersects
        //     .where("ST_DWithin(event.locationPoint, ST_SetSRID(ST_MakePoint(:lon, :lat), 4326)::geography, :radius)");
        // // ПОВЕРНУТО: Обов'язкові фільтри для релевантності
        // //     .andWhere("\"event\".\"startDate\" > NOW()")
        // //     .andWhere("\"event\".\"visibility\" = 'PUBLIC'");
        //
        // // ДОДАНО: Умовна фільтрація за інтересами
        // if (interestsFilter && interestsFilter.length > 0) {
        //     rankedEventsQuery
        //         .innerJoin("event.interests", "interestLink")
        //         .andWhere("interestLink.interestId IN (:...interests)");
        // }
        //
        // rankedEventsQuery
        //     .orderBy("\"event\".\"startDate\"", "DESC");
        // // ЗБЕРЕЖЕНО: Вся логіка ранжування залишається
        // // rankedEventsQuery.orderBy(
        // //     "CASE WHEN \"event\".\"isFeatured\" = true THEN 0 ELSE 1 END", "ASC",
        // // )
        // //     .addOrderBy(
        // //         "CASE WHEN \"event\".\"startDate\" BETWEEN :today AND :endOfWeek THEN 0 ELSE 1 END", "ASC",
        // //     )
        // //     .addOrderBy(
        // //         "((SELECT COUNT(*) FROM \"event_tickets\" WHERE \"eventId\" = \"event\".\"id\") * 2 + (SELECT COUNT(*) FROM \"event_interests\" WHERE \"eventId\" = \"event\".\"id\"))", "DESC",
        // //     )
        // //     .addOrderBy("\"event\".\"startDate\"", "ASC");
        //
        // // Встановлюємо всі параметри в одному місці
        // rankedEventsQuery.setParameters({
        //     lon: center.longitude,
        //     lat: center.latitude,
        //     radius: radius,
        //     interests: interestsFilter, // TypeORM проігнорує, якщо не використовується
        //     today: today.toISOString(),
        //     endOfWeek: endOfWeek.toISOString(),
        // });
        //
        // const rawResults = await rankedEventsQuery
        //     .limit(limit)
        //     .getRawMany<{ id: string }>();
        //
        // const eventIds = rawResults.map(result => result.id);
        //
        // if (eventIds.length === 0) {
        //     return [];
        // }
        //
        // // --- Крок 2: Завантажити повні дані для знайдених ID ---
        // const finalEvents = await this.eventRepository.queryBuilder("event")
        //     .leftJoinAndSelect("event.hosts", "host")
        //     .leftJoinAndSelect("host.user", "hostUser")
        //     .leftJoinAndSelect("hostUser.profile", "userProfile")
        //     .leftJoinAndSelect("event.interests", "interestLink")
        //     .leftJoinAndSelect("interestLink.interest", "interestData")
        //     .leftJoinAndSelect("event.tickets", "ticket")
        //     .leftJoinAndSelect("ticket.user", "ticketUser")
        //     .leftJoinAndSelect("ticketUser.profile", "ticketProfile")
        //     .where("event.id IN (:...eventIds)", { eventIds })
        //     .getMany();
        //
        // // --- Крок 3: Відновити правильний порядок ---
        // // Це важливо, бо getMany() з IN (...) не гарантує порядок
        // return eventIds.map(id =>
        //     finalEvents.find(event => event.id === id),
        // ).filter(event => event !== undefined) as EventsEntity[];

        return [];
    }

    async getEventInterestCollectionsFeed(session: ServerSession): Promise<InterestsEntity[]> {
        // --- Крок 1: Отримати інтереси та локацію користувача ---
        // Ця частина залишається такою ж ефективною
        const userProfile = await this.userRepository.queryBuilder("user")
            .leftJoinAndSelect("user.profile", "profile")
            .leftJoinAndSelect("profile.interests", "profileInterests")
            .leftJoinAndSelect("profile.location", "profileLocation")
            .where("user.id = :userId", { userId: session.user.id })
            .getOne();

        if (!userProfile?.profile?.interests?.length || !userProfile?.profile?.location?.bbox) {
            // Якщо у користувача немає інтересів або локації, повертаємо порожній масив
            return [];
        }

        const userInterestSlugs = userProfile.profile.interests.map(pi => pi.interestId);
        const userBboxWkt = polygonToWkt(userProfile.profile.location.bbox);

        if (!userBboxWkt) return [];

        // --- Крок 2: Основний запит, що шукає інтереси з подіями ---
        return this.interestsRepository.queryBuilder("interest")
            .where("interest.slug IN (:...userInterestSlugs)", { userInterestSlugs }) // Зверніть увагу на зміну назви
            .innerJoin("interest.events", "interestLink")
            .innerJoin(
                "interestLink.event",
                "event",
                " ST_Intersects(event.locationPoint, ST_GeomFromText(:userBboxWkt, 4326))",
                { userBboxWkt },
            )
        // "event"."startDate" > NOW() AND
        // "event"."visibility" = 'PUBLIC' AND
            .groupBy("interest.slug")
            .select("interest")
            .getMany();
    }

    async getRandomizedEvents(input: GetNearbyEventsDto): Promise<EventsEntity[]> {
        // const { center, radius } = input.circle;
        // const limit = input.take || 10;
        // const interestsFilter = input.interests;
        //
        // // --- Крок 1: Отримати ID випадкових подій, що відповідають фільтрам ---
        // const eventIdsQueryBuilder = this.eventRepository.queryBuilder("event")
        //     .select("event.id", "id") // Явно вказуємо псевдонім 'id'
        // // Основна умова пошуку за локацією
        //     .where("ST_DWithin(event.locationPoint, ST_SetSRID(ST_MakePoint(:lon, :lat), 4326)::geography, :radius)");
        //     // .andWhere("\"event\".\"startDate\" > NOW()")
        //     // .andWhere("\"event\".\"visibility\" = 'PUBLIC'");
        //
        // // Додаємо умовну фільтрацію за інтересами, якщо вони передані
        // if (interestsFilter && interestsFilter.length > 0) {
        //     eventIdsQueryBuilder
        //         .innerJoin("event.interests", "interestLink")
        //         .andWhere("interestLink.interestId IN (:...interests)");
        // }
        //
        // // Встановлюємо всі параметри
        // eventIdsQueryBuilder.setParameters({
        //     lon: center.longitude,
        //     lat: center.latitude,
        //     radius: radius,
        //     interests: interestsFilter,
        // });
        //
        // // Головна відмінність: сортуємо у випадковому порядку
        // const eventIdsResult = await eventIdsQueryBuilder
        //     .orderBy("RANDOM()") // Функція бази даних для випадкового сортування
        //     .limit(limit)
        //     .getRawMany<{ id: string }>();
        //
        // const eventIds = eventIdsResult.map(e => e.id);
        //
        // if (eventIds.length === 0) {
        //     return [];
        // }
        //
        // // --- Крок 2: Завантажити повні дані для знайдених випадкових ID ---
        // const finalEvents = await this.eventRepository.queryBuilder("event")
        //     .leftJoinAndSelect("event.hosts", "host")
        //     .leftJoinAndSelect("host.user", "hostUser")
        //     .leftJoinAndSelect("hostUser.profile", "userProfile")
        //     .leftJoinAndSelect("event.interests", "interestLink")
        //     .leftJoinAndSelect("interestLink.interest", "interestData")
        //     .leftJoinAndSelect("event.tickets", "ticket")
        //     .leftJoinAndSelect("ticket.user", "ticketUser")
        //     .leftJoinAndSelect("ticketUser.profile", "ticketProfile")
        //     .where("event.id IN (:...eventIds)", { eventIds })
        //     .getMany();
        //
        // // Оскільки RANDOM() вже перемішав ID, ми можемо повернути результат
        // // у довільному порядку або відновити його, якщо потрібно
        // const eventsMap = new Map(finalEvents.map(event => [event.id, event]));
        // return eventIds.map(id => eventsMap.get(id)).filter(Boolean) as EventsEntity[];

        return [];
    }
}