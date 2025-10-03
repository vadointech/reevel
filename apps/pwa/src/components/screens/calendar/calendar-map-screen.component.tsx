"use client";

import { EventCollectionEntity } from "@/entities/event";
import { DiscoverStaticCollections } from "@/features/discover/config";
import { CalendarMapViewDrawer } from "@/components/drawers/calendar";

export namespace CalendarMapScreen {
    export type Props = EventCollectionEntity & {
        collection: DiscoverStaticCollections;
    };
}

export const CalendarMapScreen = ({
    collection,
    events,
}: CalendarMapScreen.Props) => {
    return (
        <CalendarMapViewDrawer
            events={events}
            collection={collection}
        >
            Upcoming events
        </CalendarMapViewDrawer>
    );
};
