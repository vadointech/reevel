import { UserProfileEntity } from "@/entities/profile";

export type CitiesEntity = {
    id: string;
    name: string;
    mapboxId: string;
    center: {
        type: "Point";
        coordinates: [number, number];
    };
    bbox: {
        type: "Polygon";
        coordinates: number[][][]
    };
    profiles?: UserProfileEntity[];
};