import { MapProviderGL } from "@/components/shared/map/providers/types/gl";
import { calculateBoundsArea, calculateRadius, createBufferedBounds } from "../utils/map-dimentions";
import { usePersistentMap } from "@/components/shared/map/map.context";
import { useFetchNearestLocations } from "@/features/location/picker/hooks/use-fetch-nearest-locations.hook";
import { googlePlacesApiResponseMapper } from "@/features/google/mappers";
import { useLocationPickerStore } from "@/features/location/picker";
import { RefObject } from "react";

export function useLocationPickerMap(
    prevBoundsArr: RefObject<MapProviderGL.LngLatBounds[]>,
    prevCenter: RefObject<MapProviderGL.LngLat | null>,
    prevBoundsArea: RefObject<number>,
    prevRadius: RefObject<number>,
) {
    const { store } = usePersistentMap();
    const locationPickerStore = useLocationPickerStore();
    const { getPlacesByArea } = useFetchNearestLocations();

    const handleFetchPlaces = async(center: MapProviderGL.LngLat, radius: number) => {
        const points = await getPlacesByArea(center, radius, locationPickerStore.filters.locationType)
            .then(googlePlacesApiResponseMapper.toBasePoint);
        store?.appendPoints(points);
    };

    const handleViewportChange = (bounds: MapProviderGL.LngLatBounds | null) => {
        if (!bounds) return;

        const center = bounds.getCenter();
        const bufferedBounds = createBufferedBounds(bounds);

        const bufferedRadius = calculateRadius(bounds, center);
        if(bufferedRadius < 60) return;

        const currentBoundsArea = calculateBoundsArea(bufferedBounds);

        // Initial fetch
        if (prevBoundsArr.current.length === 0 || !prevCenter.current || prevRadius.current === 0) {
            handleFetchPlaces(center, bufferedRadius);
            prevCenter.current = center;
            prevRadius.current = bufferedRadius;
            prevBoundsArr.current = [bufferedBounds];
            prevBoundsArea.current = currentBoundsArea;
            return;
        }

        // Only trigger a new fetch the center point is inside any of the
        // previous bounds stored in the prevBoundsArr.
        const isCenterInsidePreviousBounds = prevBoundsArr.current.some((b) =>
            b.contains(center),
        );

        // Only trigger a new fetch when zooming in significantly
        // A smaller area means we're zoomed in more
        const zoomInThreshold = 0.5; // 50% reduction in area triggers a new fetch
        const isSignificantZoomIn = currentBoundsArea <= prevBoundsArea.current * zoomInThreshold;

        const shouldFetchNewData = !isCenterInsidePreviousBounds ||
          (isCenterInsidePreviousBounds && isSignificantZoomIn);

        if (shouldFetchNewData) {
            handleFetchPlaces(center, bufferedRadius);

            prevCenter.current = center;
            prevRadius.current = bufferedRadius;
            prevBoundsArea.current = currentBoundsArea;

            // Only add to the bounds array if it's a new area (not a zoom)
            if (!isCenterInsidePreviousBounds) {
                prevBoundsArr.current.push(bufferedBounds);
            } else {
                // If it's a zoom operation, replace the last bounds with the new one
                prevBoundsArr.current[prevBoundsArr.current.length - 1] = bufferedBounds;
            }
        }

    };

    return {
        handleViewportChange,
    };
}