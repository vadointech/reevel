/**
 * Interface for the SpatialCache class.
 * Handles spatial caching, region management, and coverage analysis for map-based data.
 */
export interface ISpatialCache {
    /**
     * Adds a new region to the cache.
     * Automatically handles eviction if cache limit is reached.
     *
     * @param region - The region to add (excluding fields calculated by the cache itself).
     */
    addRegion(region: Omit<CachedRegion, "gridKeys" | "cachedGridSize" | "density" | "accessCount" | "lastAccessed" | "minValidZoom" | "maxValidZoom">): void;

    /**
     * Removes a region from the cache by its unique identifier.
     *
     * @param id - The ID of the region to remove.
     */
    removeRegion(id: string): void;

    /**
     * Finds cached regions that intersect the specified bounds and match the provided zoom and placeType.
     * Automatically filters out expired or irrelevant regions.
     *
     * @param bounds - The map bounds to search within.
     * @param zoom - The current map zoom level.
     * @param placeType - (Optional) Place type to filter matching regions.
     * @returns An array of matching cached regions.
     */
    findCoveringRegions(bounds: MapProviderGL.LngLatBounds, zoom: number, placeType?: string): CachedRegion[];

    /**
     * Returns coverage information for a given area and zoom level.
     * Calculates how well the area is covered by cached regions.
     *
     * @param bounds - The map bounds to check.
     * @param zoom - The current map zoom level.
     * @param placeType - (Optional) Place type to filter matching regions.
     * @returns Coverage information object.
     */
    getCoverageInfo(bounds: MapProviderGL.LngLatBounds, zoom: number, placeType?: string): CoverageInfo;

    /**
     * Checks whether a specific point is covered by any cached region for the given zoom and place type.
     *
     * @param lat - Latitude of the point.
     * @param lng - Longitude of the point.
     * @param zoom - The current map zoom level.
     * @param placeType - (Optional) Place type to filter matching regions.
     * @returns True if the point is covered; otherwise false.
     */
    isPointCovered(lat: number, lng: number, zoom: number, placeType?: string): boolean;

    /**
     * Returns cache statistics useful for debugging and monitoring.
     * Includes information like total regions, grid cells, memory usage, and average region age.
     *
     * @returns Cache statistics object.
     */
    getStats(): {
        totalRegions: number;
        totalGridCells: number;
        oldestTimestamp: number;
        newestTimestamp: number;
        averageAge: number;
        expiredRegions: number;
        regionsWithMaxPlaces: number;
        averagePlaceCount: number;
        totalAccessCount: number;
        memoryUsage: {
            regions: string;
            grid: string;
            total: string;
        };
    };

    /**
     * Forces cleanup of all expired regions from the cache.
     */
    cleanup(): void;

    /**
     * Clears all cached regions and resets the cache.
     */
    clear(): void;

    /**
     * Exports the current state of the cache for persistence (e.g. saving to disk or server).
     *
     * @returns Serializable export of the cache.
     */
    export(): TSpatialCacheExtort;

    /**
     * Imports previously exported cache data into the current cache.
     * Skips expired or invalid data during import.
     *
     * @param data - Previously exported cache data.
     */
    import(data: TSpatialCacheExtort): void;

    /**
     * Creates a stable and unique region ID based on bounds, zoom and place type.
     *
     * @param bounds - Bounds for which to generate the region ID.
     * @param zoom - Zoom level.
     * @param placeType - (Optional) Place type.
     * @returns Stable unique region ID.
     */
    createStableRegionId(bounds: MapProviderGL.LngLatBounds, zoom: number, placeType?: string): string;

    /**
     * Quantize the zoom value to a discrete level (rounded to nearest 0.5 step).
     *
     * @param zoom - The zoom level to quantize.
     * @returns Quantized zoom value.
     */
    getQuantizedZoom(zoom: number): number;
}
