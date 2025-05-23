import { useLocationPickerMap, useLocationPickerStore } from "@/features/location/picker";
import { useFetchNearestLocations } from "@/features/location/picker/hooks/use-fetch-nearest-locations.hook";
import { usePersistentMap } from "@/components/shared/map/map.context";
import { googlePlacesApiResponseMapper } from "@/features/google/mappers";
import { useRef } from "react";
import { MapProviderGL } from "@/components/shared/map/providers/types";
import { GooglePLacesApiIncludedTypes } from "@/api/google/places";

export function useLocationPicker() {
    const locationPickerStore = useLocationPickerStore();
    const persistentMap = usePersistentMap();
    const { getPlacesByArea } = useFetchNearestLocations();

    const prevBoundsArr = useRef<MapProviderGL.LngLatBounds[]>([]);
    const prevCenter = useRef<MapProviderGL.LngLat | null>(null);
    const prevBoundsArea = useRef<number>(0);
    const prevRadius = useRef<number>(0);

    const { handleViewportChange } = useLocationPickerMap(
        prevBoundsArr,
        prevCenter,
        prevBoundsArea,
        prevRadius,
    );

    const resetLocationRestriction = () => {
        prevBoundsArr.current = [];
        prevCenter.current = null;
        prevBoundsArea.current = 0;
        prevRadius.current = 0;
    };

    const handlePickLocationType = async(type: GooglePLacesApiIncludedTypes) => {
        if(!persistentMap.provider) return;

        const bounds = persistentMap.provider.getBounds();
        if(!bounds) return;

        const currentType = locationPickerStore.filters.locationType;
        const center = bounds.getCenter();
        const radius = persistentMap.provider.getHorizontalRadius(bounds, center);

        if(currentType === type) {
            locationPickerStore.filters.setLocationType();
            const points = await getPlacesByArea(center, radius)
                .then(googlePlacesApiResponseMapper.toBasePoint);
            persistentMap.store?.replacePoints(points);
            resetLocationRestriction();
        } else {
            locationPickerStore.filters.setLocationType(type);
            const points = await getPlacesByArea(center, radius, type)
                .then(googlePlacesApiResponseMapper.toBasePoint);
            persistentMap.store?.replacePoints(points);
            resetLocationRestriction();
        }
    };

    return {
        handleViewportChange,
        handlePickLocationType,
    };
}