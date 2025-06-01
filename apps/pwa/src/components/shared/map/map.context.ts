"use client";

import { createContext, RefObject, useContext } from "react";
import { IMapRootController, IMapProvider, IMapStore } from "./types";

type PersistentMapContextValue = {
    controller: RefObject<IMapRootController>;
    provider: RefObject<IMapProvider>;
    store: IMapStore;
};

export const PersistentMapContext = createContext<PersistentMapContextValue | null>(null);

export function usePersistentMap() {
    const ctx = useContext(PersistentMapContext);
    if(!ctx) {
        throw new Error("usePersistentMap must be used within <PersistentMapProvider />");
    }

    return ctx;
}