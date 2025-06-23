import { LngLatBounds } from "mapbox-gl";

import { SpatialCacheConfig } from "./spatial-cache.config";

import { MapProviderGL } from "@/components/shared/map/types";
import { ISpatialCache, TCachedRegion, TCoverageInfo, TSpatialCacheExtort, TSpatialCacheZoomBreakpointsConfig } from "./types";

type SpatialGrid = Record<string, Set<string>>;

export class SpatialCache implements ISpatialCache {
    private regions = new Map<string, TCachedRegion>();
    private spatialGrid: SpatialGrid = {};

    private static readonly ZOOM_BREAKPOINTS_CONFIG: ReadonlyArray<TSpatialCacheZoomBreakpointsConfig> = Object.freeze(
        [
            { minZoomThreshold: 17, gridSize: 0.001, zoomOffset: 1, density: { placeSelected: 400, default: 2000 } },
            { minZoomThreshold: 15, gridSize: 0.002, zoomOffset: 1.5, density: { placeSelected: 100, default: 500 } },
            { minZoomThreshold: 13, gridSize: 0.005, zoomOffset: 2,  density: { placeSelected: 16, default: 80 } },
            { minZoomThreshold: 11, gridSize: 0.01,  zoomOffset: 3, density: { placeSelected: 4, default: 10 } },
            { minZoomThreshold: 0,  gridSize: 0.02,  zoomOffset: 4, density: { placeSelected: 1, default: 5 } },
        ].sort((a, b) =>
            b.minZoomThreshold - a.minZoomThreshold,  // Ensure descending order by threshold
        ),
    );

    private static readonly UNIQUE_GRID_SIZES: ReadonlyArray<number> = Object.freeze(
        SpatialCache.ZOOM_BREAKPOINTS_CONFIG.map(tier => tier.gridSize),
    );

    private static getBreakpointConfigForZoom(zoom: number): TSpatialCacheZoomBreakpointsConfig {
        for (const tier of SpatialCache.ZOOM_BREAKPOINTS_CONFIG) {
            if (zoom >= tier.minZoomThreshold) {
                return tier;
            }
        }
        // console.warn(`SpatialCache: No specific zoom tier for zoom ${zoom}. Using the lowest tier as fallback.`);
        return SpatialCache.ZOOM_BREAKPOINTS_CONFIG[SpatialCache.ZOOM_BREAKPOINTS_CONFIG.length - 1];
    }

    private getGridSizeForZoom(zoom: number): number {
        return SpatialCache.getBreakpointConfigForZoom(zoom).gridSize;
    }

    private getZoomRangeForLevel(zoom: number): Pick<TCachedRegion, "minValidZoom" | "maxValidZoom"> {
        const { zoomOffset } = SpatialCache.getBreakpointConfigForZoom(zoom);
        return {
            minValidZoom: Math.round(zoom - zoomOffset),
            maxValidZoom: Math.ceil(zoom + zoomOffset),
        };
    }

    private getRequiredDensityForZoom(zoom: number, placeType?: string): number {
        const tierConfig = SpatialCache.getBreakpointConfigForZoom(zoom);

        return placeType ? tierConfig.density.placeSelected : tierConfig.density.default;
    }

    private getGridKey(lat: number, lng: number, zoom: number): string {
        const gridSize = this.getGridSizeForZoom(zoom);
        const gridLat = Math.floor(lat / gridSize);
        const gridLng = Math.floor(lng / gridSize);
        return `${gridLat},${gridLng}`;
    }

    private computeGridKeys(bounds: MapProviderGL.LngLatBounds, gridSize: number): string[] {
        const sw = bounds.getSouthWest();
        const ne = bounds.getNorthEast();

        const minLat = Math.floor(sw.lat / gridSize);
        const maxLat = Math.floor(ne.lat / gridSize);
        const minLng = Math.floor(sw.lng / gridSize);
        const maxLng = Math.floor(ne.lng / gridSize);

        const keys: string[] = [];

        for (let lat = minLat; lat <= maxLat; lat++) {
            for (let lng = minLng; lng <= maxLng; lng++) {
                keys.push(`${lat},${lng}`);
            }
        }

        return keys;
    }
    private computeDensity(pointsCount: number, bounds: MapProviderGL.LngLatBounds): number {
        const area = this.calculateBoundsArea(bounds);

        let computedDensity = 0;
        if(area > 0) {
            computedDensity = pointsCount / area; // Density = items per "square degree"
        } else if(pointsCount > 0) {
            // If the area is zero or negligible (e.g., a point query or tiny bounds)
            // but items exist, the density is very high.
            computedDensity = 1_000_000; // A large number representing high density
        }

        return computedDensity;
    }

