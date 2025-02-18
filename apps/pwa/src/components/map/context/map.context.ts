"use client";

import { createContext, RefObject } from "react";
import { MapRef } from "react-map-gl/mapbox";

export type MapContextValue = {
    mapStyle: string | undefined;
    accessToken: string | undefined;

    ref: RefObject<MapRef | null>
};

export const MapContext = createContext<MapContextValue | null>(null);