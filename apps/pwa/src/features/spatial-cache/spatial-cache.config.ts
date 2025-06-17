import { TSpatialCacheConfig } from "./types";

export const SpatialCacheConfig: TSpatialCacheConfig = {
    MAX_CACHED_REGIONS: 500,
    CACHE_EXPIRY: 1000 * 60 * 15, // 15 minutes
    COVERAGE_THRESHOLD: 0.7,
    MIN_ZOOM: 10,
    GOOGLE_PLACES_API_LIMIT: 10,
};