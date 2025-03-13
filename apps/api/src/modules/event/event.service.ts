// import { CreateEventType } from "@/utils/types";
import { Injectable } from "@nestjs/common";
import { CreateEventDto } from "./dto/create-event.dto";
import { EntityManager, Repository } from "typeorm";
import { Event } from "./entities/event.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { UpdateEventDto } from "./dto/update-event.dto";
import { UUID } from "crypto";

@Injectable()
export class EventService {
    constructor(
        @InjectRepository(Event)
        private readonly eventsRepository: Repository<Event>,
        private readonly entityManager: EntityManager,
    ) { }

    async create(createEventDto: CreateEventDto) {
        const event = new Event({ ...createEventDto });
        await this.entityManager.save(event);
    }

    async findAll() {
        return await this.eventsRepository.find();
    }

    async findOne(id: UUID) {
        return await this.eventsRepository.findOneBy({ id });
    }

    async update(id: UUID, updateEventDto: UpdateEventDto) {
        const event = await this.eventsRepository.findOneBy({ id });

        if (!event) {
            throw new Error(`Event with id ${id} not found`);
        }

        event.title = updateEventDto.title;
        await this.eventsRepository.save(event);
    }

    async remove(id: UUID) {
        await this.eventsRepository.delete({ id });
    }
}
