import { EasingOptions } from "mapbox-gl";

export interface MapApi {
    flyTo: ApiFlyTo;
}

type ApiFlyTo = (
    coordinates: [number, number],
    options: EasingOptions
) => void;