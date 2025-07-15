import data from "../data/events.json";
import { Injectable } from "@nestjs/common";

import { EventRepository } from "../../event/repositories/event.repository";
import { EventVisibility } from "@/modules/event/entities/events.entity";
import { EventInterestsRepository } from "@/modules/event/repositories/event-interests.repository";
import { InterestsRepository } from "@/modules/interests/repositories/interests.repository";

@Injectable()
export class EventSeedService {
    constructor(
        private readonly eventRepository: EventRepository,
        private readonly eventInterestsRepository: EventInterestsRepository,
        private readonly interestsRepository: InterestsRepository,

    ) { }

    async seedEvents() {
        const createdEvents = this.eventRepository.createAndSaveMany(
            data.map(item => ({
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
                ticketsAvailable: Number(item.ticketsAvailable),
                ticketPrice: Number(item.ticketPrice),
                visibility: EventVisibility.PUBLIC,
                startDate: new Date(item.startDate),
                endDate: new Date(item.endDate),
                isFeatured: item.isFeatured,
            })),
        );

        await this.seedEventInterests(await createdEvents);

        return createdEvents;
    }

    private async seedEventInterests(events: any[]) {
        for (let i = 0; i < events.length; i++) {
            const event = events[i];
            const eventData = data[i];

            if (eventData.interests && eventData.interests.length > 0) {
                for (const interestSlug of eventData.interests) {
                    try {
                        const interest = await this.interestsRepository.findOne({
                            where: { slug: interestSlug },
                        });

                        if (interest) {
                            const eventInterest = this.eventInterestsRepository.create({
                                eventId: event.id,
                                interestId: interest.slug,
                            });

                            await this.eventInterestsRepository.save(eventInterest);
                        } else {
                            console.log(`Інтерес з slug "${interestSlug}" не знайдено для події "${event.title}"`);
                        }
                    } catch (error) {
                        console.log(`Помилка при створенні зв'язку для події "${event.title}" та інтересу "${interestSlug}": ${error.message}`);
                        continue;
                    }
                }
            }
        }
    }
}