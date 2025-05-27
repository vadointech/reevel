"use client";

import { useEffect, useRef } from "react";

import { MapView, usePersistentMap } from "@/components/shared/map";
import { LocationPickerDrawer } from "@/components/screens/location-picker/primitives/drawer.component";
import { useLocationPickerMap } from "@/features/location/picker/hooks";
import {
    LocationPickerConfirmationDrawer,
} from "@/components/screens/location-picker/primitives/confirmation/confirmation-drawer.component";
import { GetNearbyPlaces } from "@/api/google/places";
import {
    IBottomSheetRootController,
} from "@/components/shared/_redesign/bottom-sheet/types";
import { IconPoint, Point } from "@/components/shared/map/types";
import { googlePlacesApiResponseMapper } from "@/infrastructure/google/mappers";
import { usePrefetchedQuery, useQueriesData } from "@/lib/react-query";

export namespace LocationPickerMapView {
    export type Data = {
        placesInit: Point<IconPoint>[]
    };
    export type Props = Data;
}

export const LocationPickerMapView = ({ placesInit }: LocationPickerMapView.Props) => {
    const {
        handleViewportChange,
        handlePickLocationType,
    } = useLocationPickerMap();
    const map = usePersistentMap();

    const confirmControls = useRef<IBottomSheetRootController>(null);
    const confirmationDataRef = useRef<GetNearbyPlaces.TOutput["places"][number] | undefined>(undefined);

    usePrefetchedQuery<GetNearbyPlaces.TOutput>({
        queryKey: [...GetNearbyPlaces.queryKey],
        onSuccess: (data) => {
            const points = data.flatMap(googlePlacesApiResponseMapper.toIconPoint);
            map.controller.current.setPoints(points);
        },
    });

    const getNearbyPlacesQueryData = useQueriesData<GetNearbyPlaces.TOutput>({
        queryKey: [...GetNearbyPlaces.queryKey],
    });

    const handlePointSelect = (pointId: string | null) => {
        if(!pointId) return;

        const nearbyPlacesQueriesData = getNearbyPlacesQueryData()
            .flatMap((val) => val?.places || []);

        const data = nearbyPlacesQueriesData.find(item => item.id === pointId);

        if(data) {
            confirmationDataRef.current = data;
            confirmControls.current?.open();
        }
    };

    const handleClose = () => {
        map.controller.current.selectPoint(null);
    };


    useEffect(() => {
        return () => {
            map.provider.current.resetViewState(undefined, { animate: false });
        };
    }, []);

    return (
        <>
            <MapView
                points={placesInit}
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
