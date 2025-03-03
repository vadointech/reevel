"use client";

import { ComponentProps, memo, useEffect, useRef } from "react";
import { usePersistentMap } from "./map.context";
import { IMapProvider } from "./providers/types";

export namespace MapView {
    export type Props = ComponentProps<"div"> & {
        onMapReady?: (provider: IMapProvider) => void;
    };
}

export const MapView = memo(({
    onMapReady,
    style,
    ...props
}: MapView.Props) => {
    const { attachMap, detachMap, isMapInitialized, provider } = usePersistentMap();
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!containerRef.current) return;

        attachMap(containerRef.current);

        onMapReady?.(provider as IMapProvider);

        return () => {
            detachMap();
        };
    }, [attachMap, detachMap, isMapInitialized, onMapReady]);

    return (
        <div
            ref={containerRef}
            style={{
                width: "100%",
                height: "100%",
                position: "relative",
                ...style,
            }}
            {...props}
        />
    );
});
