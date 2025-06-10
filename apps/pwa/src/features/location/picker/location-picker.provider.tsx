"use client";

import { PropsWithChildren, useEffect, useMemo, useRef } from "react";
import {
    LocationPickerConfirmationStore,
    LocationPickerFiltersStore,
    LocationPickerSearchStore,
} from "./stores";
import { LocationPickerContext } from "./location-picker.context";
import { LocationPickerRootConfigParams } from "./types";
import { useFormContext } from "react-hook-form";

export namespace LocationPickerProvider {
    export type Props = PropsWithChildren<LocationPickerRootConfigParams>;
}

export const LocationPickerProvider = ({
    children,
    ...config
}: LocationPickerProvider.Props) => {
    const form = useFormContext();
    const searchStore = useRef(new LocationPickerSearchStore()).current;
    const filtersStore = useRef(new LocationPickerFiltersStore()).current;

    const initConfirmationStore: ConstructorParameters<typeof LocationPickerConfirmationStore> = useMemo(() => {
        if(!config.syncFormField) return [];

        const value = form.getValues(config.syncFormField);

        return [
            value,
            (point) => {
                form.setValue(config.syncFormField, point);
            },
        ];
    }, [form, config.syncFormField]);

    const confirmationStore = useRef(
        new LocationPickerConfirmationStore(...initConfirmationStore),
    ).current;

    useEffect(() => {
        return () => confirmationStore.dispose();
    }, []);

    return (
        <LocationPickerContext.Provider
            value={{
                searchStore,
                filtersStore,
                confirmationStore,
                config,
            }}
        >
            { children }
        </LocationPickerContext.Provider>
    );
};
