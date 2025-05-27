"use client";

import { MapProviderGL } from "@/components/shared/map/types/provider/gl";
import { calculateBoundsArea, calculateRadius, createBufferedBounds } from "../utils/map-dimentions";
import { useFetchNearestLocations } from "@/infrastructure/google/hooks/use-fetch-nearest-locations.hook";
import { googlePlacesApiResponseMapper } from "@/infrastructure/google/mappers";
import { usePersistentMap } from "@/components/shared/map";
import { useLocationPicker } from "../location-picker.context";
import { GetNearbyPlaces, GooglePLacesApiIncludedTypes } from "@/api/google/places";
import { useLocationPickerLocationRestrictions } from "./use-location-restrictions.hook";
import { useDebouncedCallback } from "use-debounce";
import { usePrefetchedQuery } from "@/lib/react-query";
import { LngLat } from "mapbox-gl";
import { useCallback } from "react";

const MAP_TARGET_VIEWPORT_PADDING_BOTTOM: number = 260;

export function useLocationPickerMap() {
    const {
        prevBoundsArr,
        prevBoundsArea,
        prevCenter,
        prevRadius,
        setInitialLocationRestriction,
        resetLocationRestriction,
    } = useLocationPickerLocationRestrictions();

    usePrefetchedQuery<GetNearbyPlaces.TOutput>({
        queryKey: [...GetNearbyPlaces.queryKey],
        onSuccess: (data, cache) => {
            const keys = cache.map(([key]) => key);

            const lastKey = keys[keys.length - 1] as [string, string, string, number]; // [query key, circle lng, circle lat, circle radius],

            if(lastKey) {
                const [query_key, circle_lng, circle_lat, circle_radius] = lastKey;
                prevRadius.current = circle_radius;
                // prevCenter.current = new LngLat(Number(circle_lng), Number(circle_lat));
            }
        },
    });

    const persistentMap = usePersistentMap();
    const { filtersStore } = useLocationPicker();
    const { getPlacesByArea } = useFetchNearestLocations();

    const fetchPlaces = useCallback(async(center: MapProviderGL.LngLat, radius: number) => {
        const points = await getPlacesByArea(center, radius, filtersStore.locationType)
            .then(googlePlacesApiResponseMapper.toIconPoint);

        persistentMap.controller.current.appendPoints(points);
    }, []);

    const debouncedFetchPlaces = useDebouncedCallback(fetchPlaces, 1000);


    const debouncedCheckInitialViewport = useDebouncedCallback(
        (
            bufferedRadius: number,
        ) => {
            if(bufferedRadius === prevRadius.current) return;
        }, 1000,
    );

    const handleViewportChange = (bounds: MapProviderGL.LngLatBounds | null) => {
        if (!bounds) return;

        const center = bounds.getCenter();

        const bufferedBounds = createBufferedBounds(bounds);

        let bufferedRadius = calculateRadius(bounds, center);
        bufferedRadius = Math.round(bufferedRadius);

        if(bufferedRadius < 60) return;


        const currentBoundsArea = calculateBoundsArea(bufferedBounds);

        // debouncedCheckInitialViewport(center, bufferedRadius, bufferedBounds, currentBoundsArea);
        // Initial config (always skip the first fetch)
        if (prevBoundsArr.current.length === 0 || !prevCenter.current || prevRadius.current === 0) {
            // debouncedFetchPlaces(center, bufferedRadius);
            setInitialLocationRestriction(center, bufferedRadius, bufferedBounds, currentBoundsArea);
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
            debouncedFetchPlaces(center, bufferedRadius);

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
                .then(googlePlacesApiResponseMapper.toIconPoint);
            persistentMap.controller.current.replacePoints(points);
            resetLocationRestriction();
        } else {
            filtersStore.setLocationType(type);
            const points = await getPlacesByArea(center, radius, type)
                .then(googlePlacesApiResponseMapper.toIconPoint);
            persistentMap.controller.current.replacePoints(points);
            resetLocationRestriction();
        }
    };

    return {
        MAP_TARGET_VIEWPORT_PADDING_BOTTOM,
        handleViewportChange,
        handlePickLocationType,
    };
}