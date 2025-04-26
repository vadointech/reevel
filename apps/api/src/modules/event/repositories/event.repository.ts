import { Injectable } from "@nestjs/common";
import { Repository } from "@/modules/repository";
import { DataSource } from "typeorm";
import { EventsEntity } from "@/modules/event/entities/events.entity";

@Injectable()
export class EventRepository extends Repository<EventsEntity>  {
    constructor(dataSource: DataSource) {
        super(dataSource, EventsEntity);
    }
}