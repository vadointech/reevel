import data from "../data/events.json";
import { Injectable } from "@nestjs/common";

import { EventRepository } from "../../event/repositories/event.repository";
import { EventVisibility } from "@/modules/event/entities/events.entity";

@Injectable()
export class EventSeedService {
    constructor(
        private readonly eventRepository: EventRepository,
    ) {}

    async seedEvents() {
        return this.eventRepository.createAndSaveMany(
            data.map(item => ({
                title: item.title,
                description: item.description,
                poster: item.poster,
                posterFieldId: item.posterFieldId,
                primaryColor: item.primaryColor,
                location: {
                    type: "Point",
                    coordinates: item.location.coordinates,
                },
                ticketsAvailable: Number(item.ticketsAvailable),
                ticketPrice: Number(item.ticketPrice),
                visibility: EventVisibility.PUBLIC,
                startDate: new Date(item.startDate),
            })),
        );
    }
}