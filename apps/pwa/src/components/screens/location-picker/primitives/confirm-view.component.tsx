"use client";

import { ComponentProps } from "react";

import { MapView } from "@/components/shared/map";
import { LocationPickerConfirmationDrawer } from "./confirmation/confirmation-drawer.component";

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
