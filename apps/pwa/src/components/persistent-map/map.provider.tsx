"use client";

import { PersistentMapContext } from "./map.context";
import { ReactNode, useCallback, useRef, useState } from "react";
import { MapRef } from "react-map-gl/mapbox";
import { MapboxProvider, MapboxComponent } from "./providers";
import { MapStore } from "./map.store";

type MapProviderProps = {
    mapStyleDark?: string;
    mapStyleLight?: string;
    mapAccessToken?: string;
    initialViewState?: {
        longitude: number;
        latitude: number;
        zoom: number;
        pitch: number;
        [key: string]: any;
    };
};

type PersistentMapProviderProps = MapProviderProps & {
    children: ReactNode;
};

export const PersistentMapProvider = ({
    children,
    ...mapProps
}: PersistentMapProviderProps) => {
    const mapRef = useRef<MapRef>(null);
    const mapContainerRef = useRef<HTMLDivElement>(null);
    const persistentRootRef = useRef<HTMLDivElement | null>(null);

    const [isMapInitialized, setIsMapInitialized] = useState(false);

    const provider = new MapboxProvider(mapRef, {
        accessToken: mapProps.mapAccessToken,
        initialViewState: mapProps.initialViewState,
    });
    const store = new MapStore(provider);

    const attachMap = useCallback((container: HTMLDivElement) => {
        if (!mapContainerRef.current || !mapRef.current) return;
        container.appendChild(mapContainerRef.current);
    }, []);

    const detachMap = useCallback(() => {
        if (!mapContainerRef.current || !persistentRootRef.current) return;
        persistentRootRef.current.appendChild(mapContainerRef.current);
    }, []);

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const handleInitialize = useCallback((e: any) => {
        console.warn("MAP INITIALIZED!!!");
        setIsMapInitialized(true);
    }, []);

    return (
        <PersistentMapContext.Provider
            value={{
                mapRef,
                store,
                provider,
                attachMap,
                detachMap,
                isMapInitialized,
            }}
        >
            { children }
            {/* Hidden container that holds the map when not in use */}
            <div ref={persistentRootRef} style={{ visibility: "hidden", height: "100%" }}>
                <div ref={mapContainerRef} style={{ width: "100%", height: "100%" }}>
                    <MapboxComponent
                        ref={mapRef}
                        store={store}
                        provider={provider}
                        mapStyle={mapProps.mapStyleDark}
                        mapboxAccessToken={mapProps.mapAccessToken}
                        initialViewState={mapProps.initialViewState}
                        handleInitializeMap={handleInitialize}
                    />
                </div>
            </div>
        </PersistentMapContext.Provider>
    );
};