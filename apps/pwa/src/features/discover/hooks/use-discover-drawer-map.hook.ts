import { usePersistentMap } from "@/components/shared/map";
import { useCallback, useEffect, useRef } from "react";
import { EventEntity } from "@/entities/event";
import { eventEntityMapper } from "@/entities/event/mapper";
import { useRouter } from "@/i18n/routing";
import { useDiscoverContext } from "@/features/discover";
import { QueryBuilderQuery } from "@/lib/react-query";
import { DiscoverStaticCollections } from "@/features/discover/config";
import { useSpatialCache } from "@/features/spatial-cache/use-spatial-cache.hook";
import { MAP_MOTION_TIMEOUT_MS } from "@/components/shared/map/map.config";

const PICKER_MAP_PADDING = {
    bottom: 260,
};

type Params = {
    collection: string;
    queryBuilder: QueryBuilderQuery<any, EventEntity[], any>
    eventsInit: EventEntity[];
};

export function useDiscoverDrawerMap({ collection, queryBuilder, eventsInit }: Params) {
    const map = usePersistentMap();
    const router = useRouter();
    const preventMapUpdate = useRef<boolean>(false);

    const discover = useDiscoverContext();

    useEffect(() => {
        const isSameCollection = discover.store.collectionToPreview === collection;

        if(!isSameCollection) {
            discover.store.setCollectionToPreview(collection);
            discover.store.setInterestFilter(null);
            discover.store.setPointToPreview(null);

            if(collection === DiscoverStaticCollections.Root) {
                preventMapUpdate.current = true;
                map.provider.current.resetViewState();
            }

            replaceResponse(eventsInit);
        }
    }, []);

    const { fetchSpatialData } = useSpatialCache<EventEntity[]>(map.provider.current, {
        prefetchedData: eventsInit,
        queryBuilder,
        cacheConfig: {
            sensitivity: 2,
        },
    });

    const replaceResponse = (response?: EventEntity[]) => {
        return map.controller.current.replacePoints(eventEntityMapper.toEventPoint(response));
    };

    const flyToEvent = useCallback((event: EventEntity) => {
        preventMapUpdate.current = true;
        map.provider.current.flyTo({
            center: event.locationPoint.coordinates,
            zoom: 17,
        });
    }, []);

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
        if(!pointId) return;
        discover.store.setPointToPreview(pointId);
        router.push(DiscoverStaticCollections.Root + "/event/" + pointId);
    }, []);

    const handleEventInterestPick = useCallback((interest: string | null) => {
        const currentInterest = discover.store.interestFilter;
        const viewState = map.provider.current.internalConfig.viewState;
        const currentViewState = map.provider.current.getViewState();

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
            if(collection === DiscoverStaticCollections.Root) {
                fetchSpatialData({ viewState, filter: interest }).then(replaceResponse);
            } else {
                replaceResponse(
                    eventsInit.filter(event =>
                        event.interests.some(item => item.interestId === interest),
                    ),
                );
            }
        }

        if(viewState.zoom !== currentViewState.zoom) {
            new Promise(resolve => setTimeout(resolve, MAP_MOTION_TIMEOUT_MS))
                .then(() => {
                    preventMapUpdate.current = true;
                    map.provider.current.resetViewState();
                });
        }
    }, []);

    const handleEventSlideChange = useCallback((index: number) => {
        const event = eventsInit[index];
        if(!event) return;

        flyToEvent(event);
        discover.store.setPointToPreview(event.id);
    }, [flyToEvent]);

    useEffect(() => {
        map.controller.current.attachHandlers({
            onPointSelect: handleSelectPoint,
        });

        return () => {
            map.controller.current.detachHandlers(["onPointSelect"]);
        };
    }, [handleSelectPoint]);

    return {
        handlePickerSnapPointChange,
        handleEventInterestPick,
        handleEventSlideChange,
    };
}