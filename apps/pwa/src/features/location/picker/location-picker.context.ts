"use client";

import { createContext, RefObject, useContext } from "react";
import { ILocationPickerController } from "./types";
import {
    LocationPickerConfirmationStore,
    LocationPickerFiltersStore,
    LocationPickerSearchStore,
} from "@/features/location/picker/stores";

type LocationPickerContextValue = {
    searchStore: LocationPickerSearchStore;
    filtersStore: LocationPickerFiltersStore;
    confirmationStore: LocationPickerConfirmationStore;
    controller: RefObject<ILocationPickerController>
};

export const LocationPickerContext = createContext<LocationPickerContextValue | null>(null);

export function useLocationPicker() {
    const ctx = useContext(LocationPickerContext);
    if (!ctx) throw new Error("useLocationPicker must be used within a LocationPickerProvider");
    return ctx;
}