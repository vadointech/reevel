"use client";

import { ILocationPickerConfig, LocationPickerStoreProvider } from "@/features/location/picker";

import { PropsWithChildren } from "react";

export namespace LocationPickerProvider {
    export type Props = PropsWithChildren<ILocationPickerConfig>;
}

export const LocationPickerProvider = ({ children, ...config }: LocationPickerProvider.Props) => {
    return (
        <LocationPickerStoreProvider init={[config]}>
            { children }
        </LocationPickerStoreProvider>
    );
};
