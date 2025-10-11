"use client";

import { DiscoverCollectionDrawer } from "@/components/drawers/discover";
import { EventCollectionEntity } from "@/entities/event";
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
    return (
        <DiscoverCollectionDrawer
            events={events}
            interests={interests}
            collection={collection}
            onEventInterestPick={() => {}}
            onEventSlideChange={() => {}}
        >
            Randomized
        </DiscoverCollectionDrawer>
    );
};