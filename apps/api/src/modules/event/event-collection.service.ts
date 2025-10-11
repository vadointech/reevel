import { Injectable, Logger, NotFoundException } from "@nestjs/common";
import { EventRepository } from "@/modules/event/repositories/event.repository";
import { UserRepository } from "@/modules/user/repositories/user.repository";
import { InterestsRepository } from "@/modules/interests/repositories/interests.repository";
import { ServerSession } from "@/types";
import { polygonToWkt } from "./utils";
import { EventsEntity, EventVisibility } from "@/modules/event/entities/events.entity";
import { InterestsEntity } from "@/modules/interests/entities/interests.entity";
import { GetNearbyEventsDto } from "@/modules/event/dto/get-nearby.dto";
import { CitiesRepository } from "@/modules/cities/repositories";
import { BoundingBox } from "@repo/geo";

import { endOfWeek } from "date-fns";
import { seedEventAttendees } from "@/utils/users";
import geohash from "ngeohash";
import { EventPointResponseDto } from "@/modules/event/dto";

@Injectable()
export class EventCollectionService {
    private logger = new Logger(EventCollectionService.name);

    constructor(
        private readonly eventRepository: EventRepository,
        private readonly userRepository: UserRepository,
        private readonly interestsRepository: InterestsRepository,
        private readonly citiesRepository: CitiesRepository,
    ) {}

    async getHighlightsCollection() {
        const now = new Date();
      
        const queryBuilder = this.eventRepository.queryBuilder("event")
            .leftJoinAndSelect("event.hosts", "host")
            .leftJoinAndSelect("host.user", "hostUser")
            .leftJoinAndSelect("hostUser.profile", "userProfile")
            .leftJoinAndSelect("event.interests", "interestLink")
            .leftJoinAndSelect("interestLink.interest", "interestData")
            .leftJoinAndSelect("event.tickets", "ticket")
            .leftJoinAndSelect("ticket.user", "ticketUser")
            .leftJoinAndSelect("ticketUser.profile", "ticketProfile")

            .andWhere("event.startDate > :now")
            .andWhere("event.visibility = :visibility")
            .orderBy("CASE WHEN event.isFeatured = true THEN 0 ELSE 1 END", "ASC")
            .addOrderBy("CASE WHEN event.startDate BETWEEN :now AND :endOfWeek THEN 0 ELSE 1 END", "ASC")
            .addOrderBy("event.startDate", "ASC")
            .setParameters({
                now,
                visibility: EventVisibility.PUBLIC,
                endOfWeek: endOfWeek(now),
            });

        let events = await queryBuilder.getMany();
        events = seedEventAttendees(events);

        return events;
    }

    async getCityHighlightsCollection(cityId: string) {
        const city = await this.citiesRepository.findOneBy({ id: cityId });
        if(!city) {
            throw new NotFoundException();
        }

        const bbox = BoundingBox.fromPolygon(city.bbox.coordinates);
        const now = new Date();

        const queryBuilder = this.eventRepository.queryBuilder("event")
            .leftJoinAndSelect("event.hosts", "host")
            .leftJoinAndSelect("host.user", "hostUser")
            .leftJoinAndSelect("hostUser.profile", "userProfile")
            .leftJoinAndSelect("event.interests", "interestLink")
            .leftJoinAndSelect("interestLink.interest", "interestData")
            .leftJoinAndSelect("event.tickets", "ticket")
            .leftJoinAndSelect("ticket.user", "ticketUser")
            .leftJoinAndSelect("ticketUser.profile", "ticketProfile")

            .where(`ST_Intersects(event.locationPoint, ST_MakeEnvelope(${bbox.sw.lng}, ${bbox.sw.lat}, ${bbox.ne.lng}, ${bbox.ne.lat}, 4326))`)
            .andWhere("event.startDate > :now")
            .andWhere("event.visibility = :visibility")
            .orderBy("CASE WHEN event.isFeatured = true THEN 0 ELSE 1 END", "ASC")
            .addOrderBy("CASE WHEN event.startDate BETWEEN :now AND :endOfWeek THEN 0 ELSE 1 END", "ASC")
            .addOrderBy("event.startDate", "ASC")
            .setParameters({
                now,
                visibility: EventVisibility.PUBLIC,
                endOfWeek: endOfWeek(now),
            });

        let events = await queryBuilder.getMany();
        events = seedEventAttendees(events);

        return events;
    }
    async getNearbyCityHighlightsCollection(cityId: string, input: GetNearbyEventsDto) {
        return [];
    }

    async getEventInterestCollectionsFeed(session: ServerSession): Promise<InterestsEntity[]> {
        return  [];
        // // --- Крок 1: Отримати інтереси та локацію користувача ---
        // // Ця частина залишається такою ж ефективною
        // const userProfile = await this.userRepository.queryBuilder("user")
        //     .leftJoinAndSelect("user.profile", "profile")
        //     .leftJoinAndSelect("profile.interests", "profileInterests")
        //     .leftJoinAndSelect("profile.location", "profileLocation")
        //     .where("user.id = :userId", { userId: session.user.id })
        //     .getOne();
        //
        // if (!userProfile?.profile?.interests?.length || !userProfile?.profile?.location?.bbox) {
        //     // Якщо у користувача немає інтересів або локації, повертаємо порожній масив
        //     return [];
        // }
        //
        // const userInterestSlugs = userProfile.profile.interests.map(pi => pi.interestId);
        // const userBboxWkt = polygonToWkt(userProfile.profile.location.bbox);
        //
        // if (!userBboxWkt) return [];
        //
        // // --- Крок 2: Основний запит, що шукає інтереси з подіями ---
        // return this.interestsRepository.queryBuilder("interest")
        //     .where("interest.slug IN (:...userInterestSlugs)", { userInterestSlugs }) // Зверніть увагу на зміну назви
        //     .innerJoin("interest.events", "interestLink")
        //     .innerJoin(
        //         "interestLink.event",
        //         "event",
        //         " ST_Intersects(event.locationPoint, ST_GeomFromText(:userBboxWkt, 4326))",
        //         { userBboxWkt },
        //     )
        // // "event"."startDate" > NOW() AND
        // // "event"."visibility" = 'PUBLIC' AND
        //     .groupBy("interest.slug")
        //     .select("interest")
        //     .getMany();
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