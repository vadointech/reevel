"use client";

import { ComponentProps, useEffect, useRef } from "react";
import { usePersistentMap } from "./map.context";
import { IMapHandlers, IMapProvider } from "./providers/types";
import { BasePoint, Point } from "./types";
import { MapStore } from "./map.store";

export namespace MapView {
    export type Props<P extends BasePoint> = ComponentProps<"div"> & Partial<IMapHandlers> & {
        points?: Point<P>[]
        onMapReady?: (store: MapStore, provider: IMapProvider) => void;
    };
}

export function MapView<P extends BasePoint>({
    onMapReady,
    style,
    points,
    onViewportChange,
    ...props
}: MapView.Props<P>) {
    const { attachMap, detachMap, store, isMapInitialized, provider } = usePersistentMap();
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!containerRef.current) return;

        attachMap(containerRef.current, {
            onViewportChange,
        });

        if(onMapReady && store && provider) {
            onMapReady(store, provider);
        }

        return () => {
            detachMap();
        };
    }, [attachMap, detachMap, isMapInitialized, onMapReady]);

    useEffect(() => {
        if(isMapInitialized) {
            if(points && points.length > 0) {
                store?.setPoints(points);
            }
        }
    }, [isMapInitialized]);

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
}
