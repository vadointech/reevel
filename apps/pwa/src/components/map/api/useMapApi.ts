import { useCallback } from "react";
import { useMapContext } from "@/components/map/context";
import { MapApi } from "./types";

export function useMapApi(): MapApi {
    const { ref: mapRef } = useMapContext();

    const flyTo: MapApi["flyTo"] = useCallback((coordinates, options) => {
        if(mapRef.current) {
            mapRef.current.flyTo({
                center: coordinates,
                ...options,
            });
        }
    }, []);

    return {
        flyTo,
    };
}