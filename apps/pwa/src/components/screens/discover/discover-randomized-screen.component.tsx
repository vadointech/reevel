"use client";

import { DiscoverCollectionDrawer } from "@/components/drawers/discover";
import { useDiscoverDrawerMap } from "@/features/event/discover/hooks";
import { EventCollectionEntity } from "@/entities/event";
import { GetRandomizedEventsQueryBuilder } from "@/features/event/discover/queries";

export namespace DiscoverRandomizedScreen {
    export type Props = EventCollectionEntity & {
        callbackUrl: string;
    };
}

export const DiscoverRandomizedScreen = ({
    events,
    interests,
    callbackUrl,
}: DiscoverRandomizedScreen.Props) => {

    const {
        handleEventInterestPick,
        handleEventSlideChange,
    } = useDiscoverDrawerMap({
        callbackUrl,
        eventsInit: events,
        queryBuilder: GetRandomizedEventsQueryBuilder,
    });

    return (
        <DiscoverCollectionDrawer
            events={events}
            interests={interests}
            onEventInterestPick={handleEventInterestPick}
            onEventSlideChange={handleEventSlideChange}
        >
            Randomized
        </DiscoverCollectionDrawer>
    );
};