import { ISpatialGridBreakpointsConfig } from "./types";

export const SpatialGridConfig: ISpatialGridBreakpointsConfig[] = [
    { minZoom: 16, canonicalZoom: 16, geohashPrecision: 7, dataLimit: 50 },
    { minZoom: 14, canonicalZoom: 14, geohashPrecision: 6, dataLimit: 40 },
    { minZoom: 12, canonicalZoom: 12, geohashPrecision: 6, dataLimit: 30 },
    { minZoom: 10, canonicalZoom: 10, geohashPrecision: 5, dataLimit: 20 },
    { minZoom: 0,  canonicalZoom: 9,  geohashPrecision: 4, dataLimit: 10 },
].sort((a, b) =>
    b.minZoom - a.minZoom,  // Ensure descending order by threshold
);