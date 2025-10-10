import { ILngLat, IPoint } from "./types";

export class Point implements IPoint {
    lng: number;
    lat: number;

    constructor(lng: number, lat: number) {
        this.lng = lng;
        this.lat = lat;
    }

    distanceTo(other: ILngLat): number {
        const R = 6371000; // Earth's radius in meters
        const lat1Rad = this.lat * Math.PI / 180;
        const lat2Rad = other.lat * Math.PI / 180;
        const deltaLatRad = (other.lat - this.lat) * Math.PI / 180;
        const deltaLngRad = (other.lng - this.lng) * Math.PI / 180;

        const a =
          Math.sin(deltaLatRad / 2) * Math.sin(deltaLatRad / 2) +
          Math.cos(lat1Rad) * Math.cos(lat2Rad) * Math.sin(deltaLngRad / 2) * Math.sin(deltaLngRad / 2);

        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

        return R * c;
    }
}