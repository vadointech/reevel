"use client";

import { createContext } from "react";

export type MapContextValue = {
    mapStyle: {
        light: string | undefined;
        dark: string | undefined;
    } | undefined;
    accessToken: string | undefined;
};

export const MapContext = createContext<MapContextValue | null>(null);