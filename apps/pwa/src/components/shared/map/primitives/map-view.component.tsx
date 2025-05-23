"use client";

import { ComponentProps, useEffect, useRef } from "react";
import { usePersistentMap } from "../map.context";
import { BasePoint, Point, IMapHandlers, MapProviderCameraState } from "../types";

export namespace MapView {
    export type Props<P extends BasePoint> = ComponentProps<"div"> & Partial<IMapHandlers> & {
        points?: Point<P>[];
        viewState?: Partial<MapProviderCameraState.Viewport>;
    };
}

export const MapView = ({
    style,

    viewState,

    onPointSelect,
    onViewportChange,

    ...props
}: MapView.Props<any>) => {
    const { controller } = usePersistentMap();
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!containerRef.current) return;

        controller.current.attachMap(
            containerRef,
            viewState,
            {
                onPointSelect,
                onViewportChange,
            },
        );

        return () => {
            controller.current.detachMap();
        };
    }, [controller]);

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
};
