import { MapRef } from "react-map-gl/mapbox";
import { RefObject, createContext, useContext } from "react";
import { MapStore } from "./map.store";
import { IMapboxProvider } from "./providers/mapbox";
import { IMapHandlers } from "./providers/types";

interface PersistentMapContextType<T> {
    mapRef: RefObject<T | null> | null;
    store: MapStore | null;
    provider: IMapboxProvider | null;
    isMapInitialized: boolean;
    attachMap: (container: HTMLDivElement, handlers: Partial<IMapHandlers>) => void;
    detachMap: () => void;
}

export const PersistentMapContext = createContext<PersistentMapContextType<MapRef>>({
    mapRef: null,
    store: null,
    provider: null,
    isMapInitialized: false,
    attachMap: () => {},
    detachMap: () => {},
});

export function usePersistentMap() {
    const ctx = useContext(PersistentMapContext);
    if(!ctx) {
        throw new Error("usePersistentMap must be used within <PersistentMapProvider />");
    }

    return ctx;
}