import { EventEntity, EventPointEntity } from "@/entities/event";

export function eventEntityToEventPointEntity(event: EventEntity): EventPointEntity {
    return {
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
    };
}