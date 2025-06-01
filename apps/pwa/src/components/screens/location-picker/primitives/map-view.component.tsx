"use client";

import { MapView } from "@/components/shared/map";
import { LocationPickerDrawer } from "./drawer.component";
import { LocationPickerConfirmationDrawer } from "./confirmation";

import { useLocationPickerMap, useConfirmationDrawer } from "@/features/location/picker/hooks";

import { GooglePlacesApiResponse } from "@/api/google/places/types";

export namespace LocationPickerMapView {
    export type Data = {
        placesInit: GooglePlacesApiResponse
    };
    export type Props = Data;
}

export const LocationPickerMapView = ({ placesInit }: LocationPickerMapView.Props) => {
    const {
        handleViewportChange,
        handleLocationTypePick,
    } = useLocationPickerMap(placesInit);

    const {
        confirmationDataRef,
        confirmationDrawerControls,
        handleSelectPoint,
        handleConfirmationClose,
    } = useConfirmationDrawer();

    return (
        <>
            <MapView
                viewState={{
                    padding: { bottom: 260 },
                }}
                onMoveEnd={handleViewportChange}
                onPointSelect={handleSelectPoint}
            />
            <LocationPickerDrawer
                onLocationTypePick={handleLocationTypePick}
            />
            <LocationPickerConfirmationDrawer
                controller={confirmationDrawerControls}
                dataRef={confirmationDataRef}
                onClose={handleConfirmationClose}
            />
        </>
    );
};
