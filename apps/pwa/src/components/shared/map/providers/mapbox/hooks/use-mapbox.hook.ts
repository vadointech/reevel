import { MapEvent } from "mapbox-gl";
import { RefObject, useCallback, useState } from "react";
import { ViewStateChangeEvent } from "react-map-gl/mapbox";
import { IMapProvider , IMapRootController, MapProviderCameraState } from "../types";

export function useMapbox(
    provider: RefObject<IMapProvider>,
    controller: RefObject<IMapRootController>,
    onMapLoad?: () => void,
) {

    const initialViewState = provider.current.internalConfig.viewState;

    const [viewState, setViewState] = useState<Partial<MapProviderCameraState.Viewport>>(
        {
            longitude: initialViewState.center.lng,
            latitude: initialViewState.center.lat,
            zoom: initialViewState.zoom,
            pitch: initialViewState.pitch,
            padding: initialViewState.padding,
        },
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