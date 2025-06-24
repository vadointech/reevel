import { usePersistentMap } from "@/components/shared/map";
import { useCallback, useMemo, useRef } from "react";
import { useSpatialCache } from "@/features/spatial-cache/use-spatial-cache.hook";
import { MapInternalConfig } from "@/components/shared/map/types";
import { EventEntity } from "@/entities/event";
import { eventEntityMapper } from "@/entities/event/mapper";
import { GetNearbyEventsQueryBuilder } from "@/features/event/discover/queries";

const PICKER_MAP_PADDING = {
    bottom: 260,
};

export function useDiscoverDrawerMap(eventsInit: EventEntity[]) {
    const map = usePersistentMap();

    const preventMapUpdate = useRef<boolean>(false);

    const defaultPoints = useMemo(() => {
        return eventEntityMapper.toEventPoint(eventsInit);
    }, [eventsInit]);

    const appendResponse = (response?: EventEntity[]) => {
        map.controller.current.appendPoints(eventEntityMapper.toEventPoint(response));
    };

    const { fetchSpatialData, precacheSpatialData } = useSpatialCache<EventEntity[]>(map.provider.current, {
        prefetchedData: eventsInit,
        queryBuilder: GetNearbyEventsQueryBuilder,
        cacheConfig: {
            sensitivity: 2,
        },
    });

    const handleViewportChange = useCallback((viewState: MapInternalConfig.IViewStateConfig) => {
        if(preventMapUpdate.current) {
            preventMapUpdate.current = false;
            return;
        }

        fetchSpatialData({ viewState }).then(appendResponse);
    }, [fetchSpatialData]);

    const handlePickerSnapPointChange = useCallback((snapIndex: number) => {
        preventMapUpdate.current = true;
        switch(snapIndex) {
            case 1: // .5
                map.provider.current.setPadding(PICKER_MAP_PADDING);
                break;
            case 2: // .18
                map.provider.current.setPadding({ bottom: 0 });
                break;
            default:
                break;
        }
    }, []);

    return {
        PICKER_MAP_PADDING,
        defaultPoints,
        handleViewportChange,
        handlePickerSnapPointChange,
        handlePrecacheSpatialData: precacheSpatialData,
    };
}