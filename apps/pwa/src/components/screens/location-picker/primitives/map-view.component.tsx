"use client";

import { ComponentProps, useState } from "react";

import { MapView } from "@/components/shared/map";
import { LocationPickerDrawer } from "./drawer.component";
import { BottomSheetExternalStateParams } from "@/components/shared/_redesign/bottom-sheet/hooks";

export namespace LocationPickerMapView {
    type Data = never;
    export type Props = ComponentProps<"div">;
}

export const LocationPickerMapView = ({ ...props }: LocationPickerMapView.Props) => {

    const [snapPoint, setSnapPoint] = useState<BottomSheetExternalStateParams["activeSnap"]>("fit-content");
   
    return (
        <>
            <MapView
                onViewportChange={() => {
                    if(snapPoint === "fit-content") {
                        setSnapPoint(.14);
                    }
                }}
            />
            <LocationPickerDrawer snapPoint={snapPoint} />
        </>
    );
};
