import { usePersistentMap } from "@/components/shared/map";
import { useCallback, useEffect, useRef } from "react";
import { useSpatialCache } from "@/features/spatial-cache/use-spatial-cache.hook";
import { MapInternalConfig } from "@/components/shared/map/types";
import { EventEntity } from "@/entities/event";
import { eventEntityMapper } from "@/entities/event/mapper";
import { GetNearbyEventsQueryBuilder } from "@/features/event/discover/queries";
import { useRouter } from "@/i18n/routing";

const PICKER_MAP_PADDING = {
    bottom: 260,
};

export function useDiscoverDrawerMap(eventsInit: EventEntity[]) {
    const map = usePersistentMap();
    const router = useRouter();
    const preventMapUpdate = useRef<boolean>(false);

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

    const handleSelectPoint = useCallback((pointId: string | null) => {
        if(pointId) router.push("/discover/event/" + pointId);
        else router.push("/discover");
    }, []);


    useEffect(() => {
        map.controller.current.attachHandlers({
            onMapReady: precacheSpatialData,
            onMoveEnd: handleViewportChange,
            onPointSelect: handleSelectPoint,
        });

        return () => {
            map.controller.current.detachHandlers(["onMapReady", "onViewportChange", "onPointSelect"]);
        };
    }, [precacheSpatialData, handleViewportChange, handleSelectPoint]);

    return {
        handlePickerSnapPointChange,
    };
}