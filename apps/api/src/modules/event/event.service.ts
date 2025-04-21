import { DataSource, Repository } from "typeorm";
import {
    Injectable,
    Logger,
    BadRequestException,
    NotFoundException,
} from "@nestjs/common";
import { CreateEventDto } from "./dto/create-event.dto";
import { UpdateEventDto } from "./dto/update-event.dto";
import { EventsEntity } from "./entities/events.entity";
import { EventInterestsEntity } from "./entities/event-interests.entity";
import { EventHostsEntity } from "./entities/event-hosts.entity";
import { UploadsService } from "@/modules/uploads/uploads.service";
import { InjectRepository } from "@nestjs/typeorm";
import { ImageColorPalettePreset } from "@/modules/uploads/vibrant/types";
import { UploadsFileType } from "@/modules/uploads/uploads.register";

@Injectable()
export class EventService {
    private logger = new Logger(EventService.name);

    constructor(
        @InjectRepository(EventsEntity)
        private readonly eventRepository: Repository<EventsEntity>,
        private readonly uploadService: UploadsService,
        private dataSource: DataSource,
    ) {}
    
    async createEvent(userId: string, input: CreateEventDto): Promise<EventsEntity> {
        try {
            return await this.dataSource.transaction(async entityManager => {
                const newEvent = await entityManager.save(EventsEntity, {
                    title: input.title,
                    description: input.description,
                    poster: input.poster,
                    primaryColor: input.primaryColor,
                    location: {
                        type: "Point",
                        coordinates: input.location,
                    },
                    ticketCount: input.ticketCount,
                    ticketPrice: input.ticketPrice,
                    visibility: input.visibility,
                    dateTime: input.dateTime,
                });

                await entityManager.save(EventHostsEntity, {
                    eventId: newEvent.id,
                    userId,
                });

                if(input.interests?.length) {
                    await entityManager.save(
                        EventInterestsEntity,
                        input.interests.map(interestId => ({
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
                ...newEvent
            } = input;

            Object.assign(dbEvent, newEvent, {
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
        await Promise.all([
            this.uploadService.deleteFiles(userId, {
                folder: UploadsFileType.Events,
                tags: this.uploadService.tagRegister.events(eventId),
            }),
            this.eventRepository.delete({ id: eventId }),
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