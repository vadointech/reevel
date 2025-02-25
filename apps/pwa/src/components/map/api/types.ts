import { EasingOptions } from "mapbox-gl";

export interface IMapStore {
    flyTo: (
        coordinates: [number, number],
        options: EasingOptions
    ) => void;
}

export interface IMarkerStore {
    getMarkerId: (
        point: [number, number],
    ) => string;

    getMarkerPositionById: (
        id: string,
    ) => [number, number];

    setMarker: (
        id: string | null
    ) => void;
}