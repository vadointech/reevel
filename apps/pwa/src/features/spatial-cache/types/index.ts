import { MapProviderGL } from "@/components/shared/map/types";

export * from "./spatial-cache";

export type TCachedRegion = {
    id: string;
    bounds: MapProviderGL.LngLatBounds;
    density: number;
    pointsCount: number;
    minValidZoom: number;
    maxValidZoom: number;
    zoom: number;
    cachedGridSize: number;
    placeType?: string;
    timestamp: number;
    gridKeys: string[];
    accessCount?: number; // For LRU tracking
    lastAccessed?: number;
};

export type TCoverageInfo = {
    ratio: number; // The overall coverage ratio (0.0 to 1.0)
    currentBestCoveredRegionId?: string; // ID of the single CachedRegion providing the most coverage that meets density
    bestSingleRegionIntersectionArea?: number; // The intersection area of that best single region with the queryBounds
};

export type TSpatialCacheConfig = {
    MAX_CACHED_REGIONS: number;
    CACHE_EXPIRY: number;
    COVERAGE_THRESHOLD: number;
    MIN_ZOOM: number;
    GOOGLE_PLACES_API_LIMIT: number;
};

export type TSpatialCacheZoomBreakpointsConfig = {
    minZoomThreshold: number;
    zoomOffset: number;
    gridSize: number;
    density: {
        default: number;
        placeSelected: number;
    };
};

export type TSpatialCacheExtort = {
    regions: any[];
    timestamp: number
};