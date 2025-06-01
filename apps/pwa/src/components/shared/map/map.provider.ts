import { LngLat, LngLatBounds } from "mapbox-gl";
import { MapProviderInternalConfig } from "./map.config";
import { IMapRootProvider, MapConfig, MapProviderGL, MapInternalConfig } from "./types";

export class MapRootProvider implements IMapRootProvider {
    protected readonly _internalConfig: MapInternalConfig.IInternalConfig;

    constructor(config: MapConfig.Params) {
        this._internalConfig = new MapProviderInternalConfig(config);
    }

    get internalConfig(): MapInternalConfig.IInternalConfig {
        return this._internalConfig;
    }

    getHorizontalRadius(bounds: MapProviderGL.LngLatBounds, center: MapProviderGL.LngLat): number {
        const east = bounds.getNorthEast().lng;
        const west = bounds.getSouthWest().lng;

        const eastPoint = new LngLat(east, center.lat);
        const westPoint = new LngLat(west, center.lat);

        return westPoint.distanceTo(eastPoint) / 2;
    }

    getBufferedBounds(bounds: MapProviderGL.LngLatBounds, bufferPercentage: number = 0): MapProviderGL.LngLatBounds {
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