export class EventPointResponseDto {
    id: string;
    type: "Feature";
    geometry: {
        type: "Point";
        coordinates: number[];
    };
    properties: {
        id: string;
        label: string;
        imageUrl: string;
        primaryColor: string | undefined;
    };

    constructor(input: EventPointResponseDto) {
        Object.assign(this, input);
    }
}