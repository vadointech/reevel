import data from "../data/events.json";
import { Injectable } from "@nestjs/common";
import { DeepPartial } from "typeorm";

import { EventRepository } from "@/modules/event/repositories";
import { EventsEntity, EventVisibility } from "@/modules/event/entities/events.entity";
import { EventInterestsRepository } from "@/modules/event/repositories/event-interests.repository";
import { EventInterestsEntity } from "@/modules/event/entities/event-interests.entity";

import { startOfToday, isBefore, add, differenceInSeconds } from "date-fns";

@Injectable()
export class EventSeedService {
    constructor(
        private readonly eventRepository: EventRepository,
        private readonly eventInterestsRepository: EventInterestsRepository,
    ) {}

    async seedEvents() {
        const today = startOfToday();

        const eventsData: DeepPartial<EventsEntity>[] = data.map(item => {
            const originalStartDate = new Date(item.startDate);
            const originalEndDate = item.endDate ? new Date(item.endDate) : undefined;

            let finalStartDate = originalStartDate;
            let finalEndDate = originalEndDate;

            if (isBefore(originalStartDate, today)) {
                const daysToAdd = Math.floor(Math.random() * 14) + 1;
                finalStartDate = add(today, { days: daysToAdd });

                if(originalEndDate) {
                    const durationSec = differenceInSeconds(originalEndDate, originalStartDate);
                    finalEndDate = add(finalStartDate, { seconds: durationSec });
                }
            }

            return {
                title: item.title,
                description: item.description,
                poster: item.poster,
                posterFieldId: item.posterFieldId,
                primaryColor: item.primaryColor,
                locationPoint: {
                    type: "Point",
                    coordinates: item.location.coordinates,
                },
                locationTitle: item.locationTitle,
                ticketsAvailable: item.ticketsAvailable ? Number(item.ticketsAvailable) : undefined,
                ticketPrice: item.ticketPrice ? Number(item.ticketPrice) : undefined,
                visibility: EventVisibility.PUBLIC,
                startDate: finalStartDate,
                endDate: finalEndDate,
            };
        });

        const createdEvents = await this.eventRepository.createAndSaveMany(eventsData);

        await this.seedEventInterests(createdEvents);

        return createdEvents;
    }

    private async seedEventInterests(events: EventsEntity[]) {
        const eventInterests: EventInterestsEntity[] = events.map((item, index) => {
            const interests = [...new Set(data[index].interests)];
            return interests.map(interest => {
                return this.eventInterestsRepository.create({
                    eventId: item.id,
                    interestId: interest,
                });
            });
        }).flat();

        return this.eventInterestsRepository.createAndSaveMany(eventInterests);
    }
}