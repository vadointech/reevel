import { IMapStore } from "../types";
import { RefObject } from "react";
import { EasingOptions } from "mapbox-gl";
import { MapRef } from "react-map-gl/mapbox";
import { action, makeObservable } from "mobx";

export class MapStore implements IMapStore {
    mapStyleDark?: string;
    mapStyleLight?: string;
    accessToken?: string;
    mapRef: RefObject<MapRef | null> = { current: null };

    constructor(params: {
        mapStyleDark?: string;
        mapStyleLight?: string;
        accessToken?: string;
    }) {
        makeObservable(this, {
            initialize: action,
            flyTo: action,
        });

        this.mapStyleDark = params.mapStyleDark;
        this.mapStyleLight = params.mapStyleLight;
        this.accessToken = params.accessToken;
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