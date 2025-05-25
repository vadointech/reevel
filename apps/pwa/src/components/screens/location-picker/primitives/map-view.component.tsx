"use client";

import { ComponentProps, useRef } from "react";

import { MapView, usePersistentMap } from "@/components/shared/map";
import { LocationPickerDrawer } from "@/components/screens/location-picker/primitives/drawer.component";
import { useLocationPickerMap } from "@/features/location/picker/hooks";
import {
    LocationPickerConfirmationDrawer,
} from "@/components/screens/location-picker/primitives/confirmation/confirmation-drawer.component";
import { useQueryClient } from "@tanstack/react-query";
import { GetNearbyPlaces } from "@/api/google/places";
import {
    IBottomSheetRootController,
} from "@/components/shared/_redesign/bottom-sheet/types";

export namespace LocationPickerMapView {
    export type Props = ComponentProps<"div">;
}

export const LocationPickerMapView = (props: LocationPickerMapView.Props) => {
    const {
        handleViewportChange,
        handlePickLocationType,
    } = useLocationPickerMap();

    const queryClient = useQueryClient();

    const map = usePersistentMap();

    const confirmControls = useRef<IBottomSheetRootController>(null);

    const confirmationDataRef = useRef<GetNearbyPlaces.TOutput["places"][number] | undefined>(undefined);

    const handlePointSelect = (pointId: string | null) => {
        if(!pointId) return;

        const cache = queryClient.getQueryCache().getAll();

        const query = cache.filter(item =>
            item.queryHash.includes(GetNearbyPlaces.queryKey[0]),
        );

        const data = query.find(item =>
            (item.state.data as GetNearbyPlaces.TOutput).places.some(place => place.id === pointId),
        )?.state.data as GetNearbyPlaces.TOutput;
        confirmationDataRef.current = data.places.find(item => item.id === pointId);
        confirmControls.current?.open();
    };

    const handleClose = () => {
        map.controller.current.selectPoint(null);
    };

    return (
        <>
            <MapView
                viewState={{
                    padding: { bottom: 260 },
                }}
                onViewportChange={({ bounds }) => {
                    handleViewportChange(bounds);
                }}
                onPointSelect={handlePointSelect}
            />
            <LocationPickerDrawer
                onLocationTypePick={handlePickLocationType}
            />
            <LocationPickerConfirmationDrawer
                controller={confirmControls}
                dataRef={confirmationDataRef}
                onClose={handleClose}
            />
        </>
    );
};
