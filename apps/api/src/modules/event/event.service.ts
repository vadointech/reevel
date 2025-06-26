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

        private readonly subscriptionRegistry: SubscriptionRegistry,

        private dataSource: DataSource,
    ) {}
    
    async createEvent(session: Session, input: CreateEventDto): Promise<EventsEntity> {
        try {
            const {
                location,
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
                    location: {
                        type: "Point",
                        coordinates: location,
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
                location,
                interests,
                ...newEvent
            } = input;

            if(newEvent.ticketsAvailable !== null && newEvent.ticketsAvailable !== undefined) {
                const ticketsCount = await this.eventTicketsRepository.countBy({ eventId });
                if(ticketsCount > newEvent.ticketsAvailable) {
                    throw new BadRequestException("Invalid value of ticketsAvailable");
                }
            }

            Object.assign(event, newEvent, {
                location: location ? {
                    type: "Point",
                    coordinates: location,
                } : event.location,
            });

            await this.eventRepository.createAndSave(event);

            event.interests = await this.dataSource.transaction(async entityManager => {
                if(!interests) return event.interests;
                return this.eventInterestsRepository.updateInterests(eventId, interests, entityManager);
            });

            return event;
        } catch(error) {
            this.logger.error(`Unexpected error updating event: ${error.message}`, error.stack);
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
            event.location,
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
}