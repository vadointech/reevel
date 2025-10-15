import { usePersistentMap } from "@/components/shared/map";
import { useCallback, useEffect, useRef } from "react";
import { EventPointEntity } from "@/entities/event";
import { QueryBuilderQuery } from "@/lib/react-query";
import { useSpatialGrid } from "@/features/spatial-grid";
import { MapInternalConfig } from "@/components/shared/map/types";
import { useDiscoverContext } from "@/features/discover";
import { DiscoverStaticCollections } from "@/features/discover/config";
import { useRouter } from "@/i18n/routing";
import { MAP_MOTION_TIMEOUT_MS } from "@/components/shared/map/map.config";

type Params = {
    collection: string;
    eventPointsInit: EventPointEntity[];
    queryBuilder: QueryBuilderQuery<any, EventPointEntity[]>
};

export function useDiscoverMap({ collection, eventPointsInit, queryBuilder }: Params) {
    const map = usePersistentMap();
    const discover = useDiscoverContext();
    const router = useRouter();

    const preventMapUpdate = useRef(false);
    const { fetchSpatialData, precacheSpatialData } = useSpatialGrid<EventPointEntity[]>({
        queryBuilder: queryBuilder,
        prefetchedData: eventPointsInit,
    });

    const appendResponse = (points: EventPointEntity[]) => {
        map.controller.current.appendPoints(points);
    };

    const replaceResponse = (points: EventPointEntity[]) => {
        map.controller.current.replacePoints(points);
    };

    const onMapReady = useCallback((viewState: MapInternalConfig.IViewStateConfig) => {
        preventMapUpdate.current = true;
        precacheSpatialData(viewState);
    }, [precacheSpatialData]);
  
    const onMoveEnd = useCallback((viewState: MapInternalConfig.IViewStateConfig) => {
        if(preventMapUpdate.current) {
            preventMapUpdate.current = false;
            return;
        }

        fetchSpatialData({ viewState }).then(appendResponse);
    }, []);

    useEffect(() => {
        const isSameCollection = discover.store.collectionToPreview === collection;
        if(!isSameCollection) {
            discover.store.setCollectionToPreview(collection);
            discover.store.setInterestFilter(null);
            discover.store.setPointToPreview(null);

            replaceResponse(eventPointsInit);
        } else {
            if(!discover.store.interestFilter) {
                if(map.store.isViewStateSynced) {
                    appendResponse(eventPointsInit);
                } else {
                    replaceResponse(eventPointsInit);
                }
            }
        }

        if(collection === DiscoverStaticCollections.Root) {
            preventMapUpdate.current = true;
            map.provider.current.resetViewState();
        }
    }, [collection]);

    const handleDrawerSnapPointChange = useCallback((snapIndex: number) => {
        preventMapUpdate.current = true;
        switch(snapIndex) {
            case 1: // .5
                map.provider.current.setPadding({ bottom: 260 });
                break;
            case 2: // .18
                map.provider.current.setPadding({ bottom: 0 });
                break;
        }
    }, []);

    const handlePickInterestFilter = useCallback((interest: string | null) => {
        const currentInterest = discover.store.interestFilter;
        const viewState = map.provider.current.internalConfig.viewState;
        const currentViewState = map.provider.current.getViewState();

        if(!interest) {
            discover.store.setInterestFilter(null);
            replaceResponse(eventPointsInit);
            return;
        }

        if(currentInterest === interest) {
            discover.store.setInterestFilter(null);
            replaceResponse(eventPointsInit);
        } else {
            discover.store.setInterestFilter(interest);
            fetchSpatialData(
                { viewState, filter: interest },
                collection === DiscoverStaticCollections.Root,
            ).then(replaceResponse);
        }

        if(viewState.zoom !== currentViewState.zoom) {
            new Promise(resolve => setTimeout(resolve, MAP_MOTION_TIMEOUT_MS))
                .then(() => {
                    preventMapUpdate.current = true;
                    map.provider.current.resetViewState();
                });
        }
    }, []);

    const flyToEvent = useCallback((event: EventPointEntity) => {
        preventMapUpdate.current = true;
        map.provider.current.flyTo({
            center: event.geometry.coordinates,
            zoom: 17,
        });
    }, []);

    const handleEventSlideChange = useCallback((index: number) => {
        const event = eventPointsInit[index];
        if(!event) return;

        flyToEvent(event);
        discover.store.setPointToPreview(event.id);
    }, [flyToEvent]);

    const handleSelectPoint = useCallback((pointId: string | null) => {
        if(!pointId) return;
        discover.store.setPointToPreview(pointId);
        router.push(DiscoverStaticCollections.Root + "/event/" + pointId);
    }, []);

    useEffect(() => {
        map.controller.current.attachHandlers({
            onMoveEnd: onMoveEnd,
            onMapReady: onMapReady,
            onPointSelect: handleSelectPoint,
        });
    }, []);

    return {
        onMapReady,
        onMoveEnd,
        handleSelectPoint,
        handleEventSlideChange,
        handlePickInterestFilter,
        handleDrawerSnapPointChange,
    };
}