import { useCallback, useEffect, useRef } from "react";
import { useRouter } from "@/i18n/routing";

import { usePersistentMap } from "@/components/shared/map";
import { eventEntityMapper } from "@/entities/event/mapper";
import { MAP_MOTION_TIMEOUT_MS } from "@/components/shared/map/map.config";
import { useSpatialCache } from "@/features/spatial-cache/use-spatial-cache.hook";
import { GetCalendarEventsQuery } from "../queries";
import { useCalendarContext } from "../calendar.context";

import { EventEntity, EventParticipationType } from "@/entities/event";

export function useCalendarMap(eventsInit: EventEntity[]) {
    const map = usePersistentMap();
    const router = useRouter();
    const calendar = useCalendarContext();
    const preventMapUpdate = useRef<boolean>(false);

    const replaceResponse = (response?: EventEntity[]) => {
        return map.controller.current.replacePoints(eventEntityMapper.toEventPoint(response));
    };

    const { fetchSpatialData } = useSpatialCache<EventEntity[]>(map.provider.current, {
        prefetchedData: eventsInit,
        queryBuilder: GetCalendarEventsQuery,
        cacheConfig: {
            sensitivity: 2,
        },
    });

    const handleSelectParticipationType = useCallback((type: EventParticipationType | null) => {
        const currentType = calendar.store.participationType;
        const viewState = map.provider.current.internalConfig.viewState;
        const currentViewState = map.provider.current.getViewState();

        if(!type) {
            calendar.store.setParticipationType(null);
            replaceResponse(eventsInit);
            return;
        }

        if(currentType === type) {
            calendar.store.setParticipationType(null);
            replaceResponse(eventsInit);
        } else {
            calendar.store.setParticipationType(type);
            fetchSpatialData({ viewState, filter: type }).then(replaceResponse);
        }

        if(viewState.zoom !== currentViewState.zoom) {
            new Promise(resolve => setTimeout(resolve, MAP_MOTION_TIMEOUT_MS))
                .then(() => {
                    preventMapUpdate.current = true;
                    map.provider.current.resetViewState();
                });
        }
    }, []);

    const handleSelectPoint = useCallback((pointId: string | null) => {
        if(!pointId) return;
        router.push("/calendar/event/" + pointId);
    }, []);

    useEffect(() => {
        map.controller.current.attachHandlers({
            onPointSelect: handleSelectPoint,
        });

        return () => {
            map.controller.current.detachHandlers(["onPointSelect"]);
        };
    }, [handleSelectPoint]);

    return {
        handleSelectParticipationType,
    };
}