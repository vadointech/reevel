import { useCallback, useState } from "react";
import { MapboxEvent } from "mapbox-gl";
import { ViewState, ViewStateChangeEvent } from "react-map-gl/mapbox";
import { Bounds } from "./use-mapbox-cluster.hook";
import { MapStore } from "../../../map.store";

type Params = {
    store: MapStore
    initialViewState: Partial<ViewState>;
    onMapLoad?: (e: MapboxEvent) => void;
};

export function useMapbox({
    store,
    initialViewState,
    onMapLoad,
}: Params) {
    const [viewState, setViewState] = useState<Partial<ViewState>>(initialViewState);
    const [bounds, setBounds] = useState<Bounds>([0, 0, 0, 0]);

    const handleMapLoad = (e: MapboxEvent) => {
        updateBounds(e);
        onMapLoad?.(e);
    };
  
    const handleMapMove = (e: ViewStateChangeEvent) => {
        setViewState(e.viewState);
        updateBounds(e);
    };

    const updateBounds = useCallback((e: MapboxEvent) => {
        const bounds = e.target.getBounds();
        if(bounds) {
            setBounds(bounds.toArray().flat() as Bounds);
        }
    }, []);

    const handleSelectPoint = useCallback((pointId: string) => {
        store.selectPoint(pointId);
    }, [store]);

    return {
        viewState,
        bounds,
        handleMapLoad,
        handleMapMove,
        handleSelectPoint,
    };
}