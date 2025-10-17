import { useCallback, useEffect } from "react";
import { useRouter } from "@/i18n/routing";

import { usePersistentMap } from "@/components/shared/map";
import { EventParticipationType } from "@/entities/event";
import { eventEntityToEventPointEntity } from "@/features/event/mappers";
import { MAP_MOTION_TIMEOUT_MS } from "@/components/shared/map/map.config";
import { useCalendarContext } from "@/features/calendar";
import {
    useAttendingEventsQuery,
    useHostingEventsQuery,
    useUpcomingEventsQuery,
} from "@/features/calendar/hooks/use-calendar-event-query.hook";

export function useCalendarMap() {
    const map = usePersistentMap();
    const router = useRouter();
    const calendar = useCalendarContext();

    const { upcomingEvents, isUpcomingEventsFetching } = useUpcomingEventsQuery();
    const { hostingEvents } = useHostingEventsQuery();
    const { attendingEvents } = useAttendingEventsQuery();

    const replaceResponse = (type: EventParticipationType | null) => {
        switch(type) {
            case null:
                if(!upcomingEvents) return;
                map.controller.current.replacePoints(
                    upcomingEvents.data.map(eventEntityToEventPointEntity),
                );
                break;
            case EventParticipationType.ATTENDING:
                if(!attendingEvents) return;
                map.controller.current.replacePoints(
                    attendingEvents.data.map(eventEntityToEventPointEntity),
                );
                break;
            case EventParticipationType.HOSTING:
                if(!hostingEvents) return;
                map.controller.current.replacePoints(
                    hostingEvents.data.map(eventEntityToEventPointEntity),
                );
        }
    };

    useEffect(() => {
        replaceResponse(null);
    }, [isUpcomingEventsFetching]);

    const handleDrawerSnapPointChange = useCallback((snapIndex: number) => {
        switch(snapIndex) {
            case 1: // .5
                map.provider.current.setPadding({ bottom: 260 });
                break;
            case 2: // .18
                map.provider.current.setPadding({ bottom: 0 });
                break;
        }
    }, []);

    const handlePickParticipationType = useCallback((type: EventParticipationType | null) => {
        const currentType = calendar.store.participationType;
        const viewState = map.provider.current.internalConfig.viewState;
        const currentViewState = map.provider.current.getViewState();

        if(!type) {
            calendar.store.setParticipationType(null);
            replaceResponse(type);
            return;
        }

        if(currentType === type) {
            calendar.store.setParticipationType(null);
            replaceResponse(null);
        } else {
            calendar.store.setParticipationType(type);
            replaceResponse(type);
        }

        if(viewState.zoom !== currentViewState.zoom) {
            new Promise(resolve => setTimeout(resolve, MAP_MOTION_TIMEOUT_MS))
                .then(() => {
                    map.provider.current.resetViewState();
                });
        }
    }, [replaceResponse]);

    const handleSelectPoint = useCallback((pointId: string | null) => {
        if(!pointId) return;
        router.push("/calendar/event/" + pointId);
    }, [router]);

    useEffect(() => {
        map.controller.current.attachHandlers({
            onPointSelect: handleSelectPoint,
        });
    }, []);

    return {
        handleSelectPoint,
        handlePickParticipationType,
        handleDrawerSnapPointChange,
    };
}