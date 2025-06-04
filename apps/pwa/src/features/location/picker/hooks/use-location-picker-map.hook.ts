import { useCallback, useMemo, useRef } from "react";

import { useLocationPicker } from "../location-picker.context";
import { GetNearbyPlacesQueryBuilder } from "../queries";

import { usePersistentMap } from "@/components/shared/map";
import { useSpatialCache } from "@/features/spatial-cache/use-spatial-cache.hook";

import { GooglePLacesApiIncludedTypes } from "@/api/google/places";
import { googlePlacesApiResponseMapper } from "@/infrastructure/google/mappers";
import { googlePlacesApiResponseTransformer } from "@/infrastructure/google/transformers";

import { MapInternalConfig } from "@/components/shared/map/types";
import { GooglePlacesApiResponse } from "@/api/google/places/types";

const PICKER_MAP_PADDING = {
    bottom: 260,
};

export function useLocationPickerMap(placesInit: GooglePlacesApiResponse) {
    const map = usePersistentMap();
    const { filtersStore, confirmationStore } = useLocationPicker();

    const preventMapUpdate = useRef<boolean>(!!confirmationStore.point);

    const defaultPoints = useMemo(() => {
        return googlePlacesApiResponseMapper.toIconPoint(placesInit);
    }, [placesInit]);

    const appendResponse = (response?: GooglePlacesApiResponse) => {
        map.controller.current.appendPoints(googlePlacesApiResponseMapper.toIconPoint(response));
    };

    const replaceResponse = (response?: GooglePlacesApiResponse) => {
        return map.controller.current.replacePoints(googlePlacesApiResponseMapper.toIconPoint(response));
    };

    const { fetchSpatialData, precacheSpatialData } = useSpatialCache(map.provider.current, {
        prefetchedData: !confirmationStore.point ? placesInit : undefined,
        queryBuilder: GetNearbyPlacesQueryBuilder,
        queryResultProcessor: googlePlacesApiResponseTransformer.filterClosePoints,
    });

    const handleViewportChange = useCallback((viewState: MapInternalConfig.IViewStateConfig) => {
        if(confirmationStore.point) {
            return;
        }

        if(preventMapUpdate.current) {
            preventMapUpdate.current = false;
            return;
        }

        fetchSpatialData({
            viewState,
            placeType: filtersStore.locationType,
        }).then(appendResponse);
    }, [fetchSpatialData, filtersStore.locationType]);

    const handleLocationTypePick = useCallback((type?: GooglePLacesApiIncludedTypes) => {
        const currentType = filtersStore.locationType;
        const viewState = map.provider.current.internalConfig.viewState;
        const currentViewState = map.provider.current.getViewState();

        if(currentType === type) {
            filtersStore.setLocationType(undefined);
            fetchSpatialData({ viewState }).then(replaceResponse);
        } else {
            filtersStore.setLocationType(type);
            fetchSpatialData({ viewState, placeType: type }).then(replaceResponse);
        }

        if(viewState.zoom !== currentViewState.zoom) {
            map.provider.current.resetViewState();
            preventMapUpdate.current = true;
        }
    }, [fetchSpatialData]);

    const handlePickerSnapPointChange = useCallback((snapIndex: number) => {
        preventMapUpdate.current = true;
        switch(snapIndex) {
            case 0: // fit-content
                map.provider.current.setPadding(PICKER_MAP_PADDING);
                break;
            case 1: // 0.14
                map.provider.current.setPadding({ bottom: 0 });
                break;
            default:
                map.provider.current.setPadding({ bottom: 0 });
        }
    }, []);

    return {
        PICKER_MAP_PADDING,
        defaultPoints,
        handleViewportChange,
        handleLocationTypePick,
        handlePickerSnapPointChange,
        handlePrecacheSpatialData: precacheSpatialData,
    };
}