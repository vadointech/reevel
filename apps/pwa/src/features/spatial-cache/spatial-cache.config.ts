import { constructorInit } from "@/lib/init";
import { ISpatialCacheConfig } from "./types";

export class SpatialCacheConfig implements ISpatialCacheConfig {
    maxCachedRegions = 500;
    cacheExpiry = 1000 * 60 * 15;
    coverageThreshold = 0.7;
    minZoom = 10;
    apiLimit = 10;
    sensitivity = 1;

    constructor(params: Partial<ISpatialCacheConfig> = {}) {
        constructorInit(this, params);
    }
}