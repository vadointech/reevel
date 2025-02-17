"use client";

import { ComponentProps, forwardRef } from "react";

export namespace Map {
    export type Props = ComponentProps<"div">;
}

export const Map = forwardRef<HTMLDivElement | null, Map.Props>((props, ref) => {
    return (
        <div
            ref={ref}
            className="map-container"
            style={{ height: "100%" }}
            {...props}
        />
    );
});