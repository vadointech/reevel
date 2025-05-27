"use client";

import { PropsWithChildren, useRef } from "react";
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

    const searchStore = useRef(new LocationPickerSearchStore()).current;
    const filtersStore = useRef(new LocationPickerFiltersStore()).current;
    const confirmationStore = useRef(new LocationPickerConfirmationStore()).current;

    const persistentCacheStore = useRef<Map<any, any>>(new Map()).current;

    const controller = useRef(
        new LocationPickerController(
            config,
            searchStore,
            filtersStore,
            confirmationStore,
            persistentCacheStore,
        ),
    );

    return (
        <LocationPickerContext.Provider
            value={{
                searchStore,
                filtersStore,
                confirmationStore,
                controller,
            }}
        >
            { children }
        </LocationPickerContext.Provider>
    );
};
