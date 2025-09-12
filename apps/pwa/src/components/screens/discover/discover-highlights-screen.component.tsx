"use client";

import { DiscoverCollectionDrawer } from "@/components/drawers/discover";
import { EventCollectionEntity } from "@/entities/event";
import { useDiscoverDrawerMap } from "@/features/discover/hooks";
import { GetCityHighlightsQueryBuilder } from "@/features/discover/queries";
import { DiscoverStaticCollections } from "@/features/discover/config";

export namespace DiscoverHighlightsScreen {
    export type Props = EventCollectionEntity & {
        collection: DiscoverStaticCollections;
    };
}

export const DiscoverHighlightsScreen = ({
    events,
    interests,
    collection,
}: DiscoverHighlightsScreen.Props) => {

    const {
        handleEventInterestPick,
        handleEventSlideChange,
    } = useDiscoverDrawerMap({
        collection,
        eventsInit: events,
        queryBuilder: GetCityHighlightsQueryBuilder,
    });

    return (
        <DiscoverCollectionDrawer
            events={events}
            interests={interests}
            collection={collection}
            onEventInterestPick={handleEventInterestPick}
            onEventSlideChange={handleEventSlideChange}
        >
            Don't Miss in Vinnitsa
        </DiscoverCollectionDrawer>
    );
};
