"use client";

import { ComponentProps, useEffect, useRef } from "react";
import { usePersistentMap } from "./map.context";
import { IMapHandlers } from "./providers/types";
import { BasePoint, Point } from "./types";

export namespace MapView {
    export type Props<P extends BasePoint> = ComponentProps<"div"> & Partial<IMapHandlers> & {
        points?: Point<P>[];
    };
}

export function MapView<P extends BasePoint>({
    style,
    points,

    onMapMounted,
    onPointSelect,
    onViewportChange,

    ...props
}: MapView.Props<P>) {
    const { attachMap, detachMap, store, isMapInitialized, provider } = usePersistentMap();
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!containerRef.current) return;

        attachMap(containerRef.current, {
            onMapMounted,
            onPointSelect,
            onViewportChange,
        });

        if(onMapMounted && store && provider) {
            onMapMounted({ store, provider });
        }

        return () => {
            detachMap();
        };
    }, [attachMap, detachMap, isMapInitialized, onMapMounted]);

    useEffect(() => {
        if(isMapInitialized) {
            if(points && points.length > 0) {
                store?.setPoints(points);
            }
        }
    }, [isMapInitialized, points]);

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
