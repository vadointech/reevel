"use client";

import { DiscoverDrawer } from "@/components/drawers/discover";
import { useDiscoverMap } from "@/features/discover/hooks";

import { EventEntity, EventPointEntity } from "@/entities/event";
import { InterestEntity } from "@/entities/interests";
import { GetNearbyEventsQuery } from "@/features/discover/queries";
import { DiscoverStaticCollections } from "@/features/discover/config";

export namespace DiscoverScreen {
    export type Data = {
        eventsInit: EventPointEntity[];
        interestsInit: InterestEntity[];
        collectionsInit: InterestEntity[];
        cityHighlights: EventEntity[];
    };
    export type Props = Data & {
        collection: DiscoverStaticCollections;
    };
}

export const DiscoverScreen = ({
    collection,
    eventsInit,
    interestsInit,
    collectionsInit,
    cityHighlights,
}: DiscoverScreen.Props) => {

    const {
        handlePickInterestFilter,
        handleDrawerSnapPointChange,
    } = useDiscoverMap({
        collection,
        eventsInit: eventsInit,
        queryBuilder: GetNearbyEventsQuery,
    });

    return (
        <DiscoverDrawer
            interests={interestsInit}
            collections={collectionsInit}
            cityHighlights={cityHighlights}
            onEventInterestPick={handlePickInterestFilter}
            onSnapPointChange={handleDrawerSnapPointChange}
        />
    );
};
