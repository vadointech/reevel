import { useCallback } from "react";

import { useLocationPicker } from "../location-picker.context";
import { GetNearbyPlacesQueryBuilder } from "../queries";

import { usePersistentMap } from "@/components/shared/map";
import { useSpatialCache } from "@/features/spatial-cache/use-spatial-cache.hook";

import { GooglePLacesApiIncludedTypes } from "@/api/google/places";
import { googlePlacesApiResponseMapper } from "@/infrastructure/google/mappers";

import { MapInternalConfig } from "@/components/shared/map/types";
import { GooglePlacesApiResponse } from "@/api/google/places/types";
import { googlePlacesApiResponseTransformer } from "@/infrastructure/google/transformers";

export function useLocationPickerMap(placesInit: GooglePlacesApiResponse) {
    const map = usePersistentMap();
    const { filtersStore } = useLocationPicker();

    const onProviderInitialized = useCallback(() => {
        map.controller.current.setPoints(googlePlacesApiResponseMapper.toIconPoint(placesInit));
    }, []);

    const appendResponse = (response: GooglePlacesApiResponse) => {
        map.controller.current.appendPoints(googlePlacesApiResponseMapper.toIconPoint(response));
    };

    const replaceResponse = (response: GooglePlacesApiResponse) => {
        return map.controller.current.replacePoints(googlePlacesApiResponseMapper.toIconPoint(response));
    };

    const { fetchSpatialData } = useSpatialCache(map.provider.current, {
        onProviderInitialized,
        prefetchedData: placesInit,
        queryBuilder: GetNearbyPlacesQueryBuilder,
        queryResultProcessor: googlePlacesApiResponseTransformer.filterClosePoints,
    });

    const handleViewportChange = useCallback((viewState: MapInternalConfig.IViewStateConfig) => {
        fetchSpatialData(viewState, filtersStore.locationType).then(appendResponse);
    }, [fetchSpatialData, filtersStore.locationType]);

    const handleLocationTypePick = useCallback((type?: GooglePLacesApiIncludedTypes) => {
        const currentType = filtersStore.locationType;
        const viewState = map.provider.current.getViewState();

        if(currentType === type) {
            filtersStore.setLocationType(undefined);
            fetchSpatialData(viewState).then(replaceResponse);
        } else {
            filtersStore.setLocationType(type);
            fetchSpatialData(viewState, type).then(replaceResponse);
        }
    }, [fetchSpatialData]);

    return {
        handleViewportChange,
        handleLocationTypePick,
    };
}