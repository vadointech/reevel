"use client";

import { PropsWithChildren, useCallback, useRef } from "react";
import { MapRootController } from "../map.controller";
import { PersistentMapContext } from "../map.context";
import { MapStore } from "../map.store";
import { MapConfig } from "../types";

import { MapboxComponent, MapboxProvider } from "../providers";

export const PersistentMapProvider = ({
    children,
    ...providerConfig
}: PropsWithChildren<MapConfig.Params>) => {
    const mapContainerRef = useRef<HTMLDivElement>(null);
    const persistentRootRef = useRef<HTMLDivElement | null>(null);

    const mapRef = useRef<any>(null);
    const store = useRef(new MapStore()).current;

    const provider = useRef(
        new MapboxProvider(
            mapRef,
            providerConfig,
        ),
    );

    const controller = useRef(
        new MapRootController(
            mapContainerRef,
            persistentRootRef,
            provider,
            store,
        ),
    );

    const handleInitialize = useCallback(() => provider.current.initialize(mapRef), []);

    return (
        <PersistentMapContext.Provider
            value={{ controller, provider, store }}
        >
            { children }
            {/* Hidden container that holds the map when not in use */}
            <div ref={persistentRootRef} style={{ visibility: "hidden", height: "100%" }}>
                <div ref={mapContainerRef} style={{ width: "100%", height: "100%" }}>
                    <MapboxComponent
                        ref={mapRef}
                        store={store}
                        provider={provider}
                        controller={controller}
                        onMapLoad={handleInitialize}
                    />
                </div>
            </div>
        </PersistentMapContext.Provider>
    );
};