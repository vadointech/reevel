import { MapProviderGL } from "@/components/shared/map/types";
import { LngLatBounds } from "mapbox-gl";

type SpatialGrid = Record<string, Set<string>>;

export interface CachedRegion {
    id: string;
    bounds: MapProviderGL.LngLatBounds;
    density: number;
    minValidZoom: number;
    maxValidZoom: number;
    zoom: number;
    placeType?: string;
    timestamp: number;
    gridKeys: string[];
    actualPlaceCount?: number;
    accessCount?: number; // For LRU tracking
    lastAccessed?: number;
}

interface Config {
    MAX_CACHED_REGIONS: number;
    CACHE_EXPIRY: number;
    COVERAGE_THRESHOLD: number;
    MIN_ZOOM_RANGE: number;
    GOOGLE_PLACES_API_LIMIT: number;
}

const CONFIG: Config = {
    MAX_CACHED_REGIONS: 500,
    CACHE_EXPIRY: 1000 * 60 * 15, // 15 minutes
    COVERAGE_THRESHOLD: 0.7,
    MIN_ZOOM_RANGE: 2,
    GOOGLE_PLACES_API_LIMIT: 10,
};

export class SpatialCache {
    private regions = new Map<string, CachedRegion>();
    private spatialGrid: SpatialGrid = {};

    // Dynamic grid size based on zoom level
    private getGridSizeForZoom(zoom: number): number {
        if (zoom >= 17) return 0.001;  // ~100m grid for high zoom
        if (zoom >= 15) return 0.002;  // ~200m grid
        if (zoom >= 13) return 0.005;  // ~500m grid
        if (zoom >= 11) return 0.01;   // ~1km grid
        return 0.02; // ~2km grid for low zoom
    }

    private getGridKey(lat: number, lng: number, zoom: number): string {
        const gridSize = this.getGridSizeForZoom(zoom);
        const gridLat = Math.floor(lat / gridSize);
        const gridLng = Math.floor(lng / gridSize);
        return `${gridLat},${gridLng}`;
    }

