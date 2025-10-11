"use client";

import { DiscoverCollectionDrawer } from "@/components/drawers/discover";
import { EventCollectionEntity } from "@/entities/event";
import { PropsWithChildren } from "react";

export namespace DiscoverCollectionScreen {
    export type Props = PropsWithChildren<EventCollectionEntity> & {
        collection: string;
    };
}

export const DiscoverCollectionScreen = ({
    children,
    events,
    interests,
    collection,
}: DiscoverCollectionScreen.Props) => {
    return (
        <DiscoverCollectionDrawer
            events={events}
            interests={interests}
            collection={collection}
            onEventInterestPick={() => {}}
            onEventSlideChange={() => {}}
        >
            { children }
        </DiscoverCollectionDrawer>
    );
};
