import { EventsEntity } from "@/modules/event/entities/events.entity";

export class EventPointGeometry {
    type: "Point";
    coordinates: number[];

    constructor(coordinates: number[]) {
        this.type = "Point";
        this.coordinates = coordinates;
    }
}

export class EventPointProperties {
    id: string;
    label: string;
    imageUrl: string;
    primaryColor: string | undefined;

    constructor(event: EventsEntity) {
        this.id = event.id;
        this.label = event.title;
        this.imageUrl = event.poster;
        this.primaryColor = event.primaryColor;
    }
}

export class EventPointResponseDto {
    id: string;
    type: "Feature";
    geometry: EventPointGeometry;
    properties: EventPointProperties;

    constructor(event: EventsEntity) {
        this.id = event.id;
        this.type = "Feature";

        if(event.locationPoint?.coordinates) {
            this.geometry = new EventPointGeometry(event.locationPoint.coordinates);
        }

        this.properties = new EventPointProperties(event);
    }
}