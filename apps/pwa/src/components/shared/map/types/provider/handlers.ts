import { MapProviderCameraState } from "./camera";
import { MapProviderGL } from "./gl";

export interface IMapHandlers {
    /**
     * A callback function that handles the changes in the map's viewport by updating the viewport information in the controller.
     *
     * @param {MapHandlerViewport} viewport - The current state of the map's viewport, including dimensions, center point, zoom level, etc.
     * @return {void} This method does not return a value.
     */
    onViewportChange(
        viewport: MapHandlerViewport,
    ): void;

    /**
     * A callback function that is triggered when a specific point is selected.
     * This function is invoked with the selected point as its parameter.
     *
     * @param pointId
     */
    onPointSelect(pointId: string | null): void;
}

type MapHandlerViewport = {
    viewState: Partial<MapProviderCameraState.Viewport>,
    bounds: MapProviderGL.LngLatBounds | null,
};