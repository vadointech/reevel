import { usePersistentMap } from "@/components/shared/map";
import { useCallback, useEffect, useRef } from "react";
import { EventPointEntity } from "@/entities/event";
import { QueryBuilderQuery } from "@/lib/react-query";
import { useSpatialGrid } from "@/features/spatial-grid";
import { MapInternalConfig } from "@/components/shared/map/types";
import { useDiscoverContext } from "@/features/discover";
import { DiscoverStaticCollections } from "@/features/discover/config";

type Params = {
    collection: string;
    queryBuilder: QueryBuilderQuery<any, EventPointEntity[]>
    eventsInit: EventPointEntity[];
};

export function useDiscoverMap({ collection, eventsInit, queryBuilder }: Params) {
    const map = usePersistentMap();
    const discover = useDiscoverContext();

    const preventMapUpdate = useRef(false);
    const defaultViewState = useRef(
        map.provider.current.getViewState(),
    );
    const prevViewState = useRef(defaultViewState.current);

    const { fetchSpatialData, precacheSpatialData } = useSpatialGrid<EventPointEntity[]>({
        queryBuilder,
        prefetchedData: eventsInit,
    });

    const appendResponse = (points: EventPointEntity[]) => {
        map.controller.current.appendPoints(points);
    };

    const replaceResponse = (points: EventPointEntity[]) => {
        map.controller.current.replacePoints(points);
    };

    const onMapReady = useCallback((viewState: MapInternalConfig.IViewStateConfig) => {
        map.controller.current.setPoints(eventsInit);
        precacheSpatialData(viewState);
        preventMapUpdate.current = true;
    }, [precacheSpatialData]);
  
    const onMoveEnd = useCallback((viewState: MapInternalConfig.IViewStateConfig) => {
        if(preventMapUpdate.current) {
            preventMapUpdate.current = false;
            return;
        }

        prevViewState.current = viewState;

        fetchSpatialData({ viewState }).then(appendResponse);
    }, []);

    useEffect(() => {
        map.controller.current.attachHandlers({
            onMapReady: onMapReady,
            onMoveEnd: onMoveEnd,
        });

        return () => {
            map.controller.current.detachHandlers(["onMapReady", "onMoveEnd"]);
        };
    }, [onMapReady, onMoveEnd]);


    useEffect(() => {
        const isSameCollection = discover.store.collectionToPreview === collection;

        if(!isSameCollection) {
            discover.store.setCollectionToPreview(collection);
            discover.store.setInterestFilter(null);
            discover.store.setPointToPreview(null);

            if(collection === DiscoverStaticCollections.Root) {
                map.provider.current.resetViewState();
            }
        }
    }, []);

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

        if(!interest) {
            discover.store.setInterestFilter(null);
            replaceResponse(eventsInit);
            return;
        }

        if(currentInterest === interest) {
            discover.store.setInterestFilter(null);
            replaceResponse(eventsInit);
        } else {
            discover.store.setInterestFilter(interest);

            if(defaultViewState.current.zoom !== prevViewState.current.zoom) {
                preventMapUpdate.current = true;
                map.provider.current.resetViewState();
                fetchSpatialData({ viewState: defaultViewState.current, filter: interest }).then(replaceResponse);
            } else {
                fetchSpatialData({ viewState: prevViewState.current, filter: interest }).then(replaceResponse);
            }
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
        const event = eventsInit[index];
        if(!event) return;

        flyToEvent(event);
        discover.store.setPointToPreview(event.id);
    }, [flyToEvent]);

    return {
        handleEventSlideChange,
        handlePickInterestFilter,
        handleDrawerSnapPointChange,
    };
}