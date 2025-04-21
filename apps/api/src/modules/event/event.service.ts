import { DataSource, Repository } from "typeorm";
import { Injectable, InternalServerErrorException, Logger } from "@nestjs/common";
import { CreateEventDto } from "./dto/create-event.dto";
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
                    eventDateTime: input.dateTime,
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
        } catch (error) {
            this.logger.error(`Unexpected error creating event: ${error.message}`, error.stack);
            throw new InternalServerErrorException("Failed to create event");
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