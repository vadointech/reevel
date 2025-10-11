"use client";

import { DiscoverCollectionDrawer } from "@/components/drawers/discover";
import { EventCollectionEntity } from "@/entities/event";
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
    return (
        <DiscoverCollectionDrawer
            events={events}
            interests={interests}
            collection={collection}
            onEventInterestPick={() => {}}
            onEventSlideChange={() => {}}
        >
            Don't Miss in Vinnitsa
        </DiscoverCollectionDrawer>
    );
};
