"use client";

import { ILocationSearchStore, LocationSearchInternalConfig } from "@/features/location/search/types";
import { createContext, useContext } from "react";

type LocationSearchContextValues = {
    store: ILocationSearchStore;
    config: LocationSearchInternalConfig;
};

export const LocationSearchContext = createContext<LocationSearchContextValues | null>(null);

export function useLocationSearchContext() {
    const ctx = useContext(LocationSearchContext);
    if (!ctx) throw new Error("useLocationSearchContext must be used within a LocationSearchProvider");
    return ctx;
}