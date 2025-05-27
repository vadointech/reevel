import { RefObject } from "react";
import { LngLatBounds } from "mapbox-gl";
import { MapRef } from "react-map-gl/mapbox";
import {
    IMapProvider,
    MapProviderGL,
    MapConfig,
    MapProviderCameraState,
    MapInternalConfig,
} from "../../types";
import { MapRootProvider } from "../../map.provider";

export class MapboxProvider<T extends MapRef = MapRef> extends MapRootProvider implements IMapProvider {
    constructor(
        readonly mapRef: RefObject<T | null>,
        config: MapConfig.Params,
    ) {
        super(config);
    }

    initialize(map?: RefObject<T>): void {
        if(map?.current) {
            this.mapRef.current = map.current;
            this.resetViewState();
        }
    }

    resetViewState(
        viewState?: Partial<MapInternalConfig.IViewStateConfig>,
        options?: MapProviderCameraState.EasingOptions,
    ) {
        if(viewState) {
            this._internalConfig.viewState = {
                ...this._internalConfig.viewState,
                ...viewState,
            };
        }

        if(this._internalConfig.viewState.bounds) {
            const { bounds, pitch, padding } = this._internalConfig.viewState;
            this.fitBounds(bounds, {
                pitch,
                padding,
                ...options,
            });
        } else {
            this.flyTo({
                ...this._internalConfig.viewState,
                ...options,
            });
        }
    }

    flyTo(options: MapProviderCameraState.EasingOptions): void {
        if(this.mapRef.current) {
            this.mapRef.current.flyTo({
                ...this._internalConfig.viewState,
                ...options,
            });
        }
    }

    fitBounds(bounds: MapProviderGL.LngLatBounds, options?: MapProviderCameraState.EasingOptions): void {
        if(this.mapRef.current) {
            this.mapRef.current.fitBounds(bounds, {
                pitch: this._internalConfig.viewState.pitch,
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
}