import { MapProviderGL } from "@/components/shared/map/types";
import { LngLat } from "mapbox-gl";

/**
 * Snaps coordinates to fixed precision to prevent unnecessary API calls
 * for minor position changes.
 *
 * Precision levels based on distance:
 * - 3 decimal places ≈ 111m accuracy
 * - 2 decimal places ≈ 1.11km accuracy
 *
 * @param center The center coordinates to snap
 * @param radius The current search radius in meters
 * @param breakpoint
 */
export function snapCoordinates(center: MapProviderGL.LngLat, radius: number, breakpoint: number = 500): MapProviderGL.LngLat {
    // Use more precise snapping for a smaller radius
    const precision = radius < breakpoint ? 3 : 2;

    return new LngLat(
        Number(center.lng.toFixed(precision)),
        Number(center.lat.toFixed(precision)),
    );
}
