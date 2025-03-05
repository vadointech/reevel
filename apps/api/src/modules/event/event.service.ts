// import { CreateEventType } from "@/utils/types";
import { Injectable } from "@nestjs/common";
import { CreateEventDto } from "./dto/create-event.dto";
import { EntityManager, Repository } from "typeorm";
import { Event } from "./entities/Event.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { UpdateEventDto } from "./dto/update-event.dto";

@Injectable()
export class EventService {
    constructor(
        @InjectRepository(Event)
        private readonly eventsRepository: Repository<Event>,
        private readonly entityManager: EntityManager,
    ) { }

    async create(createEventDto: CreateEventDto) {
        const event = new Event({ ...createEventDto, comments: [] });
        await this.entityManager.save(event);
    }

    async findAll() {
        return await this.eventsRepository.find({
            relations: { comments: true },
        });
    }

    async findOne(id: number) {
        return await this.eventsRepository.findOneBy({ id });
    }

    async update(id: number, updateEventDto: UpdateEventDto) {
        const event = await this.eventsRepository.findOneBy({ id });

        if (!event) {
            throw new Error(`Event with id ${id} not found`);
        }

        event.title = updateEventDto.title;
        await this.eventsRepository.save(event);
    }

    async remove(id: number) {
        await this.eventsRepository.delete({ id });
    }
}
