import { RefObject } from "react";
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
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            const { bounds, zoom, ...state } = this._internalConfig.viewState;

            this.fitBounds(bounds, {
                ...state,
                ...options,
            });
        } else {
            this.flyTo({
                ...this._internalConfig.viewState,
                ...options,
            });
        }
    }

    getViewState(): MapInternalConfig.IViewStateConfig {
        if(!this.mapRef.current) return this._internalConfig.viewState;

        const bounds = this.getBounds();
        const center = bounds.getCenter();

        const zoom = this.getZoom();
        const padding = this.mapRef.current.getPadding();
        const pitch = this.mapRef.current.getPitch();

        return {
            center,
            bounds,
            zoom,
            pitch,
            padding,
        };
    }

    flyTo(options: MapProviderCameraState.EasingOptions): void {
        if(this.mapRef.current) {
            this.mapRef.current.flyTo({
                ...this._internalConfig.viewState,
                ...options,
            });
        }
    }

    fitBounds(bounds: MapProviderGL.LngLatBounds, options?: MapProviderCameraState.EasingOptions) {
        if(this.mapRef.current) {
            return this.mapRef.current.fitBounds(bounds, {
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

    getBounds(): MapProviderGL.LngLatBounds {
        if(!this.mapRef.current) return this._internalConfig.viewState.bounds;
        return this.mapRef.current.getBounds() || this._internalConfig.viewState.bounds;
    }

    getZoom(zoom?: number): number {
        if(zoom) return  Math.round(zoom * 1000) / 1000;
        if(!this.mapRef.current) return this._internalConfig.viewState.zoom;
        return Math.round(this.mapRef.current.getZoom() * 1000) / 1000;
    }
}