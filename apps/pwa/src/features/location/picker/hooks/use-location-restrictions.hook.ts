import { useRef } from "react";
import { MapProviderGL } from "@/components/shared/map/types";
import { useDebouncedCallback } from "use-debounce";

export function useLocationPickerLocationRestrictions() {
    const prevBoundsArr = useRef<MapProviderGL.LngLatBounds[]>([]);
    const prevBoundsArea = useRef<number>(0);
    const prevCenter = useRef<MapProviderGL.LngLat | null>(null);
    const prevRadius = useRef<number>(0);

    const resetLocationRestriction = () => {
        prevBoundsArr.current = [];
        prevCenter.current = null;
        prevBoundsArea.current = 0;
        prevRadius.current = 0;
    };

    const setInitialLocationRestriction = useDebouncedCallback(
        (
            center: MapProviderGL.LngLat,
            bufferedRadius: number,
            bufferedBounds: MapProviderGL.LngLatBounds,
            currentBoundsArea: number,
        ) => {
            prevCenter.current = center;
            prevRadius.current = bufferedRadius;
            prevBoundsArr.current = [bufferedBounds];
            prevBoundsArea.current = currentBoundsArea;
        },
        1000,
    );

    return {
        prevBoundsArr,
        prevBoundsArea,
        prevCenter,
        prevRadius,
        resetLocationRestriction,
        setInitialLocationRestriction,
    };
}