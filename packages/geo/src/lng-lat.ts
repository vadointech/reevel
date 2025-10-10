import { ILngLat } from "./types";

export class LngLat implements ILngLat {
    lng: number;
    lat: number;

    constructor(lng: number, lat: number) {
        this.lng = lng;
        this.lat = lat;
    }
}