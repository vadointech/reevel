"use client";

import { ComponentProps, useRef, useState } from "react";

import { MapView } from "@/components/shared/map";
import { LocationPickerDrawer } from "./drawer.component";
import { BottomSheetPositionControls } from "@/components/shared/_redesign/bottom-sheet/controls";

export namespace LocationPickerMapView {
    type Data = never;
    export type Props = ComponentProps<"div">;
}

export const LocationPickerMapView = ({ ...props }: LocationPickerMapView.Props) => {

    const positionControls = useRef<BottomSheetPositionControls | null>(null);
  
    return (
        <>
            <MapView
                onViewportChange={() => {
                    positionControls.current?.setPositionBySnapIndex(1);
                }}
            />
            <LocationPickerDrawer
                positionControls={positionControls}
            />
        </>
    );
};
