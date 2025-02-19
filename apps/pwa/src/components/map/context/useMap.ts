"use client";

import { useContext } from "react";
import { MapContext } from "./map.context";

export function useMapContext() {
    const ctx = useContext(MapContext);

    if(!ctx) {
        throw new Error("useMapContext must be used within the <MapProvider />");
    }

    return ctx;
}