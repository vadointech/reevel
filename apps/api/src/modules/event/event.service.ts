import { DataSource } from "typeorm";
import { BadRequestException, Injectable, Logger, NotFoundException } from "@nestjs/common";

import { UploadsService } from "@/modules/uploads/uploads.service";
import { BookingService } from "@/modules/booking/booking.service";

import { EventRepository } from "./repositories/event.repository";
import { EventHostsRepository } from "./repositories/event-hosts.repository";
import { EventInterestsRepository } from "./repositories/event-interests.repository";
import { EventTicketsRepository } from "@/modules/event/repositories/event-tickets.repository";
import { SubscriptionRegistry } from "@/modules/subscription/registry/subscription.registry";

import { EventsEntity, EventVisibility } from "./entities/events.entity";

import { CreateEventDto } from "./dto/create-event.dto";
import { UpdateEventDto } from "./dto/update-event.dto";

import { ISessionUser, ServerSession } from "@/types";
import { SupportedFileCollections } from "@/modules/uploads/entities/uploads.entity";
import { GetNearbyEventsDto } from "@/modules/event/dto/get-nearby.dto";
import { getEventParticipationType } from "@/modules/event/utils";
import { EventPointResponseDto, GetEventResponseDto } from "@/modules/event/dto";

import { SpatialGrid } from "@repo/spatial-grid";

import * as geohash from "ngeohash";

@Injectable()
export class EventService {
    private logger = new Logger(EventService.name);
    private readonly spatialGrid = new SpatialGrid();

    constructor(
        private readonly uploadService: UploadsService,
        private readonly bookingService: BookingService,

        private readonly eventTicketsRepository: EventTicketsRepository,
        private readonly eventRepository: EventRepository,
        private readonly eventHostsRepository: EventHostsRepository,
        private readonly eventInterestsRepository: EventInterestsRepository,

        private readonly subscriptionRegistry: SubscriptionRegistry,

        private dataSource: DataSource,
    ) {}

    async getEvents(session: ServerSession) {
        const events = await this.eventRepository.findMany();

        return events.map(event => {
            const participationType = getEventParticipationType(event, session.user.id);
            return new GetEventResponseDto({
                ...event,
                participationType,
            });
        });
    }
    
    async createEvent(session: ServerSession<ISessionUser>, input: CreateEventDto): Promise<EventsEntity> {
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

    async updateEvent(_: ServerSession, eventId: string, input: UpdateEventDto): Promise<EventsEntity> {
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

    async deleteEvent(_: ServerSession, eventId: string) {
        await this.dataSource.transaction(async entityManager => {
            await this.bookingService.reclaimTickets(eventId, entityManager);
            await this.eventRepository.delete({ id: eventId }, entityManager);
        });

        return true;
    }

    async uploadPoster(session: ServerSession<ISessionUser>, files: Express.Multer.File[]) {
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

    async getEventById(session: ServerSession, eventId: string) {
        const event = await this.eventRepository.findOne({
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

        if(!event) {
            return null;
        }

        const participationType = getEventParticipationType(event, session.user.id);

        return new GetEventResponseDto({
            ...event,
            participationType,
        });
    }

    async getNearbyEvents(input: GetNearbyEventsDto): Promise<EventPointResponseDto[]> {
        const {
            tileId,
            zoom,
            filter,
        } = input;

        const config = this.spatialGrid.getBreakpointForZoom(zoom);
        const neighborHashes = geohash.neighbors(tileId);
        const allHashes = [tileId, ...neighborHashes];

        const whereClauses = allHashes.map((hash) => {
            const bbox = geohash.decode_bbox(hash); // [minlat, minlon, maxlat, maxlon]
            return `ST_Intersects(event.locationPoint, ST_MakeEnvelope(${bbox[1]}, ${bbox[0]}, ${bbox[3]}, ${bbox[2]}, 4326))`;
        });

        const queryBuilder =
            this.eventRepository.queryBuilder("event")
                .select([
                    "event.id",
                    "event.title",
                    "event.poster",
                    "event.primaryColor",
                    "event.visibility",
                    "event.locationPoint",
                ])
                .where(`(${whereClauses.join(" OR ")})`)
                .andWhere("event.visibility = :visibility", { visibility: EventVisibility.PUBLIC });
        // .andWhere("event.startDate > :now", { now: new Date() })

        if(filter) {
            queryBuilder
                .innerJoin("event.interests", "interestLink")
                .andWhere("interestLink.interestId = :interest", { interest: filter });
        }

        if(config.dataLimit) {
            queryBuilder.limit(config.dataLimit);
        }

        const events = await queryBuilder.getMany();

        return events.map(item => new EventPointResponseDto(item));
    }
}