"use client";

import { PropsWithChildren, useCallback, useMemo, useRef } from "react";

import { useMediaQuery } from "@uidotdev/usehooks";
import { useTheme } from "next-themes";

import { MapRootController } from "../map.controller";
import { PersistentMapContext } from "../map.context";
import { MapStore } from "../map.store";
import { MapConfig } from "../types";

import { MapboxComponent, MapboxProvider } from "../providers";
import { Theme } from "@/entities/theme";

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

    const { theme } = useTheme();
    const prefersLight = useMediaQuery("(prefers-color-scheme: light)");


    const mapStyle = useMemo(() => {
        switch(theme) {
            case Theme.LIGHT:
                return provider.current.internalConfig.mapStyle.styleLight;
            case Theme.DARK:
                return provider.current.internalConfig.mapStyle.styleDark;
            default:
                if(prefersLight) return provider.current.internalConfig.mapStyle.styleLight;
                return provider.current.internalConfig.mapStyle.styleDark;
        }
    }, [theme, prefersLight]);

    return (
        <PersistentMapContext.Provider
            value={{ controller, provider, store }}
        >
            { children }
            {/* Hidden container that holds the map when not in use */}
            <div ref={persistentRootRef} style={{ visibility: "hidden", height: "100%" }}>
                <div ref={mapContainerRef} style={{ width: "100%", height: "100%" }}>
                    <MapboxComponent
                        mapStyle={mapStyle}
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