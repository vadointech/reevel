"use client";

import { DiscoverCollectionDrawer } from "@/components/drawers/discover";
import { useDiscoverDrawerMap } from "@/features/event/discover/hooks";
import { EventCollectionEntity } from "@/entities/event";
import { GetNearbyEventsQueryBuilder } from "@/features/event/discover/queries";
import { PropsWithChildren } from "react";

export namespace DiscoverCollectionScreen {
    export type Props = PropsWithChildren<EventCollectionEntity> & {
        callbackUrl: string;
    };
}

export const DiscoverCollectionScreen = ({
    children,
    events,
    interests,
    callbackUrl,
}: DiscoverCollectionScreen.Props) => {

    const {
        handleEventInterestPick,
        handleEventSlideChange,
    } = useDiscoverDrawerMap({
        callbackUrl,
        eventsInit: events,
        queryBuilder: GetNearbyEventsQueryBuilder,
    });

    return (
        <DiscoverCollectionDrawer
            events={events}
            interests={interests}
            onEventInterestPick={handleEventInterestPick}
            onEventSlideChange={handleEventSlideChange}
        >
            { children }
        </DiscoverCollectionDrawer>
    );
};
