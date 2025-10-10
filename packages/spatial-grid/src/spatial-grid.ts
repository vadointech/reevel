import { ISpatialGrid, ISpatialGridBreakpointsConfig } from "./types";
import { SpatialGridConfig } from "./spatial-grid.config";
import { ILngLat } from "@/repo/geo";
import geohash from "ngeohash";

export class SpatialGrid implements ISpatialGrid {
    readonly breakpoints: ISpatialGridBreakpointsConfig[];

    constructor(config: ISpatialGridBreakpointsConfig[] = SpatialGridConfig) {
        this.breakpoints = config;
    }

    getBreakpointForZoom(zoom: number): ISpatialGridBreakpointsConfig {
        const found = this.breakpoints.find(bp => zoom >= bp.minZoom);
        if(!found) {
            throw new Error(`No breakpoint found for zoom: ${zoom}`);
        }
        return found;
    }

    getTile(center: ILngLat, zoom: number): { hash: string, zoom: number } {
        const {
            geohashPrecision,
            canonicalZoom,
        } = this.getBreakpointForZoom(zoom);

        const hash = geohash.encode(center.lat, center.lng, geohashPrecision);

        return {
            hash,
            zoom: canonicalZoom,
        };
    }
}