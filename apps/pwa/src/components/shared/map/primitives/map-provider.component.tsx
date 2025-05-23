"use client";

import { PropsWithChildren, useCallback, useRef } from "react";
import { MapRootController } from "../map.controller";
import { PersistentMapContext } from "../map.context";

import { MapboxComponent, MapboxProvider } from "../providers";

import { MapProviderConfig } from "../types";

export const PersistentMapProvider = ({
    children,
    ...providerConfig
}: PropsWithChildren<MapProviderConfig>) => {
    const mapContainerRef = useRef<HTMLDivElement>(null);
    const persistentRootRef = useRef<HTMLDivElement | null>(null);

    const mapRef = useRef<any>(null);

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
        ),
    );

    const handleInitialize = useCallback(() => provider.current.initialize(mapRef), []);

    return (
        <PersistentMapContext.Provider
            value={ { controller, provider }}
        >
            { children }
            {/* Hidden container that holds the map when not in use */}
            <div ref={persistentRootRef} style={{ visibility: "hidden", height: "100%" }}>
                <div ref={mapContainerRef} style={{ width: "100%", height: "100%" }}>
                    <MapboxComponent
                        ref={mapRef}
                        provider={provider}
                        controller={controller}
                        onMapLoad={handleInitialize}
                    />
                </div>
            </div>
        </PersistentMapContext.Provider>
    );
};