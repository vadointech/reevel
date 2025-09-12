"use client";

import { DiscoverCollectionDrawer } from "@/components/drawers/discover";
import { useDiscoverDrawerMap } from "@/features/discover/hooks";
import { EventCollectionEntity } from "@/entities/event";
import { GetNearbyEventsQueryBuilder } from "@/features/discover/queries";
import { PropsWithChildren } from "react";

export namespace DiscoverCollectionScreen {
    export type Props = PropsWithChildren<EventCollectionEntity> & {
        collection: string;
    };
}

export const DiscoverCollectionScreen = ({
    children,
    events,
    interests,
    collection,
}: DiscoverCollectionScreen.Props) => {

    const {
        handleEventInterestPick,
        handleEventSlideChange,
    } = useDiscoverDrawerMap({
        collection,
        eventsInit: events,
        queryBuilder: GetNearbyEventsQueryBuilder,
    });

    return (
        <DiscoverCollectionDrawer
            events={events}
            interests={interests}
            collection={collection}
            onEventInterestPick={handleEventInterestPick}
            onEventSlideChange={handleEventSlideChange}
        >
            { children }
        </DiscoverCollectionDrawer>
    );
};
