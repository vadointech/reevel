import { ISpatialGridBreakpointsConfig } from "./types";

export const SpatialGridConfig: ISpatialGridBreakpointsConfig[] = [
    { minZoom: 17, canonicalZoom: 17, geohashPrecision: 7, dataLimit: 50 },
    { minZoom: 16, canonicalZoom: 16, geohashPrecision: 7, dataLimit: 50 },
    { minZoom: 15, canonicalZoom: 15, geohashPrecision: 7, dataLimit: 50 },
    { minZoom: 13, canonicalZoom: 13, geohashPrecision: 6, dataLimit: 40 },
    { minZoom: 10, canonicalZoom: 10, geohashPrecision: 5, dataLimit: 20 },
    { minZoom: 0,  canonicalZoom: 9,  geohashPrecision: 4, dataLimit: 10 },
].sort((a, b) =>
    b.minZoom - a.minZoom,  // Ensure descending order by threshold
);