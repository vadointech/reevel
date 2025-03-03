import { MapRef, ViewState } from "react-map-gl/mapbox";
import { IMapProvider } from "../types";
import { RefObject } from "react";
import { EasingOptions } from "mapbox-gl";

export type ProviderParams = {
    accessToken?: string;
    initialViewState?: Partial<ViewState>;
};

export type ProviderHandlerOptions = EasingOptions;

export interface IMapboxProvider extends IMapProvider<ProviderHandlerOptions> {}

export class MapboxProvider<T extends MapRef = MapRef> implements IMapProvider<ProviderHandlerOptions> {
    private mapRef: RefObject<T | null> = { current: null };

    accessToken: string;
    initialViewState: Partial<ViewState>;
     
    constructor(ref: RefObject<T | null>, params: ProviderParams) {
        this.mapRef = ref;
        this.accessToken = params.accessToken || "";
        this.initialViewState = params.initialViewState || {};
    }

    flyTo(coordinates: [number, number], options: EasingOptions): void {
        if(this.mapRef.current) {
            this.mapRef.current.flyTo({
                center: coordinates,
                ...this.initialViewState,
                ...options,
            });
        }
    }

    fitBounds(bounds: [number, number, number, number], options: EasingOptions): void {
        if(this.mapRef.current) {
            this.mapRef.current.fitBounds(bounds, {
                pitch: this.initialViewState.pitch,
                ...options,
            });
        }
    }
}