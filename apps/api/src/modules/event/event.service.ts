import { DataSource } from "typeorm";
import { BadRequestException, Injectable, Logger, NotFoundException } from "@nestjs/common";
import { CreateEventDto } from "./dto/create-event.dto";
import { UpdateEventDto } from "./dto/update-event.dto";
import { EventsEntity } from "./entities/events.entity";
import { UploadsService } from "@/modules/uploads/uploads.service";
import { UploadsFileType } from "@/modules/uploads/uploads.register";

import { EventRepository } from "./repositories/event.repository";
import { EventHostsRepository } from "./repositories/event-hosts.repository";
import { EventInterestsRepository } from "./repositories/event-interests.repository";
import { EventTicketsRepository } from "@/modules/event/repositories/event-tickets.repository";
import { SubscriptionRegistry } from "@/modules/subscription/registry/subscription.registry";

import { Session } from "@/types";

@Injectable()
export class EventService {
    private logger = new Logger(EventService.name);

    constructor(
        private readonly uploadService: UploadsService,

        private readonly ticketRepository: EventTicketsRepository,
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

            const monthlyHostedCount = await this.eventHostsRepository.countMonthly(session.user.id);

            if(monthlyHostedCount >= this.subscriptionRegistry.event.hostingLimit(session)) {
                throw new BadRequestException("Reached the event hosting limit");
            }

            return this.dataSource.transaction(async entityManager => {
                const event = await this.eventRepository.create({
                    ...newEvent,
                    location: {
                        type: "Point",
                        coordinates: location,
                    },
                }, entityManager);

                if(interests && interests.length > 0) {
                    event.interests = await this.eventInterestsRepository.create(event.id, interests, entityManager);
                }

                event.hosts = await this.eventHostsRepository.create(event.id, [session.user.id], entityManager);

                return event;
            });
        } catch(error) {
            this.logger.error(`Unexpected error creating event: ${error.message}`, error.stack);
            throw new BadRequestException();
        }
    }

    async updateEvent(_: Session, eventId: string, input: UpdateEventDto): Promise<EventsEntity> {
        try {
            const event = await this.eventRepository.getByID(eventId);
            if(!event) {
                throw new NotFoundException();
            }

            const {
                location,
                interests,
                ...newEvent
            } = input;

            if(newEvent.ticketsAvailable !== null && newEvent.ticketsAvailable !== undefined) {
                const ticketsCount = await this.ticketRepository.countAvailable(eventId);
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

            await this.eventRepository.create(event);

            event.interests = await this.dataSource.transaction(async entityManager => {
                if(!interests) return event.interests;
                await this.eventInterestsRepository.deleteAll(eventId, entityManager);
                return this.eventInterestsRepository.create(eventId, interests, entityManager);
            });

            return event;
        } catch(error) {
            this.logger.error(`Unexpected error updating event: ${error.message}`, error.stack);
            throw new BadRequestException();
        }
    }

    async deleteEvent(session: Session, eventId: string) {
        const deleteEventPromise = this.dataSource.transaction(async entityManager => {
            // await this.bookingService.reclaimTickets(eventId, entityManager);
            await this.eventRepository.delete(eventId, entityManager);
        });

        const deleteFilesPromise = this.uploadService.deleteFiles(session.user.id, {
            folder: UploadsFileType.Events,
            tags: this.uploadService.tagRegister.events(eventId),
        });

        await Promise.all([
            deleteEventPromise,
            deleteFilesPromise,
        ]);

        return true;
    }

    async uploadPoster(session: Session, eventId: string, files: Express.Multer.File[]) {
        return this.uploadService.uploadImages(files, {
            folder: this.uploadService.folderRegister.events(session.user.id),
            tags: [this.uploadService.tagRegister.events(eventId)],
            colorPalette: {
                preset: this.subscriptionRegistry.event.posterColor(session),
            },
        });
    }
}