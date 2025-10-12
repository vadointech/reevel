"use client";

import { DiscoverCollectionDrawer } from "@/components/drawers/discover";
import { EventEntity, EventPointEntity } from "@/entities/event";
import { DiscoverStaticCollections } from "@/features/discover/config";
import { InterestEntity } from "@/entities/interests";
import { useDiscoverMap } from "@/features/discover/hooks";
import { GetNearbyEventsQuery } from "@/features/discover/queries";

export namespace DiscoverHighlightsScreen {
    export type Props = {
        eventsInit: EventEntity[];
        eventPointsInit: EventPointEntity[];
        interestsInit: InterestEntity[];
        collection: DiscoverStaticCollections;
    };
}

export const DiscoverHighlightsScreen = ({
    eventsInit,
    eventPointsInit,
    interestsInit,
    collection,
}: DiscoverHighlightsScreen.Props) => {

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
            Don't Miss in Vinnitsa
        </DiscoverCollectionDrawer>
    );
};
