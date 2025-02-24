import { IMapStore } from "../types";
import { RefObject } from "react";
import { EasingOptions } from "mapbox-gl";
import { MapRef } from "react-map-gl/mapbox";
import { action, makeObservable } from "mobx";

class MapStore implements IMapStore {
    mapRef: RefObject<MapRef | null> = { current: null };

    constructor() {
        makeObservable(this, {
            initialize: action,
            flyTo: action,
        });
    }

    initialize(ref: RefObject<MapRef | null>) {
        this.mapRef = ref;
    }

    flyTo(coordinates: [number, number], options: EasingOptions): void {
        if(this.mapRef.current) {
            this.mapRef.current.flyTo({
                center: coordinates,
                ...options,
            });
        }
    }
}

export const mapStore = new MapStore();