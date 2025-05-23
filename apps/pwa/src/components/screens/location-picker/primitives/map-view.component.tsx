"use client";

import { ComponentProps, useRef } from "react";

import { MapView, usePersistentMap } from "@/components/shared/map";
import { LocationPickerDrawer } from "@/components/screens/location-picker/primitives/drawer.component";
import { BottomSheetPositionControls } from "@/components/shared/_redesign/bottom-sheet";
import { useLocationPicker } from "@/features/location/picker";
import {
    LocationPickerConfirmationDrawer,
} from "@/components/screens/location-picker/primitives/confirmation/confirmation-drawer.component";
import { IBottomSheetStore } from "@/components/shared/_redesign/bottom-sheet/store";
import { useQueryClient } from "@tanstack/react-query";
import { GetNearbyPlaces } from "@/api/google/places";

export namespace LocationPickerMapView {
    export type Props = ComponentProps<"div">;
}

export const LocationPickerMapView = (props: LocationPickerMapView.Props) => {
    const {
        handleViewportChange,
        handlePickLocationType,
    } = useLocationPicker();

    const queryClient = useQueryClient();

    const confirmationDrawerStore = useRef<IBottomSheetStore | null>(null);

    const positionControls = useRef<BottomSheetPositionControls | null>(null);
    const storeControls = useRef<IBottomSheetStore | null>(null);

    const map = usePersistentMap();

    const handleSnapPointChange = (snapIndex: number) => {
        if(!map.provider) return;
        switch(snapIndex) {
            case 0:
                map.provider.current.setPadding({ bottom: 260 });
                break;
            case 1:
                map.provider.current.setPadding({ bottom: 0 });
                break;
        }
    };

    const confirmationDataRef = useRef<GetNearbyPlaces.TOutput["places"][number] | undefined>(undefined);

    const handlePointSelect = (pointId: string | null) => {
        const cache = queryClient.getQueryCache().getAll();

        const query = cache.filter(item =>
            item.queryHash.includes(GetNearbyPlaces.queryKey[0]),
        );


        if(pointId) {
            const data = query.find(item =>
                (item.state.data as GetNearbyPlaces.TOutput).places.some(place => place.id === pointId),
            )?.state.data as GetNearbyPlaces.TOutput;

            console.log(pointId, data);

            confirmationDataRef.current = data.places.find(item => item.id === pointId);
            confirmationDrawerStore.current?.setOpen();
        } else {
            confirmationDataRef.current = undefined;
            confirmationDrawerStore.current?.setClose();
        }
    };

    return (
        <>
            <MapView
                viewState={{
                    padding: { bottom: 260 },
                }}
                onViewportChange={({ bounds }) => {
                    handleViewportChange(bounds);
                    if(map.controller.current.store.selectedPoint) {
                        map.controller.current.selectPoint(null);
                    }
                }}
                onPointSelect={handlePointSelect}
            />
            <LocationPickerDrawer
                storeControls={storeControls}
                positionControls={positionControls}
                onLocationTypePick={handlePickLocationType}
                onSnapPointChange={handleSnapPointChange}
            />
            <LocationPickerConfirmationDrawer
                storeControls={confirmationDrawerStore}
                dataRef={confirmationDataRef}
            />
        </>
    );
};
