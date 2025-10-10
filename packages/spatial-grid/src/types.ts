import { ILngLat } from "@/repo/geo";

export interface ISpatialGrid {
    readonly breakpoints: ISpatialGridBreakpointsConfig[];
    getBreakpointForZoom(zoom: number): ISpatialGridBreakpointsConfig
    getTile(center: ILngLat, zoom: number): { hash: string, zoom: number};
}

export interface ISpatialGridBreakpointsConfig {
    minZoom: number;
    canonicalZoom: number;
    geohashPrecision: number;
    dataLimit?: number;
}