"use client";

import { DiscoverDrawer } from "@/components/drawers/discover";
import { MapView } from "@/components/shared/map";
import { EventEntity } from "@/entities/event";
import { useDiscoverDrawerMap } from "@/features/event/discover/hooks";

export namespace DiscoverScreen {
    export type Data = {
        eventsInit: EventEntity[]
    };
    export type Props = Data;
}

export const DiscoverScreen = ({ eventsInit }: DiscoverScreen.Props) => {
    const {
        defaultPoints,
        PICKER_MAP_PADDING,
        handlePrecacheSpatialData,
        handleViewportChange,
        handlePickerSnapPointChange,
    } = useDiscoverDrawerMap(eventsInit);

    return (
        <>
            <MapView
                points={defaultPoints}
                viewState={{
                    padding: PICKER_MAP_PADDING,
                }}
                onMapReady={handlePrecacheSpatialData}
                onMoveEnd={handleViewportChange}
            />
            <DiscoverDrawer
                onSnapPointChange={handlePickerSnapPointChange}
            />
        </>
    );
};
