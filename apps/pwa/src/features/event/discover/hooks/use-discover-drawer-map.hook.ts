import { usePersistentMap } from "@/components/shared/map";
import { useCallback, useEffect, useRef } from "react";
import { useSpatialCache } from "@/features/spatial-cache/use-spatial-cache.hook";
import { BasePoint, MapInternalConfig, Point } from "@/components/shared/map/types";
import { EventEntity } from "@/entities/event";
import { eventEntityMapper } from "@/entities/event/mapper";
import { useRouter } from "@/i18n/routing";
import { useDiscoverContext } from "@/features/event/discover";
import { QueryBuilderQuery } from "@/lib/react-query";

const PICKER_MAP_PADDING = {
    bottom: 260,
};

type Params = {
    callbackUrl: string;
    queryBuilder: QueryBuilderQuery<any, EventEntity[], any>
    eventsInit: EventEntity[];
};

export function useDiscoverDrawerMap({ queryBuilder, callbackUrl, eventsInit }: Params) {
    const map = usePersistentMap();
    const router = useRouter();
    const preventMapUpdate = useRef<boolean>(false);

    const { filtersStore, collectionStore } = useDiscoverContext();

    useEffect(() => {
        collectionStore.setCallbackUrl(callbackUrl);
    }, [callbackUrl]);

    const appendResponse = (response?: EventEntity[]) => {
        map.controller.current.appendPoints(eventEntityMapper.toEventPoint(response));
    };

    const replaceResponse = (response?: EventEntity[]) => {
        return map.controller.current.replacePoints(eventEntityMapper.toEventPoint(response));
    };

    useEffect(() => {
        if(!collectionStore.initialLoad) {
            new Promise(resolve => setTimeout(resolve, 700))
                .then(() => replaceResponse(eventsInit))
                .then(()  => collectionStore.setInitialLoad(false));
        }

        return () => {
            collectionStore.setInitialLoad(false);
        };
    }, []);

    const flyToEvent = useCallback((point: Point<BasePoint>) => {
        preventMapUpdate.current = true;
        collectionStore.setPointToPreview(point);
        map.provider.current.flyTo({
            center: point.geometry.coordinates,
            zoom: 17,
        });
    }, []);

    const { fetchSpatialData, precacheSpatialData } = useSpatialCache<EventEntity[]>(map.provider.current, {
        prefetchedData: eventsInit,
        queryBuilder,
        cacheConfig: {
            sensitivity: 2,
        },
    });

    const handleViewportChange = useCallback((viewState: MapInternalConfig.IViewStateConfig) => {
        if(preventMapUpdate.current) {
            preventMapUpdate.current = false;
            return;
        }

        fetchSpatialData({
            viewState,
            filter: filtersStore.locationInterest,
        }).then(appendResponse);
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
        if(pointId) {
            const point = map.store.points.find(point => point.id === pointId);
            collectionStore.setPointToPreview(point);
            router.push("/discover/event/" + pointId);
        }
    }, []);

    const handleEventInterestPick = useCallback((interest: string | null) => {
        const currentInterest = filtersStore.locationInterest;
        const viewState = map.provider.current.internalConfig.viewState;
        const currentViewState = map.provider.current.getViewState();

        if(!interest) {
            filtersStore.setLocationInterest(undefined);
            fetchSpatialData({ viewState }).then(replaceResponse);
            return;
        }

        if(currentInterest === interest) {
            filtersStore.setLocationInterest(undefined);
            fetchSpatialData({ viewState }).then(replaceResponse);
        } else {
            filtersStore.setLocationInterest(interest);
            fetchSpatialData({ viewState, filter: interest }).then(replaceResponse);
        }

        if(viewState.zoom !== currentViewState.zoom) {
            map.provider.current.resetViewState();
            preventMapUpdate.current = true;
        }
    }, [fetchSpatialData]);

    const handleEventSlideChange = useCallback((index: number) => {
        const event = eventsInit[index];

        const point = map.store.points.find(point => point.id === event.id);

        if(point) flyToEvent(point);
    }, [eventsInit, flyToEvent]);

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
        handleEventInterestPick,
        handleEventSlideChange,
    };
}