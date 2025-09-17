"use client";

import { createContext, useContext } from "react";
import { IDiscoverStore } from "./types";

type DiscoverContextValues = {
    store: IDiscoverStore;
};

export const DiscoverContext = createContext<DiscoverContextValues | null>(null);

export function useDiscoverContext() {
    const ctx = useContext(DiscoverContext);
    if (!ctx) throw new Error("useDiscoverContext must be used within a DiscoverProvider");
    return ctx;
}