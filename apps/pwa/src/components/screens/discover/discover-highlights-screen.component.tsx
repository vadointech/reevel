"use client";

import { DiscoverCollectionDrawer } from "@/components/drawers/discover";
import { EventCollectionEntity } from "@/entities/event";
import { useDiscoverDrawerMap } from "@/features/event/discover/hooks";
import { GetCityHighlightsQueryBuilder } from "@/features/event/discover/queries";

export namespace DiscoverHighlightsScreen {
    export type Props = EventCollectionEntity & {
        callbackUrl: string;
    };
}

export const DiscoverHighlightsScreen = ({
    events,
    interests,
    callbackUrl,
}: DiscoverHighlightsScreen.Props) => {

    const {
        handleEventInterestPick,
        handleEventSlideChange,
    } = useDiscoverDrawerMap({
        callbackUrl,
        eventsInit: events,
        queryBuilder: GetCityHighlightsQueryBuilder,
    });

    return (
        <DiscoverCollectionDrawer
            events={events}
            interests={interests}
            onEventInterestPick={handleEventInterestPick}
            onEventSlideChange={handleEventSlideChange}
        >
            Don't Miss in Vinnitsa
        </DiscoverCollectionDrawer>
    );
};
