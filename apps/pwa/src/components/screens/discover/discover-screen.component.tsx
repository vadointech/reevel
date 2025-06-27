"use client";

import { DiscoverDrawer } from "@/components/drawers/discover";
import { useDiscoverDrawerMap } from "@/features/event/discover/hooks";

import { EventEntity } from "@/entities/event";
import { InterestEntity } from "@/entities/interests";

export namespace DiscoverScreen {
    export type Data = {
        interestsInit: InterestEntity[],
        collectionsInit: InterestEntity[],
        cityHighlights: EventEntity[]
        eventsInit: EventEntity[]
    };
    export type Props = Data;
}

export const DiscoverScreen = ({
    eventsInit,
    interestsInit,
    collectionsInit,
    cityHighlights,
}: DiscoverScreen.Props) => {
    const {
        handlePickerSnapPointChange,
    } = useDiscoverDrawerMap(eventsInit);

    return (
        <DiscoverDrawer
            interests={interestsInit}
            collections={collectionsInit}
            cityHighlights={cityHighlights}
            onSnapPointChange={handlePickerSnapPointChange}
        />
    );
};
