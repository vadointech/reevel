import { EventEntity } from "@/entities/event/index";
import { EventPoint, Point } from "@/components/shared/map/types";

class EventEntityMapper<T extends EventEntity = EventEntity> {
    toEventPoint(input?: T[]): Point<EventPoint>[] {
        if(!input) return [];

        const points: Point<EventPoint>[] = [];

        input.forEach(event => {
            if(event.id && event.locationPoint) {
                points.push({
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
        });

        return points;
    }
}

export const eventEntityMapper = new EventEntityMapper();