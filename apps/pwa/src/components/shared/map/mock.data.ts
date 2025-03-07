import { Point } from "./types";
import { EventEntity } from "@/entities/event";

export const mockGeoJsonData: Point<EventEntity>[] = [
    {
        type: "Feature",
        properties: {
            id: "1",
            image: "http://localhost:3000/assets/temp/avatar.png",
        },
        geometry: {
            type: "Point",
            coordinates: [
                28.42009526821738,
                49.21978684570328,
            ],
        },
    },
    {
        type: "Feature",
        properties: {
            id: "2",
            image: "http://localhost:3000/assets/temp/avatar.png",
        },
        geometry: {
            type: "Point",
            coordinates: [
                28.412681187828355,
                49.226090388753505,
            ],
        },
    },
    {
        type: "Feature",
        properties: {
            id: "3",
            image: "http://localhost:3000/assets/temp/avatar.png",
        },
        geometry: {
            type: "Point",
            coordinates: [
                28.41130235675783,
                49.22621694011241,
            ],
        },
    },
];