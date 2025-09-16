"use client";

import { DiscoverCollectionDrawer } from "@/components/drawers/discover";
import { useDiscoverDrawerMap } from "@/features/discover/hooks";
import { EventCollectionEntity } from "@/entities/event";
import { GetRandomizedEventsQueryBuilder } from "@/features/discover/queries";
import { DiscoverStaticCollections } from "@/features/discover/config";

export namespace DiscoverRandomizedScreen {
    export type Props = EventCollectionEntity & {
        collection: DiscoverStaticCollections;
    };
}

export const DiscoverRandomizedScreen = ({
    events,
    interests,
    collection,
}: DiscoverRandomizedScreen.Props) => {

    const {
        handleEventInterestPick,
        handleEventSlideChange,
    } = useDiscoverDrawerMap({
        collection,
        eventsInit: events,
        queryBuilder: GetRandomizedEventsQueryBuilder,
    });

    return (
        <DiscoverCollectionDrawer
            events={events}
            interests={interests}
            collection={collection}
            onEventInterestPick={handleEventInterestPick}
            onEventSlideChange={handleEventSlideChange}
        >
            Randomized
        </DiscoverCollectionDrawer>
    );
};