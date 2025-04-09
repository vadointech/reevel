import { Injectable } from "@nestjs/common";
import { CreateEventDto } from "./dto/create-event.dto";
import { Repository } from "typeorm";
import { EventEntity } from "./entities/event.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { UpdateEventDto } from "./dto/update-event.dto";

@Injectable()
export class EventService {
    constructor(
        @InjectRepository(EventEntity)
        private readonly eventsRepository: Repository<EventEntity>,
    ) { }

    async create(createEventDto: CreateEventDto) {
        const event = this.eventsRepository.create(createEventDto);
        await this.eventsRepository.save(event);
    }

    async findAll() {
        return await this.eventsRepository.find();
    }

    async findOne(id: string) {
        return await this.eventsRepository.findOneBy({ id });
    }

    async update(id: string, updateEventDto: UpdateEventDto) {
        const event = await this.eventsRepository.findOneBy({ id });

        if (!event) {
            throw new Error(`Event with id ${id} not found`);
        }

        event.title = updateEventDto.title;
        await this.eventsRepository.save(event);
    }

    async remove(id: string) {
        await this.eventsRepository.delete({ id });
    }
}
