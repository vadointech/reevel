import { useCallback, useMemo, useRef } from "react";

import { useLocationPicker } from "../location-picker.context";
import { GetNearbyPlacesQueryBuilder } from "../queries";

import { usePersistentMap } from "@/components/shared/map";
import { useSpatialCache } from "@/features/spatial-cache/use-spatial-cache.hook";

import { GooglePLacesApiIncludedTypes } from "@/api/google/places";
import { placeLocationEntityMapper } from "@/entities/place/mapper";

import { MapInternalConfig } from "@/components/shared/map/types";
import { PlaceLocationEntity } from "@/entities/place";

const PICKER_MAP_PADDING = {
    bottom: 260,
};

export function useLocationPickerMap(placesInit: PlaceLocationEntity[]) {
    const map = usePersistentMap();
    const { filtersStore, confirmationStore } = useLocationPicker();

    const preventMapUpdate = useRef<boolean>(!!confirmationStore.point);

    const defaultPoints = useMemo(() => {
        return placeLocationEntityMapper.toIconPoint(placesInit);
    }, [placesInit]);

    const appendResponse = (response?: PlaceLocationEntity[]) => {
        map.controller.current.appendPoints(placeLocationEntityMapper.toIconPoint(response));
    };

    const replaceResponse = (response?: PlaceLocationEntity[]) => {
        return map.controller.current.replacePoints(placeLocationEntityMapper.toIconPoint(response));
    };

    const { fetchSpatialData, precacheSpatialData } = useSpatialCache<PlaceLocationEntity[]>(map.provider.current, {
        prefetchedData: !confirmationStore.point ? placesInit : undefined,
        queryBuilder: GetNearbyPlacesQueryBuilder,
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