    getQuantizedZoom(zoom: number): number {
        return Math.round(zoom * 2) / 2; // Round to the nearest 0.5
    }

    createStableRegionId(bounds: MapProviderGL.LngLatBounds, zoom: number, placeType?: string): string {
        const center = bounds.getCenter();

        // Quantize coordinates to reduce precision
        const gridSize = this.getGridSizeForZoom(zoom);
        const quantizedLat = Math.round(center.lat / gridSize) * gridSize;
        const quantizedLng = Math.round(center.lng / gridSize) * gridSize;

        // Quantize zoom to discrete levels
        const zoomLevel = this.getQuantizedZoom(zoom);

        const typeString = placeType ? `type-${placeType}` : "type-none";

        return `region_${zoomLevel}_${quantizedLat.toFixed(4)}_${quantizedLng.toFixed(4)}_${typeString}`;
    }

    addRegion(region: Omit<TCachedRegion, "gridKeys" | "cachedGridSize" | "density" | "accessCount" | "lastAccessed" | "minValidZoom" | "maxValidZoom">): void {
        // Clean up expired regions first
        this.cleanupExpiredRegions();

        // Evict old regions if the cache is full
        if (this.regions.size >= SpatialCacheConfig.MAX_CACHED_REGIONS) {
            this.evictLeastRecentlyUsed(Math.floor(SpatialCacheConfig.MAX_CACHED_REGIONS * 0.1));
        }

        const gridSize = this.getGridSizeForZoom(region.zoom);
        const gridKeys = this.computeGridKeys(region.bounds, gridSize);
        const density = this.computeDensity(region.pointsCount, region.bounds);

        // Ensure minimum zoom range for better reusability
        const { minValidZoom, maxValidZoom } = this.getZoomRangeForLevel(region.zoom);

        const enriched: TCachedRegion = {
            ...region,
            gridKeys,
            density,
            minValidZoom,
            maxValidZoom,
            cachedGridSize: gridSize,
            accessCount: 1,
            lastAccessed: Date.now(),
        };

        // Remove an existing region if it exists (an update case)
        this.removeRegion(enriched.id);

        // Add a new region
        this.regions.set(enriched.id, enriched);

        // Update spatial grid
        for (const key of gridKeys) {
            if (!this.spatialGrid[key]) this.spatialGrid[key] = new Set();
            this.spatialGrid[key].add(region.id);
        }
    }

    removeRegion(id: string): void {
        const region = this.regions.get(id);
        if (!region) return;

        // Remove from spatial grid
        for (const key of region.gridKeys) {
            const cell = this.spatialGrid[key];
            if (cell) {
                cell.delete(id);
                if (cell.size === 0) delete this.spatialGrid[key];
            }
        }

        this.regions.delete(id);
        // console.log(`Removed cached region ${id}`);
    }

    private cleanupExpiredRegions(): void {
        const now = Date.now();
        const expiredIds: string[] = [];

        for (const [id, region] of this.regions) {
            if (now - region.timestamp > SpatialCacheConfig.CACHE_EXPIRY) {
                expiredIds.push(id);
            }
        }

        for (const id of expiredIds) {
            this.removeRegion(id);
        }

        // if (expiredIds.length > 0) {
        //     console.log(`Cleaned up ${expiredIds.length} expired regions`);
        // }
    }

    private evictLeastRecentlyUsed(count: number): void {
        const sorted = [...this.regions.values()]
            .sort((a, b) => {
                // Primary sort: by last accessed time
                const aAccessed = a.lastAccessed || a.timestamp;
                const bAccessed = b.lastAccessed || b.timestamp;
                if (aAccessed !== bAccessed) {
                    return aAccessed - bAccessed;
                }
                // Secondary sort: by access count (lower first)
                return (a.accessCount || 0) - (b.accessCount || 0);
            })
            .slice(0, count);

        for (const region of sorted) {
            this.removeRegion(region.id);
        }

        // console.log(`Evicted ${sorted.length} least recently used regions`);
    }

