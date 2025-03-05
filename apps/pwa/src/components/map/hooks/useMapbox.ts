import { useCallback, useState } from "react";
import Supercluster from "supercluster";
import { MapEvent, ViewState, ViewStateChangeEvent } from "react-map-gl/mapbox";

type Bounds = [number, number, number, number];

export function useMapbox(
    initialPoints: Supercluster.PointFeature<any>[],
    initialViewState: Partial<ViewState> = {},
) {
    const [viewState, setViewState] = useState<Partial<ViewState>>({
        ...initialViewState,
    });

    const updateViewState = useCallback((e: ViewStateChangeEvent) => {
        setViewState(e.viewState);
    }, []);

    const [bounds, setBounds] = useState<Bounds>([0, 0, 0, 0]);

    const updateBounds = useCallback((e: MapEvent) => {
        const bounds = e.target.getBounds();
        if(bounds) {
            setBounds(bounds.toArray().flat() as any);
        }
    }, []);

    return {
        viewState,
        updateViewState,
        bounds,
        updateBounds,
    };
}