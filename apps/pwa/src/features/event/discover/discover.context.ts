"use client";

import { createContext, useContext } from "react";
import { IDiscoverCollectionStore, IDiscoverFiltersStore } from "./types";

type DiscoverContextValues = {
    filtersStore: IDiscoverFiltersStore;
    collectionStore: IDiscoverCollectionStore;
};

export const DiscoverContext = createContext<DiscoverContextValues | null>(null);

export function useDiscoverContext() {
    const ctx = useContext(DiscoverContext);
    if (!ctx) throw new Error("useDiscoverContext must be used within a DiscoverProvider");
    return ctx;
}