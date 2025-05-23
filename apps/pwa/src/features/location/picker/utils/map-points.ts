import { MapProviderGL } from "@/components/shared/map/providers/types/gl";
import { calculateDistance } from "./map-dimentions";

/**
 * Filters an array of points, removing points that are too close to each other.
 *
 * @param points An array of objects, each containing a `location` property of type `MapProviderGL.LngLat`.
 *               Additional properties can be included in the objects.
 * @param minDistanceInMeters The minimum distance, in meters, that must exist between points to include both. Defaults to 5 meters.
 * @return An array of points where no two points are closer than the specified minimum distance.
 */
export function filterClosePoints<T extends { location: MapProviderGL.LngLat; [key: string]: any }>(
    points: T[],
    minDistanceInMeters: number = 5, // Default minimum distance between points (50 meters)
): T[] {
    if (!points || points.length === 0) return [];

    const filteredPoints: T[] = [];

    // Always include the first point
    if (points.length > 0) {
        filteredPoints.push(points[0]);
    }

    // Check each subsequent point against all filtered points
    for (let i = 1; i < points.length; i++) {
        const currentPoint = points[i];
        let isTooClose = false;

        // Check if this point is too close to any already-filtered point
        for (let j = 0; j < filteredPoints.length; j++) {
            const distance = calculateDistance(
                currentPoint.location,
                filteredPoints[j].location,
            );

            if (distance < minDistanceInMeters) {
                isTooClose = true;
                break;
            }
        }

        // If the point is not too close to any existing point, add it
        if (!isTooClose) {
            filteredPoints.push(currentPoint);
        }
    }

    return filteredPoints;
}