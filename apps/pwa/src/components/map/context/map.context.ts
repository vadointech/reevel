"use client";

import { createContext } from "react";

export type MapContextValue = {
    mapStyle: string | undefined;
    accessToken: string | undefined;
};

export const MapContext = createContext<MapContextValue | null>(null);