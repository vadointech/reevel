"use client";

import { MapContext } from "./map.context";
import { ReactNode, useRef } from "react";
import { MapRef } from "react-map-gl/mapbox";

export namespace MapProvider {
    export type Props = {
        children: ReactNode;
        mapStyle: string | undefined;
        accessToken: string | undefined;
    };
}

export const MapProvider = ({
    children,
    mapStyle,
    accessToken,
}: MapProvider.Props) => {
    const ref = useRef<MapRef>(null);

    return (
        <MapContext.Provider
            value={{
                ref,
                mapStyle,
                accessToken,
            }}
        >
            { children }
        </MapContext.Provider>
    );
};