import { RefObject, useCallback, useState } from "react";
import { MapboxEvent } from "mapbox-gl";
import { ViewStateChangeEvent } from "react-map-gl/mapbox";
import { MapStore } from "../../../map.store";
import { MapProviderCameraState } from "@/components/shared/map/providers/types/camera";
import { IMapHandlers, IMapProvider } from "@/components/shared/map/providers/types";

type Params = {
    store: MapStore;
    provider: IMapProvider;
    initialViewState: Partial<MapProviderCameraState.Viewport>;
    onMapLoad?: (e: MapboxEvent) => void;
    handlers: RefObject<Partial<IMapHandlers>>;
};

export function useMapbox({
    store,
    provider,
    initialViewState,
    onMapLoad,
    handlers,
}: Params) {
    const [viewState, setViewState] = useState<Partial<MapProviderCameraState.Viewport>>(initialViewState);
    const [bounds, setBounds] = useState<MapProviderCameraState.Bounds>([0, 0, 0, 0]);

    const handleMapLoad = (e: MapboxEvent) => {
        updateBounds(e);
        onMapLoad?.(e);
    };
  
    const handleMapMove = useCallback((e: ViewStateChangeEvent) => {
        const { viewState, target } = e;
        setViewState(viewState);
        updateBounds(e);

        const lngLatBounds = target.getBounds();

        handlers.current.onViewportChange?.(
            { viewState: e.viewState, bounds: lngLatBounds },
            { provider, store },
        );
    }, []);

    const updateBounds = useCallback((e: MapboxEvent) => {
        const lngLatBounds = e.target.getBounds();
        if(lngLatBounds) {
            setBounds(lngLatBounds.toArray().flat() as MapProviderCameraState.Bounds);
        }
    }, []);

    const handleSelectPoint = useCallback((pointId: string) => {
        store.selectPoint(pointId);
        handlers.current.onPointSelect?.(pointId);
    }, [store]);

    return {
        viewState,
        bounds,
        handleMapLoad,
        handleMapMove,
        handleSelectPoint,
    };
}