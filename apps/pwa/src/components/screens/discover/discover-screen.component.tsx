"use client";

import { DiscoverDrawer } from "@/components/drawers/discover";
import { useDiscoverMap } from "@/features/discover/hooks";

import { EventEntity, EventPointEntity } from "@/entities/event";
import { InterestEntity } from "@/entities/interests";
import { GetNearbyEventsQuery } from "@/features/discover/queries";
import { DiscoverStaticCollections } from "@/features/discover/config";
import { CitiesEntity } from "@/entities/cities";

export namespace DiscoverScreen {
    export type Data = {
        cityInit?: CitiesEntity;
        eventPointsInit: EventPointEntity[];
        interestsInit: InterestEntity[];
        interestCollectionsInit: InterestEntity[];
        highlightsInit: EventEntity[];
    };
    export type Props = Data & {
        collection: DiscoverStaticCollections;
    };
}

export const DiscoverScreen = ({
    cityInit,
    collection,
    eventPointsInit,
    interestsInit,
    interestCollectionsInit,
    highlightsInit,
}: DiscoverScreen.Props) => {
    const {
        handlePickInterestFilter,
        handleDrawerSnapPointChange,
    } = useDiscoverMap({
        collection,
        eventPointsInit,
        queryBuilder: GetNearbyEventsQuery,
    });

    return (
        <DiscoverDrawer
            cityInit={cityInit}
            interestsInit={interestsInit}
            highlightsInit={highlightsInit}
            interestCollectionsInit={interestCollectionsInit}
            onEventInterestPick={handlePickInterestFilter}
            onSnapPointChange={handleDrawerSnapPointChange}
        />
    );
};
