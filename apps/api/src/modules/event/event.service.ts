import { DataSource, Repository } from "typeorm";
import { BadRequestException, Injectable, Logger, NotFoundException } from "@nestjs/common";
import { CreateEventDto } from "./dto/create-event.dto";
import { UpdateEventDto } from "./dto/update-event.dto";
import { EventsEntity } from "./entities/events.entity";
import { EventInterestsEntity } from "./entities/event-interests.entity";
import { EventHostsEntity } from "./entities/event-hosts.entity";
import { UploadsService } from "@/modules/uploads/uploads.service";
import { InjectRepository } from "@nestjs/typeorm";
import { ImageColorPalettePreset } from "@/modules/uploads/vibrant/types";
import { UploadsFileType } from "@/modules/uploads/uploads.register";
import { TicketsEntity } from "@/modules/booking/entities/tickets.entity";
import { BookingService } from "@/modules/booking/booking.service";

@Injectable()
export class EventService {
    private logger = new Logger(EventService.name);

    constructor(
        @InjectRepository(EventsEntity)
        private readonly eventRepository: Repository<EventsEntity>,
        @InjectRepository(TicketsEntity)
        private readonly ticketRepository: Repository<TicketsEntity>,
        private readonly bookingService: BookingService,
        private readonly uploadService: UploadsService,
        private dataSource: DataSource,
    ) {}
    
    async createEvent(userId: string, input: CreateEventDto): Promise<EventsEntity> {
        try {
            return await this.dataSource.transaction(async entityManager => {
                const {
                    location,
                    interests,
                    ...event
                } = input;

                const newEvent = await entityManager.save(EventsEntity, {
                    ...event,
                    location: {
                        type: "Point",
                        coordinates: location,
                    },
                });

                await entityManager.save(EventHostsEntity, {
                    eventId: newEvent.id,
                    userId,
                });

                if(interests && interests.length > 0) {
                    await entityManager.save(
                        EventInterestsEntity,
                        interests.map(interestId => ({
                            eventId: newEvent.id,
                            interestId,
                        })),
                    );
                }

                return newEvent;
            });
        } catch(error) {
            this.logger.error(`Unexpected error creating event: ${error.message}`, error.stack);
            throw new BadRequestException();
        }
    }

    async updateEvent(eventId: string, input: UpdateEventDto): Promise<EventsEntity> {
        try {
            const dbEvent = await this.eventRepository.findOneBy({ id: eventId });
            if(!dbEvent) {
                throw new NotFoundException();
            }

            const {
                location,
                interests,
                ...event
            } = input;

            if(event.ticketsAvailable !== null && event.ticketsAvailable !== undefined) {
                const ticketsCount = await this.ticketRepository.countBy({ eventId });
                if(ticketsCount > event.ticketsAvailable) {
                    throw new BadRequestException("Invalid value of ticketsAvailable");
                }
            }

            Object.assign(dbEvent, event, {
                location: location ? {
                    type: "Point",
                    coordinates: location,
                } : dbEvent.location,
            });

            await this.eventRepository.save(dbEvent);

            await this.dataSource.transaction(async entityManager => {
                if(!interests) return [];

                await entityManager.delete(EventInterestsEntity, { eventId });

                return entityManager.save(
                    EventInterestsEntity,
                    interests.map(interestId =>
                        entityManager.create(EventInterestsEntity, { eventId, interestId }),
                    ),
                );
            });

            return dbEvent;
        } catch(error) {
            this.logger.error(`Unexpected error updating event: ${error.message}`, error.stack);
            throw new BadRequestException();
        }
    }

    async deleteEvent(userId: string, eventId: string) {
        const deleteEventPromise = this.dataSource.transaction(async entityManager => {
            await this.bookingService.reclaimTickets(entityManager, eventId);
            await entityManager.delete(EventsEntity, { id: eventId });
        });

        const deleteFilesPromise = this.uploadService.deleteFiles(userId, {
            folder: UploadsFileType.Events,
            tags: this.uploadService.tagRegister.events(eventId),
        });

        await Promise.all([
            deleteEventPromise,
            deleteFilesPromise,
        ]);

        return true;
    }

    async uploadPoster(userId: string, eventId: string, files: Express.Multer.File[]) {
        return this.uploadService.uploadImages(files, {
            folder: this.uploadService.folderRegister.events(userId),
            tags: [this.uploadService.tagRegister.events(eventId)],
            colorPalette: {
                preset: ImageColorPalettePreset.Extended,
            },
        });
    }
}