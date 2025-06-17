"use client";

import { MapView } from "@/components/shared/map";
import { LocationPickerDrawer } from "./primitives/picker-drawer.component";
import { LocationPickerConfirmationDrawer } from "./primitives/confirmation-drawer.component";

import { useLocationPickerMap, useConfirmationDrawer } from "@/features/location/picker/hooks";

import { PlaceLocationEntity } from "@/entities/place";

export namespace LocationPickerMapView {
    export type Data = {
        placesInit: PlaceLocationEntity[]
    };
    export type Props = Data;
}

export const LocationPickerMapView = ({ placesInit }: LocationPickerMapView.Props) => {
    const {
        PICKER_MAP_PADDING,

        defaultPoints,
        handleViewportChange,
        handleLocationTypePick,
        handlePrecacheSpatialData,
        handlePickerSnapPointChange,
    } = useLocationPickerMap(placesInit);

    const {
        confirmationDataRef,
        pickerDrawerControls,
        confirmationDrawerControls,
        pickerDrawerDefaultSnapIndex,
        handleSelectPoint,
        handleConfirmationClose,
        handleRequestLocationAccess,
    } = useConfirmationDrawer(placesInit);

    return (
        <>
            <MapView
                points={defaultPoints}
                viewState={{
                    padding: PICKER_MAP_PADDING,
                }}
                onMapReady={handlePrecacheSpatialData}
                onMoveEnd={handleViewportChange}
                onPointSelect={handleSelectPoint}
            />
            <LocationPickerDrawer
                controller={pickerDrawerControls}
                defaultSnapIndex={pickerDrawerDefaultSnapIndex}
                onLocationTypePick={handleLocationTypePick}
                onSnapPointChange={handlePickerSnapPointChange}
                onLocationAccessRequest={handleRequestLocationAccess}
            />
            <LocationPickerConfirmationDrawer
                controller={confirmationDrawerControls}
                dataRef={confirmationDataRef}
                onClose={handleConfirmationClose}
            />
        </>
    );
};
