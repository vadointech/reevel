"use client";

import { MapContext } from "./map.context";
import { ReactNode } from "react";

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
    return (
        <MapContext.Provider
            value={{
                mapStyle,
                accessToken,
            }}
        >
            { children }
        </MapContext.Provider>
    );
};