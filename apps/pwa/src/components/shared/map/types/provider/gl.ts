import {
    LngLatBounds as MapboxLngLatBounds, LngLatBoundsLike as MapboxLngLatBoundsLike,
} from "mapbox-gl";

export namespace MapProviderGL {
    export type LngLatPolygon = number[][][];

    export interface LngLat {
        lng: number;
        lat: number;

        /** Returns the approximate distance between a pair of coordinates in meters
         * Uses the Haversine Formula (from R. W. Sinnott, "Virtues of the Haversine", Sky and Telescope, vol. 68, no. 2, 1984, p. 159)
         */
        distanceTo(lngLat: LngLat): number;
    }

    export type LngLatLike = [number, number] | LngLat | { lng: number; lat: number };

    export type LngLatBounds = MapboxLngLatBounds;
    export type LngLatBoundsLike = MapboxLngLatBoundsLike;
}