"use client";

import { createContext, useContext } from "react";
import {
    LocationPickerConfirmationStore,
    LocationPickerFiltersStore,
    LocationPickerSearchStore,
} from "@/features/location/picker/stores";
import { LocationPickerRootConfigParams } from "./types";

type LocationPickerContextValue = {
    config: LocationPickerRootConfigParams
    searchStore: LocationPickerSearchStore;
    filtersStore: LocationPickerFiltersStore;
    confirmationStore: LocationPickerConfirmationStore;
};

export const LocationPickerContext = createContext<LocationPickerContextValue | null>(null);

export function useLocationPicker() {
    const ctx = useContext(LocationPickerContext);
    if (!ctx) throw new Error("useLocationPicker must be used within a LocationPickerProvider");
    return ctx;
}