    findCoveringRegions(bounds: MapProviderGL.LngLatBounds, _zoom: number, placeType?: string): TCachedRegion[] {
        const regionIds = new Set<string>();

        for (const gridSize of SpatialCache.UNIQUE_GRID_SIZES) {
            const keysForThisGridSize = this.computeGridKeys(bounds, gridSize);
            for (const key of keysForThisGridSize) {
                const cellRegions = this.spatialGrid[key]; // These are region IDs
                if (cellRegions) {
                    cellRegions.forEach(id => regionIds.add(id));
                }
            }
        }

        const now = Date.now();
        const result: TCachedRegion[] = [];

        for (const id of regionIds) {
            const region = this.regions.get(id);
            if (!region) continue;

            // Check expiry
            if (now - region.timestamp > SpatialCacheConfig.CACHE_EXPIRY) {
                this.removeRegion(id);
                continue;
            }

            // Check zoom validity with tolerance
            // if (zoom < region.minValidZoom - 0.5 || zoom > region.maxValidZoom - 0.5) continue;

            if (region.placeType !== placeType) {
                continue;
            }

            // Check if regions actually intersect
            if (this.boundsIntersect(bounds, region.bounds)) {
                // Update access tracking
                region.accessCount = (region.accessCount || 0) + 1;
                region.lastAccessed = now;

                result.push(region);
            }
        }

        return result;
    }

    private boundsIntersect(a: MapProviderGL.LngLatBounds, b: MapProviderGL.LngLatBounds): boolean {
        const aSW = a.getSouthWest();
        const aNE = a.getNorthEast();
        const bSW = b.getSouthWest();
        const bNE = b.getNorthEast();

        return !(aNE.lng < bSW.lng || aSW.lng > bNE.lng ||
          aNE.lat < bSW.lat || aSW.lat > bNE.lat);
    }
    
    public getCoverageInfo(bounds: MapProviderGL.LngLatBounds, zoom: number, placeType?: string): TCoverageInfo {
        if (zoom <= SpatialCacheConfig.MIN_ZOOM) {
            // console.log(`ℹ️ Map zoom ${zoom.toFixed(1)} is at or below MIN_ZOOM (${CONFIG.MIN_ZOOM}). Skipping API request and precache.`);
            return {
                ratio: 1,
                currentBestCoveredRegionId: undefined,
                bestSingleRegionIntersectionArea: 0,
            };
        }

        const coveringRegions = this.findCoveringRegions(bounds, zoom, placeType);

        const initialResult: TCoverageInfo = {
            ratio: 0,
            currentBestCoveredRegionId: undefined,
            bestSingleRegionIntersectionArea: 0,
        };

        if (coveringRegions.length === 0) {
            return initialResult;
        }

        const targetArea = this.calculateBoundsArea(bounds);

        const requiredDensity = this.getRequiredDensityForZoom(zoom, placeType);

        if (targetArea === 0) {
            // If query bounds have no area, and we have candidate regions that passed
            // findCoveringRegions (implying they are valid and overlap this point/line),
            // consider coverage 100%. No single "best" region by area is meaningful here.
            // If any dense candidate exists, that's good. Pick the first dense one if needed.
            for (const region of coveringRegions) {
                if (region.density >= requiredDensity) {
                    return {
                        ratio: 1,
                        currentBestCoveredRegionId: region.id,
                        bestSingleRegionIntersectionArea: 0,
                    };
                }
            }
            return { ratio: 1, currentBestCoveredRegionId: undefined, bestSingleRegionIntersectionArea: 0 };
        }

        let totalCoveredAreaByDenseRegions = 0;
        let currentBestCoveredRegionId: string | undefined = undefined;
        let currentMaxIntersectionAreaForSingleRegion = 0;

        for (const region of coveringRegions) {
            if (region.density >= requiredDensity) {
                const intersectionArea = this.calculateIntersectionArea(bounds, region.bounds);
                totalCoveredAreaByDenseRegions += intersectionArea;

                // Check if this region is a better "best single region"
                if (intersectionArea > currentMaxIntersectionAreaForSingleRegion) {
                    currentMaxIntersectionAreaForSingleRegion = intersectionArea;
                    currentBestCoveredRegionId = region.id;
                }
            }
        }

        return {
            ratio: Math.min(totalCoveredAreaByDenseRegions / targetArea, 1),
            currentBestCoveredRegionId: currentBestCoveredRegionId,
            bestSingleRegionIntersectionArea: currentMaxIntersectionAreaForSingleRegion,
        };
    }

    private calculateBoundsArea(bounds: MapProviderGL.LngLatBounds): number {
        const sw = bounds.getSouthWest();
        const ne = bounds.getNorthEast();
        return Math.abs((ne.lat - sw.lat) * (ne.lng - sw.lng));
    }