    private computeGridKeys(bounds: MapProviderGL.LngLatBounds, zoom: number): string[] {
        const sw = bounds.getSouthWest();
        const ne = bounds.getNorthEast();
        const gridSize = this.getGridSizeForZoom(zoom);

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

    addRegion(region: Omit<CachedRegion, "gridKeys" | "accessCount" | "lastAccessed">): void {
        // Clean up expired regions first
        this.cleanupExpiredRegions();

        // Evict old regions if the cache is full
        if (this.regions.size >= CONFIG.MAX_CACHED_REGIONS) {
            this.evictLeastRecentlyUsed(Math.floor(CONFIG.MAX_CACHED_REGIONS * 0.1));
        }

        const gridKeys = this.computeGridKeys(region.bounds, region.zoom);

        // Ensure minimum zoom range for better reusability
        const zoomRange = region.maxValidZoom - region.minValidZoom;
        const adjustedMinZoom = zoomRange < CONFIG.MIN_ZOOM_RANGE
            ? Math.max(1, region.zoom - CONFIG.MIN_ZOOM_RANGE / 2)
            : region.minValidZoom;
        const adjustedMaxZoom = zoomRange < CONFIG.MIN_ZOOM_RANGE
            ? region.zoom + CONFIG.MIN_ZOOM_RANGE / 2
            : region.maxValidZoom;

        const enriched: CachedRegion = {
            ...region,
            gridKeys,
            minValidZoom: adjustedMinZoom,
            maxValidZoom: adjustedMaxZoom,
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
            if (now - region.timestamp > CONFIG.CACHE_EXPIRY) {
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

    findCoveringRegions(bounds: MapProviderGL.LngLatBounds, zoom: number, placeType?: string): CachedRegion[] {
        const gridKeys = this.computeGridKeys(bounds, zoom);
        const regionIds = new Set<string>();

        // Collect all region IDs from intersecting grid cells
        for (const key of gridKeys) {
            const cellRegions = this.spatialGrid[key];
            if (cellRegions) {
                cellRegions.forEach(id => regionIds.add(id));
            }
        }

        const now = Date.now();
        const result: CachedRegion[] = [];

        for (const id of regionIds) {
            const region = this.regions.get(id);
            if (!region) continue;

            // Check expiry
            if (now - region.timestamp > CONFIG.CACHE_EXPIRY) {
                this.removeRegion(id);
                continue;
            }

            // Check zoom validity with tolerance
            if (zoom < region.minValidZoom - 0.5 || zoom > region.maxValidZoom + 0.5) continue;

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

    getCoverageRatio(bounds: MapProviderGL.LngLatBounds, zoom: number, placeType?: string): number {
        const coveringRegions = this.findCoveringRegions(bounds, zoom, placeType);
        if (coveringRegions.length === 0) return 0;

        const targetArea = this.calculateBoundsArea(bounds);
        if (targetArea === 0) return 1;

        let totalCoveredArea = 0;
        const requiredDensity = this.getRequiredDensity(zoom, placeType);

        for (const region of coveringRegions) {
            const regionDensity = region.actualPlaceCount || region.density;

            // Special handling for Google Places API limit
            const hitApiLimit = regionDensity >= CONFIG.GOOGLE_PLACES_API_LIMIT;
            const meetsRequirement = hitApiLimit || regionDensity >= requiredDensity;

            if (meetsRequirement) {
                const intersectionArea = this.calculateIntersectionArea(bounds, region.bounds);
                totalCoveredArea += intersectionArea;
            }
        }

        return Math.min(totalCoveredArea / targetArea, 1);
    }

    // Realistic density requirements for Google Places API (max 10 results)
    private getRequiredDensity(zoom: number, placeType?: string): number {
        if (placeType) {
            if (zoom >= 17) return 2;
            return 1;
        }

        if (zoom >= 18) return 5;  // Very detailed view - expect decent density
        if (zoom >= 16) return 3;  // Detailed view - moderate density expected
        if (zoom >= 14) return 2;  // Standard view - some places expected
        if (zoom >= 12) return 1;  // Broader view - at least some places
        return 1; // Wide view - any places are enough
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

    // Check if the cache covers a specific point
    isPointCovered(lat: number, lng: number, zoom: number, placeType?: string): boolean {
        const gridKey = this.getGridKey(lat, lng, zoom);
        const regionIds = this.spatialGrid[gridKey];

        if (!regionIds || regionIds.size === 0) return false;

        const now = Date.now();
        const requiredDensity = this.getRequiredDensity(zoom, placeType);

        for (const id of regionIds) {
            const region = this.regions.get(id);
            if (!region) continue;

            // Check expiry
            if (now - region.timestamp > CONFIG.CACHE_EXPIRY) continue;

            // Check zoom validity
            if (zoom < region.minValidZoom || zoom > region.maxValidZoom) continue;

            // Перевірка placeType
            if (region.placeType !== placeType) continue;

            // Check if the point is within region bounds
            const sw = region.bounds.getSouthWest();
            const ne = region.bounds.getNorthEast();

            if (lat >= sw.lat && lat <= ne.lat && lng >= sw.lng && lng <= ne.lng) {
                const regionDensity = region.actualPlaceCount || region.density;
                const hitApiLimit = regionDensity >= CONFIG.GOOGLE_PLACES_API_LIMIT;

                if (hitApiLimit || regionDensity >= requiredDensity) {
                    return true;
                }
            }
        }

        return false;
    }

    // Get cached places for a specific region (if you store actual place data)
    getCachedPlaces(bounds: MapProviderGL.LngLatBounds, zoom: number): any[] {
        const coveringRegions = this.findCoveringRegions(bounds, zoom);
        // This would need additional implementation to store actual place data
        // For now, return an empty array as we're only caching coverage info
        return [];
    }

    // Get cache statistics for debugging and monitoring
    getStats() {
        const now = Date.now();
        const regions = [...this.regions.values()];

        return {
            totalRegions: this.regions.size,
            totalGridCells: Object.keys(this.spatialGrid).length,
            oldestTimestamp: regions.length > 0 ? Math.min(...regions.map(r => r.timestamp)) : 0,
            newestTimestamp: regions.length > 0 ? Math.max(...regions.map(r => r.timestamp)) : 0,
            averageAge: regions.length > 0 ? regions.reduce((sum, r) => sum + (now - r.timestamp), 0) / regions.length : 0,
            expiredRegions: regions.filter(r => now - r.timestamp > CONFIG.CACHE_EXPIRY).length,
            regionsWithMaxPlaces: regions.filter(r => (r.actualPlaceCount || r.density) >= CONFIG.GOOGLE_PLACES_API_LIMIT).length,
            averagePlaceCount: regions.length > 0 ? regions.reduce((sum, r) => sum + (r.actualPlaceCount || r.density), 0) / regions.length : 0,
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

    // Force cleanup of expired regions
    cleanup(): void {
        this.cleanupExpiredRegions();
    }

    // Clear all cached data
    clear(): void {
        this.regions.clear();
        this.spatialGrid = {};
        // console.log("Cleared all cached regions");
    }

    // Export cache data for persistence
    export(): { regions: any[]; timestamp: number } {
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

    // Import cache data from persistence
    import(data: { regions: any[]; timestamp: number }): void {
        const now = Date.now();
        const maxAge = CONFIG.CACHE_EXPIRY;

        for (const regionData of data.regions) {
            // Skip if too old
            if (now - regionData.timestamp > maxAge) continue;

            try {
                // Reconstruct bounds object (this depends on your MapProviderGL implementation)
                const bounds = new LngLatBounds(
                    regionData.bounds.sw,
                    regionData.bounds.ne,
                );

                this.addRegion({
                    ...regionData,
                    bounds,
                });
            } catch (error) {
                console.warn("Failed to import cached region:", error);
            }
        }
    }
}