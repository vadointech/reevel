import { DataSource } from "typeorm";
import { BadRequestException, Injectable, Logger, NotFoundException } from "@nestjs/common";

import { UploadsService } from "@/modules/uploads/uploads.service";
import { BookingService } from "@/modules/booking/booking.service";

import { EventRepository } from "./repositories/event.repository";
import { EventHostsRepository } from "./repositories/event-hosts.repository";
import { EventInterestsRepository } from "./repositories/event-interests.repository";
import { EventTicketsRepository } from "@/modules/event/repositories/event-tickets.repository";
import { SubscriptionRegistry } from "@/modules/subscription/registry/subscription.registry";

import { EventsEntity } from "./entities/events.entity";

import { CreateEventDto } from "./dto/create-event.dto";
import { UpdateEventDto } from "./dto/update-event.dto";

import { Session } from "@/types";
import { SupportedFileCollections } from "@/modules/uploads/entities/uploads.entity";
import { GetNearbyEventsDto } from "@/modules/event/dto/get-nearby.dto";
import { ProfileLocationRepository } from "@/modules/profile/repositories/profile-location.repository";
import { GetCityHighlightsDto } from "@/modules/event/dto/get-city-highlights.dto";
import { UserRepository } from "@/modules/user/repositories/user.repository";
import { InterestsRepository } from "@/modules/interests/repositories/interests.repository";

function polygonToWkt(polygon: any): string | null {
    if (!polygon || !polygon.coordinates || !polygon.coordinates[0]) {
        return null;
    }
    // Беремо зовнішнє кільце координат
    const ring = polygon.coordinates[0];

    // Перетворюємо кожну пару [довгота, широта] у рядок "довгота широта"
    const pointsString = ring.map((p: number[]) => `${p[0]} ${p[1]}`).join(", ");

    // Збираємо фінальний WKT рядок
    return `POLYGON((${pointsString}))`;
}

@Injectable()
export class EventService {
    private logger = new Logger(EventService.name);

    constructor(
        private readonly uploadService: UploadsService,
        private readonly bookingService: BookingService,

        private readonly eventTicketsRepository: EventTicketsRepository,
        private readonly eventRepository: EventRepository,
        private readonly eventHostsRepository: EventHostsRepository,
        private readonly eventInterestsRepository: EventInterestsRepository,

        private readonly userRepository: UserRepository,
        private readonly profileLocationRepository: ProfileLocationRepository,
        private readonly interestsRepository: InterestsRepository,

        private readonly subscriptionRegistry: SubscriptionRegistry,


        private dataSource: DataSource,
    ) {}
    
    async createEvent(session: Session, input: CreateEventDto): Promise<EventsEntity> {
        try {
            const {
                locationPoint,
                interests,
                ...newEvent
            } = input;

            const monthlyHostedCount = await this.eventHostsRepository.countMonthlyHosted(session.user.id);

            if(monthlyHostedCount >= this.subscriptionRegistry.event.hostingLimit(session)) {
                throw new BadRequestException("Reached the event hosting limit");
            }

            return this.dataSource.transaction(async entityManager => {
                const event = await this.eventRepository.createAndSave({
                    ...newEvent,
                    locationPoint: {
                        type: "Point",
                        coordinates: locationPoint,
                    },
                }, entityManager);

                if(interests && interests.length > 0) {
                    event.interests = await this.eventInterestsRepository.createInterests(
                        event.id,
                        interests,
                        entityManager,
                    );
                }

                event.hosts = await this.eventHostsRepository.createHosts(
                    event.id,
                    [session.user.id],
                    entityManager,
                );

                return event;
            });
        } catch(error) {
            this.logger.error(`Unexpected error creating event: ${error.message}`, error.stack);
            throw new BadRequestException();
        }
    }

    async updateEvent(_: Session, eventId: string, input: UpdateEventDto): Promise<EventsEntity> {
        try {
            const event = await this.eventRepository.findOneBy({ id: eventId });
            if(!event) {
                throw new NotFoundException();
            }

            const {
                locationPoint,
                interests,
                ...newEvent
            } = input;

            if(newEvent.ticketsAvailable !== null && newEvent.ticketsAvailable !== undefined) {
                const ticketsCount = await this.eventTicketsRepository.countBy({ eventId });
                if(ticketsCount > newEvent.ticketsAvailable) {
                    throw new BadRequestException("Invalid value of ticketsAvailable");
                }
            }

            return this.dataSource.transaction(async entityManager => {
                const event = await this.eventRepository.createAndSave({
                    ...newEvent,
                    locationPoint: {
                        type: "Point",
                        coordinates: locationPoint,
                    },
                }, entityManager);

                if(interests && interests.length > 0) {
                    event.interests = await this.eventInterestsRepository.updateInterests(
                        event.id,
                        interests,
                        entityManager,
                    );
                }
                return event;
            });
        } catch(error) {
            this.logger.error(`Unexpected error creating event: ${error.message}`, error.stack);
            throw new BadRequestException();
        }
    }

    async deleteEvent(_: Session, eventId: string) {
        await this.dataSource.transaction(async entityManager => {
            await this.bookingService.reclaimTickets(eventId, entityManager);
            await this.eventRepository.delete({ id: eventId }, entityManager);
        });

        return true;
    }

