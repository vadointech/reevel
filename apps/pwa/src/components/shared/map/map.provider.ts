import { LngLat, LngLatBounds } from "mapbox-gl";
import { MapProviderInternalConfig } from "./map.config";
import { IMapRootProvider, MapConfig, MapProviderGL, MapInternalConfig } from "./types";

export class MapRootProvider implements IMapRootProvider {
    protected readonly _internalConfig: MapInternalConfig.IInternalConfig;
    protected readonly _defaultConfig: MapInternalConfig.IInternalConfig;

    constructor(config: MapConfig.Params | MapProviderInternalConfig) {
        if(config instanceof MapProviderInternalConfig) {
            this._internalConfig = config;
            this._defaultConfig = config;
        } else {
            this._internalConfig = new MapProviderInternalConfig(config);
            this._defaultConfig = new MapProviderInternalConfig(config);
        }
    }

    get internalConfig(): MapInternalConfig.IInternalConfig {
        return this._internalConfig;
    }

    get defaultConfig(): MapInternalConfig.IInternalConfig {
        return this._defaultConfig;
    }

    getHorizontalRadius(bounds: MapProviderGL.LngLatBounds, center: MapProviderGL.LngLat): number {
        const east = bounds.getNorthEast().lng;
        const west = bounds.getSouthWest().lng;

        const eastPoint = new LngLat(east, center.lat);
        const westPoint = new LngLat(west, center.lat);

        return westPoint.distanceTo(eastPoint) / 2;
    }

    getBufferedBounds(bounds: MapProviderGL.LngLatBounds, bufferPercentage: number = .2): MapProviderGL.LngLatBounds {
        const width = bounds.getEast() - bounds.getWest();
        const height = bounds.getNorth() - bounds.getSouth();

        const bufferX = width * bufferPercentage;
        const bufferY = height * bufferPercentage;

        return new LngLatBounds(
            [bounds.getWest() + bufferX, bounds.getSouth() + bufferY], // Southwest point
            [bounds.getEast() - bufferX, bounds.getNorth() - bufferY],  // Northeast point
        );
    }

    getDistance(p1: MapProviderGL.LngLatLike, p2: MapProviderGL.LngLatLike): number {
        const point1 = LngLat.convert(p1);
        const point2 = LngLat.convert(p2);

        return point1.distanceTo(point2);
    }

    getDynamicDuration(p1: MapProviderGL.LngLatLike, p2: MapProviderGL.LngLatLike): number {
        const distance = this.getDistance(p1, p2);
        return  Math.min(1000, Math.max(400, distance * 0.2)); // 0.2ms per 1m
    }
}