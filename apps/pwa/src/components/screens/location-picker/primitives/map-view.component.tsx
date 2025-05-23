"use client";

import { ComponentProps, useRef } from "react";

import { MapView } from "@/components/shared/map";
import { LocationPickerDrawer } from "@/components/screens/location-picker/primitives/drawer.component";
import { BottomSheetPositionControls } from "@/components/shared/_redesign/bottom-sheet";
import { useLocationPicker } from "@/features/location/picker";
import { usePersistentMap } from "@/components/shared/map/map.context";
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

    const persistentMap = usePersistentMap();

    const handleSnapPointChange = (snapIndex: number) => {
        if(!persistentMap.provider) return;
        switch(snapIndex) {
            case 0:
                persistentMap.provider.setPadding({ bottom: 260 });
                break;
            case 1:
                persistentMap.provider.setPadding({ bottom: 0 });
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
                onMapMounted={({ provider }) => {
                    provider.setPadding({ bottom: 260 }, { animate: false });
                }}
                onViewportChange={({ bounds }) => {
                    handleViewportChange(bounds);
                    if(persistentMap.store?.selectedPoint) {
                        persistentMap.store?.selectPoint(null);
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
