import { EventsEntity } from "@/modules/event/entities/events.entity";
import { EventPointResponseDto } from "@/modules/discover/dto";

export function eventEntityToEventPointResponse(event: EventsEntity): EventPointResponseDto {
    return new EventPointResponseDto({
        id: event.id,
        type: "Feature",
        geometry: {
            type: "Point",
            coordinates: event.locationPoint.coordinates,
        },
        properties: {
            id: event.id,
            label: event.title,
            imageUrl: event.poster,
            primaryColor: event.primaryColor,
        },
    });
}