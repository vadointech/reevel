import { DataSource, Repository } from "typeorm";
import { BadRequestException, Injectable, Logger, NotFoundException } from "@nestjs/common";
import { CreateEventDto } from "./dto/create-event.dto";
import { UpdateEventDto } from "./dto/update-event.dto";
import { EventsEntity } from "./entities/events.entity";
import { UploadsService } from "@/modules/uploads/uploads.service";
import { InjectRepository } from "@nestjs/typeorm";
import { ImageColorPalettePreset } from "@/modules/uploads/vibrant/types";
import { UploadsFileType } from "@/modules/uploads/uploads.register";
import { TicketsEntity } from "@/modules/booking/entities/tickets.entity";
import { BookingService } from "@/modules/booking/booking.service";
import { EventRepository } from "@/modules/event/event.repository";
import { Session } from "@/types";

@Injectable()
export class EventService {
    private logger = new Logger(EventService.name);

    constructor(
        @InjectRepository(TicketsEntity)
        private readonly ticketRepository: Repository<TicketsEntity>,
        private readonly bookingService: BookingService,
        private readonly uploadService: UploadsService,

        private readonly eventRepository: EventRepository,

        private dataSource: DataSource,
    ) {}
    
    async createEvent(_: Session, input: CreateEventDto): Promise<EventsEntity> {
        try {
            const {
                location,
                interests,
                ...newEvent
            } = input;

            const event = await this.eventRepository.create({
                ...newEvent,
                location: {
                    type: "Point",
                    coordinates: location,
                },
            });

            if(interests && interests.length > 0) {
                event.interests = await this.eventRepository.createInterests(
                    interests.map(interestId => ({
                        eventId: event.id,
                        interestId,
                    })),
                );
            }

            return event;
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
                const ticketsCount = await this.ticketRepository.countBy({ eventId });
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
                await this.eventRepository.deleteInterests(event.id, entityManager);

                return this.eventRepository.createInterests(
                    interests.map(interestId => ({
                        eventId: event.id,
                        interestId,
                    })),
                );
            });

            return event;
        } catch(error) {
            this.logger.error(`Unexpected error updating event: ${error.message}`, error.stack);
            throw new BadRequestException();
        }
    }

    async deleteEvent(session: Session, eventId: string) {
        const deleteEventPromise = this.dataSource.transaction(async entityManager => {
            await this.bookingService.reclaimTickets(entityManager, eventId);
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