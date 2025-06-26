"use client";

import { DiscoverDrawer } from "@/components/drawers/discover";
import { useDiscoverDrawerMap } from "@/features/event/discover/hooks";

import { EventEntity } from "@/entities/event";
import { InterestEntity } from "@/entities/interests";

export namespace DiscoverScreen {
    export type Data = {
        interestsInit: InterestEntity[],
        eventsInit: EventEntity[]
    };
    export type Props = Data;
}

export const DiscoverScreen = ({ eventsInit, interestsInit }: DiscoverScreen.Props) => {
    const {
        handlePickerSnapPointChange,
    } = useDiscoverDrawerMap(eventsInit);

    return (
        <DiscoverDrawer
            interests={interestsInit}
            onSnapPointChange={handlePickerSnapPointChange}
        />
    );
};
