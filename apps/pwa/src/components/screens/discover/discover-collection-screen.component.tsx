"use client";

import { DiscoverCollectionDrawer } from "@/components/drawers/discover";
import {  EventEntity, EventPointEntity } from "@/entities/event";
import { PropsWithChildren } from "react";
import { useDiscoverMap } from "@/features/discover/hooks";
import { GetEventsQuery, getMapEventsQueryBuilder } from "@/features/discover/queries";
import { InterestEntity } from "@/entities/interests";

export namespace DiscoverCollectionScreen {
    export type Props = PropsWithChildren<{
        eventsInit: EventEntity[];
        eventPointsInit: EventPointEntity[];
        interestsInit: InterestEntity[];
        collection: string;
    }>;
}

export const DiscoverCollectionScreen = ({
    children,
    eventsInit,
    interestsInit,
    eventPointsInit,
    collection,
}: DiscoverCollectionScreen.Props) => {

    const {
        handleEventSlideChange,
        handlePickInterestFilter,
    } = useDiscoverMap({
        collection,
        queryBuilder: getMapEventsQueryBuilder(eventsInit, GetEventsQuery.queryKey(["/collection", collection])),
        eventPointsInit: eventPointsInit,
    });

    return (
        <>
            <DiscoverCollectionDrawer
                events={eventsInit}
                interests={interestsInit}
                collection={collection}
                onEventSlideChange={handleEventSlideChange}
                onEventInterestPick={handlePickInterestFilter}
            >
                { children }
            </DiscoverCollectionDrawer>
        </>
    );
};
