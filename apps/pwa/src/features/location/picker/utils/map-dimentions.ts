import { LngLat, LngLatBounds } from "mapbox-gl";
import { MapProviderGL } from "@/components/shared/map/types/provider/gl";

/**
 * Creates a new set of geographical bounds by applying a buffer percentage to the provided bounds.
 *
 * @param {MapProviderGL.LngLatBounds} bounds - The original geographical bounds.
 * @param {number} [bufferPercentage=0.2] - The percentage of buffering to apply to the bounds.
 * A default value means we'll only fetch new data when the center moves outside of the inner 80% of the previous bounds (20% buffer on each edge)
 * @return {MapProviderGL.LngLatBounds} - A new LngLatBounds object with buffered coordinates.
 */
export function createBufferedBounds(bounds: MapProviderGL.LngLatBounds, bufferPercentage: number = .2): MapProviderGL.LngLatBounds {
    const width = bounds.getEast() - bounds.getWest();
    const height = bounds.getNorth() - bounds.getSouth();

    const bufferX = width * bufferPercentage;
    const bufferY = height * bufferPercentage;

    return new LngLatBounds(
        [bounds.getWest() + bufferX, bounds.getSouth() + bufferY], // Southwest point
        [bounds.getEast() - bufferX, bounds.getNorth() - bufferY],  // Northeast point
    );
}

/**
 * Calculates the radius from the center point to the bounds' horizontal distance.
 *
 * @param {MapProviderGL.LngLatBounds} bounds - The geographical bounds representing the area.
 * @param {MapProviderGL.LngLat} center - The geographical center point to calculate the radius from.
 * @return {number} The calculated radius based on the horizontal distance of the bounds.
 */
export function calculateRadius(bounds: MapProviderGL.LngLatBounds, center: MapProviderGL.LngLat): number {
    const east = bounds.getNorthEast().lng;
    const west = bounds.getSouthWest().lng;

    const eastPoint = new LngLat(east, center.lat);
    const westPoint = new LngLat(west, center.lat);

    return westPoint.distanceTo(eastPoint) / 2;
}

/**
 * Snaps radius to predefined zoom levels for consistent search areas.
 * Uses a logarithmic-like progression for smoother transitions.
 *
 * Zoom levels (in meters):
 * - Level 1: 60 (minimum radius)
 * - Level 2: 100
 * - Level 3: 250
 * - Level 4: 500
 * - Level 5: 1000
 * - Level 6: 2000
 * - Level 7: 5000
 * - Level 8+: Multiples of 5000
 */
export function snapRadius(radius: number): number {
    const zoomLevels = [60, 100, 250, 500, 1000, 2000, 5000];

    // If the radius is smaller than a minimum, return minimum
    if (radius <= zoomLevels[0]) {
        return zoomLevels[0];
    }

    // If the radius is larger than our largest defined level
    if (radius > zoomLevels[zoomLevels.length - 1]) {
        return Math.ceil(radius / 5000) * 5000;
    }

    // Find the closest zoom level
    for (let i = 0; i < zoomLevels.length - 1; i++) {
        if (radius > zoomLevels[i] && radius <= zoomLevels[i + 1]) {
            // Return the closer value between the current and next level
            return (radius - zoomLevels[i]) < (zoomLevels[i + 1] - radius)
                ? zoomLevels[i]
                : zoomLevels[i + 1];
        }
    }

    return zoomLevels[0]; // Fallback to minimum radius
}

/**
 * Calculates the area of a geographical bounding box.
 *
 * @param {MapProviderGL.LngLatBounds} bounds - The bounding box defined by its southwestern and northeastern corners.
 * @return {number} The calculated area of the bounding box.
 */
export function calculateBoundsArea(bounds: MapProviderGL.LngLatBounds): number {
    const width = bounds.getEast() - bounds.getWest();
    const height = bounds.getNorth() - bounds.getSouth();
    return width * height;
}

/**
 * Calculates the distance between two geographical points.
 *
 * @param {MapProviderGL.LngLat} point1 - The first geographical point represented as longitude and latitude.
 * @param {MapProviderGL.LngLat} point2 - The second geographical point represented as longitude and latitude.
 * @returns {number} The distance between the two points in meters.
 */
export function calculateDistance(point1: MapProviderGL.LngLat, point2: MapProviderGL.LngLat): number {
    return point1.distanceTo(point2);
}

