import { RefObject, useCallback, useState } from "react";
import { MapEvent } from "mapbox-gl";
import { ViewStateChangeEvent } from "react-map-gl/mapbox";
import { IMapProvider , IMapRootController, MapProviderCameraState } from "../types";

export function useMapbox(
    provider: RefObject<IMapProvider>,
    controller: RefObject<IMapRootController>,
    onMapLoad?: () => void,
) {
    const [viewState, setViewState] = useState<Partial<MapProviderCameraState.Viewport>>(
        provider.current.config.initialViewState,
    );
    const [bounds, setBounds] = useState<MapProviderCameraState.Bounds>([0, 0, 0, 0]);

    const handleMapLoad = (e: MapEvent) => {
        updateBounds(e);
        onMapLoad?.();
    };
  
    const handleMapMove = useCallback((e: ViewStateChangeEvent) => {
        const { viewState, target } = e;
        setViewState(viewState);
        updateBounds(e);

        const lngLatBounds = target.getBounds();

        controller.current.externalHandlers.onViewportChange?.(
            { viewState: e.viewState, bounds: lngLatBounds },
        );
    }, []);

    const updateBounds = useCallback((e: MapEvent) => {
        const lngLatBounds = e.target.getBounds();
        if(lngLatBounds) {
            setBounds(lngLatBounds.toArray().flat() as MapProviderCameraState.Bounds);
        }
    }, []);

    const handleSelectPoint = useCallback((pointId: string) => {
        controller.current.selectPoint(pointId);
    }, []);

    return {
        viewState,
        bounds,
        handleMapLoad,
        handleMapMove,
        handleSelectPoint,
    };
}