    private calculateIntersectionArea(a: MapProviderGL.LngLatBounds, b: MapProviderGL.LngLatBounds): number {
        const left = Math.max(a.getSouthWest().lng, b.getSouthWest().lng);
        const right = Math.min(a.getNorthEast().lng, b.getNorthEast().lng);
        const bottom = Math.max(a.getSouthWest().lat, b.getSouthWest().lat);
        const top = Math.min(a.getNorthEast().lat, b.getNorthEast().lat);

        if (left >= right || bottom >= top) return 0;
        return (right - left) * (top - bottom);
    }

    isPointCovered(lat: number, lng: number, zoom: number, placeType?: string): boolean {
        const gridKey = this.getGridKey(lat, lng, zoom);
        const regionIds = this.spatialGrid[gridKey];

        if (!regionIds || regionIds.size === 0) return false;

        const now = Date.now();
        const requiredDensity = this.getRequiredDensityForZoom(zoom, placeType);

        for (const id of regionIds) {
            const region = this.regions.get(id);
            if (!region) continue;

            // Check expiry
            if (now - region.timestamp > SpatialCacheConfig.CACHE_EXPIRY) continue;

            // Check zoom validity
            if (zoom < region.minValidZoom || zoom > region.maxValidZoom) continue;

            // Перевірка placeType
            if (region.placeType !== placeType) continue;

            // Check if the point is within region bounds
            const sw = region.bounds.getSouthWest();
            const ne = region.bounds.getNorthEast();

            if (lat >= sw.lat && lat <= ne.lat && lng >= sw.lng && lng <= ne.lng) {
                if (region.density >= requiredDensity) {
                    return true;
                }
            }
        }

        return false;
    }

    getStats() {
        const now = Date.now();
        const regions = [...this.regions.values()];

        return {
            totalRegions: this.regions.size,
            totalGridCells: Object.keys(this.spatialGrid).length,
            oldestTimestamp: regions.length > 0 ? Math.min(...regions.map(r => r.timestamp)) : 0,
            newestTimestamp: regions.length > 0 ? Math.max(...regions.map(r => r.timestamp)) : 0,
            averageAge: regions.length > 0 ? regions.reduce((sum, r) => sum + (now - r.timestamp), 0) / regions.length : 0,
            expiredRegions: regions.filter(r => now - r.timestamp > SpatialCacheConfig.CACHE_EXPIRY).length,
            regionsWithMaxPlaces: regions.filter(r => r.density >= SpatialCacheConfig.GOOGLE_PLACES_API_LIMIT).length,
            averagePlaceCount: regions.length > 0 ? regions.reduce((sum, r) => sum + r.density, 0) / regions.length : 0,
            totalAccessCount: regions.reduce((sum, r) => sum + (r.accessCount || 0), 0),
            memoryUsage: this.estimateMemoryUsage(),
        };
    }

    private estimateMemoryUsage(): { regions: string; grid: string; total: string } {
        const regionSize = this.regions.size * 500; // Rough estimate per region
        const gridSize = Object.keys(this.spatialGrid).length * 100; // Rough estimate per grid cell
        const total = regionSize + gridSize;

        return {
            regions: `${Math.round(regionSize / 1024)}KB`,
            grid: `${Math.round(gridSize / 1024)}KB`,
            total: `${Math.round(total / 1024)}KB`,
        };
    }

    cleanup(): void {
        this.cleanupExpiredRegions();
    }

    clear(): void {
        this.regions.clear();
        this.spatialGrid = {};
        // console.log("Cleared all cached regions");
    }

    export(): TSpatialCacheExtort {
        return {
            regions: [...this.regions.values()].map(region => ({
                ...region,
                // Convert bounds to serializable format
                bounds: {
                    sw: region.bounds.getSouthWest(),
                    ne: region.bounds.getNorthEast(),
                },
            })),
            timestamp: Date.now(),
        };
    }

    import(data: TSpatialCacheExtort): void {
        const now = Date.now();
        const maxAge = SpatialCacheConfig.CACHE_EXPIRY;

        for (const regionData of data.regions) {
            // Skip if too old
            if (now - regionData.timestamp > maxAge) continue;

            try {
                // Reconstruct a bound object (this depends on your MapProviderGL implementation)
                const bounds = new LngLatBounds(
                    regionData.bounds.sw,
                    regionData.bounds.ne,
                );

                this.addRegion({
                    ...regionData,
                    bounds,
                });
            } catch {
                // console.warn("Failed to import cached region:", error);
            }
        }
    }
}