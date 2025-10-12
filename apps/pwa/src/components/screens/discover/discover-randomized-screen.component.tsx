"use client";

import { DiscoverCollectionDrawer } from "@/components/drawers/discover";
import { EventEntity, EventPointEntity } from "@/entities/event";
import { DiscoverStaticCollections } from "@/features/discover/config";
import { useDiscoverMap } from "@/features/discover/hooks";
import { InterestEntity } from "@/entities/interests";
import { GetNearbyEventsQuery } from "@/features/discover/queries";

export namespace DiscoverRandomizedScreen {
    export type Props = {
        eventsInit: EventEntity[];
        eventPointsInit: EventPointEntity[];
        interestsInit: InterestEntity[];
        collection: DiscoverStaticCollections;
    };
}

export const DiscoverRandomizedScreen = ({
    eventsInit,
    eventPointsInit,
    interestsInit,
    collection,
}: DiscoverRandomizedScreen.Props) => {

    const {
        handleEventSlideChange,
        handlePickInterestFilter,
    } = useDiscoverMap({
        collection,
        eventsInit: eventPointsInit,
        queryBuilder: GetNearbyEventsQuery,
    });

    return (
        <DiscoverCollectionDrawer
            events={eventsInit}
            interests={interestsInit}
            collection={collection}
            onEventSlideChange={handleEventSlideChange}
            onEventInterestPick={handlePickInterestFilter}
        >
            Randomized
        </DiscoverCollectionDrawer>
    );
};