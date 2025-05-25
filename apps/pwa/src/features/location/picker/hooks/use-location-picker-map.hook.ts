"use client";

import { useRef } from "react";
import { MapProviderGL } from "@/components/shared/map/types/provider/gl";
import { calculateBoundsArea, calculateRadius, createBufferedBounds } from "../utils/map-dimentions";
import { useFetchNearestLocations } from "@/features/google/hooks/use-fetch-nearest-locations.hook";
import { googlePlacesApiResponseMapper } from "@/features/google/mappers";
import { usePersistentMap } from "@/components/shared/map";
import { useLocationPicker } from "../location-picker.context";
import { GooglePLacesApiIncludedTypes } from "@/api/google/places";

export function useLocationPickerMap() {
    const prevBoundsArr = useRef<MapProviderGL.LngLatBounds[]>([]);
    const prevCenter = useRef<MapProviderGL.LngLat | null>(null);
    const prevBoundsArea = useRef<number>(0);
    const prevRadius = useRef<number>(0);

    const resetLocationRestriction = () => {
        prevBoundsArr.current = [];
        prevCenter.current = null;
        prevBoundsArea.current = 0;
        prevRadius.current = 0;
    };

    const persistentMap = usePersistentMap();
    const { filtersStore } = useLocationPicker();
    const { getPlacesByArea } = useFetchNearestLocations();

    const handleFetchPlaces = async(center: MapProviderGL.LngLat, radius: number) => {
        const points = await getPlacesByArea(center, radius, filtersStore.locationType)
            .then(googlePlacesApiResponseMapper.toBasePoint);
        persistentMap.controller.current.appendPoints(points);
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

    const handlePickLocationType = async(type: GooglePLacesApiIncludedTypes) => {

        const bounds = persistentMap.provider.current.getBounds();
        if(!bounds) return;

        const currentType = filtersStore.locationType;
        const center = bounds.getCenter();
        const radius = persistentMap.provider.current.getHorizontalRadius(bounds, center);

        if(currentType === type) {
            filtersStore.setLocationType(null);
            const points = await getPlacesByArea(center, radius)
                .then(googlePlacesApiResponseMapper.toBasePoint);
            persistentMap.controller.current.replacePoints(points);
            resetLocationRestriction();
        } else {
            filtersStore.setLocationType(type);
            const points = await getPlacesByArea(center, radius, type)
                .then(googlePlacesApiResponseMapper.toBasePoint);
            persistentMap.controller.current.replacePoints(points);
            resetLocationRestriction();
        }
    };

    return {
        handleViewportChange,
        handlePickLocationType,
    };
}