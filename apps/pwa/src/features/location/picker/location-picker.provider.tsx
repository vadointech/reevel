"use client";

import { PropsWithChildren, useMemo, useRef } from "react";
import {
    LocationPickerConfirmationStore,
    LocationPickerFiltersStore,
    LocationPickerSearchStore,
} from "./stores";
import { LocationPickerController } from "./location-picker.controller";
import { LocationPickerContext } from "./location-picker.context";
import { LocationPickerRootConfigParams } from "./types";

export namespace LocationPickerProvider {
    export type Props = PropsWithChildren<LocationPickerRootConfigParams>;
}

export const LocationPickerProvider = ({
    children,
    ...config
}: LocationPickerProvider.Props) => {

    const searchStore = useMemo(() => new LocationPickerSearchStore(), []);
    const filtersStore = useMemo(() => new LocationPickerFiltersStore(), []);
    const confirmationStore = useMemo(() => new LocationPickerConfirmationStore(), []);

    const controller = useMemo(() =>
        new LocationPickerController(
            config,
            searchStore,
            filtersStore,
            confirmationStore,
        ),
    []);

    const controllerRef = useRef(controller);

    return (
        <LocationPickerContext.Provider
            value={{
                searchStore,
                filtersStore,
                confirmationStore,
                controller: controllerRef,
            }}
        >
            { children }
        </LocationPickerContext.Provider>
    );
};
