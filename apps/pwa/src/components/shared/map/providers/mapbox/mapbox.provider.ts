import { RefObject } from "react";
import { LngLat, LngLatBounds } from "mapbox-gl";
import { MapRef, ViewState } from "react-map-gl/mapbox";
import { IMapProvider, MapProviderGL, MapProviderCameraState } from "../types";

export type ProviderParams = {
    accessToken?: string;
    initialViewState?: Partial<ViewState>;
};


export class MapboxProvider<T extends MapRef = MapRef> implements IMapProvider {
    private mapRef: RefObject<T | null> = { current: null };

    accessToken: string;
    initialViewState: Partial<ViewState>;
     
    constructor(ref: RefObject<T | null>, params: ProviderParams) {
        this.mapRef = ref;
        this.accessToken = params.accessToken || "";
        this.initialViewState = params.initialViewState || {};
    }

    flyTo(coordinates: [number, number], options: MapProviderCameraState.EasingOptions): void {
        if(this.mapRef.current) {
            this.mapRef.current.flyTo({
                center: coordinates,
                ...this.initialViewState,
                ...options,
            });
        }
    }

    fitBounds(bounds: [number, number, number, number], options: MapProviderCameraState.EasingOptions): void {
        if(this.mapRef.current) {
            this.mapRef.current.fitBounds(bounds, {
                pitch: this.initialViewState.pitch,
                ...options,
            });
        }
    }

    setPadding(padding: MapProviderCameraState.PaddingOptions, options: MapProviderCameraState.EasingOptions): void {
        if(this.mapRef.current) {
            this.mapRef.current?.flyTo({
                padding,
                ...options,
            });
        }
    }

    getBounds(): MapProviderGL.LngLatBounds | null {
        if(!this.mapRef.current) return null;
        return this.mapRef.current.getBounds();
    }

    getBufferedBounds(bufferPercentage: number = 0.2): MapProviderGL.LngLatBounds | null {
        const bounds = this.getBounds();
        if(!bounds) return null;

        const width = bounds.getEast() - bounds.getWest();
        const height = bounds.getNorth() - bounds.getSouth();

        const bufferX = width * bufferPercentage;
        const bufferY = height * bufferPercentage;

        return new LngLatBounds(
            [bounds.getWest() + bufferX, bounds.getSouth() + bufferY], // Southwest point
            [bounds.getEast() - bufferX, bounds.getNorth() - bufferY],  // Northeast point
        );
    }

    getHorizontalRadius(bounds: MapProviderGL.LngLatBounds, center: MapProviderGL.LngLat): number {
        const east = bounds.getNorthEast().lng;
        const west = bounds.getSouthWest().lng;

        const eastPoint = new LngLat(east, center.lat);
        const westPoint = new LngLat(west, center.lat);

        return westPoint.distanceTo(eastPoint) / 2;
    }
}