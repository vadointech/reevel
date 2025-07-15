"use client";

import { DiscoverDrawer } from "@/components/drawers/discover";
import { useDiscoverDrawerMap } from "@/features/event/discover/hooks";

import { EventEntity } from "@/entities/event";
import { InterestEntity } from "@/entities/interests";
import { GetNearbyEventsQueryBuilder } from "@/features/event/discover/queries";

export namespace DiscoverScreen {
    export type Data = {
        interestsInit: InterestEntity[];
        collectionsInit: InterestEntity[];
        cityHighlights: EventEntity[];
        eventsInit: EventEntity[];
    };
    export type Props = Data & {
        callbackUrl: string;
    };
}

export const DiscoverScreen = ({
    eventsInit,
    interestsInit,
    collectionsInit,
    cityHighlights,
    callbackUrl,
}: DiscoverScreen.Props) => {
    const {
        handlePickerSnapPointChange,
        handleEventInterestPick,
    } = useDiscoverDrawerMap({
        callbackUrl,
        eventsInit: eventsInit,
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