    async uploadPoster(session: Session, files: Express.Multer.File[]) {
        return this.uploadService.uploadImages(
            session,
            files,
            SupportedFileCollections.EVENT_POSTER, {
                colorPalette: {
                    preset: this.subscriptionRegistry.event.posterColor(session),
                },
            },
        );
    }

    async getEventById(eventId: string) {
        return this.eventRepository.findOne({
            where: { id: eventId },
            relations: {
                hosts: {
                    user: {
                        profile: true,
                    },
                },
                interests: {
                    interest: true,
                },
                tickets: {
                    user: {
                        profile: true,
                    },
                },
            },
        });
    }

    async getNearbyEvents(input: GetNearbyEventsDto) {
        const { center, radius } = input.circle;
        const take = input.take || 10;

        const query = this.eventRepository.queryBuilder("event");

        query.where(
            `ST_DWithin(
            event.locationPoint,
            ST_SetSRID(ST_MakePoint(:lon, :lat), 4326)::geography,
            :radius
        )`,
            {
                lon: center.longitude,
                lat: center.latitude,
                radius: radius,
            },
        );

        query
            .leftJoinAndSelect("event.hosts", "host")
            .leftJoinAndSelect("host.user", "hostUser")
            .leftJoinAndSelect("hostUser.profile", "userProfile")

            .leftJoinAndSelect("event.interests", "interestLink")
            .leftJoinAndSelect("interestLink.interest", "interestData")

            .leftJoinAndSelect("event.tickets", "ticket")
            .leftJoinAndSelect("ticket.user", "ticketUser")
            .leftJoinAndSelect("ticketUser.profile", "ticketProfile");

        query.take(take);

        return query.getMany();
    }

    async getCityHighlights(params: GetCityHighlightsDto): Promise<EventsEntity[]> {
        const locationId = params.city;
        const limit = params.limit || 10;

        const location = await this.profileLocationRepository.findOneBy({ id: locationId });
        if (!location || !location.bbox) return [];

        const cityBoundaryWkt = polygonToWkt(location.bbox);
        if (!cityBoundaryWkt) return [];

        const today = new Date();
        const endOfWeek = new Date();
        endOfWeek.setDate(today.getDate() + (7 - today.getDay()) % 7);
        endOfWeek.setHours(23, 59, 59, 999);

        // --- Крок 1: Отримати ID відранжованих подій ---
        const rankedEventsQuery = this.eventRepository.queryBuilder("event")
            .select("event.id", "id") // Вибираємо тільки ID
            .where("\"event\".\"startDate\" > NOW()")
            .andWhere("\"event\".\"visibility\" = 'PUBLIC'")
            .andWhere("ST_Intersects(event.locationPoint, ST_GeomFromText(:cityBoundary, 4326))")
            .orderBy(
                "CASE WHEN \"event\".\"isFeatured\" = true THEN 0 ELSE 1 END", "ASC",
            )
            .addOrderBy(
                "CASE WHEN \"event\".\"startDate\" BETWEEN :today AND :endOfWeek THEN 0 ELSE 1 END", "ASC",
            )
            .addOrderBy(
                "((SELECT COUNT(*) FROM \"event_tickets\" WHERE \"eventId\" = \"event\".\"id\") * 2 + (SELECT COUNT(*) FROM \"event_interests\" WHERE \"eventId\" = \"event\".\"id\"))", "DESC",
            )
            .addOrderBy("\"event\".\"startDate\"", "ASC")
            .setParameters({
                today: today.toISOString(),
                endOfWeek: endOfWeek.toISOString(),
                cityBoundary: cityBoundaryWkt,
            })
            .limit(limit);

        const rawResults = await rankedEventsQuery.getRawMany<{ id: string }>();
        const eventIds = rawResults.map(result => result.id);

        if (eventIds.length === 0) {
            return [];
        }

        const finalEvents = await this.eventRepository.queryBuilder("event")
            .leftJoinAndSelect("event.hosts", "host")
            .leftJoinAndSelect("host.user", "hostUser")
            .leftJoinAndSelect("hostUser.profile", "userProfile")
            .leftJoinAndSelect("event.interests", "interestLink")
            .leftJoinAndSelect("interestLink.interest", "interestData")
            .leftJoinAndSelect("event.tickets", "ticket")
            .leftJoinAndSelect("ticket.user", "ticketUser")
            .leftJoinAndSelect("ticketUser.profile", "ticketProfile")
            .where("event.id IN (:...eventIds)", { eventIds })
            .getMany();

        return eventIds.map(id =>
            finalEvents.find(event => event.id === id),
        ).filter(event => event !== undefined);
    }

    async getEventCollectionsFeed(session: Session) {
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
                `"event"."startDate" > NOW() AND 
                     "event"."visibility" = 'PUBLIC' AND 
                     ST_Intersects(event.locationPoint, ST_GeomFromText(:userBboxWkt, 4326))`,
                { userBboxWkt },
            )
            .groupBy("interest.slug")
            .select("interest")
            .getMany();
    }
}