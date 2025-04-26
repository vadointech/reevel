import { Injectable } from "@nestjs/common";
import {  Repository } from "@/modules/repository";
import { DataSource } from "typeorm";
import { EventTicketsEntity } from "@/modules/event/entities/event-tickets.entity";

@Injectable()
export class EventTicketsRepository extends Repository<EventTicketsEntity> {
    constructor(dataSource: DataSource) {
        super(dataSource, EventTicketsEntity);
    }
}