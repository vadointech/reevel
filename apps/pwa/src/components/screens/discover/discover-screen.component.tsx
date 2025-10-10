"use client";

import { DiscoverDrawer } from "@/components/drawers/discover";
import { useDiscoverDrawerMap } from "@/features/discover/hooks";

import { EventEntity } from "@/entities/event";
import { InterestEntity } from "@/entities/interests";
import { GetNearbyEventsQueryBuilder } from "@/features/discover/queries";
import { DiscoverStaticCollections } from "@/features/discover/config";

export namespace DiscoverScreen {
    export type Data = {
        interestsInit: InterestEntity[];
        collectionsInit: InterestEntity[];
        cityHighlights: EventEntity[];
    };
    export type Props = Data & {
        collection: DiscoverStaticCollections;
    };
}

export const DiscoverScreen = ({
    interestsInit,
    collectionsInit,
    cityHighlights,
    collection,
}: DiscoverScreen.Props) => {
    const {
        handlePickerSnapPointChange,
        handleEventInterestPick,
    } = useDiscoverDrawerMap({
        collection,
        eventsInit: [],
        queryBuilder: GetNearbyEventsQueryBuilder,
    });

    return (
        <DiscoverDrawer
            interests={interestsInit}
            collections={collectionsInit}
            cityHighlights={cityHighlights}
            onSnapPointChange={handlePickerSnapPointChange}
            onEventInterestPick={handleEventInterestPick}
        />
    );
};
