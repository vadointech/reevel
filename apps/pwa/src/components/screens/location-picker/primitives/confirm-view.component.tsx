"use client";

import { ComponentProps } from "react";

import { MapView } from "@/components/shared/map";
import { LocationPickerConfirmationDrawer } from "./cnfirmation-drawer.component";

export namespace LocationPickerConfirmationView {
    export type Props = ComponentProps<"div">;
}

export const LocationPickerConfirmationView = ({ ...props }: LocationPickerConfirmationView.Props) => {
    return (
        <>
            <MapView />
            <LocationPickerConfirmationDrawer />
        </>
    );
};
